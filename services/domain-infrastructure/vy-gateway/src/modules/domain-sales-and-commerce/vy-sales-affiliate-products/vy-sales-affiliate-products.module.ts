import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesAffiliateProductsWebsocket } from './vy-sales-affiliate-products.gateway';
import { SalesAffiliateProductsKafkaService } from './microservices/vy-sales-affiliate-products-kafka.service';
import { SalesAffiliateProductsResponseController } from './vy-sales-affiliate-products-response.controller';
import { SalesAffiliateProductsController } from './vy-sales-affiliate-products.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesAffiliateProductsResponseController, SalesAffiliateProductsController],
  providers: [SalesAffiliateProductsWebsocket, SalesAffiliateProductsKafkaService],
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
