import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskType } from '../../../entities/task-type.entity';

import { GetManyTaskTypesDto, GetOneTaskTypeDto, TaskTypeDto } from 'ez-utils';

@Injectable()
export class TaskTypeService {
  private logger = getLoggerConfig(TaskTypeService.name);

  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
  ) {
    this.logger.debug(
      `${TaskTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneTaskType(
    { taskTypeId = '', name = '' }: GetOneTaskTypeDto,
    traceId: string,
  ): Promise<TaskTypeDto> {
    if (!taskTypeId && !name) {
      this.logger.error(
        'Either provide taskTypeId or name',
        traceId,
        'getOneTaskType',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide taskTypeId or name');
    }

    const where: FindOptionsWhere<TaskType> = {};
    if (name) where.name = name;
    if (taskTypeId) where.taskTypeId = taskTypeId;
    where.isDeleted = false;
    const taskType = await this.taskTypeRepository.findOne({ where });

    if (!taskType) {
      this.logger.error(
        `No TaskType found with ID: ${taskTypeId} or name: ${name}`,
        traceId,
        'getOneTaskType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskType found with ID: ${taskTypeId} or name: ${name}`,
      );
    }

    this.logger.info(
      `TaskType found with ID: ${taskType.taskTypeId}`,
      traceId,
      'getOneTaskType',
      LogStreamLevel.ProdStandard,
    );

    return taskType;
  }

  async getManyTaskTypes(
    {}: GetManyTaskTypesDto,
    traceId: string,
  ): Promise<TaskTypeDto[]> {
    const where: FindOptionsWhere<TaskType> = {};
    where.isDeleted = false;
    const taskTypes = await this.taskTypeRepository.find({ where });

    this.logger.info(
      `${taskTypes.length} TaskType(s) found with the criteria`,
      traceId,
      'getManyTaskTypes',
      LogStreamLevel.ProdStandard,
    );

    return taskTypes;
  }
}
