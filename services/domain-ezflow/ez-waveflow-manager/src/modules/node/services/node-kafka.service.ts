import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateNodeDto,
  DeleteNodeDto,
  FuzzySearchNodesDto,
  GetOneNodeDto,
  GetZtrackingNodeDto,
  KafkaMessageResponderService,
  KT_CREATE_NODE,
  KT_DELETE_NODE,
  KT_FUZZY_SEARCH_NODES,
  KT_GET_ONE_NODE,
  KT_GET_ZTRACKING_NODE,
  KT_UPDATE_NODE,
  UpdateNodeDto,
} from 'ez-utils';

import { NodeService } from './node.service';
import { ZtrackingNodeService } from './ztracking-node.service';

@Injectable()
export class NodeKafkaService {
  public serviceName = NodeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly nodeService: NodeService,
    private readonly ztrackingNodeService: ZtrackingNodeService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${NodeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createNode(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_NODE,
      message,
      key,
      async (value: CreateNodeDto, traceId: string) =>
        await this.nodeService.createNode(value, traceId),
    );
  }

  async updateNode(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_NODE,
      message,
      key,
      async (value: UpdateNodeDto, traceId: string) =>
        await this.nodeService.updateNode(value, traceId),
    );
  }

  async deleteNode(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_NODE,
      message,
      key,
      async (value: DeleteNodeDto, traceId: string) =>
        await this.nodeService.deleteNode(value, traceId),
    );
  }

  async getOneNode(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_NODE,
      message,
      key,
      async (value: GetOneNodeDto, traceId: string) =>
        await this.nodeService.getOneNode(value, traceId),
    );
  }

  async getZtrackingNode(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_NODE,
      message,
      key,
      async (value: GetZtrackingNodeDto, traceId: string) =>
        await this.ztrackingNodeService.getZtrackingForNode(value, traceId),
    );
  }

  async fuzzySearchNodes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_NODES,
      message,
      key,
      async (value: FuzzySearchNodesDto, traceId: string) =>
        await this.nodeService.fuzzySearchNodes(value, traceId),
    );
  }
}
