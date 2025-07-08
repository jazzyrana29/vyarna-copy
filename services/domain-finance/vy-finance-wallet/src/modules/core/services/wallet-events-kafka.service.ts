import { Injectable } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { AffiliateCommissionService } from './affiliate-commission.service';
import {
  KT_WALLET_ORDER_PAID,
  KT_WALLET_SUBSCRIPTION_RENEWED,
  KT_WALLET_REFUND_SUCCEEDED,
  KT_WALLET_AFFILIATE_COMMISSION_CREATED,
  RecordTransactionDto,
  CreateAffiliateCommissionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class WalletEventsKafkaService {
  public serviceName = WalletEventsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(
    private readonly ledgerService: LedgerService,
    private readonly commissionService: AffiliateCommissionService,
  ) {
    this.logger.debug(
      `${WalletEventsKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async handleOrderPaid(message: any, key: string): Promise<void> {
    const { traceId, ...payload } = message as RecordTransactionDto & {
      traceId: string;
    };
    await this.ledgerService.recordTransaction(
      payload as RecordTransactionDto,
      traceId,
    );
    this.logger.info(
      'Processed OrderPaid event',
      traceId,
      'handleOrderPaid',
      LogStreamLevel.DebugLight,
    );
  }

  async handleSubscriptionRenewed(message: any, key: string): Promise<void> {
    const { traceId, ...payload } = message as RecordTransactionDto & {
      traceId: string;
    };
    await this.ledgerService.recordTransaction(
      payload as RecordTransactionDto,
      traceId,
    );
    this.logger.info(
      'Processed SubscriptionRenewed event',
      traceId,
      'handleSubscriptionRenewed',
      LogStreamLevel.DebugLight,
    );
  }

  async handleRefundSucceeded(message: any, key: string): Promise<void> {
    const { traceId, ...payload } = message as RecordTransactionDto & {
      traceId: string;
    };
    await this.ledgerService.recordTransaction(
      payload as RecordTransactionDto,
      traceId,
    );
    this.logger.info(
      'Processed RefundSucceeded event',
      traceId,
      'handleRefundSucceeded',
      LogStreamLevel.DebugLight,
    );
  }

  async handleAffiliateCommissionCreated(message: any, key: string): Promise<void> {
    const { traceId, ...payload } = message as CreateAffiliateCommissionDto & {
      traceId: string;
    };
    await this.commissionService.createCommission(
      payload as CreateAffiliateCommissionDto,
      traceId,
    );
    this.logger.info(
      'Processed AffiliateCommissionCreated event',
      traceId,
      'handleAffiliateCommissionCreated',
      LogStreamLevel.DebugLight,
    );
  }
}
