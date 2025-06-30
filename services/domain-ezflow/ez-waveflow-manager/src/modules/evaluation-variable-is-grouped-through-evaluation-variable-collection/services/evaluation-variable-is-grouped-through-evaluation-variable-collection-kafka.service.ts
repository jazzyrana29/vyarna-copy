import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  AddEvaluationVariableToCollectionDto,
  CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  KafkaMessageResponderService,
  KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  RemoveEvaluationVariableToCollectionDto,
  UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from 'ez-utils';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';

@Injectable()
export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService {
  public serviceName =
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableIsGroupedThroughEvaluationVariableCollectionService: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
    private readonly ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
      message,
      key,
      async (
        value: CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        traceId: string,
      ) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
      message,
      key,
      async (
        value: UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        traceId: string,
      ) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
      message,
      key,
      async (
        value: DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        traceId: string,
      ) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
      message,
      key,
      async (
        value: GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        traceId: string,
      ) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
      message,
      key,
      async (
        value: GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        traceId: string,
      ) =>
        await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async addEvaluationVariableToCollection(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION,
      message,
      key,
      async (value: AddEvaluationVariableToCollectionDto, traceId: string) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.addEvaluationVariableToCollection(
          value,
          traceId,
        ),
    );
  }

  async removeEvaluationVariableToCollection(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION,
      message,
      key,
      async (value: RemoveEvaluationVariableToCollectionDto, traceId: string) =>
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionService.removeEvaluationVariableToCollection(
          value,
          traceId,
        ),
    );
  }
}
