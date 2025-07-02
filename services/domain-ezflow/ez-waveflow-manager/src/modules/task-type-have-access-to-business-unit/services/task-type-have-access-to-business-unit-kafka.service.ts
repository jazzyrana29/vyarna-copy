import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateTaskTypeHaveAccessToBusinessUnitDto,
  DeleteTaskTypeHaveAccessToBusinessUnitDto,
  GetOneTaskTypeHaveAccessToBusinessUnitDto,
  GetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
  KafkaMessageResponderService,
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
  UpdateTaskTypeHaveAccessToBusinessUnitDto,
} from 'ez-utils';

import { TaskTypeHaveAccessToBusinessUnitService } from './task-type-have-access-to-business-unit.service';
import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './ztracking-task-type-have-access-to-business-unit.service';

@Injectable()
export class TaskTypeHaveAccessToBusinessUnitKafkaService {
  public serviceName = TaskTypeHaveAccessToBusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly taskTypeHaveAccessToBusinessUnitService: TaskTypeHaveAccessToBusinessUnitService,
    private readonly ztrackingTaskTypeHaveAccessToBusinessUnitService: ZtrackingTaskTypeHaveAccessToBusinessUnitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TaskTypeHaveAccessToBusinessUnitKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskTypeHaveAccessToBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MANIFOLD,
      message,
      key,
      async (
        value: CreateTaskTypeHaveAccessToBusinessUnitDto,
        traceId: string,
      ) =>
        await this.taskTypeHaveAccessToBusinessUnitService.createTaskTypeHaveAccessToBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async updateTaskTypeHaveAccessToBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_MANIFOLD,
      message,
      key,
      async (
        value: UpdateTaskTypeHaveAccessToBusinessUnitDto,
        traceId: string,
      ) =>
        await this.taskTypeHaveAccessToBusinessUnitService.updateTaskTypeHaveAccessToBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async deleteTaskTypeHaveAccessToBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_MANIFOLD,
      message,
      key,
      async (
        value: DeleteTaskTypeHaveAccessToBusinessUnitDto,
        traceId: string,
      ) =>
        await this.taskTypeHaveAccessToBusinessUnitService.deleteTaskTypeHaveAccessToBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getOneTaskTypeHaveAccessToBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_MANIFOLD,
      message,
      key,
      async (
        value: GetOneTaskTypeHaveAccessToBusinessUnitDto,
        traceId: string,
      ) =>
        await this.taskTypeHaveAccessToBusinessUnitService.getOneTaskTypeHaveAccessToBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingTaskTypeHaveAccessToBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_MANIFOLD,
      message,
      key,
      async (
        value: GetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
        traceId: string,
      ) =>
        await this.ztrackingTaskTypeHaveAccessToBusinessUnitService.getZtrackingForTaskTypeHaveAccessToBusinessUnit(
          value,
          traceId,
        ),
    );
  }
}
