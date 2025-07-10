import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesCommerceKafkaService } from './microservices/vy-commerce-kafka.service';
import { SalesCommerceWebsocket } from './vy-commerce.gateway';
import { SalesCommerceController } from './vy-commerce.controller';
import { SalesCommerceResponseController } from './vy-commerce-response.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesCommerceResponseController, SalesCommerceController],
  providers: [SalesCommerceWebsocket, SalesCommerceKafkaService],
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
