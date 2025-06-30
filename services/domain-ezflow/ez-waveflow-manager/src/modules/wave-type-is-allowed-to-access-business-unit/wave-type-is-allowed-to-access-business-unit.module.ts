import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeIsAllowedToAccessBusinessUnit } from '../../entities/wave-type-is-allowed-to-access-business-unit.entity';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnit } from '../../entities/ztracking-wave-type-is-allowed-to-access-business-unit.entity';

import { WaveTypeIsAllowedToAccessBusinessUnitService } from './services/wave-type-is-allowed-to-access-business-unit.service';
import { WaveTypeIsAllowedToAccessBusinessUnitKafkaService } from './services/wave-type-is-allowed-to-access-business-unit-kafka.service';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './services/ztracking-wave-type-is-allowed-to-access-business-unit.service';

import { WaveTypeIsAllowedToAccessBusinessUnitController } from './wave-type-is-allowed-to-access-business-unit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WaveTypeIsAllowedToAccessBusinessUnit,
      ZtrackingWaveTypeIsAllowedToAccessBusinessUnit,
    ]),
  ],
  controllers: [WaveTypeIsAllowedToAccessBusinessUnitController],
  providers: [
    WaveTypeIsAllowedToAccessBusinessUnitService,
    WaveTypeIsAllowedToAccessBusinessUnitKafkaService,
    ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
  ],
})
export class WaveTypeIsAllowedToAccessBusinessUnitModule {
  private logger = getLoggerConfig(
    WaveTypeIsAllowedToAccessBusinessUnitModule.name,
  );

  constructor() {
    this.logger.debug(
      `${WaveTypeIsAllowedToAccessBusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
