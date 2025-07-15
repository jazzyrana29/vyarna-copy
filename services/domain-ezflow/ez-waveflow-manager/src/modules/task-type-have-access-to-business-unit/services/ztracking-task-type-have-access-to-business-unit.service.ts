import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypeHaveAccessToBusinessUnit } from '../../../entities/task-type-have-access-to-business-unit.entity';
import { ZtrackingTaskTypeHaveAccessToBusinessUnit } from '../../../entities/ztracking-task-type-have-access-to-business-unit.entity';

import {
  GetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
  ZtrackingTaskTypeHaveAccessToBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingTaskTypeHaveAccessToBusinessUnitService {
  private logger = getLoggerConfig(
    ZtrackingTaskTypeHaveAccessToBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(ZtrackingTaskTypeHaveAccessToBusinessUnit)
    private readonly taskTypeHaveAccessToBusinessUnitRepository: Repository<ZtrackingTaskTypeHaveAccessToBusinessUnit>,
  ) {
    this.logger.debug(
      `${ZtrackingTaskTypeHaveAccessToBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForTaskTypeHaveAccessToBusinessUnit(
    taskTypeHaveAccessToBusinessUnit: TaskTypeHaveAccessToBusinessUnit,
    traceId: string,
  ): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnit> {
    const ztrackingEntity =
      await this.taskTypeHaveAccessToBusinessUnitRepository.save(
        this.taskTypeHaveAccessToBusinessUnitRepository.create({
          ...taskTypeHaveAccessToBusinessUnit,
          versionDate: new Date(),
        }),
      );

    this.logger.info(
      `create ZtrackingTaskTypeHaveAccessToBusinessUnit saved in database`,
      traceId,
      'createZtrackingForTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForTaskTypeHaveAccessToBusinessUnit(
    {
      businessUnitId = '',
      taskTypeId = '',
    }: GetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
    traceId: string,
  ): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnitDto[]> {
    const ztrackingEntities =
      await this.taskTypeHaveAccessToBusinessUnitRepository.find({
        where: { businessUnitId, taskTypeId },
      });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this => businessUnitId: ${businessUnitId}  or taskTypeId: ${taskTypeId}`,
        traceId,
        'getZtrackingForTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this => businessUnitId: ${businessUnitId}  or taskTypeId: ${taskTypeId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking task-type-have-access-to-business-unit found in database`,
      traceId,
      'getZtrackingForTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
