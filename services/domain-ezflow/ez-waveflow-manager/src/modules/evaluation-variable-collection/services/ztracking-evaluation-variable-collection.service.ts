import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { EvaluationVariableCollection } from '../../../entities/evaluation-variable-collection.entity';
import { ZtrackingEvaluationVariableCollection } from '../../../entities/ztracking-evaluation-variable-collection.entity';

import {
  GetHistoryOfEvaluationVariableCollectionsDto,
  ZtrackingEvaluationVariableCollectionDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariableCollectionService {
  private logger = getLoggerConfig(
    ZtrackingEvaluationVariableCollectionService.name,
  );

  constructor(
    @InjectRepository(ZtrackingEvaluationVariableCollection)
    private ztrackingRepository: Repository<ZtrackingEvaluationVariableCollection>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariableCollectionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEvaluationVariableCollectionEntity(
    collection: EvaluationVariableCollection,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        ...collection,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `createZtrackingEvaluationVariableCollectionEntity saved in database`,
      traceId,
      'createZtrackingEvaluationVariableCollectionEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingEvaluationVariableCollectionEntity(
    {
      evaluationVariableCollectionId,
    }: GetHistoryOfEvaluationVariableCollectionsDto,
    traceId: string,
  ): Promise<ZtrackingEvaluationVariableCollectionDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { evaluationVariableCollectionId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${evaluationVariableCollectionId}`,
        traceId,
        'findZtrackingEvaluationVariableCollectionEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${evaluationVariableCollectionId}`,
      );
    }

    this.logger.info(
      `ztracking evaluation variable collection entity found in database`,
      traceId,
      'findZtrackingEvaluationVariableCollectionEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
