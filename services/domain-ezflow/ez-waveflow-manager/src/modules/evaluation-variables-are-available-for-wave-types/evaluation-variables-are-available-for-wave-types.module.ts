import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariablesAreAvailableForWaveTypes } from '../../entities/evaluation-variables-are-available-for-wave-types.entity';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypes } from '../../entities/ztracking-evaluation-variables-are-available-for-wave-types.entity';

import { EvaluationVariablesAreAvailableForWaveTypesService } from './services/evaluation-variables-are-available-for-wave-types.service';
import { EvaluationVariablesAreAvailableForWaveTypesKafkaService } from './services/evaluation-variables-are-available-for-wave-types-kafka.service';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './services/ztracking-evaluation-variables-are-available-for-wave-types.service';

import { EvaluationVariablesAreAvailableForWaveTypesController } from './evaluation-variables-are-available-for-wave-types.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluationVariablesAreAvailableForWaveTypes,
      ZtrackingEvaluationVariablesAreAvailableForWaveTypes,
    ]),
  ],
  controllers: [EvaluationVariablesAreAvailableForWaveTypesController],
  providers: [
    EvaluationVariablesAreAvailableForWaveTypesService,
    EvaluationVariablesAreAvailableForWaveTypesKafkaService,
    ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
  ],
})
export class EvaluationVariablesAreAvailableForWaveTypesModule {
  private logger = getLoggerConfig(
    EvaluationVariablesAreAvailableForWaveTypesModule.name,
  );

  constructor() {
    this.logger.debug(
      `${EvaluationVariablesAreAvailableForWaveTypesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
