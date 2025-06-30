import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypesReceiveInputValueType } from '../../../entities/task-types-receive-input-value-type.entity';
import { ZtrackingTaskTypesReceiveInputValueType } from '../../../entities/ztracking-task-type-receives-input-value-type.entity';

import {
  GetHistoryTaskTypesReceiveInputValueTypeDto,
  ZtrackingTaskTypeReceivesInputValueTypeDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingTaskTypesReceiveInputValueTypeService {
  private logger = getLoggerConfig(
    ZtrackingTaskTypesReceiveInputValueTypeService.name,
  );

  constructor(
    @InjectRepository(ZtrackingTaskTypesReceiveInputValueType)
    private ztrackingRepository: Repository<ZtrackingTaskTypesReceiveInputValueType>,
  ) {
    this.logger.debug(
      `${ZtrackingTaskTypesReceiveInputValueTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingTaskTypesReceiveInputValueType(
    taskTypesReceiveInputValueType: TaskTypesReceiveInputValueType,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        taskTypeId: taskTypesReceiveInputValueType.taskTypeId,
        inputValueTypeId: taskTypesReceiveInputValueType.inputValueTypeId,
        isAvailable: taskTypesReceiveInputValueType.isAvailable,
        isDeleted: taskTypesReceiveInputValueType.isDeleted,
        updatedBy: taskTypesReceiveInputValueType.updatedBy,
        createdAt: taskTypesReceiveInputValueType.createdAt,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `Ztracking entry for TaskTypesReceiveInputValueType for TaskTypeId: ${taskTypesReceiveInputValueType.taskTypeId} and InputValueTypeId: ${taskTypesReceiveInputValueType.inputValueTypeId} saved in database`,
      traceId,
      'createZtrackingTaskTypesReceiveInputValueType',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingTaskTypesReceiveInputValueTypes(
    {
      taskTypeId,
      inputValueTypeId,
    }: GetHistoryTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<ZtrackingTaskTypeReceivesInputValueTypeDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { taskTypeId, inputValueTypeId },
      order: { versionDate: 'DESC' }, // Order by the most recent changes
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entries found for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'findZtrackingTaskTypesReceiveInputValueTypes',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entries found for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    this.logger.info(
      `Ztracking entries for TaskTypesReceiveInputValueType found in the database for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'findZtrackingTaskTypesReceiveInputValueTypes',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
