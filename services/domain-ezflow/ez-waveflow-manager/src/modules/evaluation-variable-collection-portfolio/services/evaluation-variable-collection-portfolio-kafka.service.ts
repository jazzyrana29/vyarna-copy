import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateEvaluationVariableCollectionPortfolioDto,
  GetOneEvaluationVariableCollectionPortfolioDto,
  GetManyEvaluationVariableCollectionPortfoliosDto,
  GetHistoryOfEvaluationVariableCollectionPortfoliosDto,
  KafkaMessageResponderService,
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  UpdateEvaluationVariableCollectionPortfolioDto,
  DeleteEvaluationVariableCollectionPortfolioDto,
} from 'ez-utils';

import { EvaluationVariableCollectionPortfolioService } from './evaluation-variable-collection-portfolio.service';
import { ZtrackingEvaluationVariableCollectionPortfolioService } from './ztracking-evaluation-variable-collection-portfolio.service';

@Injectable()
export class EvaluationVariableCollectionPortfolioKafkaService {
  private serviceName = EvaluationVariableCollectionPortfolioKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableCollectionPortfolioService: EvaluationVariableCollectionPortfolioService,
    private readonly ztrackingEvaluationVariableCollectionPortfolioService: ZtrackingEvaluationVariableCollectionPortfolioService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationVariableCollectionPortfolioKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollectionPortfolioEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
      message,
      key,
      async (
        value: CreateEvaluationVariableCollectionPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionPortfolioService.createEvaluationVariableCollectionPortfolio(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariableCollectionPortfolioEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
      message,
      key,
      async (
        value: UpdateEvaluationVariableCollectionPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionPortfolioService.updateEvaluationVariableCollectionPortfolio(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariableCollectionPortfolioEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
      message,
      key,
      async (
        value: DeleteEvaluationVariableCollectionPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionPortfolioService.deleteEvaluationVariableCollectionPortfolio(
          value,
          traceId,
        ),
    );
  }

  async getEvaluationVariableCollectionPortfolioEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
      message,
      key,
      async (
        value: GetOneEvaluationVariableCollectionPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionPortfolioService.getOneEvaluationVariableCollectionPortfolio(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariableCollectionPortfolios(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS,
      message,
      key,
      async (
        value: GetManyEvaluationVariableCollectionPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionPortfolioService.getManyEvaluationVariableCollectionPortfolios(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfEvaluationVariableCollectionPortfolioEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
      message,
      key,
      async (
        value: GetHistoryOfEvaluationVariableCollectionPortfoliosDto,
        traceId: string,
      ) =>
        await this.ztrackingEvaluationVariableCollectionPortfolioService.findZtrackingEvaluationVariableCollectionPortfolioEntity(
          value,
          traceId,
        ),
    );
  }
}
