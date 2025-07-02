import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { KT_GET_MANY_TASK_TYPES, KT_GET_ONE_TASK_TYPE } from 'ez-utils';

import { TaskTypeKafkaService } from './services/task-type-kafka.service';

@Controller('task-type')
export class TaskTypeController {
  private logger = getLoggerConfig(TaskTypeController.name);

  constructor(private readonly taskTypeKafkaService: TaskTypeKafkaService) {
    this.logger.debug(
      `${TaskTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_ONE_TASK_TYPE)
  async getOneTaskType(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_TASK_TYPE}`,
      '',
      'getOneTaskType',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeKafkaService.getOneTaskType(message, key);
  }

  @MessagePattern(KT_GET_MANY_TASK_TYPES)
  async getManyTaskTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_TASK_TYPES}`,
      '',
      'getManyTaskTypes',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeKafkaService.getManyTaskTypes(message, key);
  }
}
