import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateEvaluationVariableCollectionDto,
  GetOneEvaluationVariableCollectionDto,
  GetManyEvaluationVariableCollectionsDto,
  GetHistoryOfEvaluationVariableCollectionsDto,
  KafkaMessageResponderService,
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  UpdateEvaluationVariableCollectionDto,
  DeleteEvaluationVariableCollectionDto,
} from 'ez-utils';

import { EvaluationVariableCollectionService } from './evaluation-variable-collection.service';
import { ZtrackingEvaluationVariableCollectionService } from './ztracking-evaluation-variable-collection.service';

@Injectable()
export class EvaluationVariableCollectionKafkaService {
  public serviceName = EvaluationVariableCollectionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariableCollectionService: EvaluationVariableCollectionService,
    private readonly ztrackingEvaluationVariableCollectionService: ZtrackingEvaluationVariableCollectionService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EvaluationVariableCollectionKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollectionEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
      message,
      key,
      async (value: CreateEvaluationVariableCollectionDto, traceId: string) =>
        await this.evaluationVariableCollectionService.createEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariableCollectionEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
      message,
      key,
      async (value: UpdateEvaluationVariableCollectionDto, traceId: string) =>
        await this.evaluationVariableCollectionService.updateEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariableCollectionEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
      message,
      key,
      async (value: DeleteEvaluationVariableCollectionDto, traceId: string) =>
        await this.evaluationVariableCollectionService.deleteEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async getEvaluationVariableCollectionEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY,
      message,
      key,
      async (value: GetOneEvaluationVariableCollectionDto, traceId: string) =>
        await this.evaluationVariableCollectionService.getOneEvaluationVariableCollection(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariableCollections(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS,
      message,
      key,
      async (value: GetManyEvaluationVariableCollectionsDto, traceId: string) =>
        await this.evaluationVariableCollectionService.getManyEvaluationVariableCollections(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfEvaluationVariableCollectionEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY,
      message,
      key,
      async (
        value: GetHistoryOfEvaluationVariableCollectionsDto,
        traceId: string,
      ) =>
        await this.ztrackingEvaluationVariableCollectionService.findZtrackingEvaluationVariableCollectionEntity(
          value,
          traceId,
        ),
    );
  }
}
