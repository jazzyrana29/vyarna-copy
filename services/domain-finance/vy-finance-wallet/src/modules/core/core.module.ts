import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAccount } from '../../entities/wallet_account.entity';
import { ZtrackingWalletAccount } from '../../entities/ztracking_wallet_account.entity';
import { WalletAccountService } from './services/wallet-account.service';
import { WalletAccountKafkaService } from './services/wallet-account-kafka.service';
import { ZtrackingWalletAccountService } from './services/ztracking-wallet-account.service';
import { WalletController } from './wallet.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAccount, ZtrackingWalletAccount])],
  controllers: [WalletController],
  providers: [WalletAccountService, WalletAccountKafkaService, ZtrackingWalletAccountService],
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
