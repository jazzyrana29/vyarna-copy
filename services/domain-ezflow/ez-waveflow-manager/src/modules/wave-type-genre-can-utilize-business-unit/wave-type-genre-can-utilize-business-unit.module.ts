import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeGenreCanUtilizeBusinessUnit } from '../../entities/wave-type-genre-can-utilize-business-unit.entity';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnit } from '../../entities/ztracking-wave-type-genre-can-utilize-business-unit.entity';

import { WaveTypeGenreCanUtilizeBusinessUnitService } from './services/wave-type-genre-can-utilize-business-unit.service';
import { WaveTypeGenreCanUtilizeBusinessUnitKafkaService } from './services/wave-type-genre-can-utilize-business-unit-kafka.service';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './services/ztracking-wave-type-genre-can-utilize-business-unit.service';

import { WaveTypeGenreCanUtilizeBusinessUnitController } from './wave-type-genre-can-utilize-business-unit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WaveTypeGenreCanUtilizeBusinessUnit,
      ZtrackingWaveTypeGenreCanUtilizeBusinessUnit,
    ]),
  ],
  controllers: [WaveTypeGenreCanUtilizeBusinessUnitController],
  providers: [
    WaveTypeGenreCanUtilizeBusinessUnitService,
    WaveTypeGenreCanUtilizeBusinessUnitKafkaService,
    ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
  ],
})
export class WaveTypeGenreCanUtilizeBusinessUnitModule {
  private logger = getLoggerConfig(
    WaveTypeGenreCanUtilizeBusinessUnitModule.name,
  );

  constructor() {
    this.logger.debug(
      `${WaveTypeGenreCanUtilizeBusinessUnitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
