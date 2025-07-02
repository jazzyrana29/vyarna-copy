import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { SalesStoreWebsocket } from './vy-sales-store.gateway';
import { SalesStoreKafkaService } from './microservices/vy-sales-store-kafka.service';
import { SalesStoreResponseController } from './vy-sales-store-response.controller';
import { SalesStoreController } from './vy-sales-store.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SalesStoreResponseController, SalesStoreController],
  providers: [SalesStoreWebsocket, SalesStoreKafkaService],
})
export class SalesStoreModule {
  private logger = getLoggerConfig(SalesStoreModule.name);

  constructor() {
    this.logger.debug(
      `${SalesStoreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
