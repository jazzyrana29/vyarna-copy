import { Module } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { BusinessUnitKafkaService } from './microservices/business-unit-kafka.service';

import { BusinessUnitController } from './business-unit.controller';
import { BusinessUnitResponseController } from './business-unit-response.controller';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [BusinessUnitController, BusinessUnitResponseController],
  providers: [BusinessUnitKafkaService],
})
export class BusinessUnitModule {
  private logger = getLoggerConfig(BusinessUnitModule.name);

  constructor() {
    this.logger.debug(
      `${BusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
