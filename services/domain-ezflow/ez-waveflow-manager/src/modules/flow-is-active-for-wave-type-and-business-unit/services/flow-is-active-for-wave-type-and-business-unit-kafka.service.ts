import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
  DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
  KafkaMessageResponderService,
  KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_MANY_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from 'ez-utils';

import { FlowIsActiveForWaveTypeAndBusinessUnitService } from './flow-is-active-for-wave-type-and-business-unit.service';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './ztracking-flow-is-active-for-wave-type-and-business-unit.service';

@Injectable()
export class FlowIsActiveForWaveTypeAndBusinessUnitKafkaService {
  public serviceName = FlowIsActiveForWaveTypeAndBusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly flowIsActiveForWaveTypeAndBusinessUnitService: FlowIsActiveForWaveTypeAndBusinessUnitService,
    private readonly ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FlowIsActiveForWaveTypeAndBusinessUnitKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: CreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.flowIsActiveForWaveTypeAndBusinessUnitService.createFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async updateFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.flowIsActiveForWaveTypeAndBusinessUnitService.updateFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async deleteFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.flowIsActiveForWaveTypeAndBusinessUnitService.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getOneFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.flowIsActiveForWaveTypeAndBusinessUnitService.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getManyFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.flowIsActiveForWaveTypeAndBusinessUnitService.getManyFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
      message,
      key,
      async (
        value: GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
        traceId: string,
      ) =>
        await this.ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService.getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
          value,
          traceId,
        ),
    );
  }
}
