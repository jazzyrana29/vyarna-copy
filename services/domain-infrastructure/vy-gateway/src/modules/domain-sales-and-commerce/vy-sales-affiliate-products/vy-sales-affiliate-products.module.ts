import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesAffiliateProductsKafkaService } from './microservices/vy-sales-affiliate-products-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [SalesAffiliateProductsKafkaService],
})
export class SalesAffiliateProductsModule {
  private logger = getLoggerConfig(SalesAffiliateProductsModule.name);

  constructor() {
    this.logger.debug(
      `${SalesAffiliateProductsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
