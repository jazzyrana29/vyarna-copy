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
  KT_CREATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_DELETE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_GET_ONE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_GET_ZTRACKING_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_UPDATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
} from 'ez-utils';

import { TaskTypeHaveAccessToBusinessUnitKafkaService } from './services/task-type-have-access-to-business-unit-kafka.service';

@Controller('task-type-have-access-to-business-unit')
export class TaskTypeHaveAccessToBusinessUnitController {
  private logger = getLoggerConfig(
    TaskTypeHaveAccessToBusinessUnitController.name,
  );

  constructor(
    private readonly taskTypeHaveAccessToBusinessUnitKafkaService: TaskTypeHaveAccessToBusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${TaskTypeHaveAccessToBusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT)
  async createTaskTypeHaveAccessToBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT}`,
      '',
      'createTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeHaveAccessToBusinessUnitKafkaService.createTaskTypeHaveAccessToBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT)
  async updateTaskTypeHaveAccessToBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT}`,
      '',
      'updateTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeHaveAccessToBusinessUnitKafkaService.updateTaskTypeHaveAccessToBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT)
  async deleteTaskTypeHaveAccessToBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT}`,
      '',
      'deleteTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeHaveAccessToBusinessUnitKafkaService.deleteTaskTypeHaveAccessToBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ONE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT)
  async getTaskTypeHaveAccessToBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT}`,
      '',
      'getTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeHaveAccessToBusinessUnitKafkaService.getOneTaskTypeHaveAccessToBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ZTRACKING_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT)
  async getZtrackingTaskTypeHaveAccessToBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT}`,
      '',
      'getZtrackingTaskTypeHaveAccessToBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.taskTypeHaveAccessToBusinessUnitKafkaService.getZtrackingTaskTypeHaveAccessToBusinessUnit(
      message,
      key,
    );
  }
}
