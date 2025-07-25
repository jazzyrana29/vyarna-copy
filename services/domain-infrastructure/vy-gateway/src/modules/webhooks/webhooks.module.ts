import { Module } from '@nestjs/common';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeWebhookResponseController } from './stripe-webhook-response.controller';
import { WebhooksKafkaService } from './microservices/webhooks-kafka.service';
import { FinancePaymentsModule } from '../domain-finance/vy-finance-payments/vy-finance-payments.module';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule, FinancePaymentsModule],
  controllers: [StripeWebhookController, StripeWebhookResponseController],
  providers: [WebhooksKafkaService],
})
export class WebhooksModule {
  private logger = getLoggerConfig(WebhooksModule.name);

  constructor() {
    this.logger.debug(
      `${WebhooksModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
