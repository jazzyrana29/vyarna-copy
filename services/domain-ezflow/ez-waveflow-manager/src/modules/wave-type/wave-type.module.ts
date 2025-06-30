import { Module } from '@nestjs/common';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WaveType } from '../../entities/wave-type.entity';

import { WaveTypeService } from './services/wave-type.service';
import { WaveTypeKafkaService } from './services/wave-type-kafka.service';

import { WaveTypeController } from './wave-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaveType])],
  providers: [WaveTypeKafkaService, WaveTypeService],
  controllers: [WaveTypeController],
})
export class WaveTypeModule {
  private logger = getLoggerConfig(WaveTypeModule.name);

  constructor() {
    this.logger.debug(
      `${WaveTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
