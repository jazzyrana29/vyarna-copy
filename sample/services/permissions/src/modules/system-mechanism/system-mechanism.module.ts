import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemMechanism } from '../../entities/system-mechanism.entity';

import { SystemMechanismController } from './system-mechanism.controller';

import { SystemMechanismService } from './services/system-mechanism.service';
import { SystemMechanismKafkaService } from './services/system-mechanism-kafka.service';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Module({
  imports: [TypeOrmModule.forFeature([SystemMechanism])],
  controllers: [SystemMechanismController],
  providers: [SystemMechanismService, SystemMechanismKafkaService],
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
