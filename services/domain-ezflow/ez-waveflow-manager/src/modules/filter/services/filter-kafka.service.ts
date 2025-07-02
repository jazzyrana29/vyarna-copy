import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateFilterDto,
  DeleteFilterDto,
  GetOneFilterDto,
  GetZtrackingFilterDto,
  KafkaMessageResponderService,
  KT_CREATE_FILTER,
  KT_DELETE_FILTER,
  KT_GET_ONE_FILTER,
  KT_GET_ZTRACKING_FILTER,
  KT_UPDATE_FILTER,
  UpdateFilterDto,
} from 'ez-utils';

import { FilterService } from './filter.service';
import { ZtrackingFilterService } from './ztracking-filter.service';

@Injectable()
export class FilterKafkaService {
  public serviceName = FilterKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly filterService: FilterService,
    private readonly ztrackingFilterService: ZtrackingFilterService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FilterKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilter(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_FILTER,
      message,
      key,
      async (value: CreateFilterDto, traceId: string) =>
        await this.filterService.createFilter(value, traceId),
    );
  }

  async updateFilter(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_FILTER,
      message,
      key,
      async (value: UpdateFilterDto, traceId: string) =>
        await this.filterService.updateFilter(value, traceId),
    );
  }

  async deleteFilter(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_FILTER,
      message,
      key,
      async (value: DeleteFilterDto, traceId: string) =>
        await this.filterService.deleteFilter(value, traceId),
    );
  }

  async getOneFilter(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_FILTER,
      message,
      key,
      async (value: GetOneFilterDto, traceId: string) =>
        await this.filterService.getOneFilter(value, traceId),
    );
  }

  async getZtrackingFilter(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_FILTER,
      message,
      key,
      async (value: GetZtrackingFilterDto, traceId: string) =>
        await this.ztrackingFilterService.getZtrackingForFilter(value, traceId),
    );
  }
}
