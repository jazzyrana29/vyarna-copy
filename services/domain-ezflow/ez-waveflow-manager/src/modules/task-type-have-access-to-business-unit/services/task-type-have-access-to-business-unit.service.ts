import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypeHaveAccessToBusinessUnit } from '../../../entities/task-type-have-access-to-business-unit.entity';

import {
  CreateTaskTypeHaveAccessToBusinessUnitDto,
  DeleteTaskTypeHaveAccessToBusinessUnitDto,
  GetOneTaskTypeHaveAccessToBusinessUnitDto,
  TaskTypeHaveAccessToBusinessUnitDto,
  UpdateTaskTypeHaveAccessToBusinessUnitDto,
} from 'ez-utils';

import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './ztracking-task-type-have-access-to-business-unit.service';

@Injectable()
export class TaskTypeHaveAccessToBusinessUnitService {
  private logger = getLoggerConfig(
    TaskTypeHaveAccessToBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(TaskTypeHaveAccessToBusinessUnit)
    private readonly taskTypeHaveAccessToBusinessUnitRepository: Repository<TaskTypeHaveAccessToBusinessUnit>,
    private readonly ztrackingTaskTypeHaveAccessToBusinessUnitService: ZtrackingTaskTypeHaveAccessToBusinessUnitService,
  ) {
    this.logger.debug(
      `${TaskTypeHaveAccessToBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskTypeHaveAccessToBusinessUnit(
    createTaskTypeHaveAccessToBusinessUnitDto: CreateTaskTypeHaveAccessToBusinessUnitDto,
    traceId: string,
  ): Promise<TaskTypeHaveAccessToBusinessUnitDto> {
    const createdTaskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.save(
        this.taskTypeHaveAccessToBusinessUnitRepository.create(
          createTaskTypeHaveAccessToBusinessUnitDto,
        ),
      );

    this.logger.info(
      `TaskTypeHaveAccessToBusinessUnit created with businessUniId: ${createdTaskTypeHaveAccessToBusinessUnit.businessUnitId} and taskTypeId: ${createdTaskTypeHaveAccessToBusinessUnit.taskTypeId}`,
      traceId,
      'createTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingTaskTypeHaveAccessToBusinessUnitService.createZtrackingForTaskTypeHaveAccessToBusinessUnit(
        createdTaskTypeHaveAccessToBusinessUnit,
        traceId,
      )
    ) {
      return createdTaskTypeHaveAccessToBusinessUnit;
    }
  }

  async updateTaskTypeHaveAccessToBusinessUnit(
    updateTaskTypeHaveAccessToBusinessUnitDto: UpdateTaskTypeHaveAccessToBusinessUnitDto,
    traceId: string,
  ): Promise<TaskTypeHaveAccessToBusinessUnitDto> {
    const taskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.findOne({
        where: {
          businessUnitId:
            updateTaskTypeHaveAccessToBusinessUnitDto.businessUnitId,
          taskTypeId: updateTaskTypeHaveAccessToBusinessUnitDto.taskTypeId,
        },
      });

    if (!taskTypeHaveAccessToBusinessUnit) {
      this.logger.error(
        `No TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${updateTaskTypeHaveAccessToBusinessUnitDto.businessUnitId} and taskTypeId: ${updateTaskTypeHaveAccessToBusinessUnitDto.taskTypeId}`,
        traceId,
        'updateTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${updateTaskTypeHaveAccessToBusinessUnitDto.businessUnitId} and taskTypeId: ${updateTaskTypeHaveAccessToBusinessUnitDto.taskTypeId}`,
      );
    }

    const updatedTaskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.save({
        ...taskTypeHaveAccessToBusinessUnit,
        ...updateTaskTypeHaveAccessToBusinessUnitDto,
      });

    this.logger.info(
      `TaskTypeHaveAccessToBusinessUnit with businessUniId: ${updateTaskTypeHaveAccessToBusinessUnitDto.businessUnitId} and taskTypeId: ${updateTaskTypeHaveAccessToBusinessUnitDto.taskTypeId} updated`,
      traceId,
      'updateTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingTaskTypeHaveAccessToBusinessUnitService.createZtrackingForTaskTypeHaveAccessToBusinessUnit(
        updatedTaskTypeHaveAccessToBusinessUnit,
        traceId,
      )
    ) {
      return updatedTaskTypeHaveAccessToBusinessUnit;
    }
  }

  async deleteTaskTypeHaveAccessToBusinessUnit(
    {
      businessUnitId = '',
      taskTypeId = '',
      updatedBy = null,
    }: DeleteTaskTypeHaveAccessToBusinessUnitDto,
    traceId: string,
  ): Promise<TaskTypeHaveAccessToBusinessUnitDto> {
    if (!businessUnitId && !taskTypeId && !updatedBy) {
      this.logger.error(
        'You need to provide businessUnitId, taskTypeId and updatedBy',
        traceId,
        'deleteTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide businessUnitId, taskTypeId and updatedBy',
      );
    }
    const taskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.findOne({
        where: { taskTypeId, businessUnitId, isDeleted: false },
      });

    if (!taskTypeHaveAccessToBusinessUnit) {
      this.logger.error(
        `No Active TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId}`,
        traceId,
        'deleteTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Active TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId}`,
      );
    }

    taskTypeHaveAccessToBusinessUnit.isDeleted = true;
    taskTypeHaveAccessToBusinessUnit.updatedBy = updatedBy;
    const deletedTaskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.save(
        taskTypeHaveAccessToBusinessUnit,
      );

    this.logger.info(
      `TaskTypeHaveAccessToBusinessUnit with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId} marked as deleted`,
      traceId,
      'deleteTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingTaskTypeHaveAccessToBusinessUnitService.createZtrackingForTaskTypeHaveAccessToBusinessUnit(
        deletedTaskTypeHaveAccessToBusinessUnit,
        traceId,
      )
    ) {
      return deletedTaskTypeHaveAccessToBusinessUnit;
    }
  }

  async getOneTaskTypeHaveAccessToBusinessUnit(
    {
      taskTypeId = '',
      businessUnitId = '',
      isDeleted = false,
    }: GetOneTaskTypeHaveAccessToBusinessUnitDto,
    traceId: string,
  ): Promise<TaskTypeHaveAccessToBusinessUnitDto> {
    if (!taskTypeId && !businessUnitId) {
      this.logger.error(
        'Please provide both businessUnitId and taskTypeId',
        traceId,
        'getOneTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both businessUnitId and taskTypeId',
      );
    }

    const where: FindOptionsWhere<TaskTypeHaveAccessToBusinessUnit> = {};
    if (taskTypeId) where.taskTypeId = taskTypeId;
    if (businessUnitId) where.businessUnitId = businessUnitId;
    where.isDeleted = isDeleted;

    const taskTypeHaveAccessToBusinessUnit =
      await this.taskTypeHaveAccessToBusinessUnitRepository.findOne({ where });

    if (!taskTypeHaveAccessToBusinessUnit) {
      this.logger.error(
        `No TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId}`,
        traceId,
        'getOneTaskTypeHaveAccessToBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId}`,
      );
    }

    this.logger.info(
      `TaskTypeHaveAccessToBusinessUnit found with businessUniId: ${businessUnitId} and taskTypeId: ${taskTypeId}`,
      traceId,
      'getOneTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return taskTypeHaveAccessToBusinessUnit;
  }
}
