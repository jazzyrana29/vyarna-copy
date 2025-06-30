import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskStatus } from '../../../entities/task-status.entity';

import {
  GetTaskStatusDto,
  GetManyTaskStatusesDto,
  TaskStatusDto,
} from 'ez-utils';

@Injectable()
export class TaskStatusesService {
  private logger = getLoggerConfig(TaskStatusesService.name);

  constructor(
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
  ) {
    this.logger.debug(
      `${TaskStatusesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findTaskStatus(
    getTaskStatusDto: GetTaskStatusDto,
    traceId: string,
  ): Promise<TaskStatusDto> {
    const { taskStatusId, name } = getTaskStatusDto;
    if (!taskStatusId && !name) {
      this.logger.error(
        'At least one parameter (taskStatusId or name) must be provided',
        traceId,
        'findTaskStatus',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'At least one parameter (taskStatusId or name) must be provided',
      );
    }

    const where: Record<string, any> = {};
    if (taskStatusId) where['taskStatusId'] = taskStatusId;
    if (name) where['name'] = name;
    where['isDeleted'] = false;

    this.logger.debug(
      `Conditions Filters for search: ${JSON.stringify(where)}`,
      traceId,
      'findTaskStatus',
      LogStreamLevel.ProdStandard,
    );

    const taskStatus = await this.taskStatusRepository.findOne({ where });
    if (!taskStatus) {
      this.logger.error(
        `No task status found with the provided criteria`,
        traceId,
        'findTaskStatus',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No task status found with the provided criteria`,
      );
    }

    this.logger.info(
      `Task status found in database`,
      traceId,
      'findTaskStatus',
      LogStreamLevel.ProdStandard,
    );
    return taskStatus;
  }

  async getManyTaskStatus(
    getManyTaskStatusesDto: GetManyTaskStatusesDto,
    traceId: string,
  ): Promise<TaskStatusDto[]> {
    const { name } = getManyTaskStatusesDto;
    const where: Record<string, any> = {};
    if (name) where['name'] = name;
    where['isDeleted'] = false;

    this.logger.debug(
      `Conditions Filters for search: ${JSON.stringify(where)}`,
      traceId,
      'getManyTaskStatus',
      LogStreamLevel.ProdStandard,
    );

    const taskStatuses = await this.taskStatusRepository.find({ where });

    this.logger.info(
      `Task status found by matching criteria`,
      traceId,
      'getManyTaskStatus',
      LogStreamLevel.ProdStandard,
    );
    return taskStatuses;
  }
}
