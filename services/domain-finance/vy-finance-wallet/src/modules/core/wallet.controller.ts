import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { WalletAccountKafkaService } from './services/wallet-account-kafka.service';
import { WalletOperationsKafkaService } from './services/wallet-operations-kafka.service';
import { WalletEventsKafkaService } from './services/wallet-events-kafka.service';
import {
  KT_CREATE_WALLET_ACCOUNT,
  KT_GET_WALLET_ACCOUNT,
  KT_GET_ZTRACKING_WALLET_ACCOUNT,
  KT_RECORD_TRANSACTION,
  KT_SCHEDULE_PROVIDER_PAYOUT,
  KT_PAY_PROVIDER_PAYOUT,
  KT_ISSUE_CONSUMER_REWARD,
  KT_REDEEM_CONSUMER_REWARD,
  KT_CREATE_AFFILIATE_COMMISSION,
  KT_CREATE_INTERNAL_CHARGE,
  KT_PAID_ORDER,
  KT_RENEWED_SUBSCRIPTION,
  KT_REFUND_SUCCEEDED_WALLET,
  KT_CREATED_AFFILIATE_COMMISSION,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('wallet')
export class WalletController {
  private logger = getLoggerConfig(WalletController.name);

  constructor(
    private readonly walletKafkaService: WalletAccountKafkaService,
    private readonly walletOpsKafkaService: WalletOperationsKafkaService,
    private readonly walletEventsKafkaService: WalletEventsKafkaService,
  ) {
    this.logger.debug(
      `${WalletController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WALLET_ACCOUNT)
  async createWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_WALLET_ACCOUNT}`,
      '',
      'createWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.createWalletAccount(message, key);
  }

  @MessagePattern(KT_GET_WALLET_ACCOUNT)
  async getWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_WALLET_ACCOUNT}`,
      '',
      'getWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.getWalletAccount(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_WALLET_ACCOUNT)
  async getZtrackingWalletAccount(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_WALLET_ACCOUNT}`,
      '',
      'getZtrackingWalletAccount',
      LogStreamLevel.DebugLight,
    );
    await this.walletKafkaService.getZtrackingWalletAccount(message, key);
  }

  @MessagePattern(KT_RECORD_TRANSACTION)
  async recordTransaction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_RECORD_TRANSACTION}`,
      '',
      'recordTransaction',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.recordTransaction(message, key);
  }

  @MessagePattern(KT_SCHEDULE_PROVIDER_PAYOUT)
  async scheduleProviderPayout(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_SCHEDULE_PROVIDER_PAYOUT}`,
      '',
      'scheduleProviderPayout',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.schedulePayout(message, key);
  }

  @MessagePattern(KT_PAY_PROVIDER_PAYOUT)
  async payProviderPayout(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PAY_PROVIDER_PAYOUT}`,
      '',
      'payProviderPayout',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.payPayout(message, key);
  }

  @MessagePattern(KT_ISSUE_CONSUMER_REWARD)
  async issueConsumerReward(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_ISSUE_CONSUMER_REWARD}`,
      '',
      'issueConsumerReward',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.issueReward(message, key);
  }

  @MessagePattern(KT_REDEEM_CONSUMER_REWARD)
  async redeemConsumerReward(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REDEEM_CONSUMER_REWARD}`,
      '',
      'redeemConsumerReward',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.redeemReward(message, key);
  }

  @MessagePattern(KT_CREATE_AFFILIATE_COMMISSION)
  async createAffiliateCommission(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_AFFILIATE_COMMISSION}`,
      '',
      'createAffiliateCommission',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.createCommission(message, key);
  }

  @MessagePattern(KT_CREATE_INTERNAL_CHARGE)
  async createInternalCharge(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_INTERNAL_CHARGE}`,
      '',
      'createInternalCharge',
      LogStreamLevel.DebugLight,
    );
    await this.walletOpsKafkaService.createCharge(message, key);
  }

  @MessagePattern(KT_PAID_ORDER)
  async handleOrderPaid(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Event consumed : ${KT_PAID_ORDER}`,
      '',
      'handleOrderPaid',
      LogStreamLevel.DebugLight,
    );
    await this.walletEventsKafkaService.handleOrderPaid(message, key);
  }

  @MessagePattern(KT_RENEWED_SUBSCRIPTION)
  async handleSubscriptionRenewed(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Event consumed : ${KT_RENEWED_SUBSCRIPTION}`,
      '',
      'handleSubscriptionRenewed',
      LogStreamLevel.DebugLight,
    );
    await this.walletEventsKafkaService.handleSubscriptionRenewed(message, key);
  }

  @MessagePattern(KT_REFUND_SUCCEEDED_WALLET)
  async handleRefundSucceeded(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Event consumed : ${KT_REFUND_SUCCEEDED_WALLET}`,
      '',
      'handleRefundSucceeded',
      LogStreamLevel.DebugLight,
    );
    await this.walletEventsKafkaService.handleRefundSucceeded(message, key);
  }

  @MessagePattern(KT_CREATED_AFFILIATE_COMMISSION)
  async handleAffiliateCommissionCreated(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Event consumed : ${KT_CREATED_AFFILIATE_COMMISSION}`,
      '',
      'handleAffiliateCommissionCreated',
      LogStreamLevel.DebugLight,
    );
    await this.walletEventsKafkaService.handleAffiliateCommissionCreated(
      message,
      key,
    );
  }
}
