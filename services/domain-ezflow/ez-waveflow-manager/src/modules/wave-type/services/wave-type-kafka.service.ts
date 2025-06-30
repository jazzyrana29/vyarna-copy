import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  GetManyWaveTypesDto,
  GetOneWaveTypeDto,
  KafkaMessageResponderService,
  KT_GET_MANY_WAVE_TYPES,
  KT_GET_ONE_WAVE_TYPE,
  KT_FUZZY_SEARCH_WAVE_TYPES,
  FuzzySearchWaveTypesDto,
} from 'ez-utils';

import { WaveTypeService } from './wave-type.service';

@Injectable()
export class WaveTypeKafkaService {
  public serviceName = WaveTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly waveTypeService: WaveTypeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${WaveTypeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneWaveType(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_WAVE_TYPE,
      message,
      key,
      async (value: GetOneWaveTypeDto, traceId: string) =>
        await this.waveTypeService.getOneWaveType(value, traceId),
    );
  }

  async getManyWaveTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_WAVE_TYPES,
      message,
      key,
      async (value: GetManyWaveTypesDto, traceId: string) =>
        await this.waveTypeService.getManyWaveTypes(value, traceId),
    );
  }

  async fuzzySearchWaveTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_WAVE_TYPES,
      message,
      key,
      async (value: FuzzySearchWaveTypesDto, traceId: string) =>
        await this.waveTypeService.fuzzySearchWaveTypes(value, traceId),
    );
  }
}
