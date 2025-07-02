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
  KT_CREATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_DELETE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_GET_ONE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_GET_ZTRACKING_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_UPDATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
} from 'ez-utils';

import { WaveTypeGenreCanUtilizeBusinessUnitKafkaService } from './services/wave-type-genre-can-utilize-business-unit-kafka.service';

@Controller('wave-type-genre-can-utilize-business-unit')
export class WaveTypeGenreCanUtilizeBusinessUnitController {
  private logger = getLoggerConfig(
    WaveTypeGenreCanUtilizeBusinessUnitController.name,
  );

  constructor(
    private readonly waveTypeGenreCanUtilizeBusinessUnitKafkaService: WaveTypeGenreCanUtilizeBusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${WaveTypeGenreCanUtilizeBusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT)
  async createWaveTypeGenreCanUtilizeBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT}`,
      '',
      'createWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreCanUtilizeBusinessUnitKafkaService.createWaveTypeGenreCanUtilizeBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT)
  async updateWaveTypeGenreCanUtilizeBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT}`,
      '',
      'updateWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreCanUtilizeBusinessUnitKafkaService.updateWaveTypeGenreCanUtilizeBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT)
  async deleteWaveTypeGenreCanUtilizeBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT}`,
      '',
      'deleteWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreCanUtilizeBusinessUnitKafkaService.deleteWaveTypeGenreCanUtilizeBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ONE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT)
  async getWaveTypeGenreCanUtilizeBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT}`,
      '',
      'getWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreCanUtilizeBusinessUnitKafkaService.getOneWaveTypeGenreCanUtilizeBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ZTRACKING_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT)
  async getZtrackingWaveTypeGenreCanUtilizeBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT}`,
      '',
      'getZtrackingWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreCanUtilizeBusinessUnitKafkaService.getZtrackingWaveTypeGenreCanUtilizeBusinessUnit(
      message,
      key,
    );
  }
}
