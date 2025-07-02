import { Module } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { SystemMechanismKafkaService } from '../../../modules/operator-permissions/system-mechanism/microservices/system-mechanism-kafka.service';

import { SystemMechanismResponseController } from './system-mechanism-response.controller';

import { SystemMechanismController } from '../../../modules/operator-permissions/system-mechanism/system-mechanism.controller';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [SystemMechanismController, SystemMechanismResponseController],
  providers: [SystemMechanismKafkaService],
})
export class SystemMechanismModule {
  private logger = getLoggerConfig(SystemMechanismModule.name);

  constructor() {
    this.logger.debug(
      `${SystemMechanismModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
