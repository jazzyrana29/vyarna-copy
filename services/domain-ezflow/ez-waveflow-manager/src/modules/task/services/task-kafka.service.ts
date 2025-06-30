import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateTaskDto,
  UpdateTaskDto,
  DeleteTaskDto,
  GetOneTaskDto,
  GetManyTasksDto,
  GetHistoryTaskDto,
  KafkaMessageResponderService,
  KT_CREATE_TASK_ENTITY,
  KT_UPDATE_TASK_ENTITY,
  KT_DELETE_TASK_ENTITY,
  KT_GET_TASK_ENTITY,
  KT_GET_MANY_TASKS,
  KT_GET_HISTORY_TASK_ENTITY,
} from 'ez-utils';

import { TaskService } from './task.service';
import { ZtrackingTaskService } from './ztracking-task.service';

@Injectable()
export class TaskKafkaService {
  public serviceName = TaskKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly taskService: TaskService,
    private readonly ztrackingTaskService: ZtrackingTaskService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TaskKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTaskEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_TASK_ENTITY,
      message,
      key,
      async (value: CreateTaskDto, traceId: string) =>
        await this.taskService.createTask(value, traceId),
    );
  }

  async updateTaskEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_TASK_ENTITY,
      message,
      key,
      async (value: UpdateTaskDto, traceId: string) =>
        await this.taskService.updateTask(value, traceId),
    );
  }

  async deleteTaskEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_TASK_ENTITY,
      message,
      key,
      async (value: DeleteTaskDto, traceId: string) =>
        await this.taskService.deleteTask(value, traceId),
    );
  }

  async getTaskEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TASK_ENTITY,
      message,
      key,
      async (value: GetOneTaskDto, traceId: string) =>
        await this.taskService.getOneTask(value, traceId),
    );
  }

  async getManyTasks(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_TASKS,
      message,
      key,
      async (value: GetManyTasksDto, traceId: string) =>
        await this.taskService.getManyTasks(value, traceId),
    );
  }

  async getHistoryOfTaskEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_TASK_ENTITY,
      message,
      key,
      async (value: GetHistoryTaskDto, traceId: string) =>
        await this.ztrackingTaskService.findZtrackingTaskEntity(value, traceId),
    );
  }
}
