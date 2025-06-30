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
  KT_FUZZY_SEARCH_NODE_TYPES,
  KT_GET_MANY_NODE_TYPES,
  KT_GET_ONE_NODE_TYPE,
} from 'ez-utils';

import { NodeTypeKafkaService } from './services/node-type-kafka.service';

@Controller('node-type')
export class NodeTypeController {
  private logger = getLoggerConfig(NodeTypeController.name);

  constructor(private readonly nodeTypeKafkaService: NodeTypeKafkaService) {
    this.logger.debug(
      `${NodeTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_ONE_NODE_TYPE)
  async getOneNodeType(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_NODE_TYPE}`,
      '',
      'getOneNodeType',
      LogStreamLevel.DebugLight,
    );
    await this.nodeTypeKafkaService.getOneNodeType(message, key);
  }

  @MessagePattern(KT_GET_MANY_NODE_TYPES)
  async getManyNodeTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_NODE_TYPES}`,
      '',
      'getManyNodeTypes',
      LogStreamLevel.DebugLight,
    );
    await this.nodeTypeKafkaService.getManyNodeTypes(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_NODE_TYPES)
  async fuzzySearchNodeTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_NODE_TYPES}`,
      '',
      'fuzzySearchNodeTypes',
      LogStreamLevel.DebugLight,
    );
    await this.nodeTypeKafkaService.fuzzySearchNodeTypes(message, key);
  }
}
