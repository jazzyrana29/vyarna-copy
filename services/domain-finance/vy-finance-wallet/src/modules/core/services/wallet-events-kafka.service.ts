import { Injectable } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { AffiliateCommissionService } from './affiliate-commission.service';
import {
  KafkaMessageResponderService,
  KT_PAID_ORDER,
  KT_RENEWED_SUBSCRIPTION,
  KT_REFUND_SUCCEEDED_WALLET,
  KT_CREATED_AFFILIATE_COMMISSION,
  RecordTransactionDto,
  CreateAffiliateCommissionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletEventsKafkaService {
  public serviceName = WalletEventsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly ledgerService: LedgerService,
    private readonly commissionService: AffiliateCommissionService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(
      `${WalletEventsKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async handleOrderPaid(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PAID_ORDER,
      message,
      key,
      async (value: RecordTransactionDto, traceId: string) =>
        await this.ledgerService.recordTransaction(value, traceId),
    );
  }

  async handleSubscriptionRenewed(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RENEWED_SUBSCRIPTION,
      message,
      key,
      async (value: RecordTransactionDto, traceId: string) =>
        await this.ledgerService.recordTransaction(value, traceId),
    );
  }

  async handleRefundSucceeded(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REFUND_SUCCEEDED_WALLET,
      message,
      key,
      async (value: RecordTransactionDto, traceId: string) =>
        await this.ledgerService.recordTransaction(value, traceId),
    );
  }

  async handleAffiliateCommissionCreated(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATED_AFFILIATE_COMMISSION,
      message,
      key,
      async (value: CreateAffiliateCommissionDto, traceId: string) =>
        await this.commissionService.createCommission(value, traceId),
    );
  }
}
