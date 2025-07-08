import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsumerReward } from '../../../entities/consumer_reward.entity';
import { LedgerService } from './ledger.service';
import { EzKafkaProducer } from 'ez-kafka-producer';
import {
  encodeKafkaMessage,
  IssueConsumerRewardDto,
  KT_CONSUMER_REWARD_ISSUED,
  KT_CONSUMER_REWARD_REDEEMED,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class ConsumerRewardService {
  private logger = getLoggerConfig(ConsumerRewardService.name);

  constructor(
    @InjectRepository(ConsumerReward)
    private readonly rewardRepo: Repository<ConsumerReward>,
    private readonly ledgerService: LedgerService,
  ) {
    this.logger.debug(
      `${ConsumerRewardService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async issueReward(
    issueRewardDto: IssueConsumerRewardDto,
    traceId: string,
  ): Promise<ConsumerReward> {
    let reward: ConsumerReward;
    await this.rewardRepo.manager.transaction(async (manager) => {
      reward = await manager.save(
        manager.create(ConsumerReward, {
          ...issueRewardDto,
          status: 'ISSUED',
          issuedAt: new Date(),
        }),
      );
      await this.ledgerService.recordTransaction(
        {
          accountId: issueRewardDto.accountId,
          amountCents: issueRewardDto.amountCents,
          transactionType: 'REWARD',
          relatedType: 'CONSUMER_REWARD',
          relatedId: reward.rewardId,
          description: 'Reward issued',
        },
        traceId,
      );
    });
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_CONSUMER_REWARD_ISSUED,
      encodeKafkaMessage(ConsumerRewardService.name, { rewardId: reward!.rewardId, traceId }),
    );
    this.logger.info('Consumer reward issued', traceId, 'issueReward', LogStreamLevel.ProdStandard);
    return reward!;
  }

  async redeemReward(rewardId: string, traceId: string): Promise<void> {
    const reward = await this.rewardRepo.findOne({ where: { rewardId } });
    if (!reward) throw new Error('Reward not found');
    if (reward.status !== 'ISSUED') return;
    await this.rewardRepo.manager.transaction(async (manager) => {
      await manager.update(ConsumerReward, { rewardId }, { status: 'REDEEMED', redeemedAt: new Date() });
      await this.ledgerService.recordTransaction(
        {
          accountId: reward.accountId,
          amountCents: -reward.amountCents,
          transactionType: 'REWARD',
          relatedType: 'CONSUMER_REWARD',
          relatedId: reward.rewardId,
          description: 'Reward redeemed',
        },
        traceId,
      );
    });
    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_CONSUMER_REWARD_REDEEMED,
      encodeKafkaMessage(ConsumerRewardService.name, { rewardId, traceId }),
    );
    this.logger.info('Consumer reward redeemed', traceId, 'redeemReward', LogStreamLevel.ProdStandard);
  }
}
