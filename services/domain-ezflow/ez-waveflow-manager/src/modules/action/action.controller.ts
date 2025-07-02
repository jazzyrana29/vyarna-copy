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
  KT_CREATE_ACTION,
  KT_DELETE_ACTION,
  KT_FUZZY_SEARCH_ACTION_TYPES,
  KT_FUZZY_SEARCH_ACTION_VARIABLES,
  KT_GET_ONE_ACTION,
  KT_GET_ZTRACKING_ACTION,
  KT_UPDATE_ACTION,
} from 'ez-utils';

import { ActionKafkaService } from './services/action-kafka.service';

@Controller('action')
export class ActionController {
  private logger = getLoggerConfig(ActionController.name);

  constructor(private readonly actionKafkaService: ActionKafkaService) {
    this.logger.debug(
      `${ActionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_ACTION)
  async createAction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_ACTION}`,
      '',
      'createAction',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.createAction(message, key);
  }

  @MessagePattern(KT_UPDATE_ACTION)
  async updateAction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_ACTION}`,
      '',
      'updateAction',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.updateAction(message, key);
  }

  @MessagePattern(KT_DELETE_ACTION)
  async deleteAction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_ACTION}`,
      '',
      'deleteAction',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.deleteAction(message, key);
  }

  @MessagePattern(KT_GET_ONE_ACTION)
  async getAction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_ACTION}`,
      '',
      'getAction',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.getOneAction(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_ACTION)
  async getZtrackingAction(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_ACTION}`,
      '',
      'getZtrackingAction',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.getZtrackingAction(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_ACTION_TYPES)
  async fuzzySearchActionTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_ACTION_TYPES}`,
      '',
      'fuzzySearchActionTypes',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.fuzzySearchActionTypes(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_ACTION_VARIABLES)
  async fuzzySearchActionVariables(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_ACTION_VARIABLES}`,
      '',
      'fuzzySearchActionVariables',
      LogStreamLevel.DebugLight,
    );
    await this.actionKafkaService.fuzzySearchActionVariables(message, key);
  }
}
