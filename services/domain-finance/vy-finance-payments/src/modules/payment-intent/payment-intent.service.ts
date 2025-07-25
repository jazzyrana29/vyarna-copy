import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { mapStripeIntentStatus } from './payment-intent.utils';
import Stripe from 'stripe';
import {
  CapturePaymentIntentDto,
  ConfirmedPaymentIntentDto,
  ConfirmPaymentIntentDto,
  CreatePaymentIntentPayloadDto,
  CreateRefundDto,
  encodeKafkaMessage,
  GetPaymentIntentDto,
  GetPaymentIntentStatusDto,
  GetPaymentRefundDto,
  GetZtrackingPaymentIntentDto,
  KT_CREATE_CONTACT,
  PaymentIntentCreatedDto,
  PaymentIntentDto,
  PaymentIntentNextAction,
  PaymentStatusUpdateDto,
  RetryPaymentAttemptDto,
  StripeWebhookDto,
  ZtrackingPaymentIntentDto,
} from 'ez-utils';
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
    createPaymentIntentPayloadDto: CreatePaymentIntentPayloadDto,
    traceId: string,
  ): Promise<PaymentIntentCreatedDto> {
    const { originalAmount, currency } = await this.calculateAmounts(
      createPaymentIntentPayloadDto.items,
    );
    this.logger.info(
      `Calculated originalAmount=${originalAmount}, currency=${currency}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    const appliedCoupons: any[] = [];
    this.logger.info(
      `Initialized appliedCoupons=[]`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    const totalAmount = originalAmount;
    this.logger.info(
      `Set totalAmount=${totalAmount}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    const customerEmail =
      createPaymentIntentPayloadDto.customerDetails?.email;
    const existing = await this.stripeGateway.findCustomerByEmail(customerEmail);
    this.logger.info(
      `Found existing customer: ${existing?.id || 'none'}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    let newCustomerCreated = false;

    const customer =
      existing ??
      (await this.stripeGateway.createCustomer({
        name: `${createPaymentIntentPayloadDto.customerDetails.firstName} ${createPaymentIntentPayloadDto.customerDetails.lastName}`,
        email: createPaymentIntentPayloadDto.customerDetails.email,
        address: {
          line1: createPaymentIntentPayloadDto.customerDetails.address.street,
          city: createPaymentIntentPayloadDto.customerDetails.address.city,
          state: createPaymentIntentPayloadDto.customerDetails.address.state,
          postal_code:
            createPaymentIntentPayloadDto.customerDetails.address.zip,
          country:
            createPaymentIntentPayloadDto.customerDetails.address.country,
        },
        metadata: { source: 'my-backend' },
      }));
    this.logger.info(
      `Customer object: ${customer.id}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    if (!existing) {
      newCustomerCreated = true;
      this.logger.info(
        `newCustomerCreated set to true`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );
    }

    if (
      newCustomerCreated &&
      createPaymentIntentPayloadDto.customerDetails.email
    ) {
      const contactPayload = {
        firstName:
          createPaymentIntentPayloadDto.customerDetails.firstName || 'UNKNOWN',
        lastName:
          createPaymentIntentPayloadDto.customerDetails.lastName || 'UNKNOWN',
        email: createPaymentIntentPayloadDto.customerDetails.email,
        traceId,
      };
      this.logger.info(
        `About to send Kafka message to ${KT_CREATE_CONTACT} | payload: ${JSON.stringify(contactPayload)}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_CREATE_CONTACT,
        encodeKafkaMessage(PaymentIntentService.name, contactPayload),
      );
      this.logger.info(
        `Kafka message produced to ${KT_CREATE_CONTACT}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

      this.logger.info(
        `Kafka message sent to ${KT_CREATE_CONTACT} | payload: ${JSON.stringify(contactPayload)}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );
    }

    let entity = this.paymentRepo.create({
      amountCents: originalAmount,
      currency,
      externalId: uuid(),
      customerExternalId: customer.id,
      status: 'REQUIRES_PAYMENT_METHOD',
      metadata: { itemsCount: createPaymentIntentPayloadDto.items.length },
    });
    this.logger.info(
      `Payment entity created: ${JSON.stringify(entity)}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    entity = await this.paymentRepo.save(entity);
    this.logger.info(
      `Entity saved with paymentIntentId=${entity.paymentIntentId}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

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
    this.logger.info(
      `Attempt created: attemptId=${attempt.attemptId}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    let clientSecret: string | undefined;

    try {
      const stripeIntent = await this.stripeGateway.createPaymentIntent(
        {
          amount: originalAmount,
          currency,
          customer: customer.id,
          capture_method: 'manual',
          automatic_payment_methods: { enabled: true },
          metadata: { localId: entity.paymentIntentId },
          receipt_email:
            createPaymentIntentPayloadDto?.customerDetails?.email || null,
        },
        { idempotencyKey: createPaymentIntentPayloadDto.idempotencyKey },
      );
      this.logger.info(
        `Stripe createPaymentIntent response: ${JSON.stringify(stripeIntent)}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

      clientSecret = stripeIntent.client_secret || undefined;
      this.logger.info(
        `Extracted clientSecret`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

      entity.externalId = stripeIntent.id;
      entity.status = mapStripeIntentStatus(stripeIntent.status) as any;

      await this.paymentRepo.save(entity);
      this.logger.info(
        `Entity updated with externalId=${entity.externalId}, status=${entity.status}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

      await this.attemptRepo.update(attempt.attemptId, {
        status: 'SUCCESS',
        gatewayResponse: stripeIntent as any,
      });
      this.logger.info(
        `Attempt updated to SUCCESS`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );

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
        this.logger.info(
          `Entity nextRetryAt set and saved`,
          traceId,
          'createPaymentIntent',
          LogStreamLevel.DebugLight,
        );
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
      this.logger.error(
        `Attempt updated to FAILED with errorCode=${(error as any)?.code}`,
        traceId,
        'createPaymentIntent',
        LogStreamLevel.DebugLight,
      );
    }

    await this.ztrackingPaymentIntentService.createZtrackingForPaymentIntent(
      entity,
      traceId,
    );
    this.logger.info(
      `Ztracking created for paymentIntentId=${entity.paymentIntentId}`,
      traceId,
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );

    return {
      success: true,
      clientSecret: clientSecret!,
      paymentIntentId: entity.paymentIntentId,
      appliedCoupons: appliedCoupons as any,
      totalAmount,
      originalAmount,
      amountUnit: this.getAmountUnit(currency),
    } as PaymentIntentCreatedDto;
  }

  async confirmPaymentIntent(
    confirmPaymentIntentDto: ConfirmPaymentIntentDto,
    traceId: string,
  ): Promise<ConfirmedPaymentIntentDto> {
    const {
      paymentIntentId,
      paymentMethodId,
      receiptEmail,
      returnUrl,
      setupFutureUsage,
      shipping,
    } = confirmPaymentIntentDto;
    const intent = await this.paymentRepo.findOne({
      where: { paymentIntentId },
    });

    if (!intent) {
      this.logger.error(
        `PaymentIntent not found => ${paymentIntentId}`,
        traceId,
        'confirmPaymentIntent',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException('PaymentIntent not found');
    }

    if (['SUCCEEDED', 'CANCELED'].includes(intent.status)) {
      throw new BadRequestException(
        `Cannot confirm intent in status ${intent.status}`,
      );
    }
    const attempt = await this.attemptRepo.save(
      this.attemptRepo.create({
        paymentIntentId: intent.paymentIntentId,
        attemptNumber:
          (await this.attemptRepo.count({
            where: { paymentIntentId: intent.paymentIntentId },
          })) + 1,
        status: 'PENDING',
      }),
    );

    let stripeIntent: Stripe.PaymentIntent;
    try {
      stripeIntent = await this.stripeGateway.confirmPaymentIntent(
        intent.externalId,
        {
          payment_method: paymentMethodId,
          receipt_email: receiptEmail,
          return_url: returnUrl,
          setup_future_usage: setupFutureUsage,
          shipping:
            shipping as unknown as Stripe.PaymentIntentConfirmParams['shipping'],
        },
        { idempotencyKey: attempt.attemptId },
      );
    } catch (err) {
      await this.attemptRepo.update(attempt.attemptId, {
        status: 'FAILED',
        errorCode: (err as any)?.code,
        errorMessage: (err as any)?.message,
        gatewayResponse: err as any,
      });
      throw err;
    }

    intent.status = mapStripeIntentStatus(stripeIntent.status) as any;
    await this.paymentRepo.save(intent);

    await this.attemptRepo.update(attempt.attemptId, {
      status: 'SUCCESS',
      gatewayResponse: stripeIntent as any,
    });

    return {
      success: true,
      paymentIntentId: intent.paymentIntentId,
      status: intent.status as any,
      clientSecret: stripeIntent.client_secret,
      requiresAction: stripeIntent.status === 'requires_action',
      nextAction:
        stripeIntent.next_action as unknown as PaymentIntentNextAction,
    };
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

  async getPaymentIntentStatus(
    getPaymentIntentStatusDto: GetPaymentIntentStatusDto,
    traceId: string,
  ): Promise<PaymentStatusUpdateDto> {
    const intent = await this.paymentRepo.findOne({
      where: { paymentIntentId: getPaymentIntentStatusDto.paymentIntentId },
    });
    if (!intent) {
      this.logger.warn(
        `PaymentIntent not found => ${getPaymentIntentStatusDto.paymentIntentId}`,
        traceId,
        'getPaymentIntentStatus',
        LogStreamLevel.DebugLight,
      );
      throw new Error('PaymentIntent not found');
    }

    const stripeIntent = await this.stripeGateway.retrievePaymentIntent(
      intent.externalId,
    );

    const map: Record<string, 'processing' | 'succeeded' | 'failed'> = {
      processing: 'processing',
      succeeded: 'succeeded',
      canceled: 'failed',
      requires_payment_method: 'failed',
      requires_confirmation: 'processing',
      requires_action: 'processing',
    };

    return {
      paymentIntentId: intent.paymentIntentId,
      customerEmail: stripeIntent.receipt_email || '',
      status: map[stripeIntent.status] || 'processing',
    } as PaymentStatusUpdateDto;
  }

  async updatePaymentStatus(
    paymentStatusUpdateDto: PaymentStatusUpdateDto,
    traceId: string,
  ): Promise<PaymentStatusUpdateDto> {
    const intent = await this.paymentRepo.findOne({
      where: { paymentIntentId: paymentStatusUpdateDto.paymentIntentId },
    });
    if (!intent) {
      this.logger.warn(
        `PaymentIntent not found => ${paymentStatusUpdateDto.paymentIntentId}`,
        traceId,
        'updatePaymentStatus',
        LogStreamLevel.DebugLight,
      );
      throw new NotFoundException('PaymentIntent not found');
    }

    const map: Record<string, PaymentIntent['status']> = {
      processing: 'PROCESSING',
      succeeded: 'SUCCEEDED',
      failed: 'FAILED',
    };

    intent.status = map[paymentStatusUpdateDto.status] || intent.status;
    await this.paymentRepo.save(intent);

    return paymentStatusUpdateDto;
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

      // await new EzKafkaProducer().produce(
      //   process.env.KAFKA_BROKER as string,
      //   KT_CREATED_REFUND,
      //   encodeKafkaMessage(PaymentIntentService.name, {
      //     refundId: refundEntity.refundId,
      //     paymentIntentId: refundEntity.paymentIntentId,
      //     amountCents: refundEntity.amountCents,
      //     traceId,
      //   }),
      // );

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
      // await new EzKafkaProducer().produce(
      //   process.env.KAFKA_BROKER as string,
      //   KT_FAILED_REFUND,
      //   encodeKafkaMessage(PaymentIntentService.name, {
      //     refundId: refundEntity.refundId,
      //     paymentIntentId: refundEntity.paymentIntentId,
      //     errorCode: (error as any)?.code,
      //     traceId,
      //   }),
      // );
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

  async capturePaymentIntent(
    capturePaymentIntentDto: CapturePaymentIntentDto,
    traceId: string,
  ): Promise<{ attemptId: string; nextRetryAt?: Date }> {
    const { paymentIntentId } = capturePaymentIntentDto;
    const intent = await this.paymentRepo.findOne({
      where: { paymentIntentId },
    });

    if (!intent) {
      this.logger.error(
        `PaymentIntent not found => ${paymentIntentId}`,
        traceId,
        'capturePaymentIntent',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error('PaymentIntent not found');
    }

    const attempt = await this.attemptRepo.save(
      this.attemptRepo.create({
        paymentIntentId: intent.paymentIntentId,
        attemptNumber:
          (await this.attemptRepo.count({
            where: { paymentIntentId: intent.paymentIntentId },
          })) + 1,
        status: 'PENDING',
      }),
    );

    try {
      await this.confirmPaymentIntent(
        { paymentIntentId } as unknown as ConfirmPaymentIntentDto,
        traceId,
      );
      const stripeIntent = await this.stripeGateway.capturePaymentIntent(
        intent.externalId,
      );

      intent.status = mapStripeIntentStatus(stripeIntent.status) as any;
      intent.nextRetryAt = null;
      await this.paymentRepo.save(intent);

      await this.attemptRepo.update(attempt.attemptId, {
        status: 'SUCCESS',
        gatewayResponse: stripeIntent as any,
      });

      // Inactive: requires evaluation before implementation
      // await new EzKafkaProducer().produce(
      //   process.env.KAFKA_BROKER as string,
      //   KT_SUCCEEDED_PAYMENT,
      //   encodeKafkaMessage(PaymentIntentService.name, {
      //     paymentIntentId: intent.paymentIntentId,
      //     orderId: intent.orderId,
      //     subscriptionId: intent.subscriptionId,
      //     traceId,
      //   }),
      // );
    } catch (error) {
      intent.nextRetryAt = new Date(Date.now() + 5 * 60 * 1000);
      await this.paymentRepo.save(intent);
      await this.attemptRepo.update(attempt.attemptId, {
        status: 'FAILED',
        errorCode: (error as any)?.code,
        errorMessage: (error as any)?.message,
        gatewayResponse: error as any,
      });
      // Inactive: requires evaluation before implementation
      // await new EzKafkaProducer().produce(
      //   process.env.KAFKA_BROKER as string,
      //   KT_FAILED_PAYMENT,
      //   encodeKafkaMessage(PaymentIntentService.name, {
      //     paymentIntentId: intent.paymentIntentId,
      //     orderId: intent.orderId,
      //     subscriptionId: intent.subscriptionId,
      //     errorCode: (error as any)?.code,
      //     errorMessage: (error as any)?.message,
      //     traceId,
      //   }),
      // );
    }

    await this.ztrackingPaymentIntentService.createZtrackingForPaymentIntent(
      intent,
      traceId,
    );

    return { attemptId: attempt.attemptId, nextRetryAt: intent.nextRetryAt };
  }

  async retryPaymentAttempt(
    retryPaymentAttemptDto: RetryPaymentAttemptDto,
    traceId: string,
  ): Promise<{ attemptId: string; nextRetryAt?: Date }> {
    const { attemptId } = retryPaymentAttemptDto;
    const attempt = await this.attemptRepo.findOne({ where: { attemptId } });
    if (!attempt) {
      this.logger.error(
        `PaymentAttempt not found => ${attemptId}`,
        traceId,
        'retryPaymentAttempt',
        LogStreamLevel.DebugHeavy,
      );
      throw new Error('PaymentAttempt not found');
    }
    return this.capturePaymentIntent(
      { paymentIntentId: attempt.paymentIntentId },
      traceId,
    );
  }

  async handleStripeWebhook(
    stripeWebhookDto: StripeWebhookDto,
    traceId: string,
  ): Promise<void> {
    const { payload, signature } = stripeWebhookDto;
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
      if (event.type.startsWith('payment_intent.')) {
        const pi = event.data.object as Stripe.PaymentIntent;
        const status = event?.type?.replace('payment_intent.', '') as any;
        const internal = mapStripeIntentStatus(status);
        await this.paymentRepo.update(
          { externalId: pi.id },
          { status: internal as any },
        );
        const updated = await this.paymentRepo.findOne({
          where: { externalId: pi.id },
        });
        if (updated && internal === 'SUCCEEDED') {
          // Inactive: requires evaluation before implementation
          // await new EzKafkaProducer().produce(
          //   process.env.KAFKA_BROKER as string,
          //   KT_SUCCEEDED_PAYMENT,
          //   encodeKafkaMessage(PaymentIntentService.name, {
          //     paymentIntentId: updated.paymentIntentId,
          //     orderId: updated.orderId,
          //     subscriptionId: updated.subscriptionId,
          //     traceId,
          //   }),
          // );
        }
        if (updated && internal === 'FAILED') {
          const err = (pi as any).last_payment_error;
          this.logger.error(
            `Stripe payment failed => ${JSON.stringify(err)}`,
            traceId,
            'handleStripeWebhook',
            LogStreamLevel.DebugHeavy,
          );
          // Inactive: requires evaluation before implementation
          // await new EzKafkaProducer().produce(
          //   process.env.KAFKA_BROKER as string,
          //   KT_FAILED_PAYMENT,
          //   encodeKafkaMessage(PaymentIntentService.name, {
          //     paymentIntentId: updated.paymentIntentId,
          //     orderId: updated.orderId,
          //     subscriptionId: updated.subscriptionId,
          //     errorCode: err?.code,
          //     errorMessage: err?.message,
          //     traceId,
          //   }),
          // );
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
            // await new EzKafkaProducer().produce(
            //   process.env.KAFKA_BROKER as string,
            //   KT_REFUND_SUCCEEDED_PAYMENT,
            //   encodeKafkaMessage(PaymentIntentService.name, {
            //     refundId: updatedRefund.refundId,
            //     paymentIntentId: updatedRefund.paymentIntentId,
            //     traceId,
            //   }),
            // );
          }
        }
      }

      if (event.type === 'checkout.session.completed') {
        const session: any = event.data.object;
        const discount = session.discounts?.[0];
        const couponId = discount?.coupon?.id || discount?.coupon;
        const promotionId = discount?.promotion_code || discount?.promotionCode;
        if (discount && (couponId || promotionId)) {
          let orderId: string | undefined;
          if (session.payment_intent) {
            const intent = await this.paymentRepo.findOne({
              where: { externalId: session.payment_intent as string },
            });
            orderId = intent?.orderId;
          }
          this.logger.debug(
            `Checkout session completed for order ${orderId}`,
            traceId,
            'handleStripeWebhook',
            LogStreamLevel.DebugLight,
          );
          // await new EzKafkaProducer().produce(
          //   process.env.KAFKA_BROKER as string,
          //   KT_USED_COUPON,
          //   encodeKafkaMessage(PaymentIntentService.name, {
          //     couponId: couponId || promotionId,
          //     orderId,
          //     customerId: session.customer as string,
          //     traceId,
          //   }),
          // );
        }
      }

      if (
        event.type === 'coupon.updated' ||
        event.type === 'promotion_code.updated'
      ) {
        const obj: any = event.data.object;
        const times = obj.times_redeemed;
        const max = obj.max_redemptions;
        if (max && times >= max) {
          // await new EzKafkaProducer().produce(
          //   process.env.KAFKA_BROKER as string,
          //   KT_LIMIT_REACHED_COUPON,
          //   encodeKafkaMessage(PaymentIntentService.name, {
          //     couponId: obj.id,
          //     traceId,
          //   }),
          // );
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

  private async calculateAmounts(
    items: CreatePaymentIntentPayloadDto['items'],
  ): Promise<{ originalAmount: number; currency: string }> {
    let currency: string | undefined;
    let originalAmount = 0;

    for (const item of items) {
      if (typeof item.priceCents !== 'number' || !item.currency) {
        throw new Error(`Missing price or currency on item ${item.id}`);
      }
      if (!currency) currency = item.currency;
      if (item.currency !== currency) {
        throw new Error('Mixed currencies are not allowed in a PaymentIntent');
      }
      originalAmount += item.priceCents * item.quantity;
    }
    return { originalAmount, currency: currency! };
  }

  private getAmountUnit(currency: string): string {
    const units: Record<string, string> = {
      jpy: 'yen',
      usd: 'cents',
      eur: 'cents',
      gbp: 'pence',
    };
    return units[currency.toLowerCase()] || 'cents';
  }
}
