import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES,
  KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
} from 'ez-utils';

import { TaskTypesReceiveInputValueTypeKafkaService } from './services/task-types-receive-input-value-types-kafka.service';

@Controller('task-types-receive-input-value-types')
export class TaskTypesReceiveInputValueTypeController {
  private logger = getLoggerConfig(
    TaskTypesReceiveInputValueTypeController.name,
  );

  constructor(
    private readonly taskTypesReceiveInputValueTypeKafkaService: TaskTypesReceiveInputValueTypeKafkaService,
  ) {
    this.logger.debug(
      `${TaskTypesReceiveInputValueTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE)
  async createTaskTypesReceiveInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE}`,
      '',
      'createTaskTypesReceiveInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.createTaskTypesReceiveInputValueTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE)
  async updateTaskTypesReceiveInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE}`,
      '',
      'updateTaskTypesReceiveInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.updateTaskTypesReceiveInputValueTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE)
  async deleteTaskTypesReceiveInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE}`,
      '',
      'deleteTaskTypesReceiveInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.deleteTaskTypesReceiveInputValueTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE)
  async getTaskTypesReceiveInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE}`,
      '',
      'getTaskTypesReceiveInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.getTaskTypesReceiveInputValueTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES)
  async getManyTaskTypesReceiveInputValueTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES}`,
      '',
      'getManyTaskTypesReceiveInputValueTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.getManyTaskTypesReceiveInputValueTypesWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE)
  async getHistoryOfTaskTypesReceiveInputValueTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE}`,
      '',
      'getHistoryOfTaskTypesReceiveInputValueTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypesReceiveInputValueTypeKafkaService.getHistoryOfTaskTypesReceiveInputValueTypeWithKafka(
      message,
      key,
    );
  }
}
