import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import { StripeGatewayService } from './stripe-gateway.service';
import Stripe from 'stripe';
import {
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  PaymentIntentDto,
  ZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  KT_PAYMENT_INTENT_CREATED,
  KT_PAYMENT_SUCCEEDED,
  KT_PAYMENT_FAILED,
  KT_REFUND_CREATED,
  KT_REFUND_SUCCEEDED,
  KT_REFUND_FAILED,
  encodeKafkaMessage,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../utils/common';
import { v4 as uuid } from 'uuid';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PaymentIntentService {
  private logger = getLoggerConfig(PaymentIntentService.name);

  constructor(
    @InjectRepository(PaymentIntent)
    private readonly paymentRepo: Repository<PaymentIntent>,
    @InjectRepository(PaymentRefund)
    private readonly refundRepo: Repository<PaymentRefund>,
    @InjectRepository(PaymentAttempt)
    private readonly attemptRepo: Repository<PaymentAttempt>,
    @InjectRepository(WebhookEvent)
    private readonly webhookRepo: Repository<WebhookEvent>,
    private readonly ztrackingPaymentIntentService: ZtrackingPaymentIntentService,
    private readonly stripeGateway: StripeGatewayService,
  ) {
    this.logger.debug(
      `${PaymentIntentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentIntent(
    createPaymentIntentDto: CreatePaymentIntentDto,
    traceId: string,
  ): Promise<PaymentIntentDto> {
    let entity = this.paymentRepo.create({
      ...createPaymentIntentDto,
      externalId: uuid(),
      status: 'REQUIRES_PAYMENT_METHOD',
    });

    // persist the intent first so we can reference it in attempts
    entity = await this.paymentRepo.save(entity);

    const attempt = await this.attemptRepo.save(
      this.attemptRepo.create({
        paymentIntentId: entity.paymentIntentId,
        attemptNumber:
          (await this.attemptRepo.count({
            where: { paymentIntentId: entity.paymentIntentId },
          })) + 1,
        status: 'PENDING',
      }),
    );

    let clientSecret: string | undefined;

    try {
      const stripeIntent = await this.stripeGateway.createPaymentIntent({
        amount: entity.amountCents,
        currency: entity.currency,
        metadata: entity.metadata as any,
      });

      clientSecret = stripeIntent.client_secret || undefined;

      entity.externalId = stripeIntent.id;
      const statusMap: Record<string, PaymentIntent['status']> = {
        requires_payment_method: 'REQUIRES_PAYMENT_METHOD',
        requires_confirmation: 'REQUIRES_CONFIRMATION',
        requires_action: 'REQUIRES_ACTION',
        processing: 'PROCESSING',
        succeeded: 'SUCCEEDED',
        canceled: 'CANCELED',
      };
      entity.status = statusMap[stripeIntent.status] || entity.status;

      await this.paymentRepo.save(entity);
      await this.attemptRepo.update(attempt.attemptId, {
        status: 'SUCCESS',
        gatewayResponse: stripeIntent as any,
      });

      this.logger.info(
        'PaymentIntent created',
        traceId,
        'createPaymentIntent',
        LogStreamLevel.ProdStandard,
      );
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_PAYMENT_INTENT_CREATED,
        encodeKafkaMessage(PaymentIntentService.name, {
          paymentIntentId: entity.paymentIntentId,
          orderId: entity.orderId,
          subscriptionId: entity.subscriptionId,
          amountCents: entity.amountCents,
          currency: entity.currency,
          traceId,
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to persist PaymentIntent => ${error}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugHeavy,
      );
      entity.nextRetryAt = new Date(Date.now() + 5 * 60 * 1000);
      try {
        await this.paymentRepo.save(entity);
      } catch (saveErr) {
        this.logger.error(
          `Failed to save PaymentIntent for retry => ${saveErr}`,
          traceId,
          'createPaymentIntent',
          LogStreamLevel.DebugHeavy,
        );
      }
      await this.attemptRepo.update(attempt.attemptId, {
        status: 'FAILED',
        errorCode: (error as any)?.code,
        errorMessage: (error as any)?.message,
        gatewayResponse: error as any,
      });
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_PAYMENT_FAILED,
        encodeKafkaMessage(PaymentIntentService.name, {
          paymentIntentId: entity.paymentIntentId,
          errorCode: (error as any)?.code,
          errorMessage: (error as any)?.message,
          traceId,
        }),
      );
    }

    await this.ztrackingPaymentIntentService.createZtrackingForPaymentIntent(
      entity,
      traceId,
    );

    return { ...entity, clientSecret } as PaymentIntentDto;
  }

  async getPaymentIntent(
    getPaymentIntentDto: GetPaymentIntentDto,
    traceId: string,
  ): Promise<PaymentIntentDto | null> {
    const { paymentIntentId } = getPaymentIntentDto;
    const entity = await this.paymentRepo.findOne({
      where: { paymentIntentId },
    });
    if (entity) {
      this.logger.info(
        `PaymentIntent retrieved`,
        traceId,
        'getPaymentIntent',
        LogStreamLevel.DebugLight,
      );
    } else {
      this.logger.warn(
        `PaymentIntent not found => ${paymentIntentId}`,
        traceId,
        'getPaymentIntent',
        LogStreamLevel.DebugLight,
      );
    }
    return entity;
  }

  async getZtrackingPaymentIntent(
    getZtrackingPaymentIntentDto: GetZtrackingPaymentIntentDto,
    traceId: string,
  ): Promise<ZtrackingPaymentIntentDto[]> {
    return this.ztrackingPaymentIntentService.getZtrackingForPaymentIntent(
      getZtrackingPaymentIntentDto,
      traceId,
    );
  }

  async createRefund(
    createRefundDto: CreateRefundDto,
    traceId: string,
  ): Promise<Stripe.Refund> {
    this.logger.info(
      'Creating refund',
      traceId,
      'createRefund',
      LogStreamLevel.ProdStandard,
    );

    const intent = await this.paymentRepo.findOne({
      where: { paymentIntentId: createRefundDto.paymentIntentId },
    });

    let refundEntity = this.refundRepo.create({
      paymentIntentId: createRefundDto.paymentIntentId,
      externalId: uuid(),
      amountCents: createRefundDto.amountCents,
      currency: intent?.currency || 'USD',
      status: 'PENDING',
      reason: createRefundDto.reason,
      metadata: createRefundDto.metadata,
    });

    refundEntity = await this.refundRepo.save(refundEntity);

    try {
      const stripeRefund = await this.stripeGateway.createRefund({
        payment_intent: intent?.externalId || createRefundDto.paymentIntentId,
        amount: createRefundDto.amountCents,
        reason: createRefundDto.reason as any,
        metadata: createRefundDto.metadata as any,
      });

      const statusMap: Record<string, PaymentRefund['status']> = {
        succeeded: 'SUCCEEDED',
        failed: 'FAILED',
        pending: 'PENDING',
      };

      await this.refundRepo.update(refundEntity.refundId, {
        externalId: stripeRefund.id,
        amountCents: stripeRefund.amount ?? refundEntity.amountCents,
        currency: stripeRefund.currency?.toUpperCase() || refundEntity.currency,
        status: statusMap[stripeRefund.status] || refundEntity.status,
      });

      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_REFUND_CREATED,
        encodeKafkaMessage(PaymentIntentService.name, {
          refundId: refundEntity.refundId,
          paymentIntentId: refundEntity.paymentIntentId,
          amountCents: refundEntity.amountCents,
          traceId,
        }),
      );

      return stripeRefund;
    } catch (error) {
      await this.refundRepo.update(refundEntity.refundId, {
        status: 'FAILED',
      });
      this.logger.error(
        `Failed to create refund => ${error}`,
        traceId,
        'createRefund',
        LogStreamLevel.DebugHeavy,
      );
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_REFUND_FAILED,
        encodeKafkaMessage(PaymentIntentService.name, {
          refundId: refundEntity.refundId,
          paymentIntentId: refundEntity.paymentIntentId,
          errorCode: (error as any)?.code,
          traceId,
        }),
      );
      throw error;
    }
  }

  async getRefund(
    getPaymentRefundDto: GetPaymentRefundDto,
    traceId: string,
  ): Promise<PaymentRefund | null> {
    const { refundId } = getPaymentRefundDto;
    const entity = await this.refundRepo.findOne({ where: { refundId } });
    if (entity) {
      this.logger.info(
        'Refund retrieved',
        traceId,
        'getRefund',
        LogStreamLevel.DebugLight,
      );
    } else {
      this.logger.warn(
        `Refund not found => ${refundId}`,
        traceId,
        'getRefund',
        LogStreamLevel.DebugLight,
      );
    }
    return entity;
  }

  async handleStripeWebhook(
    payload: Buffer | string,
    signature: string,
    traceId: string,
  ): Promise<void> {
    let event: Stripe.Event;
    try {
      event = this.stripeGateway.constructWebhookEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err) {
      this.logger.error(
        `Invalid webhook signature: ${err}`,
        traceId,
        'handleStripeWebhook',
        LogStreamLevel.ProdStandard,
      );
      throw err;
    }

    const existing = await this.webhookRepo.findOne({
      where: { gateway: 'STRIPE', externalEventId: event.id },
    });
    if (existing) {
      this.logger.debug(
        `Duplicate Stripe event ${event.id}`,
        traceId,
        'handleStripeWebhook',
        LogStreamLevel.DebugLight,
      );
      return;
    }

    const webhook = await this.webhookRepo.save(
      this.webhookRepo.create({
        gateway: 'STRIPE',
        externalEventId: event.id,
        eventType: event.type,
        payload: event as any,
        status: 'PENDING',
      }),
    );

    try {
      const intentStatusMap: Record<string, PaymentIntent['status']> = {
        'payment_intent.succeeded': 'SUCCEEDED',
        'payment_intent.canceled': 'CANCELED',
        'payment_intent.processing': 'PROCESSING',
        'payment_intent.payment_failed': 'FAILED',
      };

      if (intentStatusMap[event.type]) {
        const pi = event.data.object as Stripe.PaymentIntent;
        await this.paymentRepo.update(
          { externalId: pi.id },
          { status: intentStatusMap[event.type] },
        );
        const updated = await this.paymentRepo.findOne({
          where: { externalId: pi.id },
        });
        if (updated && intentStatusMap[event.type] === 'SUCCEEDED') {
          await new EzKafkaProducer().produce(
            process.env.KAFKA_BROKER as string,
            KT_PAYMENT_SUCCEEDED,
            encodeKafkaMessage(PaymentIntentService.name, {
              paymentIntentId: updated.paymentIntentId,
              orderId: updated.orderId,
              subscriptionId: updated.subscriptionId,
              traceId,
            }),
          );
        }
        if (updated && intentStatusMap[event.type] === 'FAILED') {
          const err = (pi as any).last_payment_error;
          await new EzKafkaProducer().produce(
            process.env.KAFKA_BROKER as string,
            KT_PAYMENT_FAILED,
            encodeKafkaMessage(PaymentIntentService.name, {
              paymentIntentId: updated.paymentIntentId,
              errorCode: err?.code,
              errorMessage: err?.message,
              traceId,
            }),
          );
        }
      }

      if (
        event.type.startsWith('charge.refund') ||
        event.type.startsWith('refund.')
      ) {
        const refundObj: any =
          (event.data.object as any).refund || event.data.object;
        const statusMap: Record<string, PaymentRefund['status']> = {
          succeeded: 'SUCCEEDED',
          failed: 'FAILED',
          pending: 'PENDING',
        };
        if (refundObj && refundObj.id) {
          await this.refundRepo.update(
            { externalId: refundObj.id },
            { status: statusMap[refundObj.status] },
          );
          const updatedRefund = await this.refundRepo.findOne({
            where: { externalId: refundObj.id },
          });
          if (updatedRefund && statusMap[refundObj.status] === 'SUCCEEDED') {
            await new EzKafkaProducer().produce(
              process.env.KAFKA_BROKER as string,
              KT_REFUND_SUCCEEDED,
              encodeKafkaMessage(PaymentIntentService.name, {
                refundId: updatedRefund.refundId,
                paymentIntentId: updatedRefund.paymentIntentId,
                traceId,
              }),
            );
          }
        }
      }

      await this.webhookRepo.update(webhook.webhookId, {
        status: 'PROCESSED',
        processedAt: new Date(),
      });

      this.logger.debug(
        `Processed Stripe event ${event.type}`,
        traceId,
        'handleStripeWebhook',
        LogStreamLevel.DebugLight,
      );
    } catch (err) {
      await this.webhookRepo.update(webhook.webhookId, {
        status: 'FAILED',
        processedAt: new Date(),
      });
      throw err;
    }
  }
}
