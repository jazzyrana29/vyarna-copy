import { Module } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

import { MechanismPermitKafkaService } from './microservices/mechanism-permit-kafka.service';

import { MechanismPermitController } from './mechanism-permit.controller';
import { MechanismPermitResponseController } from './mechanism-permit-response.controller';

@Module({
  imports: [KafkaModule],
  controllers: [MechanismPermitController, MechanismPermitResponseController],
  providers: [MechanismPermitKafkaService],
})
export class MechanismPermitModule {
  private logger = getLoggerConfig(MechanismPermitModule.name);

  constructor() {
    this.logger.debug(
      `${MechanismPermitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
