import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateWaveTypeGenreCanUtilizeBusinessUnitDto,
  DeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
  GetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
  GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
  KafkaMessageResponderService,
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
  UpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
} from 'ez-utils';

import { WaveTypeGenreCanUtilizeBusinessUnitService } from './wave-type-genre-can-utilize-business-unit.service';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './ztracking-wave-type-genre-can-utilize-business-unit.service';

@Injectable()
export class WaveTypeGenreCanUtilizeBusinessUnitKafkaService {
  public serviceName = WaveTypeGenreCanUtilizeBusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly waveTypeGenreCanUtilizeBusinessUnitService: WaveTypeGenreCanUtilizeBusinessUnitService,
    private readonly ztrackingWaveTypeGenreCanUtilizeBusinessUnitService: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${WaveTypeGenreCanUtilizeBusinessUnitKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWaveTypeGenreCanUtilizeBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MANIFOLD,
      message,
      key,
      async (
        value: CreateWaveTypeGenreCanUtilizeBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeGenreCanUtilizeBusinessUnitService.createWaveTypeGenreCanUtilizeBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async updateWaveTypeGenreCanUtilizeBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_MANIFOLD,
      message,
      key,
      async (
        value: UpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeGenreCanUtilizeBusinessUnitService.updateWaveTypeGenreCanUtilizeBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async deleteWaveTypeGenreCanUtilizeBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_MANIFOLD,
      message,
      key,
      async (
        value: DeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeGenreCanUtilizeBusinessUnitService.deleteWaveTypeGenreCanUtilizeBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getOneWaveTypeGenreCanUtilizeBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_MANIFOLD,
      message,
      key,
      async (
        value: GetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeGenreCanUtilizeBusinessUnitService.getOneWaveTypeGenreCanUtilizeBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingWaveTypeGenreCanUtilizeBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_MANIFOLD,
      message,
      key,
      async (
        value: GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
        traceId: string,
      ) =>
        await this.ztrackingWaveTypeGenreCanUtilizeBusinessUnitService.getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
          value,
          traceId,
        ),
    );
  }
}
