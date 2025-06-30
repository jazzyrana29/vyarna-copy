import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariable } from '../../../entities/evaluation-variable.entity';
import { ZtrackingEvaluationVariable } from '../../../entities/ztracking-evaluation-variable.entity';

import {
  GetHistoryOfEvaluationVariablesDto,
  ZtrackingEvaluationVariableDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariableService {
  private logger = getLoggerConfig(ZtrackingEvaluationVariableService.name);

  constructor(
    @InjectRepository(ZtrackingEvaluationVariable)
    private ztrackingRepository: Repository<ZtrackingEvaluationVariable>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariableService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEvaluationVariableEntity(
    evaluationVariable: EvaluationVariable,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        ...evaluationVariable,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `createZtrackingEvaluationVariableEntity saved in database`,
      traceId,
      'createZtrackingEvaluationVariableEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingEvaluationVariableEntity(
    { evaluationVariableId }: GetHistoryOfEvaluationVariablesDto,
    traceId: string,
  ): Promise<ZtrackingEvaluationVariableDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { evaluationVariableId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${evaluationVariableId}`,
        traceId,
        'findZtrackingEvaluationVariableEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${evaluationVariableId}`,
      );
    }

    this.logger.info(
      `ztracking evaluation variable entity found in database`,
      traceId,
      'findZtrackingEvaluationVariableEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
