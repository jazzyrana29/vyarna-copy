import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { PaymentIntent } from '../../../entities/payment_intent.entity';
import { ZtrackingPaymentIntent } from '../../../entities/ztracking_payment_intent.entity';
import { GetZtrackingPaymentIntentDto, ZtrackingPaymentIntentDto } from 'ez-utils';

@Injectable()
export class ZtrackingPaymentIntentService {
  private logger = getLoggerConfig(ZtrackingPaymentIntentService.name);

  constructor(
    @InjectRepository(ZtrackingPaymentIntent)
    private readonly paymentIntentRepo: Repository<ZtrackingPaymentIntent>,
  ) {
    this.logger.debug(
      `${ZtrackingPaymentIntentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForPaymentIntent(
    intent: PaymentIntent,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.paymentIntentRepo.save(
      this.paymentIntentRepo.create({ ...intent, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking payment intent saved in database`,
      traceId,
      'createZtrackingForPaymentIntent',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForPaymentIntent(
    { paymentIntentId = '' }: GetZtrackingPaymentIntentDto,
    traceId: string,
  ): Promise<ZtrackingPaymentIntentDto[]> {
    const entities = await this.paymentIntentRepo.find({ where: { paymentIntentId } });

    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${paymentIntentId}`,
        traceId,
        'getZtrackingForPaymentIntent',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${paymentIntentId}`,
      );
    }

    this.logger.info(
      `${entities.length} ztracking payment intent found in database`,
      traceId,
      'getZtrackingForPaymentIntent',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
