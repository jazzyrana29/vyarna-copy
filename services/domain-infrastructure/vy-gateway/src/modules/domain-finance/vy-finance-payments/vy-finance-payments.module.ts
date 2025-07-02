import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import { FinancePaymentsResponseController } from './vy-finance-payments-response.controller';
import { FinancePaymentsController } from './vy-finance-payments.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [FinancePaymentsResponseController, FinancePaymentsController],
  providers: [FinancePaymentsWebsocket, FinancePaymentsKafkaService],
})
export class FinancePaymentsModule {
  private logger = getLoggerConfig(FinancePaymentsModule.name);

  constructor() {
    this.logger.debug(
      `${FinancePaymentsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
