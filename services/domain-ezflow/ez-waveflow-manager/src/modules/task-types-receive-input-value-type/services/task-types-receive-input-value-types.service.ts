import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TaskTypesReceiveInputValueType } from '../../../entities/task-types-receive-input-value-type.entity';

import {
  CreateTaskTypesReceiveInputValueTypeDto,
  UpdateTaskTypesReceiveInputValueTypeDto,
  DeleteTaskTypesReceiveInputValueTypeDto,
  GetOneTaskTypesReceiveInputValueTypeDto,
  GetManyTaskTypesReceiveInputValueTypeDto,
  TaskTypesReceiveInputValueTypeDto,
} from 'ez-utils';

@Injectable()
export class TaskTypesReceiveInputValueTypeService {
  private logger = getLoggerConfig(TaskTypesReceiveInputValueTypeService.name);

  constructor(
    @InjectRepository(TaskTypesReceiveInputValueType)
    private readonly taskTypesReceiveInputValueTypeRepository: Repository<TaskTypesReceiveInputValueType>,
  ) {
    this.logger.debug(
      `${TaskTypesReceiveInputValueTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskTypesReceiveInputValueType(
    createTaskTypesReceiveInputValueTypeDto: CreateTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<TaskTypesReceiveInputValueTypeDto> {
    const { taskTypeId, inputValueTypeId, isAvailable, updatedBy } =
      createTaskTypesReceiveInputValueTypeDto;
    const entity = this.taskTypesReceiveInputValueTypeRepository.create({
      taskTypeId,
      inputValueTypeId,
      isAvailable,
      updatedBy,
    });

    await this.taskTypesReceiveInputValueTypeRepository.save(entity);
    this.logger.info(
      `TaskTypesReceiveInputValueType created for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'createTaskTypesReceiveInputValueType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async updateTaskTypesReceiveInputValueType(
    updateTaskTypesReceiveInputValueTypeDto: UpdateTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<TaskTypesReceiveInputValueTypeDto> {
    const { taskTypeId, inputValueTypeId, isAvailable, updatedBy } =
      updateTaskTypesReceiveInputValueTypeDto;

    const entity = await this.taskTypesReceiveInputValueTypeRepository.findOne({
      where: { taskTypeId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'updateTaskTypesReceiveInputValueType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    entity.isAvailable = isAvailable;
    entity.updatedBy = updatedBy;

    await this.taskTypesReceiveInputValueTypeRepository.save(entity);
    this.logger.info(
      `TaskTypesReceiveInputValueType updated for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'updateTaskTypesReceiveInputValueType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async deleteTaskTypesReceiveInputValueType(
    deleteTaskTypesReceiveInputValueTypeDto: DeleteTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<void> {
    const { taskTypeId, inputValueTypeId } =
      deleteTaskTypesReceiveInputValueTypeDto;
    const entity = await this.taskTypesReceiveInputValueTypeRepository.findOne({
      where: { taskTypeId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'deleteTaskTypesReceiveInputValueType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    entity.isDeleted = true;
    await this.taskTypesReceiveInputValueTypeRepository.save(entity);
    this.logger.info(
      `TaskTypesReceiveInputValueType for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId} marked as deleted`,
      traceId,
      'deleteTaskTypesReceiveInputValueType',
      LogStreamLevel.ProdStandard,
    );
  }

  async getOneTaskTypesReceiveInputValueType(
    getOneTaskTypesReceiveInputValueTypeDto: GetOneTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<TaskTypesReceiveInputValueTypeDto> {
    const { taskTypeId, inputValueTypeId } =
      getOneTaskTypesReceiveInputValueTypeDto;

    const entity = await this.taskTypesReceiveInputValueTypeRepository.findOne({
      where: { taskTypeId, inputValueTypeId, isDeleted: false },
    });

    if (!entity) {
      this.logger.error(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
        traceId,
        'getOneTaskTypesReceiveInputValueType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No TaskTypesReceiveInputValueType found with TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      );
    }

    this.logger.info(
      `TaskTypesReceiveInputValueType found for TaskTypeId: ${taskTypeId} and InputValueTypeId: ${inputValueTypeId}`,
      traceId,
      'getOneTaskTypesReceiveInputValueType',
      LogStreamLevel.ProdStandard,
    );

    return entity;
  }

  async getManyTaskTypesReceiveInputValueTypes(
    getManyTaskTypesReceiveInputValueTypeDto: GetManyTaskTypesReceiveInputValueTypeDto,
    traceId: string,
  ): Promise<TaskTypesReceiveInputValueTypeDto[]> {
    const { isDeleted = false, isAvailable = true } =
      getManyTaskTypesReceiveInputValueTypeDto;

    const entities = await this.taskTypesReceiveInputValueTypeRepository.find({
      where: { isDeleted, isAvailable },
    });

    this.logger.info(
      `${entities.length} TaskTypesReceiveInputValueType entities found`,
      traceId,
      'getManyTaskTypesReceiveInputValueTypes',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
