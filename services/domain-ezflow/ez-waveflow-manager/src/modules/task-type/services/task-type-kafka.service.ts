import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  GetManyTaskTypesDto,
  GetOneTaskTypeDto,
  KafkaMessageResponderService,
  KT_GET_MANY_TASK_TYPES,
  KT_GET_ONE_TASK_TYPE,
} from 'ez-utils';

import { TaskTypeService } from './task-type.service';

@Injectable()
export class TaskTypeKafkaService {
  public serviceName = TaskTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly taskTypeService: TaskTypeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TaskTypeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneTaskType(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_TASK_TYPE,
      message,
      key,
      async (value: GetOneTaskTypeDto, traceId: string) =>
        await this.taskTypeService.getOneTaskType(value, traceId),
    );
  }

  async getManyTaskTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_TASK_TYPES,
      message,
      key,
      async (value: GetManyTaskTypesDto, traceId: string) =>
        await this.taskTypeService.getManyTaskTypes(value, traceId),
    );
  }
}
