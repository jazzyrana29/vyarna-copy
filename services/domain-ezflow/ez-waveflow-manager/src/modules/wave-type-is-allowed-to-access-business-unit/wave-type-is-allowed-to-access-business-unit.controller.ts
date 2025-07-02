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
  KT_CREATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_DELETE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_GET_ONE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_GET_ZTRACKING_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_UPDATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
} from 'ez-utils';

import { WaveTypeIsAllowedToAccessBusinessUnitKafkaService } from './services/wave-type-is-allowed-to-access-business-unit-kafka.service';

@Controller('wave-type-is-allowed-to-access-business-unit')
export class WaveTypeIsAllowedToAccessBusinessUnitController {
  private logger = getLoggerConfig(
    WaveTypeIsAllowedToAccessBusinessUnitController.name,
  );

  constructor(
    private readonly waveTypeIsAllowedToAccessBusinessUnitKafkaService: WaveTypeIsAllowedToAccessBusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${WaveTypeIsAllowedToAccessBusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT)
  async createWaveTypeIsAllowedToAccessBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT}`,
      '',
      'createWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeIsAllowedToAccessBusinessUnitKafkaService.createWaveTypeIsAllowedToAccessBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT)
  async updateWaveTypeIsAllowedToAccessBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT}`,
      '',
      'updateWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeIsAllowedToAccessBusinessUnitKafkaService.updateWaveTypeIsAllowedToAccessBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT)
  async deleteWaveTypeIsAllowedToAccessBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT}`,
      '',
      'deleteWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeIsAllowedToAccessBusinessUnitKafkaService.deleteWaveTypeIsAllowedToAccessBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ONE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT)
  async getWaveTypeIsAllowedToAccessBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT}`,
      '',
      'getWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeIsAllowedToAccessBusinessUnitKafkaService.getOneWaveTypeIsAllowedToAccessBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ZTRACKING_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT)
  async getZtrackingWaveTypeIsAllowedToAccessBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT}`,
      '',
      'getZtrackingWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeIsAllowedToAccessBusinessUnitKafkaService.getZtrackingWaveTypeIsAllowedToAccessBusinessUnit(
      message,
      key,
    );
  }
}
