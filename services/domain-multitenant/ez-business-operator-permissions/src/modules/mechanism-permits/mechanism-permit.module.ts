import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MechanismPermit } from '../../entities/mechanism-permit.entity';

import { MechanismPermitsController } from './mechanism-permit.controller';

import { MechanismPermitService } from './services/mechanism-permit.service';
import { MechanismPermitKafkaService } from './services/mechanism-permit-kafka.service';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Module({
  imports: [TypeOrmModule.forFeature([MechanismPermit])],
  controllers: [MechanismPermitsController],
  providers: [MechanismPermitService, MechanismPermitKafkaService],
})
export class MechanismPermitsModule {
  private logger = getLoggerConfig(MechanismPermitsModule.name);

  constructor() {
    this.logger.debug(
      `${MechanismPermitsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
