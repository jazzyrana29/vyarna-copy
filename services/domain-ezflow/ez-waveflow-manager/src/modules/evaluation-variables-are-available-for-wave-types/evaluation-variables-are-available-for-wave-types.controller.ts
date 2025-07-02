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
  KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES,
  KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
} from 'ez-utils';

import { EvaluationVariablesAreAvailableForWaveTypesKafkaService } from './services/evaluation-variables-are-available-for-wave-types-kafka.service';

@Controller('evaluation-variables-are-available-for-wave-types')
export class EvaluationVariablesAreAvailableForWaveTypesController {
  private logger = getLoggerConfig(
    EvaluationVariablesAreAvailableForWaveTypesController.name,
  );

  constructor(
    private readonly kafkaService: EvaluationVariablesAreAvailableForWaveTypesKafkaService,
  ) {
    this.logger.debug(
      `${EvaluationVariablesAreAvailableForWaveTypesController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(
    KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  )
  async createEvaluationVariablesAreAvailableForWaveTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY}`,
      '',
      'createEvaluationVariablesAreAvailableForWaveTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.createEvaluationVariablesAreAvailableForWaveTypesEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  )
  async updateEvaluationVariablesAreAvailableForWaveTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY}`,
      '',
      'updateEvaluationVariablesAreAvailableForWaveTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.updateEvaluationVariablesAreAvailableForWaveTypesEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  )
  async deleteEvaluationVariablesAreAvailableForWaveTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY}`,
      '',
      'deleteEvaluationVariablesAreAvailableForWaveTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  )
  async getEvaluationVariablesAreAvailableForWaveTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY}`,
      '',
      'getEvaluationVariablesAreAvailableForWaveTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getEvaluationVariablesAreAvailableForWaveTypesEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES)
  async getManyEntitiesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES}`,
      '',
      'getManyEntitiesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getManyEvaluationVariablesAreAvailableForWaveTypes(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  )
  async getHistoryWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY}`,
      '',
      'getHistoryWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getHistoryOfEvaluationVariablesAreAvailableForWaveTypesEntity(
      message,
      key,
    );
  }
}
