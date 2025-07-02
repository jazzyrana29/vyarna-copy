import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateManifoldDto,
  DeleteManifoldDto,
  FuzzySearchManifoldsDto,
  GetOneManifoldDto,
  GetZtrackingManifoldDto,
  KafkaMessageResponderService,
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_FUZZY_SEARCH_MANIFOLDS,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
  UpdateManifoldDto,
} from 'ez-utils';

import { ManifoldService } from './manifold.service';
import { ZtrackingManifoldService } from './ztracking-manifold.service';

@Injectable()
export class ManifoldKafkaService {
  public serviceName = ManifoldKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly manifoldService: ManifoldService,
    private readonly ztrackingManifoldService: ZtrackingManifoldService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${ManifoldKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createManifold(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_MANIFOLD,
      message,
      key,
      async (value: CreateManifoldDto, traceId: string) =>
        await this.manifoldService.createManifold(value, traceId),
    );
  }

  async updateManifold(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_MANIFOLD,
      message,
      key,
      async (value: UpdateManifoldDto, traceId: string) =>
        await this.manifoldService.updateManifold(value, traceId),
    );
  }

  async deleteManifold(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_MANIFOLD,
      message,
      key,
      async (value: DeleteManifoldDto, traceId: string) =>
        await this.manifoldService.deleteManifold(value, traceId),
    );
  }

  async getOneManifold(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_MANIFOLD,
      message,
      key,
      async (value: GetOneManifoldDto, traceId: string) =>
        await this.manifoldService.getOneManifold(value, traceId),
    );
  }

  async getZtrackingManifold(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_MANIFOLD,
      message,
      key,
      async (value: GetZtrackingManifoldDto, traceId: string) =>
        await this.ztrackingManifoldService.getZtrackingForManifold(
          value,
          traceId,
        ),
    );
  }

  async fuzzySearchManifolds(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_MANIFOLDS,
      message,
      key,
      async (value: FuzzySearchManifoldsDto, traceId: string) =>
        await this.manifoldService.fuzzySearchManifolds(value, traceId),
    );
  }
}
