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
  KT_FUZZY_SEARCH_WAVE_TYPES,
  KT_GET_MANY_WAVE_TYPES,
  KT_GET_ONE_WAVE_TYPE,
} from 'ez-utils';

import { WaveTypeKafkaService } from './services/wave-type-kafka.service';

@Controller('wave-type')
export class WaveTypeController {
  private logger = getLoggerConfig(WaveTypeController.name);

  constructor(private readonly waveTypeKafkaService: WaveTypeKafkaService) {
    this.logger.debug(
      `${WaveTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_ONE_WAVE_TYPE)
  async getOneWaveType(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_WAVE_TYPE}`,
      '',
      'getOneWaveType',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeKafkaService.getOneWaveType(message, key);
  }

  @MessagePattern(KT_GET_MANY_WAVE_TYPES)
  async getManyWaveTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_WAVE_TYPES}`,
      '',
      'getManyWaveTypes',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeKafkaService.getManyWaveTypes(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_WAVE_TYPES)
  async fuzzySearchWaveTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_WAVE_TYPES}`,
      '',
      'fuzzySearchWaveTypes',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeKafkaService.fuzzySearchWaveTypes(message, key);
  }
}
