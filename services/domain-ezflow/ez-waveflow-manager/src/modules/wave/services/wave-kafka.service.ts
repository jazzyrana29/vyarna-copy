import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateWaveDto,
  UpdateWaveDto,
  DeleteWaveDto,
  GetWaveDto,
  GetManyWavesDto,
  GetHistoryWaveDto,
  KafkaMessageResponderService,
  KT_CREATE_WAVE_ENTITY,
  KT_UPDATE_WAVE_ENTITY,
  KT_DELETE_WAVE_ENTITY,
  KT_GET_WAVE_ENTITY,
  KT_GET_MANY_WAVES,
  KT_GET_HISTORY_WAVE_ENTITY,
  KT_EXECUTE_WAVE_ENTITY,
  ExecuteWaveDto,
} from 'ez-utils';

import { WaveService } from './wave.service';
import { ZtrackingWaveService } from './ztracking-wave.service';

@Injectable()
export class WaveKafkaService {
  public serviceName = WaveKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly waveService: WaveService,
    private readonly ztrackingWaveService: ZtrackingWaveService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${WaveKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWaveEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_WAVE_ENTITY,
      message,
      key,
      async (value: CreateWaveDto, traceId: string) =>
        await this.waveService.createWave(value, traceId),
    );
  }

  async updateWaveEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_WAVE_ENTITY,
      message,
      key,
      async (value: UpdateWaveDto, traceId: string) =>
        await this.waveService.updateWave(value, traceId),
    );
  }

  async deleteWaveEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_WAVE_ENTITY,
      message,
      key,
      async (value: DeleteWaveDto, traceId: string) =>
        await this.waveService.deleteWave(value, traceId),
    );
  }

  async getWaveEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_WAVE_ENTITY,
      message,
      key,
      async (value: GetWaveDto, traceId: string) =>
        await this.waveService.getOneWave(value, traceId),
    );
  }

  async getManyWaves(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_WAVES,
      message,
      key,
      async (value: GetManyWavesDto, traceId: string) =>
        await this.waveService.getManyWaves(value, traceId),
    );
  }

  async getHistoryOfWave(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_WAVE_ENTITY,
      message,
      key,
      async (value: GetHistoryWaveDto, traceId: string) =>
        await this.ztrackingWaveService.findZtrackingWaveEntity(value, traceId),
    );
  }

  async executeWaveEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_EXECUTE_WAVE_ENTITY,
      message,
      key,
      async (value: ExecuteWaveDto, traceId: string) =>
        await this.waveService.executeWave(value, traceId),
    );
  }
}
