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
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
} from 'ez-utils';

import { EvaluationVariableCollectionPortfolioKafkaService } from './services/evaluation-variable-collection-portfolio-kafka.service';

@Controller('evaluation-variable-collection-portfolio')
export class EvaluationVariableCollectionPortfolioController {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionPortfolioController.name,
  );

  constructor(
    private readonly evaluationVariableCollectionPortfolioKafkaService: EvaluationVariableCollectionPortfolioKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionPortfolioController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY)
  async createEvaluationVariableCollectionPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY}`,
      '',
      'createEvaluationVariableCollectionPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.createEvaluationVariableCollectionPortfolioEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY)
  async updateEvaluationVariableCollectionPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY}`,
      '',
      'updateEvaluationVariableCollectionPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.updateEvaluationVariableCollectionPortfolioEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY)
  async deleteEvaluationVariableCollectionPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY}`,
      '',
      'deleteEvaluationVariableCollectionPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.deleteEvaluationVariableCollectionPortfolioEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY)
  async getEvaluationVariableCollectionPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY}`,
      '',
      'getEvaluationVariableCollectionPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.getEvaluationVariableCollectionPortfolioEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS)
  async getManyEvaluationVariableCollectionPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS}`,
      '',
      'getManyEvaluationVariableCollectionPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.getManyEvaluationVariableCollectionPortfolios(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  )
  async getHistoryOfEvaluationVariableCollectionPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY}`,
      '',
      'getHistoryOfEvaluationVariableCollectionPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionPortfolioKafkaService.getHistoryOfEvaluationVariableCollectionPortfolioEntity(
      message,
      key,
    );
  }
}
