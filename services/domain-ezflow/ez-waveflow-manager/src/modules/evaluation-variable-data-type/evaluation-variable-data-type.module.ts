import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableDataType } from '../../entities/evaluation-variable-data-type.entity';

import { EvaluationVariableDataTypeService } from './services/evaluation-variable-data-type.service';
import { EvaluationVariableDataTypeKafkaService } from './services/evaluation-variable-data-type-kafka.service';

import { EvaluationVariableDataTypeController } from './evaluation-variable-data-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationVariableDataType])],
  controllers: [EvaluationVariableDataTypeController],
  providers: [
    EvaluationVariableDataTypeService,
    EvaluationVariableDataTypeKafkaService,
  ],
})
export class EvaluationVariableDataTypeModule {
  private logger = getLoggerConfig(EvaluationVariableDataTypeModule.name);

  constructor() {
    this.logger.debug(
      `${EvaluationVariableDataTypeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
