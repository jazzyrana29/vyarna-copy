import { Injectable } from '@nestjs/common';
import { KafkaMessageResponderService,
  KT_RECORD_TRANSACTION,
  KT_SCHEDULE_PROVIDER_PAYOUT,
  KT_PAY_PROVIDER_PAYOUT,
  KT_ISSUE_CONSUMER_REWARD,
  KT_REDEEM_CONSUMER_REWARD,
  KT_CREATE_AFFILIATE_COMMISSION,
  KT_CREATE_INTERNAL_CHARGE } from 'ez-utils';
import { LedgerService } from './ledger.service';
import { ProviderPayoutService } from './provider-payout.service';
import { ConsumerRewardService } from './consumer-reward.service';
import { AffiliateCommissionService } from './affiliate-commission.service';
import { InternalChargeService } from './internal-charge.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletOperationsKafkaService {
  public serviceName = WalletOperationsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly ledgerService: LedgerService,
    private readonly payoutService: ProviderPayoutService,
    private readonly rewardService: ConsumerRewardService,
    private readonly commissionService: AffiliateCommissionService,
    private readonly chargeService: InternalChargeService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(
      `${WalletOperationsKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async recordTransaction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RECORD_TRANSACTION,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.ledgerService.recordTransaction(value, traceId),
    );
  }

  async schedulePayout(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_SCHEDULE_PROVIDER_PAYOUT,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.payoutService.schedulePayout(value, traceId),
    );
  }

  async payPayout(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PAY_PROVIDER_PAYOUT,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.payoutService.markPayoutPaid(value.payoutId, traceId),
    );
  }

  async issueReward(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ISSUE_CONSUMER_REWARD,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.rewardService.issueReward(value, traceId),
    );
  }

  async redeemReward(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REDEEM_CONSUMER_REWARD,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.rewardService.redeemReward(value.rewardId, traceId),
    );
  }

  async createCommission(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_AFFILIATE_COMMISSION,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.commissionService.createCommission(value, traceId),
    );
  }

  async createCharge(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_INTERNAL_CHARGE,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.chargeService.createCharge(value, traceId),
    );
  }
}
