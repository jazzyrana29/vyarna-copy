import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesCommerceKafkaService } from './microservices/vy-sales-commerce-kafka.service';
import { SalesCommerceController } from './vy-sales-commerce.controller';
import { SalesCommerceResponseController } from './vy-sales-commerce-response.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesCommerceResponseController, SalesCommerceController],
  providers: [SalesCommerceKafkaService],
})
export class SalesCommerceModule {
  private logger = getLoggerConfig(SalesCommerceModule.name);

  constructor() {
    this.logger.debug(
      `${SalesCommerceModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
