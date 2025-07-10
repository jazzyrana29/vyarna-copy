import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderPayout } from '../../../entities/provider_payout.entity';
import { LedgerService } from './ledger.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  encodeKafkaMessage,
  ScheduleProviderPayoutDto,
  KT_SCHEDULED_PROVIDER_PAYOUT,
  KT_PAID_PROVIDER_PAYOUT,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class ProviderPayoutService {
  private logger = getLoggerConfig(ProviderPayoutService.name);

  constructor(
    @InjectRepository(ProviderPayout)
    private readonly payoutRepo: Repository<ProviderPayout>,
    private readonly ledgerService: LedgerService,
  ) {
    this.logger.debug(
      `${ProviderPayoutService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async schedulePayout(
    schedulePayoutDto: ScheduleProviderPayoutDto,
    traceId: string,
  ): Promise<ProviderPayout> {
    const payout = await this.payoutRepo.save(
      this.payoutRepo.create({
        ...schedulePayoutDto,
        status: 'SCHEDULED',
        scheduledAt: new Date(),
      }),
    );
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_SCHEDULED_PROVIDER_PAYOUT,
      encodeKafkaMessage(ProviderPayoutService.name, { payoutId: payout.payoutId, traceId }),
    );
    this.logger.info('Provider payout scheduled', traceId, 'schedulePayout', LogStreamLevel.ProdStandard);
    return payout;
  }

  async markPayoutPaid(payoutId: string, traceId: string): Promise<void> {
    const payout = await this.payoutRepo.findOne({ where: { payoutId } });
    if (!payout) throw new Error('Payout not found');
    if (payout.status !== 'SCHEDULED') return;
    await this.payoutRepo.manager.transaction(async (manager) => {
      await manager.update(ProviderPayout, { payoutId }, { status: 'PAID', paidAt: new Date() });
      await this.ledgerService.recordTransaction(
        {
          accountId: payout.accountId,
          amountCents: -payout.amountCents,
          transactionType: 'PAYOUT',
          relatedType: 'PROVIDER_PAYOUT',
          relatedId: payout.payoutId,
          description: 'Provider payout',
        },
        traceId,
      );
    });
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_PAID_PROVIDER_PAYOUT,
      encodeKafkaMessage(ProviderPayoutService.name, { payoutId, traceId }),
    );
    this.logger.info('Provider payout paid', traceId, 'markPayoutPaid', LogStreamLevel.ProdStandard);
  }
}
