import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateFilterSubsetDto,
  DeleteFilterSubsetDto,
  GetOneFilterSubsetDto,
  GetZtrackingFilterSubsetDto,
  KafkaMessageResponderService,
  KT_CREATE_FILTER_SUBSET,
  KT_DELETE_FILTER_SUBSET,
  KT_GET_ONE_FILTER_SUBSET,
  KT_GET_ZTRACKING_FILTER_SUBSET,
  KT_UPDATE_FILTER_SUBSET,
  UpdateFilterSubsetDto,
} from 'ez-utils';

import { FilterSubsetService } from './filter-subset.service';
import { ZtrackingFilterSubsetService } from './ztracking-filter-subset.service';

@Injectable()
export class FilterSubsetKafkaService {
  public serviceName = FilterSubsetKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly filterSubsetService: FilterSubsetService,
    private readonly ztrackingFilterSubsetService: ZtrackingFilterSubsetService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FilterSubsetKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilterSubset(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_FILTER_SUBSET,
      message,
      key,
      async (value: CreateFilterSubsetDto, traceId: string) =>
        await this.filterSubsetService.createFilterSubset(value, traceId),
    );
  }

  async updateFilterSubset(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_FILTER_SUBSET,
      message,
      key,
      async (value: UpdateFilterSubsetDto, traceId: string) =>
        await this.filterSubsetService.updateFilterSubset(value, traceId),
    );
  }

  async deleteFilterSubset(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_FILTER_SUBSET,
      message,
      key,
      async (value: DeleteFilterSubsetDto, traceId: string) =>
        await this.filterSubsetService.deleteFilterSubset(value, traceId),
    );
  }

  async getOneFilterSubset(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_FILTER_SUBSET,
      message,
      key,
      async (value: GetOneFilterSubsetDto, traceId: string) =>
        await this.filterSubsetService.getOneFilterSubset(value, traceId),
    );
  }

  async getZtrackingFilterSubset(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_FILTER_SUBSET,
      message,
      key,
      async (value: GetZtrackingFilterSubsetDto, traceId: string) =>
        await this.ztrackingFilterSubsetService.getZtrackingForFilterSubset(
          value,
          traceId,
        ),
    );
  }
}
