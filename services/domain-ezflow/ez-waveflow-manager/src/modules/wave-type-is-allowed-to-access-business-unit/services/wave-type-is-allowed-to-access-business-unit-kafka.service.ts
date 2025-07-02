import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateWaveTypeIsAllowedToAccessBusinessUnitDto,
  DeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
  GetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
  GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
  KafkaMessageResponderService,
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
  UpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
} from 'ez-utils';

import { WaveTypeIsAllowedToAccessBusinessUnitService } from './wave-type-is-allowed-to-access-business-unit.service';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './ztracking-wave-type-is-allowed-to-access-business-unit.service';

@Injectable()
export class WaveTypeIsAllowedToAccessBusinessUnitKafkaService {
  public serviceName = WaveTypeIsAllowedToAccessBusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly waveTypeIsAllowedToAccessBusinessUnitService: WaveTypeIsAllowedToAccessBusinessUnitService,
    private readonly ztrackingWaveTypeIsAllowedToAccessBusinessUnitService: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${WaveTypeIsAllowedToAccessBusinessUnitKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWaveTypeIsAllowedToAccessBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MANIFOLD,
      message,
      key,
      async (
        value: CreateWaveTypeIsAllowedToAccessBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeIsAllowedToAccessBusinessUnitService.createWaveTypeIsAllowedToAccessBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async updateWaveTypeIsAllowedToAccessBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_MANIFOLD,
      message,
      key,
      async (
        value: UpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeIsAllowedToAccessBusinessUnitService.updateWaveTypeIsAllowedToAccessBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async deleteWaveTypeIsAllowedToAccessBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_MANIFOLD,
      message,
      key,
      async (
        value: DeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeIsAllowedToAccessBusinessUnitService.deleteWaveTypeIsAllowedToAccessBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getOneWaveTypeIsAllowedToAccessBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_MANIFOLD,
      message,
      key,
      async (
        value: GetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
        traceId: string,
      ) =>
        await this.waveTypeIsAllowedToAccessBusinessUnitService.getOneWaveTypeIsAllowedToAccessBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingWaveTypeIsAllowedToAccessBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_MANIFOLD,
      message,
      key,
      async (
        value: GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
        traceId: string,
      ) =>
        await this.ztrackingWaveTypeIsAllowedToAccessBusinessUnitService.getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
          value,
          traceId,
        ),
    );
  }
}
