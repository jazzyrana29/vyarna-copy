import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../entities/evaluation-variable-collections-are-presented-through-portfolios.entity';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../entities/ztracking-evaluation-variable-collections-are-presented-through-portfolios.entity';

import { EvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './services/evaluation-variable-collections-are-presented-through-portfolios.service';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService } from './services/evaluation-variable-collections-are-presented-through-portfolios-kafka.service';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './services/ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';

import { EvaluationVariableCollectionsArePresentedThroughPortfoliosController } from './evaluation-variable-collections-are-presented-through-portfolios.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluationVariableCollectionsArePresentedThroughPortfolios,
      ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios,
    ]),
  ],
  controllers: [
    EvaluationVariableCollectionsArePresentedThroughPortfoliosController,
  ],
  providers: [
    EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
    EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService,
    ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
  ],
})
export class EvaluationVariableCollectionsArePresentedThroughPortfoliosModule {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionsArePresentedThroughPortfoliosModule.name,
  );

  constructor() {
    this.logger.debug(
      `${EvaluationVariableCollectionsArePresentedThroughPortfoliosModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
