import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollectionPortfolio } from '../../entities/evaluation-variable-collection-portfolio.entity';
import { ZtrackingEvaluationVariableCollectionPortfolio } from '../../entities/ztracking-evaluation-variable-collection-portfolio.entity';

import { EvaluationVariableCollectionPortfolioService } from './services/evaluation-variable-collection-portfolio.service';
import { EvaluationVariableCollectionPortfolioKafkaService } from './services/evaluation-variable-collection-portfolio-kafka.service';
import { ZtrackingEvaluationVariableCollectionPortfolioService } from './services/ztracking-evaluation-variable-collection-portfolio.service';

import { EvaluationVariableCollectionPortfolioController } from './evaluation-variable-collection-portfolio.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluationVariableCollectionPortfolio,
      ZtrackingEvaluationVariableCollectionPortfolio,
    ]),
  ],
  controllers: [EvaluationVariableCollectionPortfolioController],
  providers: [
    EvaluationVariableCollectionPortfolioService,
    EvaluationVariableCollectionPortfolioKafkaService,
    ZtrackingEvaluationVariableCollectionPortfolioService,
  ],
})
export class EvaluationVariableCollectionPortfolioModule {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionPortfolioModule.name,
  );

  constructor() {
    this.logger.debug(
      `${EvaluationVariableCollectionPortfolioModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
