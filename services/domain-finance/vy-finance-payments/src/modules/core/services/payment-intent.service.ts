import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../../entities/payment_intent.entity';
import { PaymentRefund } from '../../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../../entities/payment_attempt.entity';
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
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
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
    createDto: CreatePaymentIntentDto,
    traceId: string,
  ): Promise<PaymentIntentDto> {
    let entity = this.paymentRepo.create({
      ...createDto,
      externalId: '',
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

    try {
      const stripeIntent = await this.stripeGateway.createPaymentIntent({
        amount: entity.amountCents,
        currency: entity.currency,
        metadata: entity.metadata as any,
      });

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
    }

    await this.ztrackingPaymentIntentService.createZtrackingForPaymentIntent(
      entity,
      traceId,
    );

    return entity;
  }

  async getPaymentIntent(
    { paymentIntentId }: GetPaymentIntentDto,
    traceId: string,
  ): Promise<PaymentIntentDto | null> {
    const entity = await this.paymentRepo.findOne({ where: { paymentIntentId } });
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
    getDto: GetZtrackingPaymentIntentDto,
    traceId: string,
  ): Promise<ZtrackingPaymentIntentDto[]> {
    return this.ztrackingPaymentIntentService.getZtrackingForPaymentIntent(
      getDto,
      traceId,
    );
  }

  async createRefund(
    createRefundDto: CreateRefundDto,
    traceId: string,
  ): Promise<Stripe.Refund> {
    this.logger.info('Creating refund', traceId, 'createRefund', LogStreamLevel.ProdStandard);
    return this.stripeGateway.createRefund({
      payment_intent: createRefundDto.paymentIntentId,
      amount: createRefundDto.amountCents,
      reason: createRefundDto.reason as any,
      metadata: createRefundDto.metadata as any,
    });
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
    }

    if (event.type.startsWith('charge.refund') || event.type.startsWith('refund.')) {
      const refundObj: any = (event.data.object as any).refund || event.data.object;
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
      }
    }

    this.logger.debug(
      `Processed Stripe event ${event.type}`,
      traceId,
      'handleStripeWebhook',
      LogStreamLevel.DebugLight,
    );
  }
}
