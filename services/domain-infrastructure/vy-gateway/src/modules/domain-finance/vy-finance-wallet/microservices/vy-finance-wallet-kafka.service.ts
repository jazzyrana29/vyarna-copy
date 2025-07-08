import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_WALLET_ACCOUNT,
  KT_SCHEDULE_PROVIDER_PAYOUT,
  KT_ISSUE_CONSUMER_REWARD,
  KT_CREATE_AFFILIATE_COMMISSION,
  KT_CREATE_INTERNAL_CHARGE,
  CreateWalletAccountDto,
  ScheduleProviderPayoutDto,
  IssueConsumerRewardDto,
  CreateAffiliateCommissionDto,
  CreateInternalChargeDto,
} from 'ez-utils';

@Injectable()
export class FinanceWalletKafkaService {
  private readonly serviceName = FinanceWalletKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWalletAccount(
    createWalletAccountDto: CreateWalletAccountDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_WALLET_ACCOUNT,
      createWalletAccountDto,
      traceId,
    );
  }

  async scheduleProviderPayout(
    scheduleProviderPayoutDto: ScheduleProviderPayoutDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SCHEDULE_PROVIDER_PAYOUT,
      scheduleProviderPayoutDto,
      traceId,
    );
  }

  async issueConsumerReward(
    issueConsumerRewardDto: IssueConsumerRewardDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_ISSUE_CONSUMER_REWARD,
      issueConsumerRewardDto,
      traceId,
    );
  }

  async createAffiliateCommission(
    createAffiliateCommissionDto: CreateAffiliateCommissionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_AFFILIATE_COMMISSION,
      createAffiliateCommissionDto,
      traceId,
    );
  }

  async createInternalCharge(
    createInternalChargeDto: CreateInternalChargeDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_INTERNAL_CHARGE,
      createInternalChargeDto,
      traceId,
    );
  }
}
