import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../../entities/payment_intent.entity';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import {
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  PaymentIntentDto,
  ZtrackingPaymentIntentDto,
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
      status: 'REQUIRES_PAYMENT_METHOD',
    });
    await this.paymentRepo.save(entity);
    this.logger.info(
      'PaymentIntent created',
      traceId,
      'createPaymentIntent',
      LogStreamLevel.ProdStandard,
    );

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
}
