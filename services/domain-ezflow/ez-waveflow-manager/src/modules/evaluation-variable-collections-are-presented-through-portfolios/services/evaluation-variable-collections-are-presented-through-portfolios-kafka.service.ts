import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  GetOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  GetManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  GetHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  DeleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  UpdateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  AddEvaluationVariableCollectionToPortfolioDto,
  RemoveEvaluationVariableCollectionToPortfolioDto,
  KafkaMessageResponderService,
  KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
} from 'ez-utils';

import { EvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './evaluation-variable-collections-are-presented-through-portfolios.service';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';

@Injectable()
export class EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService {
  public serviceName =
    EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableCollectionsArePresentedThroughPortfoliosService: EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
    private readonly ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService: ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: CreateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.createEvaluationVariableCollectionsArePresentedThroughPortfolios(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: UpdateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.updateEvaluationVariableCollectionsArePresentedThroughPortfolios(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: DeleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.deleteEvaluationVariableCollectionsArePresentedThroughPortfolios(
          value,
          traceId,
        ),
    );
  }

  async getEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: GetOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.getOneEvaluationVariableCollectionsArePresentedThroughPortfolios(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
      message,
      key,
      async (
        value: GetManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: GetHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
        traceId: string,
      ) =>
        await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          value,
          traceId,
        ),
    );
  }

  async addEvaluationVariableCollectionFromPortfolioEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: AddEvaluationVariableCollectionToPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.addEvaluationVariableCollectionToPortfolio(
          value,
          traceId,
        ),
    );
  }

  async removeEvaluationVariableCollectionFromPortfolioEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
      message,
      key,
      async (
        value: RemoveEvaluationVariableCollectionToPortfolioDto,
        traceId: string,
      ) =>
        await this.evaluationVariableCollectionsArePresentedThroughPortfoliosService.removeEvaluationVariableCollectionToPortfolio(
          value,
          traceId,
        ),
    );
  }
}
