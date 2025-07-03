import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesSubscriptionsWebsocket } from './vy-sales-subscriptions.gateway';
import { SalesSubscriptionsKafkaService } from './microservices/vy-sales-subscriptions-kafka.service';
import { SalesSubscriptionsResponseController } from './vy-sales-subscriptions-response.controller';
import { SalesSubscriptionsController } from './vy-sales-subscriptions.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesSubscriptionsResponseController, SalesSubscriptionsController],
  providers: [SalesSubscriptionsWebsocket, SalesSubscriptionsKafkaService],
})
export class SalesSubscriptionsModule {
  private logger = getLoggerConfig(SalesSubscriptionsModule.name);

  constructor() {
    this.logger.debug(
      `${SalesSubscriptionsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
