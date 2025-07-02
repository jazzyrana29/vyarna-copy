import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateTaskTypesReceiveInputValueTypeDto,
  GetOneTaskTypesReceiveInputValueTypeDto,
  GetManyTaskTypesReceiveInputValueTypeDto,
  GetHistoryTaskTypesReceiveInputValueTypeDto,
  KafkaMessageResponderService,
  KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES,
  KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  UpdateTaskTypesReceiveInputValueTypeDto,
  DeleteTaskTypesReceiveInputValueTypeDto,
} from 'ez-utils';

import { TaskTypesReceiveInputValueTypeService } from './task-types-receive-input-value-types.service';
import { ZtrackingTaskTypesReceiveInputValueTypeService } from './ztracking-task-types-receive-input-value-types.service';

@Injectable()
export class TaskTypesReceiveInputValueTypeKafkaService {
  public serviceName = TaskTypesReceiveInputValueTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly taskTypesReceiveInputValueTypeService: TaskTypesReceiveInputValueTypeService,
    private readonly ztrackingTaskTypesReceiveInputValueTypeService: ZtrackingTaskTypesReceiveInputValueTypeService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TaskTypesReceiveInputValueTypeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskTypesReceiveInputValueTypeWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
      message,
      key,
      async (value: CreateTaskTypesReceiveInputValueTypeDto, traceId: string) =>
        await this.taskTypesReceiveInputValueTypeService.createTaskTypesReceiveInputValueType(
          value,
          traceId,
        ),
    );
  }

  async updateTaskTypesReceiveInputValueTypeWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
      message,
      key,
      async (value: UpdateTaskTypesReceiveInputValueTypeDto, traceId: string) =>
        await this.taskTypesReceiveInputValueTypeService.updateTaskTypesReceiveInputValueType(
          value,
          traceId,
        ),
    );
  }

  async deleteTaskTypesReceiveInputValueTypeWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
      message,
      key,
      async (value: DeleteTaskTypesReceiveInputValueTypeDto, traceId: string) =>
        await this.taskTypesReceiveInputValueTypeService.deleteTaskTypesReceiveInputValueType(
          value,
          traceId,
        ),
    );
  }

  async getTaskTypesReceiveInputValueTypeWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
      message,
      key,
      async (value: GetOneTaskTypesReceiveInputValueTypeDto, traceId: string) =>
        await this.taskTypesReceiveInputValueTypeService.getOneTaskTypesReceiveInputValueType(
          value,
          traceId,
        ),
    );
  }

  async getManyTaskTypesReceiveInputValueTypesWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES,
      message,
      key,
      async (
        value: GetManyTaskTypesReceiveInputValueTypeDto,
        traceId: string,
      ) =>
        await this.taskTypesReceiveInputValueTypeService.getManyTaskTypesReceiveInputValueTypes(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfTaskTypesReceiveInputValueTypeWithKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
      message,
      key,
      async (
        value: GetHistoryTaskTypesReceiveInputValueTypeDto,
        traceId: string,
      ) =>
        await this.ztrackingTaskTypesReceiveInputValueTypeService.findZtrackingTaskTypesReceiveInputValueTypes(
          value,
          traceId,
        ),
    );
  }
}
