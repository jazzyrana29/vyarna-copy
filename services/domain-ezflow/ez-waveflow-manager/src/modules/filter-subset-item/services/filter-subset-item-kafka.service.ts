import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateFilterSubsetItemDto,
  DeleteFilterSubsetItemDto,
  GetOneFilterSubsetItemDto,
  GetZtrackingFilterSubsetItemDto,
  KafkaMessageResponderService,
  KT_CREATE_FILTER_SUBSET_ITEM,
  KT_DELETE_FILTER_SUBSET_ITEM,
  KT_GET_ONE_FILTER_SUBSET_ITEM,
  KT_GET_ZTRACKING_FILTER_SUBSET_ITEM,
  KT_UPDATE_FILTER_SUBSET_ITEM,
  UpdateFilterSubsetItemDto,
} from 'ez-utils';

import { FilterSubsetItemService } from './filter-subset-item.service';
import { ZtrackingFilterSubsetItemService } from './ztracking-filter-subset-item.service';

@Injectable()
export class FilterSubsetItemKafkaService {
  public serviceName = FilterSubsetItemKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly filterSubsetItemService: FilterSubsetItemService,
    private readonly ztrackingFilterSubsetItemService: ZtrackingFilterSubsetItemService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FilterSubsetItemKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilterSubsetItem(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_FILTER_SUBSET_ITEM,
      message,
      key,
      async (value: CreateFilterSubsetItemDto, traceId: string) =>
        await this.filterSubsetItemService.createFilterSubsetItem(
          value,
          traceId,
        ),
    );
  }

  async updateFilterSubsetItem(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_FILTER_SUBSET_ITEM,
      message,
      key,
      async (value: UpdateFilterSubsetItemDto, traceId: string) =>
        await this.filterSubsetItemService.updateFilterSubsetItem(
          value,
          traceId,
        ),
    );
  }

  async deleteFilterSubsetItem(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_FILTER_SUBSET_ITEM,
      message,
      key,
      async (value: DeleteFilterSubsetItemDto, traceId: string) =>
        await this.filterSubsetItemService.deleteFilterSubsetItem(
          value,
          traceId,
        ),
    );
  }

  async getOneFilterSubsetItem(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_FILTER_SUBSET_ITEM,
      message,
      key,
      async (value: GetOneFilterSubsetItemDto, traceId: string) =>
        await this.filterSubsetItemService.getOneFilterSubsetItem(
          value,
          traceId,
        ),
    );
  }

  async getZtrackingFilterSubsetItem(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_FILTER_SUBSET_ITEM,
      message,
      key,
      async (value: GetZtrackingFilterSubsetItemDto, traceId: string) =>
        await this.ztrackingFilterSubsetItemService.getZtrackingForFilterSubsetItem(
          value,
          traceId,
        ),
    );
  }
}
