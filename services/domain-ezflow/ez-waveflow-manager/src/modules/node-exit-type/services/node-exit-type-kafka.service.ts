import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';

import {
  GetNodeExitTypeDto,
  GetManyNodeExitTypesDto,
  KT_GET_NODE_EXIT_TYPE,
  KT_GET_MANY_NODE_EXIT_TYPES,
  KafkaMessageResponderService,
  KT_FUZZY_SEARCH_NODE_EXIT_TYPES,
  FuzzySearchNodeExitTypesDto,
} from 'ez-utils';

import { NodeExitTypeService } from './node-exit-type.service';

@Injectable()
export class NodeExitTypeKafkaService {
  private serviceName = NodeExitTypeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly nodeExitTypeService: NodeExitTypeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async getNodeExitType(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_NODE_EXIT_TYPE,
      message,
      key,
      async (value: GetNodeExitTypeDto, traceId: string) =>
        await this.nodeExitTypeService.findNodeExitType(value, traceId),
    );
  }

  async getManyNodeExitTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_NODE_EXIT_TYPES,
      message,
      key,
      async (value: GetManyNodeExitTypesDto, traceId: string) =>
        await this.nodeExitTypeService.getManyNodeExitType(value, traceId),
    );
  }

  async fuzzySearchNodeExitTypes(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_NODE_EXIT_TYPES,
      message,
      key,
      async (value: FuzzySearchNodeExitTypesDto, traceId: string) =>
        await this.nodeExitTypeService.fuzzySearchNodeExitType(value, traceId),
    );
  }
}
