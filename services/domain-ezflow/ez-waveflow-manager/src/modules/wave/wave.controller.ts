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
  KT_CREATE_WAVE_ENTITY,
  KT_UPDATE_WAVE_ENTITY,
  KT_DELETE_WAVE_ENTITY,
  KT_GET_WAVE_ENTITY,
  KT_GET_MANY_WAVES,
  KT_GET_HISTORY_WAVE_ENTITY,
  KT_EXECUTE_WAVE_ENTITY,
} from 'ez-utils';

import { WaveKafkaService } from './services/wave-kafka.service';

@Controller('waves')
export class WaveController {
  private logger = getLoggerConfig(WaveController.name);

  constructor(private readonly waveKafkaService: WaveKafkaService) {
    this.logger.debug(
      `${WaveController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WAVE_ENTITY)
  async createWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_CREATE_WAVE_ENTITY}`,
      '',
      'createWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.createWaveEntity(message, key);
  }

  @MessagePattern(KT_UPDATE_WAVE_ENTITY)
  async updateWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_UPDATE_WAVE_ENTITY}`,
      '',
      'updateWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.updateWaveEntity(message, key);
  }

  @MessagePattern(KT_DELETE_WAVE_ENTITY)
  async deleteWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_DELETE_WAVE_ENTITY}`,
      '',
      'deleteWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.deleteWaveEntity(message, key);
  }

  @MessagePattern(KT_GET_WAVE_ENTITY)
  async getWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_WAVE_ENTITY}`,
      '',
      'getWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.getWaveEntity(message, key);
  }

  @MessagePattern(KT_GET_MANY_WAVES)
  async getManyWavesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_MANY_WAVES}`,
      '',
      'getManyWavesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.getManyWaves(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_WAVE_ENTITY)
  async getHistoryOfWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_GET_HISTORY_WAVE_ENTITY}`,
      '',
      'getHistoryOfWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.getHistoryOfWave(message, key);
  }

  @MessagePattern(KT_EXECUTE_WAVE_ENTITY)
  async executeWaveWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_EXECUTE_WAVE_ENTITY}`,
      '',
      'executeWaveWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.waveKafkaService.executeWaveEntity(message, key);
  }
}
