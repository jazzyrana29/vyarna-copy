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
  KT_CREATE_FILTER_SUBSET,
  KT_DELETE_FILTER_SUBSET,
  KT_GET_ONE_FILTER_SUBSET,
  KT_GET_ZTRACKING_FILTER_SUBSET,
  KT_UPDATE_FILTER_SUBSET,
} from 'ez-utils';

import { FilterSubsetKafkaService } from './services/filter-subset-kafka.service';

@Controller('filter-subset')
export class FilterSubsetController {
  private logger = getLoggerConfig(FilterSubsetController.name);

  constructor(
    private readonly filterSubsetKafkaService: FilterSubsetKafkaService,
  ) {
    this.logger.debug(
      `${FilterSubsetController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_FILTER_SUBSET)
  async createFilterSubset(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_FILTER_SUBSET}`,
      '',
      'createFilterSubset',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetKafkaService.createFilterSubset(message, key);
  }

  @MessagePattern(KT_UPDATE_FILTER_SUBSET)
  async updateFilterSubset(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_FILTER_SUBSET}`,
      '',
      'updateFilterSubset',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetKafkaService.updateFilterSubset(message, key);
  }

  @MessagePattern(KT_DELETE_FILTER_SUBSET)
  async deleteFilterSubset(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_FILTER_SUBSET}`,
      '',
      'deleteFilterSubset',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetKafkaService.deleteFilterSubset(message, key);
  }

  @MessagePattern(KT_GET_ONE_FILTER_SUBSET)
  async getFilterSubset(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_FILTER_SUBSET}`,
      '',
      'getFilterSubset',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetKafkaService.getOneFilterSubset(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_FILTER_SUBSET)
  async getZtrackingFilterSubset(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_FILTER_SUBSET}`,
      '',
      'getZtrackingFilterSubset',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetKafkaService.getZtrackingFilterSubset(message, key);
  }
}
