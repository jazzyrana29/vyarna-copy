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
  KT_CREATE_NODE_EXIT,
  KT_DELETE_NODE_EXIT,
  KT_GET_ONE_NODE_EXIT,
  KT_GET_ZTRACKING_NODE_EXIT,
  KT_UPDATE_NODE_EXIT,
} from 'ez-utils';

import { NodeExitKafkaService } from './services/node-exit-kafka.service';

@Controller('node-exit')
export class NodeExitController {
  private logger = getLoggerConfig(NodeExitController.name);

  constructor(private readonly nodeExitKafkaService: NodeExitKafkaService) {
    this.logger.debug(
      `${NodeExitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_NODE_EXIT)
  async createNodeExit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_NODE_EXIT}`,
      '',
      'createNodeExit',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitKafkaService.createNodeExit(message, key);
  }

  @MessagePattern(KT_UPDATE_NODE_EXIT)
  async updateNodeExit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_NODE_EXIT}`,
      '',
      'updateNodeExit',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitKafkaService.updateNodeExit(message, key);
  }

  @MessagePattern(KT_DELETE_NODE_EXIT)
  async deleteNodeExit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_NODE_EXIT}`,
      '',
      'deleteNodeExit',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitKafkaService.deleteNodeExit(message, key);
  }

  @MessagePattern(KT_GET_ONE_NODE_EXIT)
  async getNodeExit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_NODE_EXIT}`,
      '',
      'getNodeExit',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitKafkaService.getOneNodeExit(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_NODE_EXIT)
  async getZtrackingNodeExit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_NODE_EXIT}`,
      '',
      'getZtrackingNodeExit',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitKafkaService.getZtrackingNodeExit(message, key);
  }
}
