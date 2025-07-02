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
  KT_GET_NODE_EXIT_TYPE,
  KT_GET_MANY_NODE_EXIT_TYPES,
  KT_FUZZY_SEARCH_NODE_EXIT_TYPES,
} from 'ez-utils';

import { NodeExitTypeKafkaService } from './services/node-exit-type-kafka.service';

@Controller('node-exit-type')
export class NodeExitTypeController {
  private logger = getLoggerConfig(NodeExitTypeController.name);

  constructor(
    private readonly nodeExitTypeKafkaService: NodeExitTypeKafkaService,
  ) {
    this.logger.debug(
      `${NodeExitTypeController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_NODE_EXIT_TYPE)
  async getNodeExitTypeWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_NODE_EXIT_TYPE}`,
      '',
      'getNodeExitTypeWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitTypeKafkaService.getNodeExitType(message, key);
  }

  @MessagePattern(KT_GET_MANY_NODE_EXIT_TYPES)
  async getManyNodeExitTypesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_NODE_EXIT_TYPES}`,
      '',
      'getManyNodeExitTypesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitTypeKafkaService.getManyNodeExitTypes(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_NODE_EXIT_TYPES)
  async fuzzySearchNodeExitTypes(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_NODE_EXIT_TYPES}`,
      '',
      'fuzzySearchNodeExitTypes',
      LogStreamLevel.DebugLight,
    );
    await this.nodeExitTypeKafkaService.fuzzySearchNodeExitTypes(message, key);
  }
}
