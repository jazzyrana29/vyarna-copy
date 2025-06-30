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
  KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
} from 'ez-utils';

import { EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService } from './services/evaluation-variable-collections-are-presented-through-portfolios-kafka.service';

@Controller('evaluation-variable-collections-are-presented-through-portfolios')
export class EvaluationVariableCollectionsArePresentedThroughPortfoliosController {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionsArePresentedThroughPortfoliosController.name,
  );

  constructor(
    private readonly evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService: EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionsArePresentedThroughPortfoliosController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(
    KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async createEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'createEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.createEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async updateEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'updateEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.updateEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async deleteEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'deleteEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.deleteEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async getEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'getEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.getEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
  )
  async getManyEvaluationVariableCollectionsArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS}`,
      '',
      'getManyEvaluationVariableCollectionsArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async getHistoryOfEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'getHistoryOfEvaluationVariableCollectionArePresentedThroughPortfoliosWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.getHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async addEvaluationVariableCollectionFromPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'addEvaluationVariableCollectionFromPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.addEvaluationVariableCollectionFromPortfolioEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  )
  async removeEvaluationVariableCollectionFromPortfolioWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY}`,
      '',
      'removeEvaluationVariableCollectionFromPortfolioWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService.removeEvaluationVariableCollectionFromPortfolioEntity(
      message,
      key,
    );
  }
}
