import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

import {
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
} from 'ez-utils';

import { EvaluationVariableCollectionKafkaService } from './services/evaluation-variable-collection-kafka.service';

@Controller('evaluation-variable-collection')
export class EvaluationVariableCollectionController {
  private logger = getLoggerConfig(EvaluationVariableCollectionController.name);

  constructor(
    private readonly evaluationVariableCollectionKafkaService: EvaluationVariableCollectionKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY)
  async createEvaluationVariableCollectionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY}`,
      '',
      'createEvaluationVariableCollectionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.createEvaluationVariableCollectionEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY)
  async updateEvaluationVariableCollectionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY}`,
      '',
      'updateEvaluationVariableCollectionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.updateEvaluationVariableCollectionEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY)
  async deleteEvaluationVariableCollectionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY}`,
      '',
      'deleteEvaluationVariableCollectionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.deleteEvaluationVariableCollectionEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY)
  async getEvaluationVariableCollectionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY}`,
      '',
      'getEvaluationVariableCollectionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.getEvaluationVariableCollectionEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS)
  async getManyEvaluationVariableCollectionsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS}`,
      '',
      'getManyEvaluationVariableCollectionsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.getManyEvaluationVariableCollections(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY)
  async getHistoryOfEvaluationVariableCollectionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY}`,
      '',
      'getHistoryOfEvaluationVariableCollectionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableCollectionKafkaService.getHistoryOfEvaluationVariableCollectionEntity(
      message,
      key,
    );
  }
}
