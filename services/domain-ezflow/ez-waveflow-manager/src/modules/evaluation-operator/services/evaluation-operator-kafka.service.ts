import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  FuzzySearchEvaluationOperatorsDto,
  GetManyEvaluationOperatorsDto,
  GetOneEvaluationOperatorDto,
  KafkaMessageResponderService,
  KT_FUZZY_SEARCH_EVALUATION_OPERATORS,
  KT_GET_MANY_EVALUATION_OPERATORS,
  KT_GET_ONE_EVALUATION_OPERATOR,
} from 'ez-utils';

import { EvaluationOperatorService } from './evaluation-operator.service';

@Injectable()
export class EvaluationOperatorKafkaService {
  public serviceName = EvaluationOperatorKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationOperatorService: EvaluationOperatorService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationOperatorKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneEvaluationOperator(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_EVALUATION_OPERATOR,
      message,
      key,
      async (value: GetOneEvaluationOperatorDto, traceId: string) =>
        await this.evaluationOperatorService.getOneEvaluationOperator(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationOperators(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_OPERATORS,
      message,
      key,
      async (value: GetManyEvaluationOperatorsDto, traceId: string) =>
        await this.evaluationOperatorService.getManyEvaluationOperators(
          value,
          traceId,
        ),
    );
  }

  async fuzzySearchEvaluationOperators(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_EVALUATION_OPERATORS,
      message,
      key,
      async (value: FuzzySearchEvaluationOperatorsDto, traceId: string) =>
        await this.evaluationOperatorService.fuzzySearchEvaluationOperators(
          value,
          traceId,
        ),
    );
  }
}
