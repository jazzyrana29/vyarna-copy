import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../../entities/ztracking-evaluation-variable-collections-are-presented-through-portfolios.entity';
import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../../entities/evaluation-variable-collections-are-presented-through-portfolios.entity';

import {
  GetHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService {
  private logger = getLoggerConfig(
    ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.name,
  );

  constructor(
    @InjectRepository(
      ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios,
    )
    private ztrackingRepository: Repository<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
    entity: EvaluationVariableCollectionsArePresentedThroughPortfolios,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        ...entity,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `createZtrackingEntity saved in database`,
      traceId,
      'createZtrackingEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
    {
      evaluationVariableCollectionsArePresentedThroughPortfoliosId,
    }: GetHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<
    ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto[]
  > {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { evaluationVariableCollectionsArePresentedThroughPortfoliosId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
        traceId,
        'findZtrackingEntities',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
      );
    }

    this.logger.info(
      `ztracking entities found in database`,
      traceId,
      'findZtrackingEntities',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
