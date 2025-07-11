import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesSubscriptionsKafkaService } from './microservices/vy-sales-subscriptions-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [SalesSubscriptionsKafkaService],
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
