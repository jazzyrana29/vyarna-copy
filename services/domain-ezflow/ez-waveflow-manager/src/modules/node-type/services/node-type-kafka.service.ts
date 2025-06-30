import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  GetManyNodeTypesDto,
  GetOneNodeTypeDto,
  KafkaMessageResponderService,
  KT_GET_MANY_NODE_TYPES,
  KT_GET_ONE_NODE_TYPE,
  KT_FUZZY_SEARCH_NODE_TYPES,
  FuzzySearchNodeTypesDto,
} from 'ez-utils';

import { NodeTypeService } from './node-type.service';

@Injectable()
export class NodeTypeKafkaService {
  public serviceName = NodeTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly nodeTypeService: NodeTypeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${NodeTypeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneNodeType(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_NODE_TYPE,
      message,
      key,
      async (value: GetOneNodeTypeDto, traceId: string) =>
        await this.nodeTypeService.getOneNodeType(value, traceId),
    );
  }

  async getManyNodeTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_NODE_TYPES,
      message,
      key,
      async (value: GetManyNodeTypesDto, traceId: string) =>
        await this.nodeTypeService.getManyNodeTypes(value, traceId),
    );
  }

  async fuzzySearchNodeTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_NODE_TYPES,
      message,
      key,
      async (value: FuzzySearchNodeTypesDto, traceId: string) =>
        await this.nodeTypeService.fuzzySearchNodeTypes(value, traceId),
    );
  }
}
