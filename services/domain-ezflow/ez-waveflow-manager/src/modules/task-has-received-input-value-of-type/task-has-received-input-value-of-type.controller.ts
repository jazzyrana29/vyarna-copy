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
  KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES,
  KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
} from 'ez-utils';

import { TaskHasReceiveInputValueOfTypeKafkaService } from './services/task-has-received-input-value-of-type-kafka.service';

@Controller('task-has-received-input-value-of-type')
export class TaskHasReceiveInputValueOfTypeController {
  private logger = getLoggerConfig(
    TaskHasReceiveInputValueOfTypeController.name,
  );

  constructor(
    private readonly taskHasReceiveInputValueOfTypeKafkaService: TaskHasReceiveInputValueOfTypeKafkaService,
  ) {
    this.logger.debug(
      `${TaskHasReceiveInputValueOfTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE)
  async createTaskHasReceiveInputValueOfTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE}`,
      '',
      'createTaskHasReceiveInputValueOfTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.createTaskHasReceiveInputValueOfTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE)
  async updateTaskHasReceiveInputValueOfTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE}`,
      '',
      'updateTaskHasReceiveInputValueOfTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.updateTaskHasReceiveInputValueOfTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE)
  async deleteTaskHasReceiveInputValueOfTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE}`,
      '',
      'deleteTaskHasReceiveInputValueOfTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.deleteTaskHasReceiveInputValueOfTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE)
  async getTaskHasReceiveInputValueOfTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE}`,
      '',
      'getTaskHasReceiveInputValueOfTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.getTaskHasReceiveInputValueOfTypeWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES)
  async getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES}`,
      '',
      'getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE)
  async getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE}`,
      '',
      'getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskHasReceiveInputValueOfTypeKafkaService.getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka(
      message,
      key,
    );
  }
}
