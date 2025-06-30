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
  KT_CREATE_NODE,
  KT_DELETE_NODE,
  KT_FUZZY_SEARCH_NODES,
  KT_GET_ONE_NODE,
  KT_GET_ZTRACKING_NODE,
  KT_UPDATE_NODE,
} from 'ez-utils';

import { NodeKafkaService } from './services/node-kafka.service';

@Controller('node')
export class NodeController {
  private logger = getLoggerConfig(NodeController.name);

  constructor(private readonly nodeKafkaService: NodeKafkaService) {
    this.logger.debug(
      `${NodeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_NODE)
  async createNode(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_NODE}`,
      '',
      'createNode',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.createNode(message, key);
  }

  @MessagePattern(KT_UPDATE_NODE)
  async updateNode(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_NODE}`,
      '',
      'updateNode',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.updateNode(message, key);
  }

  @MessagePattern(KT_DELETE_NODE)
  async deleteNode(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_NODE}`,
      '',
      'deleteNode',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.deleteNode(message, key);
  }

  @MessagePattern(KT_GET_ONE_NODE)
  async getNode(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_NODE}`,
      '',
      'getNode',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.getOneNode(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_NODE)
  async getZtrackingNode(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_NODE}`,
      '',
      'getZtrackingNode',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.getZtrackingNode(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_NODES)
  async fuzzySearchNodes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_NODES}`,
      '',
      'fuzzySearchNodes',
      LogStreamLevel.DebugLight,
    );
    await this.nodeKafkaService.fuzzySearchNodes(message, key);
  }
}
