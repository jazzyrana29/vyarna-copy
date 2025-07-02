import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateActionDto,
  DeleteActionDto,
  FuzzySearchActionTypesDto,
  FuzzySearchActionVariablesDto,
  GetOneActionDto,
  GetZtrackingActionDto,
  KafkaMessageResponderService,
  KT_CREATE_ACTION,
  KT_DELETE_ACTION,
  KT_FUZZY_SEARCH_ACTION_TYPES,
  KT_FUZZY_SEARCH_ACTION_VARIABLES,
  KT_GET_ONE_ACTION,
  KT_GET_ZTRACKING_ACTION,
  KT_UPDATE_ACTION,
  UpdateActionDto,
} from 'ez-utils';

import { ActionService } from './action.service';
import { ZtrackingActionService } from './ztracking-action.service';

@Injectable()
export class ActionKafkaService {
  public serviceName = ActionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly actionService: ActionService,
    private readonly ztrackingActionService: ZtrackingActionService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${ActionKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createAction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_ACTION,
      message,
      key,
      async (value: CreateActionDto, traceId: string) =>
        await this.actionService.createAction(value, traceId),
    );
  }

  async updateAction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_ACTION,
      message,
      key,
      async (value: UpdateActionDto, traceId: string) =>
        await this.actionService.updateAction(value, traceId),
    );
  }

  async deleteAction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_ACTION,
      message,
      key,
      async (value: DeleteActionDto, traceId: string) =>
        await this.actionService.deleteAction(value, traceId),
    );
  }

  async getOneAction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_ACTION,
      message,
      key,
      async (value: GetOneActionDto, traceId: string) =>
        await this.actionService.getOneAction(value, traceId),
    );
  }

  async getZtrackingAction(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_ACTION,
      message,
      key,
      async (value: GetZtrackingActionDto, traceId: string) =>
        await this.ztrackingActionService.getZtrackingForAction(value, traceId),
    );
  }

  async fuzzySearchActionTypes(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_ACTION_TYPES,
      message,
      key,
      async (value: FuzzySearchActionTypesDto, traceId: string) =>
        await this.actionService.fuzzySearchActionTypes(value, traceId),
    );
  }

  async fuzzySearchActionVariables(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_ACTION_VARIABLES,
      message,
      key,
      async (value: FuzzySearchActionVariablesDto, traceId: string) =>
        await this.actionService.fuzzySearchActionVariables(value, traceId),
    );
  }
}
