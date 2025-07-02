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
  KT_CREATE_FILTER_SUBSET_ITEM,
  KT_DELETE_FILTER_SUBSET_ITEM,
  KT_GET_ONE_FILTER_SUBSET_ITEM,
  KT_GET_ZTRACKING_FILTER_SUBSET_ITEM,
  KT_UPDATE_FILTER_SUBSET_ITEM,
} from 'ez-utils';

import { FilterSubsetItemKafkaService } from './services/filter-subset-item-kafka.service';

@Controller('filter-subset-item')
export class FilterSubsetItemController {
  private logger = getLoggerConfig(FilterSubsetItemController.name);

  constructor(
    private readonly filterSubsetItemKafkaService: FilterSubsetItemKafkaService,
  ) {
    this.logger.debug(
      `${FilterSubsetItemController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_FILTER_SUBSET_ITEM)
  async createFilterSubsetItem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_FILTER_SUBSET_ITEM}`,
      '',
      'createFilterSubsetItem',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetItemKafkaService.createFilterSubsetItem(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_FILTER_SUBSET_ITEM)
  async updateFilterSubsetItem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_FILTER_SUBSET_ITEM}`,
      '',
      'updateFilterSubsetItem',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetItemKafkaService.updateFilterSubsetItem(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_FILTER_SUBSET_ITEM)
  async deleteFilterSubsetItem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_FILTER_SUBSET_ITEM}`,
      '',
      'deleteFilterSubsetItem',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetItemKafkaService.deleteFilterSubsetItem(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ONE_FILTER_SUBSET_ITEM)
  async getFilterSubsetItem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_FILTER_SUBSET_ITEM}`,
      '',
      'getFilterSubsetItem',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetItemKafkaService.getOneFilterSubsetItem(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_ZTRACKING_FILTER_SUBSET_ITEM)
  async getZtrackingFilterSubsetItem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_FILTER_SUBSET_ITEM}`,
      '',
      'getZtrackingFilterSubsetItem',
      LogStreamLevel.DebugLight,
    );
    await this.filterSubsetItemKafkaService.getZtrackingFilterSubsetItem(
      message,
      key,
    );
  }
}
