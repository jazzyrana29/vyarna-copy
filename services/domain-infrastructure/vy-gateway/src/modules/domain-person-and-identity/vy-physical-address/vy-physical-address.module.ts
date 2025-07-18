import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonPhysicalAddressWebsocket } from './vy-physical-address.gateway';
import { PersonPhysicalAddressKafkaService } from './microservices/vy-physical-address-kafka.service';
import { PersonPhysicalAddressResponseController } from './vy-physical-address-response.controller';
import { PersonPhysicalAddressController } from './vy-physical-address.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [
    PersonPhysicalAddressResponseController,
    PersonPhysicalAddressController,
  ],
  providers: [
    PersonPhysicalAddressWebsocket,
    PersonPhysicalAddressKafkaService,
  ],
  exports: [PersonPhysicalAddressKafkaService],
})
export class PersonPhysicalAddressModule {
  private logger = getLoggerConfig(PersonPhysicalAddressModule.name);
  constructor() {
    this.logger.debug(
      `${PersonPhysicalAddressModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
