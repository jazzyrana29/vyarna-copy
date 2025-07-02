import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateNodeExitDto,
  DeleteNodeExitDto,
  GetOneNodeExitDto,
  GetZtrackingNodeExitDto,
  KafkaMessageResponderService,
  KT_CREATE_NODE_EXIT,
  KT_DELETE_NODE_EXIT,
  KT_GET_ONE_NODE_EXIT,
  KT_GET_ZTRACKING_NODE_EXIT,
  KT_UPDATE_NODE_EXIT,
  UpdateNodeExitDto,
} from 'ez-utils';

import { NodeExitService } from './node-exit.service';
import { ZtrackingNodeExitService } from './ztracking-node-exit.service';

@Injectable()
export class NodeExitKafkaService {
  public serviceName = NodeExitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly nodeExitService: NodeExitService,
    private readonly ztrackingNodeExitService: ZtrackingNodeExitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${NodeExitKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createNodeExit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_NODE_EXIT,
      message,
      key,
      async (value: CreateNodeExitDto, traceId: string) =>
        await this.nodeExitService.createNodeExit(value, traceId),
    );
  }

  async updateNodeExit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_NODE_EXIT,
      message,
      key,
      async (value: UpdateNodeExitDto, traceId: string) =>
        await this.nodeExitService.updateNodeExit(value, traceId),
    );
  }

  async deleteNodeExit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_NODE_EXIT,
      message,
      key,
      async (value: DeleteNodeExitDto, traceId: string) =>
        await this.nodeExitService.deleteNodeExit(value, traceId),
    );
  }

  async getOneNodeExit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_NODE_EXIT,
      message,
      key,
      async (value: GetOneNodeExitDto, traceId: string) =>
        await this.nodeExitService.getOneNodeExit(value, traceId),
    );
  }

  async getZtrackingNodeExit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_NODE_EXIT,
      message,
      key,
      async (value: GetZtrackingNodeExitDto, traceId: string) =>
        await this.ztrackingNodeExitService.getZtrackingForNodeExit(
          value,
          traceId,
        ),
    );
  }
}
