import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskHasReceiveInputValueOfType } from '../../../entities/task-has-received-input-value-of-type.entity';

import {
  CreateTaskHasReceivedInputValueOfTypeDto,
  UpdateTaskHasReceivedInputValueOfTypeDto,
  DeleteTaskHasReceivedInputValueOfTypeDto,
  GetOneTaskHasReceivedInputValueOfTypeDto,
  GetManyTaskHasReceivedInputValueOfTypeDto,
  TaskHasReceiveInputValueOfTypeDto,
} from 'ez-utils';

@Injectable()
export class TaskHasReceiveInputValueOfTypeService {
  private logger = getLoggerConfig(TaskHasReceiveInputValueOfTypeService.name);

  constructor(
    @InjectRepository(TaskHasReceiveInputValueOfType)
    private readonly taskHasReceiveInputValueOfTypeRepository: Repository<TaskHasReceiveInputValueOfType>,
  ) {
    this.logger.debug(
      `${TaskHasReceiveInputValueOfTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskHasReceiveInputValueOfType(
    createTaskHasReceiveInputValueOfTypeDto: CreateTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<TaskHasReceiveInputValueOfTypeDto> {
    const { taskId, inputValueTypeId, updatedBy } =
      createTaskHasReceiveInputValueOfTypeDto;
    const entity = this.taskHasReceiveInputValueOfTypeRepository.create({
      taskId,
      inputValueTypeId,
      updatedBy,
    });

    await this.taskHasReceiveInputValueOfTypeRepository.save(entity);
    this.logger.info(
      `TaskHasReceiveInputValueOfType created for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'createTaskHasReceiveInputValueOfType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async updateTaskHasReceiveInputValueOfType(
    updateTaskHasReceiveInputValueOfTypeDto: UpdateTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<TaskHasReceiveInputValueOfTypeDto> {
    const { taskId, inputValueTypeId, updatedBy } =
      updateTaskHasReceiveInputValueOfTypeDto;

    const entity = await this.taskHasReceiveInputValueOfTypeRepository.findOne({
      where: { taskId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'updateTaskHasReceiveInputValueOfType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    entity.updatedBy = updatedBy;

    await this.taskHasReceiveInputValueOfTypeRepository.save(entity);
    this.logger.info(
      `TaskHasReceiveInputValueOfType updated for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'updateTaskHasReceiveInputValueOfType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async deleteTaskHasReceiveInputValueOfType(
    deleteTaskHasReceiveInputValueOfTypeDto: DeleteTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<void> {
    const { taskId, inputValueTypeId } =
      deleteTaskHasReceiveInputValueOfTypeDto;
    const entity = await this.taskHasReceiveInputValueOfTypeRepository.findOne({
      where: { taskId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'deleteTaskHasReceiveInputValueOfType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    entity.isDeleted = true;
    await this.taskHasReceiveInputValueOfTypeRepository.save(entity);
    this.logger.info(
      `TaskHasReceiveInputValueOfType for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId} marked as deleted`,
      traceId,
      'deleteTaskHasReceiveInputValueOfType',
      LogStreamLevel.ProdStandard,
    );
  }

  async getOneTaskHasReceiveInputValueOfType(
    getOneTaskHasReceiveInputValueOfTypeDto: GetOneTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<TaskHasReceiveInputValueOfTypeDto> {
    const { taskId, inputValueTypeId } =
      getOneTaskHasReceiveInputValueOfTypeDto;

    const entity = await this.taskHasReceiveInputValueOfTypeRepository.findOne({
      where: { taskId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'getOneTaskHasReceiveInputValueOfType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskHasReceiveInputValueOfType found with TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    this.logger.info(
      `TaskHasReceiveInputValueOfType found for TaskId: ${taskId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'getOneTaskHasReceiveInputValueOfType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async getManyTaskHasReceiveInputValueOfTypeEntities(
    getManyTaskHasReceiveInputValueOfTypeDto: GetManyTaskHasReceivedInputValueOfTypeDto,
    traceId: string,
  ): Promise<TaskHasReceiveInputValueOfTypeDto[]> {
    const { isDeleted = false } = getManyTaskHasReceiveInputValueOfTypeDto;

    const entities = await this.taskHasReceiveInputValueOfTypeRepository.find({
      where: { isDeleted },
    });

    this.logger.info(
      `${entities.length} TaskHasReceiveInputValueOfType entities found`,
      traceId,
      'getManyTaskHasReceiveInputValueOfTypeEntities',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
