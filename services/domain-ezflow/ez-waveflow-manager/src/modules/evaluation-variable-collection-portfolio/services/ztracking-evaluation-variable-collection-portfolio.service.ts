import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { ZtrackingEvaluationVariableCollectionPortfolio } from '../../../entities/ztracking-evaluation-variable-collection-portfolio.entity';
import { EvaluationVariableCollectionPortfolio } from '../../../entities/evaluation-variable-collection-portfolio.entity';

import {
  GetHistoryOfEvaluationVariableCollectionPortfoliosDto,
  ZtrackingEvaluationVariableCollectionPortfolioDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariableCollectionPortfolioService {
  private logger = getLoggerConfig(
    ZtrackingEvaluationVariableCollectionPortfolioService.name,
  );

  constructor(
    @InjectRepository(ZtrackingEvaluationVariableCollectionPortfolio)
    private ztrackingRepository: Repository<ZtrackingEvaluationVariableCollectionPortfolio>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariableCollectionPortfolioService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEvaluationVariableCollectionPortfolioEntity(
    portfolio: EvaluationVariableCollectionPortfolio,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        ...portfolio,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `createZtrackingEvaluationVariableCollectionPortfolioEntity saved in database`,
      traceId,
      'createZtrackingEvaluationVariableCollectionPortfolioEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingEvaluationVariableCollectionPortfolioEntity(
    {
      evaluationVariableCollectionPortfolioId,
    }: GetHistoryOfEvaluationVariableCollectionPortfoliosDto,
    traceId: string,
  ): Promise<ZtrackingEvaluationVariableCollectionPortfolioDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { evaluationVariableCollectionPortfolioId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${evaluationVariableCollectionPortfolioId}`,
        traceId,
        'findZtrackingEvaluationVariableCollectionPortfolioEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${evaluationVariableCollectionPortfolioId}`,
      );
    }

    this.logger.info(
      `ztracking evaluation variable collection portfolio entity found in database`,
      traceId,
      'findZtrackingEvaluationVariableCollectionPortfolioEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
