import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariable } from '../../entities/evaluation-variable.entity';
import { ZtrackingEvaluationVariable } from '../../entities/ztracking-evaluation-variable.entity';

import { EvaluationVariableService } from './services/evaluation-variable.service';
import { EvaluationVariableKafkaService } from './services/evaluation-variable-kafka.service';
import { ZtrackingEvaluationVariableService } from './services/ztracking-evaluation-variable.service';

import { EvaluationVariableController } from './evaluation-variable.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationVariable, ZtrackingEvaluationVariable]),
  ],
  controllers: [EvaluationVariableController],
  providers: [
    EvaluationVariableService,
    EvaluationVariableKafkaService,
    ZtrackingEvaluationVariableService,
  ],
})
export class EvaluationVariableModule {
  private logger = getLoggerConfig(EvaluationVariableModule.name);

  constructor() {
    this.logger.debug(
      `${EvaluationVariableModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
