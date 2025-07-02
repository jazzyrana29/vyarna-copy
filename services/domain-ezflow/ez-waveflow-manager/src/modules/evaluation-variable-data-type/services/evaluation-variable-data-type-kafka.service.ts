import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';

import {
  GetEvaluationVariableDataTypeDto,
  GetManyEvaluationVariableDataTypesDto,
  KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES,
  KT_GET_EVALUATION_VARIABLE_DATA_TYPE,
  KT_FUZZY_SEARCH_EVALUATION_VARIABLE_DATA_TYPES,
  KafkaMessageResponderService,
  FuzzySearchEvaluationVariableDataTypesDto,
} from 'ez-utils';

import { EvaluationVariableDataTypeService } from './evaluation-variable-data-type.service';

@Injectable()
export class EvaluationVariableDataTypeKafkaService {
  private serviceName = EvaluationVariableDataTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableDataTypeService: EvaluationVariableDataTypeService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async getEvaluationVariableDataType(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLE_DATA_TYPE,
      message,
      key,
      async (value: GetEvaluationVariableDataTypeDto, traceId: string) =>
        await this.evaluationVariableDataTypeService.findEvaluationVariableDataType(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariableDataTypes(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES,
      message,
      key,
      async (value: GetManyEvaluationVariableDataTypesDto, traceId: string) =>
        await this.evaluationVariableDataTypeService.getManyEvaluationVariableDataTypes(
          value,
          traceId,
        ),
    );
  }

  async fuzzySearchEvaluationVariableDataTypes(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_EVALUATION_VARIABLE_DATA_TYPES,
      message,
      key,
      async (
        value: FuzzySearchEvaluationVariableDataTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariableDataTypeService.fuzzySearchEvaluationVariableDataTypes(
          value,
          traceId,
        ),
    );
  }
}
