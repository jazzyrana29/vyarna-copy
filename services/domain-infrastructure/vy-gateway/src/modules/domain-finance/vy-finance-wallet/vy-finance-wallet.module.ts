import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { FinanceWalletWebsocket } from './vy-finance-wallet.gateway';
import { FinanceWalletKafkaService } from './microservices/vy-finance-wallet-kafka.service';
import { FinanceWalletResponseController } from './vy-finance-wallet-response.controller';
import { FinanceWalletController } from './vy-finance-wallet.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [FinanceWalletResponseController, FinanceWalletController],
  providers: [FinanceWalletWebsocket, FinanceWalletKafkaService],
})
export class FinanceWalletModule {
  private logger = getLoggerConfig(FinanceWalletModule.name);

  constructor() {
    this.logger.debug(
      `${FinanceWalletModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
