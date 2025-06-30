import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../entities/evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../entities/ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './services/evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService } from './services/evaluation-variable-is-grouped-through-evaluation-variable-collection-kafka.service';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './services/ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionController } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    ]),
  ],
  controllers: [
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionController,
  ],
  providers: [
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService,
    ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
  ],
})
export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule {
  private logger = getLoggerConfig(
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule.name,
  );

  constructor() {
    this.logger.debug(
      `${EvaluationVariableIsGroupedThroughEvaluationVariableCollectionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
