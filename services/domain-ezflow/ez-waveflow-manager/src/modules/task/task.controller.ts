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
  KT_CREATE_TASK_ENTITY,
  KT_UPDATE_TASK_ENTITY,
  KT_DELETE_TASK_ENTITY,
  KT_GET_TASK_ENTITY,
  KT_GET_MANY_TASKS,
  KT_GET_HISTORY_TASK_ENTITY,
} from 'ez-utils';

import { TaskKafkaService } from './services/task-kafka.service';

@Controller('tasks')
export class TaskController {
  private logger = getLoggerConfig(TaskController.name);

  constructor(private readonly taskKafkaService: TaskKafkaService) {
    this.logger.debug(
      `${TaskController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_TASK_ENTITY)
  async createTaskWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_CREATE_TASK_ENTITY}`,
      '',
      'createTaskWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.createTaskEntity(message, key);
  }

  @MessagePattern(KT_UPDATE_TASK_ENTITY)
  async updateTaskWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_UPDATE_TASK_ENTITY}`,
      '',
      'updateTaskWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.updateTaskEntity(message, key);
  }

  @MessagePattern(KT_DELETE_TASK_ENTITY)
  async deleteTaskWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_DELETE_TASK_ENTITY}`,
      '',
      'deleteTaskWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.deleteTaskEntity(message, key);
  }

  @MessagePattern(KT_GET_TASK_ENTITY)
  async getTaskWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_TASK_ENTITY}`,
      '',
      'getTaskWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.getTaskEntity(message, key);
  }

  @MessagePattern(KT_GET_MANY_TASKS)
  async getManyTasksWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_TASKS}`,
      '',
      'getManyTasksWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.getManyTasks(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_TASK_ENTITY)
  async getHistoryOfTaskWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_HISTORY_TASK_ENTITY}`,
      '',
      'getHistoryOfTaskWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskKafkaService.getHistoryOfTaskEntity(message, key);
  }
}
