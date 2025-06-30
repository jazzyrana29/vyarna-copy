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
  KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
} from 'ez-utils';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService } from './services/evaluation-variable-is-grouped-through-evaluation-variable-collection-kafka.service';

@Controller('evaluationVariableIsGroupedThroughEvaluationVariableCollection')
export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionController {
  private logger = getLoggerConfig(
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionController.name,
  );

  constructor(
    private readonly evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariableIsGroupedThroughEvaluationVariableCollectionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(
    KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  )
  async createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION}`,
      '',
      'createEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  )
  async updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION}`,
      '',
      'updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  )
  async deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION}`,
      '',
      'deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  )
  async getEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION}`,
      '',
      'getEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  )
  async getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION}`,
      '',
      'getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
      message,
      key,
    );
  }

  @MessagePattern(KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION)
  async addEvaluationVariableToCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION}`,
      '',
      'addEvaluationVariableToCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.addEvaluationVariableToCollection(
      message,
      key,
    );
  }

  @MessagePattern(KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION)
  async removeEvaluationVariableToCollection(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION}`,
      '',
      'removeEvaluationVariableToCollection',
      LogStreamLevel.DebugLight,
    );
    await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.removeEvaluationVariableToCollection(
      message,
      key,
    );
  }
}
