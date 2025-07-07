import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../../entities/payment_intent.entity';
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
    const entity = this.paymentRepo.create({
      ...createDto,
      externalId: '',
      status: 'REQUIRES_PAYMENT_METHOD',
    });
    await this.paymentRepo.save(entity);
    this.logger.info(
      'PaymentIntent created',
      traceId,
      'createPaymentIntent',
      LogStreamLevel.ProdStandard,
    );

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
}
