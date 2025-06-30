import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateEvaluationVariablesAreAvailableForWaveTypesDto,
  UpdateEvaluationVariablesAreAvailableForWaveTypesDto,
  DeleteEvaluationVariablesAreAvailableForWaveTypesDto,
  GetOneEvaluationVariablesAreAvailableForWaveTypesDto,
  GetManyEvaluationVariablesAreAvailableForWaveTypesDto,
  GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto,
  KafkaMessageResponderService,
  KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES,
  KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
} from 'ez-utils';

import { EvaluationVariablesAreAvailableForWaveTypesService } from './evaluation-variables-are-available-for-wave-types.service';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './ztracking-evaluation-variables-are-available-for-wave-types.service';

@Injectable()
export class EvaluationVariablesAreAvailableForWaveTypesKafkaService {
  public serviceName =
    EvaluationVariablesAreAvailableForWaveTypesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly evaluationVariablesService: EvaluationVariablesAreAvailableForWaveTypesService,
    private readonly ztrackingService: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariablesAreAvailableForWaveTypesEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
      message,
      key,
      async (
        value: CreateEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariablesService.createEvaluationVariablesAreAvailableForWaveTypesEntity(
          value,
          traceId,
        ),
    );
  }

  async updateEvaluationVariablesAreAvailableForWaveTypesEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
      message,
      key,
      async (
        value: UpdateEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariablesService.updateEvaluationVariablesAreAvailableForWaveTypesEntity(
          value,
          traceId,
        ),
    );
  }

  async deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
      message,
      key,
      async (
        value: DeleteEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariablesService.deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
          value,
          traceId,
        ),
    );
  }

  async getEvaluationVariablesAreAvailableForWaveTypesEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
      message,
      key,
      async (
        value: GetOneEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariablesService.getOneEvaluationVariablesAreAvailableForWaveTypesEntity(
          value,
          traceId,
        ),
    );
  }

  async getManyEvaluationVariablesAreAvailableForWaveTypes(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES,
      message,
      key,
      async (
        value: GetManyEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) =>
        await this.evaluationVariablesService.getManyEvaluationVariablesAreAvailableForWaveTypesEntities(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfEvaluationVariablesAreAvailableForWaveTypesEntity(
    message: any,
    key: string,
  ) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
      message,
      key,
      async (
        value: GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto,
        traceId: string,
      ) => await this.ztrackingService.findZtrackingEntities(value, traceId),
    );
  }
}
