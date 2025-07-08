import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliateCommission } from '../../../entities/affiliate_commission.entity';
import { LedgerService } from './ledger.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { encodeKafkaMessage, CreateAffiliateCommissionDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class AffiliateCommissionService {
  private logger = getLoggerConfig(AffiliateCommissionService.name);

  constructor(
    @InjectRepository(AffiliateCommission)
    private readonly commissionRepo: Repository<AffiliateCommission>,
    private readonly ledgerService: LedgerService,
  ) {
    this.logger.debug(
      `${AffiliateCommissionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createCommission(
    createCommissionDto: CreateAffiliateCommissionDto,
    traceId: string,
  ): Promise<AffiliateCommission> {
    let commission: AffiliateCommission;
    await this.commissionRepo.manager.transaction(async (manager) => {
      commission = await manager.save(
        manager.create(AffiliateCommission, {
          ...createCommissionDto,
          status: 'PENDING',
          earnedAt: new Date(),
        }),
      );
      await this.ledgerService.recordTransaction(
        {
          accountId: createCommissionDto.accountId,
          amountCents: createCommissionDto.amountCents,
          transactionType: 'COMMISSION',
          relatedType: 'AFFILIATE_COMMISSION',
          relatedId: commission.commissionId,
          description: 'Affiliate commission',
        },
        traceId,
      );
    });
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      'AffiliateCommissionCreated',
      encodeKafkaMessage(AffiliateCommissionService.name, { commissionId: commission!.commissionId, traceId }),
    );
    this.logger.info('Affiliate commission created', traceId, 'createCommission', LogStreamLevel.ProdStandard);
    return commission!;
  }
}
