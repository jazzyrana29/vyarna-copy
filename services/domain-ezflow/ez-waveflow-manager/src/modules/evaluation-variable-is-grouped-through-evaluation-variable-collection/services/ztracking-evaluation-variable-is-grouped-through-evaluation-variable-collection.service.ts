import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../../entities/evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../../entities/ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';

import {
  GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService {
  private logger = getLoggerConfig(
    ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.name,
  );

  constructor(
    @InjectRepository(
      ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    )
    private readonly evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository: Repository<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    evaluationVariableIsGroupedThroughEvaluationVariableCollection: EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    traceId: string,
  ): Promise<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
    const ztrackingEntity =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
        this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.create(
          {
            ...evaluationVariableIsGroupedThroughEvaluationVariableCollection,
            versionDate: new Date(),
          },
        ),
      );

    this.logger.info(
      `create ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection saved in database`,
      traceId,
      'createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    {
      evaluationVariableIsGroupedThroughEvaluationVariableCollectionId = '',
    }: GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<
    ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto[]
  > {
    const ztrackingEntities =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.find(
        {
          where: {
            evaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
          },
        },
      );

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
        traceId,
        'getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking evaluationVariableIsGroupedThroughEvaluationVariableCollection found in database`,
      traceId,
      'getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
