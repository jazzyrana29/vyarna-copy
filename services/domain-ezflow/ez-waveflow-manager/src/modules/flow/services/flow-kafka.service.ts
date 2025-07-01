import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CloneFlowDto,
  CreateFlowDto,
  DeleteFlowDto,
  GetManyFlowsDto,
  GetOneFlowDto,
  GetZtrackingFlowDto,
  KafkaMessageResponderService,
  KT_CLONE_FLOW,
  KT_CREATE_FLOW,
  KT_DELETE_FLOW,
  KT_GET_MANY_FLOWS,
  KT_GET_ONE_FLOW,
  KT_GET_ZTRACKING_FLOW,
  KT_UPDATE_FLOW,
  KT_UPDATE_PUBLISH_STATUS_FLOW,
  UpdateFlowDto,
  UpdatePublishStatusFlowDto,
  FuzzySearchFlowsDto,
  KT_FUZZY_SEARCH_FLOWS,
} from 'ez-utils';

import { FlowService } from './flow.service';
import { ZtrackingFlowService } from './ztracking-flow.service';

@Injectable()
export class FlowKafkaService {
  public serviceName = FlowKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly flowService: FlowService,
    private readonly ztrackingFlowService: ZtrackingFlowService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FlowKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_FLOW,
      message,
      key,
      async (value: CreateFlowDto, traceId: string) =>
        await this.flowService.createFlow(value, traceId),
    );
  }

  async updateFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_FLOW,
      message,
      key,
      async (value: UpdateFlowDto, traceId: string) =>
        await this.flowService.updateFlow(value, traceId),
    );
  }

  async updatePublishStatusFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_PUBLISH_STATUS_FLOW,
      message,
      key,
      async (value: UpdatePublishStatusFlowDto, traceId: string) =>
        await this.flowService.updatePublishStatusFlow(value, traceId),
    );
  }

  async deleteFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_FLOW,
      message,
      key,
      async (value: DeleteFlowDto, traceId: string) =>
        await this.flowService.deleteFlow(value, traceId),
    );
  }

  async getOneFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_FLOW,
      message,
      key,
      async (value: GetOneFlowDto, traceId: string) =>
        await this.flowService.getOneFlow(value, traceId),
    );
  }

  async getManyFlows(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_FLOWS,
      message,
      key,
      async (value: GetManyFlowsDto, traceId: string) =>
        await this.flowService.getManyFlows(value, traceId),
    );
  }

  async getZtrackingFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_FLOW,
      message,
      key,
      async (value: GetZtrackingFlowDto, traceId: string) =>
        await this.ztrackingFlowService.getZtrackingForFlow(value, traceId),
    );
  }

  async cloneFlow(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CLONE_FLOW,
      message,
      key,
      async (value: CloneFlowDto, traceId: string) =>
        await this.flowService.cloneFlow(value, traceId),
    );
  }

  async fuzzySearchFlows(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_FLOWS,
      message,
      key,
      async (value: FuzzySearchFlowsDto, traceId: string) =>
        await this.flowService.fuzzySearchFlows(value, traceId),
    );
  }
}
