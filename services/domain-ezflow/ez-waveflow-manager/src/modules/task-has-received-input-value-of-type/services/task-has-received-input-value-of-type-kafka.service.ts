import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateTaskHasReceivedInputValueOfTypeDto,
  GetOneTaskHasReceivedInputValueOfTypeDto,
  GetManyTaskHasReceivedInputValueOfTypeDto,
  GetHistoryTaskHasReceivedInputValueOfTypeDto,
  UpdateTaskHasReceivedInputValueOfTypeDto,
  DeleteTaskHasReceivedInputValueOfTypeDto,
  KafkaMessageResponderService,
  KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES,
  KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
} from 'ez-utils';

import { TaskHasReceiveInputValueOfTypeService } from './task-has-received-input-value-of-type.service';
import { ZtrackingTaskHasReceiveInputValueOfTypeService } from './ztracking-task-has-received-input-value-of-type.service';

@Injectable()
export class TaskHasReceiveInputValueOfTypeKafkaService {
  public serviceName = TaskHasReceiveInputValueOfTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly taskHasReceiveInputValueOfTypeService: TaskHasReceiveInputValueOfTypeService,
    private readonly ztrackingService: ZtrackingTaskHasReceiveInputValueOfTypeService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TaskHasReceiveInputValueOfTypeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskHasReceiveInputValueOfTypeWithKafka(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
      message,
      key,
      async (
        value: CreateTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.taskHasReceiveInputValueOfTypeService.createTaskHasReceiveInputValueOfType(
          value,
          traceId,
        ),
    );
  }

  async updateTaskHasReceiveInputValueOfTypeWithKafka(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
      message,
      key,
      async (
        value: UpdateTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.taskHasReceiveInputValueOfTypeService.updateTaskHasReceiveInputValueOfType(
          value,
          traceId,
        ),
    );
  }

  async deleteTaskHasReceiveInputValueOfTypeWithKafka(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
      message,
      key,
      async (
        value: DeleteTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.taskHasReceiveInputValueOfTypeService.deleteTaskHasReceiveInputValueOfType(
          value,
          traceId,
        ),
    );
  }

  async getTaskHasReceiveInputValueOfTypeWithKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
      message,
      key,
      async (
        value: GetOneTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.taskHasReceiveInputValueOfTypeService.getOneTaskHasReceiveInputValueOfType(
          value,
          traceId,
        ),
    );
  }

  async getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES,
      message,
      key,
      async (
        value: GetManyTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.taskHasReceiveInputValueOfTypeService.getManyTaskHasReceiveInputValueOfTypeEntities(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
      message,
      key,
      async (
        value: GetHistoryTaskHasReceivedInputValueOfTypeDto,
        traceId: string,
      ) =>
        await this.ztrackingService.findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          value,
          traceId,
        ),
    );
  }
}
