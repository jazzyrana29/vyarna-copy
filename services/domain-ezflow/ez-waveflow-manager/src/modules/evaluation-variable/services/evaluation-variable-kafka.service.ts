import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateEvaluationVariableDto,
  DeleteEvaluationVariableDto,
  GetOneEvaluationVariableDto,
  GetManyEvaluationVariablesDto,
  GetHistoryOfEvaluationVariablesDto,
  KafkaMessageResponderService,
  KT_CREATE_EVALUATION_VARIABLE_ENTITY,
  KT_GET_EVALUATION_VARIABLE_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES,
  KT_UPDATE_EVALUATION_VARIABLE_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_ENTITY,
  UpdateEvaluationVariableDto,
  KT_FUZZY_SEARCH_EVALUATION_VARIABLES,
  FuzzySearchEvaluationVariablesDto,
} from 'ez-utils';

import { EvaluationVariableService } from './evaluation-variable.service';
import { ZtrackingEvaluationVariableService } from './ztracking-evaluation-variable.service';

@Injectable()
export class EvaluationVariableKafkaService {
  public serviceName = EvaluationVariableKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableService: EvaluationVariableService,
    private readonly ztrackingEvaluationVariableService: ZtrackingEvaluationVariableService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationVariableKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLE_ENTITY,
      message,
      key,
      async (value: CreateEvaluationVariableDto, traceId: string) =>
        await this.evaluationVariableService.createEvaluationVariable(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariableEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLE_ENTITY,
      message,
      key,
      async (value: UpdateEvaluationVariableDto, traceId: string) =>
        await this.evaluationVariableService.updateEvaluationVariable(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariableEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLE_ENTITY,
      message,
      key,
      async (value: DeleteEvaluationVariableDto, traceId: string) =>
        await this.evaluationVariableService.deleteEvaluationVariable(
          value,
          traceId,
        ),
    );
  }

  async getEvaluationVariableEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLE_ENTITY,
      message,
      key,
      async (value: GetOneEvaluationVariableDto, traceId: string) =>
        await this.evaluationVariableService.getOneEvaluationVariable(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariables(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLES,
      message,
      key,
      async (value: GetManyEvaluationVariablesDto, traceId: string) =>
        await this.evaluationVariableService.getManyEvaluationVariables(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfEvaluationVariableEntity(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY,
      message,
      key,
      async (value: GetHistoryOfEvaluationVariablesDto, traceId: string) =>
        await this.ztrackingEvaluationVariableService.findZtrackingEvaluationVariableEntity(
          value,
          traceId,
        ),
    );
  }

  async fuzzySearchEvaluationVariables(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_EVALUATION_VARIABLES,
      message,
      key,
      async (value: FuzzySearchEvaluationVariablesDto, traceId: string) =>
        await this.evaluationVariableService.fuzzySearchEvaluationVariables(
          value,
          traceId,
        ),
    );
  }
}
