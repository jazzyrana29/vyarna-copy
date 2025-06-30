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
  KT_CLONE_FLOW,
  KT_CREATE_FLOW,
  KT_DELETE_FLOW,
  KT_GET_MANY_FLOWS,
  KT_GET_ONE_FLOW,
  KT_GET_ZTRACKING_FLOW,
  KT_UPDATE_FLOW,
  KT_UPDATE_PUBLISH_STATUS_FLOW,
  KT_FUZZY_SEARCH_FLOWS,
} from 'ez-utils';

import { FlowKafkaService } from './services/flow-kafka.service';

@Controller('flow')
export class FlowController {
  private logger = getLoggerConfig(FlowController.name);

  constructor(private readonly flowKafkaService: FlowKafkaService) {
    this.logger.debug(
      `${FlowController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_FLOW)
  async createFlow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_FLOW}`,
      '',
      'createFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.createFlow(message, key);
  }

  @MessagePattern(KT_UPDATE_FLOW)
  async updateFlow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_FLOW}`,
      '',
      'updateFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.updateFlow(message, key);
  }

  @MessagePattern(KT_UPDATE_PUBLISH_STATUS_FLOW)
  async updatePublishStatusFlow(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_PUBLISH_STATUS_FLOW}`,
      '',
      'updatePublishStatusFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.updatePublishStatusFlow(message, key);
  }

  @MessagePattern(KT_DELETE_FLOW)
  async deleteFlow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_FLOW}`,
      '',
      'deleteFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.deleteFlow(message, key);
  }

  @MessagePattern(KT_GET_ONE_FLOW)
  async getFlow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_FLOW}`,
      '',
      'getFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.getOneFlow(message, key);
  }

  @MessagePattern(KT_GET_MANY_FLOWS)
  async getManyFlows(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_FLOWS}`,
      '',
      'getManyFlows',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.getManyFlows(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_FLOW)
  async getZtrackingFlow(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_FLOW}`,
      '',
      'getZtrackingFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.getZtrackingFlow(message, key);
  }

  @MessagePattern(KT_CLONE_FLOW)
  async cloneFlow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CLONE_FLOW}`,
      '',
      'cloneFlow',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.cloneFlow(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_FLOWS)
  async fuzzySearchFlows(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_FLOWS}`,
      '',
      'fuzzySearchFlows',
      LogStreamLevel.DebugLight,
    );
    await this.flowKafkaService.fuzzySearchFlows(message, key);
  }
}
