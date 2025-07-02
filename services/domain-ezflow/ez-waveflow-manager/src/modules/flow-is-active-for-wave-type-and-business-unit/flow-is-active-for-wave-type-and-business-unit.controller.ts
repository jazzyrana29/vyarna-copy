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
  KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_MANY_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
} from 'ez-utils';

import { FlowIsActiveForWaveTypeAndBusinessUnitKafkaService } from './services/flow-is-active-for-wave-type-and-business-unit-kafka.service';

@Controller('flow-is-active-for-wave-type-and-business-unit')
export class FlowIsActiveForWaveTypeAndBusinessUnitController {
  private logger = getLoggerConfig(
    FlowIsActiveForWaveTypeAndBusinessUnitController.name,
  );

  constructor(
    private readonly flowIsActiveForWaveTypeAndBusinessUnitKafkaService: FlowIsActiveForWaveTypeAndBusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${FlowIsActiveForWaveTypeAndBusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT)
  async createFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'createFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.createFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT)
  async updateFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'updateFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.updateFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT)
  async deleteFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'deleteFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT)
  async getFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'getFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_MANY_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT)
  async getManyFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'getManyFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.getManyFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  )
  async getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT}`,
      '',
      'getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    await this.flowIsActiveForWaveTypeAndBusinessUnitKafkaService.getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit(
      message,
      key,
    );
  }
}
