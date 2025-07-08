import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAccount } from '../../entities/wallet_account.entity';
import { ZtrackingWalletAccount } from '../../entities/ztracking_wallet_account.entity';
import { LedgerTransaction } from '../../entities/ledger_transaction.entity';
import { ProviderPayout } from '../../entities/provider_payout.entity';
import { ConsumerReward } from '../../entities/consumer_reward.entity';
import { AffiliateCommission } from '../../entities/affiliate_commission.entity';
import { InternalCharge } from '../../entities/internal_charge.entity';
import { WalletAccountService } from './services/wallet-account.service';
import { WalletAccountKafkaService } from './services/wallet-account-kafka.service';
import { ZtrackingWalletAccountService } from './services/ztracking-wallet-account.service';
import { LedgerService } from './services/ledger.service';
import { ProviderPayoutService } from './services/provider-payout.service';
import { ConsumerRewardService } from './services/consumer-reward.service';
import { AffiliateCommissionService } from './services/affiliate-commission.service';
import { InternalChargeService } from './services/internal-charge.service';
import { WalletOperationsKafkaService } from './services/wallet-operations-kafka.service';
import { WalletController } from './wallet.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletAccount,
      ZtrackingWalletAccount,
      LedgerTransaction,
      ProviderPayout,
      ConsumerReward,
      AffiliateCommission,
      InternalCharge,
    ]),
  ],
  controllers: [WalletController],
  providers: [
    WalletAccountService,
    WalletAccountKafkaService,
    ZtrackingWalletAccountService,
    LedgerService,
    ProviderPayoutService,
    ConsumerRewardService,
    AffiliateCommissionService,
    InternalChargeService,
    WalletOperationsKafkaService,
  ],
})
export class CoreModule {
  private logger = getLoggerConfig(CoreModule.name);
  constructor() {
    this.logger.debug(
      `${CoreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
