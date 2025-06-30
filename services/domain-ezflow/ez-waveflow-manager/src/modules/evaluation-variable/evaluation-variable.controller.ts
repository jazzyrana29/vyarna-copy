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
  KT_CREATE_EVALUATION_VARIABLE_ENTITY,
  KT_GET_EVALUATION_VARIABLE_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES,
  KT_UPDATE_EVALUATION_VARIABLE_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_ENTITY,
  KT_FUZZY_SEARCH_EVALUATION_VARIABLES,
} from 'ez-utils';

import { EvaluationVariableKafkaService } from './services/evaluation-variable-kafka.service';

@Controller('evaluation-variable')
export class EvaluationVariableController {
  private logger = getLoggerConfig(EvaluationVariableController.name);

  constructor(
    private readonly evaluationVariableKafkaService: EvaluationVariableKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_EVALUATION_VARIABLE_ENTITY)
  async createEvaluationVariableWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EVALUATION_VARIABLE_ENTITY}`,
      '',
      'createEvaluationVariableWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.createEvaluationVariableEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_EVALUATION_VARIABLE_ENTITY)
  async updateEvaluationVariableWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EVALUATION_VARIABLE_ENTITY}`,
      '',
      'updateEvaluationVariableWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.updateEvaluationVariableEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_EVALUATION_VARIABLE_ENTITY)
  async deleteEvaluationVariableWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_EVALUATION_VARIABLE_ENTITY}`,
      '',
      'deleteEvaluationVariableWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.deleteEvaluationVariableEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_EVALUATION_VARIABLE_ENTITY)
  async getEvaluationVariableWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EVALUATION_VARIABLE_ENTITY}`,
      '',
      'getEvaluationVariableWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.getEvaluationVariableEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_VARIABLES)
  async getManyEvaluationVariablesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_VARIABLES}`,
      '',
      'getManyEvaluationVariablesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.getManyEvaluationVariables(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY)
  async getHistoryOfEvaluationVariableWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY}`,
      '',
      'getHistoryOfEvaluationVariableWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.getHistoryOfEvaluationVariableEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_FUZZY_SEARCH_EVALUATION_VARIABLES)
  async fuzzySearchEvaluationVariablesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_EVALUATION_VARIABLES}`,
      '',
      'fuzzySearchEvaluationVariablesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableKafkaService.fuzzySearchEvaluationVariables(
      message,
      key,
    );
  }
}
