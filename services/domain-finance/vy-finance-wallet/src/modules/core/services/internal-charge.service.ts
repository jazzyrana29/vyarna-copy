import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalCharge } from '../../../entities/internal_charge.entity';
import { LedgerService } from './ledger.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { encodeKafkaMessage, CreateInternalChargeDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class InternalChargeService {
  private logger = getLoggerConfig(InternalChargeService.name);

  constructor(
    @InjectRepository(InternalCharge)
    private readonly chargeRepo: Repository<InternalCharge>,
    private readonly ledgerService: LedgerService,
  ) {
    this.logger.debug(
      `${InternalChargeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createCharge(
    createChargeDto: CreateInternalChargeDto,
    traceId: string,
  ): Promise<InternalCharge> {
    let charge: InternalCharge;
    await this.chargeRepo.manager.transaction(async (manager) => {
      charge = await manager.save(
        manager.create(InternalCharge, {
          ...createChargeDto,
          chargeTime: new Date(),
        }),
      );
      await this.ledgerService.recordTransaction(
        {
          accountId: createChargeDto.accountId,
          amountCents: -createChargeDto.amountCents,
          transactionType: 'ADJUSTMENT',
          relatedType: 'INTERNAL_CHARGE',
          relatedId: charge.chargeId,
          description: createChargeDto.description,
        },
        traceId,
      );
    });
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      'InternalChargeCreated',
      encodeKafkaMessage(InternalChargeService.name, { chargeId: charge!.chargeId, traceId }),
    );
    this.logger.info('Internal charge created', traceId, 'createCharge', LogStreamLevel.ProdStandard);
    return charge!;
  }
}
