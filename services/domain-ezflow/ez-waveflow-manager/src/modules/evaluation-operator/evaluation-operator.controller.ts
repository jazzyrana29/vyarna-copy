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
  KT_FUZZY_SEARCH_EVALUATION_OPERATORS,
  KT_GET_MANY_EVALUATION_OPERATORS,
  KT_GET_ONE_EVALUATION_OPERATOR,
} from 'ez-utils';

import { EvaluationOperatorKafkaService } from './services/evaluation-operator-kafka.service';

@Controller('evaluationOperator')
export class EvaluationOperatorController {
  private logger = getLoggerConfig(EvaluationOperatorController.name);

  constructor(
    private readonly evaluationOperatorKafkaService: EvaluationOperatorKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationOperatorController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_ONE_EVALUATION_OPERATOR)
  async getOneEvaluationOperator(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_EVALUATION_OPERATOR}`,
      '',
      'getOneEvaluationOperator',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationOperatorKafkaService.getOneEvaluationOperator(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_OPERATORS)
  async getManyEvaluationOperators(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_OPERATORS}`,
      '',
      'getManyEvaluationOperators',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationOperatorKafkaService.getManyEvaluationOperators(
      message,
      key,
    );
  }

  @MessagePattern(KT_FUZZY_SEARCH_EVALUATION_OPERATORS)
  async fuzzySearchEvaluationOperators(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_EVALUATION_OPERATORS}`,
      '',
      'fuzzySearchEvaluationOperators',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationOperatorKafkaService.fuzzySearchEvaluationOperators(
      message,
      key,
    );
  }
}
