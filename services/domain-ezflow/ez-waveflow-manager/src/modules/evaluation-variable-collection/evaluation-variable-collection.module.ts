import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollection } from '../../entities/evaluation-variable-collection.entity';
import { ZtrackingEvaluationVariableCollection } from '../../entities/ztracking-evaluation-variable-collection.entity';

import { EvaluationVariableCollectionController } from './evaluation-variable-collection.controller';
import { EvaluationVariableCollectionService } from './services/evaluation-variable-collection.service';
import { EvaluationVariableCollectionKafkaService } from './services/evaluation-variable-collection-kafka.service';
import { ZtrackingEvaluationVariableCollectionService } from './services/ztracking-evaluation-variable-collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluationVariableCollection,
      ZtrackingEvaluationVariableCollection,
    ]),
  ],
  controllers: [EvaluationVariableCollectionController],
  providers: [
    EvaluationVariableCollectionService,
    EvaluationVariableCollectionKafkaService,
    ZtrackingEvaluationVariableCollectionService,
  ],
})
export class EvaluationVariableCollectionModule {
  private logger = getLoggerConfig(EvaluationVariableCollectionModule.name);

  constructor() {
    this.logger.debug(
      `${EvaluationVariableCollectionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
