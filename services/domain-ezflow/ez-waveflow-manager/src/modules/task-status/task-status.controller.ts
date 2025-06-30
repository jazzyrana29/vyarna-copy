import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { KT_GET_TASK_STATUS, KT_GET_MANY_TASK_STATUSES } from 'ez-utils';

import { TaskStatusKafkaService } from './services/task-status-kafka.service';

@Controller('task-status')
export class TaskStatusController {
  private logger = getLoggerConfig(TaskStatusController.name);

  constructor(private readonly taskStatusKafkaService: TaskStatusKafkaService) {
    this.logger.debug(
      `${TaskStatusController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_TASK_STATUS)
  async getTaskStatusWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_TASK_STATUS}`,
      '',
      'getTaskStatusWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskStatusKafkaService.getTaskStatus(message, key);
  }

  @MessagePattern(KT_GET_MANY_TASK_STATUSES)
  async getManyTaskStatusesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_TASK_STATUSES}`,
      '',
      'getManyTaskStatusesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.taskStatusKafkaService.getManyTaskStatuses(message, key);
  }
}
