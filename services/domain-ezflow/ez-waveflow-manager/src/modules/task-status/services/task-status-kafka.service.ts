import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';

import {
  GetTaskStatusDto,
  GetManyTaskStatusesDto,
  KT_GET_TASK_STATUS,
  KT_GET_MANY_TASK_STATUSES,
  KafkaMessageResponderService,
} from 'ez-utils';

import { TaskStatusesService } from './task-status.service';

@Injectable()
export class TaskStatusKafkaService {
  private serviceName = TaskStatusKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly taskStatusesService: TaskStatusesService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async getTaskStatus(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TASK_STATUS,
      message,
      key,
      async (value: GetTaskStatusDto, traceId: string) =>
        await this.taskStatusesService.findTaskStatus(value, traceId),
    );
  }

  async getManyTaskStatuses(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_TASK_STATUSES,
      message,
      key,
      async (value: GetManyTaskStatusesDto, traceId: string) =>
        await this.taskStatusesService.getManyTaskStatus(value, traceId),
    );
  }
}
