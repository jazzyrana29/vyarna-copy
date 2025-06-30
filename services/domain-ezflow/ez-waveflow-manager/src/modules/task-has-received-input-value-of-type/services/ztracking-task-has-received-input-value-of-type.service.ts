import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskHasReceiveInputValueOfType } from '../../../entities/task-has-received-input-value-of-type.entity';
import { ZtrackingTaskHasReceiveInputValueOfType } from '../../../entities/ztracking-task-has-received-input-value-of-type.entity';

import {
  GetHistoryTaskHasReceivedInputValueOfTypeDto,
  ZtrackingTaskHasReceivedInputValueOfTypeDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingTaskHasReceiveInputValueOfTypeService {
  private logger = getLoggerConfig(
    ZtrackingTaskHasReceiveInputValueOfTypeService.name,
  );

  constructor(
    @InjectRepository(ZtrackingTaskHasReceiveInputValueOfType)
    private ztrackingRepository: Repository<ZtrackingTaskHasReceiveInputValueOfType>,
  ) {
    this.logger.debug(
      `${ZtrackingTaskHasReceiveInputValueOfTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
    entity: TaskHasReceiveInputValueOfType,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        inputValueTypeId: entity.inputValueTypeId,
        taskId: entity.taskId,
        taskInputValue: entity.taskInputValue,
        isDeleted: entity.isDeleted,
        createdAt: entity.createdAt,
        updatedBy: entity.updatedBy,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `Ztracking entry for TaskHasReceiveInputValueOfType for TaskId: ${entity.taskId} and InputValueTypeId: ${entity.inputValueTypeId} saved in database`,
      traceId,
      'createZtrackingTaskHasReceiveInputValueOfTypeServiceEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
    { taskId, inputValueTypeId }: GetHistoryTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<ZtrackingTaskHasReceivedInputValueOfTypeDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { taskId, inputValueTypeId },
      order: { versionDate: 'DESC' }, // Order by most recent changes
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entries found for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entries found for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    this.logger.info(
      `Ztracking entries for TaskHasReceiveInputValueOfType found in database for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
