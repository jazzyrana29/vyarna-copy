import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { FinancePaymentsWebsocket } from './vy-finance-payments.gateway';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import { FinancePaymentsResponseController } from './vy-finance-payments-response.controller';
import { FinancePaymentsController } from './vy-finance-payments.controller';
import { StripeWebhookController } from './stripe-webhook.controller';
import { FinancePaymentsEventsController } from './vy-finance-payments-events.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [
    FinancePaymentsResponseController,
    FinancePaymentsController,
    StripeWebhookController,
    FinancePaymentsEventsController,
  ],
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
