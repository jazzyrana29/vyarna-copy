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
  KT_FUZZY_SEARCH_EVALUATION_VARIABLE_DATA_TYPES,
  KT_GET_EVALUATION_VARIABLE_DATA_TYPE,
  KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES,
} from 'ez-utils';

import { EvaluationVariableDataTypeKafkaService } from './services/evaluation-variable-data-type-kafka.service';

@Controller('evaluation-variable-data-type')
export class EvaluationVariableDataTypeController {
  private logger = getLoggerConfig(EvaluationVariableDataTypeController.name);

  constructor(
    private readonly evaluationVariableDataTypeKafkaService: EvaluationVariableDataTypeKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableDataTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_EVALUATION_VARIABLE_DATA_TYPE)
  async getEvaluationVariableDataTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EVALUATION_VARIABLE_DATA_TYPE}`,
      '',
      'getEvaluationVariableDataTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableDataTypeKafkaService.getEvaluationVariableDataType(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES)
  async getManyEvaluationVariableDataTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES}`,
      '',
      'getManyEvaluationVariableDataTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableDataTypeKafkaService.getManyEvaluationVariableDataTypes(
      message,
      key,
    );
  }

  @MessagePattern(KT_FUZZY_SEARCH_EVALUATION_VARIABLE_DATA_TYPES)
  async fuzzySearchEvaluationVariableDataTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_EVALUATION_VARIABLE_DATA_TYPES}`,
      '',
      'fuzzySearchEvaluationVariableDataTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableDataTypeKafkaService.fuzzySearchEvaluationVariableDataTypes(
      message,
      key,
    );
  }
}
