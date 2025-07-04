import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentIntent } from '../../../entities/payment_intent.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PaymentIntentService {
  private logger = getLoggerConfig(PaymentIntentService.name);

  constructor(
    @InjectRepository(PaymentIntent)
    private readonly paymentRepo: Repository<PaymentIntent>,
  ) {
    this.logger.debug(
      `${PaymentIntentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(intent: Partial<PaymentIntent>, traceId: string): Promise<PaymentIntent> {
    const entity = this.paymentRepo.create(intent);
    await this.paymentRepo.save(entity);
    this.logger.info('PaymentIntent created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async findAll(traceId: string): Promise<PaymentIntent[]> {
    const list = await this.paymentRepo.find();
    this.logger.info(`Retrieved ${list.length} payment intents`, traceId, 'findAll', LogStreamLevel.DebugLight);
    return list;
  }
}
