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
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_FUZZY_SEARCH_MANIFOLDS,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
} from 'ez-utils';

import { ManifoldKafkaService } from './services/manifold-kafka.service';

@Controller('manifold')
export class ManifoldController {
  private logger = getLoggerConfig(ManifoldController.name);

  constructor(private readonly manifoldKafkaService: ManifoldKafkaService) {
    this.logger.debug(
      `${ManifoldController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_MANIFOLD)
  async createManifold(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_MANIFOLD}`,
      '',
      'createManifold',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.createManifold(message, key);
  }

  @MessagePattern(KT_UPDATE_MANIFOLD)
  async updateManifold(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_MANIFOLD}`,
      '',
      'updateManifold',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.updateManifold(message, key);
  }

  @MessagePattern(KT_DELETE_MANIFOLD)
  async deleteManifold(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_MANIFOLD}`,
      '',
      'deleteManifold',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.deleteManifold(message, key);
  }

  @MessagePattern(KT_GET_ONE_MANIFOLD)
  async getManifold(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_MANIFOLD}`,
      '',
      'getManifold',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.getOneManifold(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_MANIFOLD)
  async getZtrackingManifold(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_MANIFOLD}`,
      '',
      'getZtrackingManifold',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.getZtrackingManifold(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_MANIFOLDS)
  async fuzzySearchManifolds(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_FUZZY_SEARCH_MANIFOLDS}`,
      '',
      'fuzzySearchManifolds',
      LogStreamLevel.DebugLight,
    );
    await this.manifoldKafkaService.fuzzySearchManifolds(message, key);
  }
}
