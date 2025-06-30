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
  KT_CREATE_FILTER,
  KT_DELETE_FILTER,
  KT_GET_ONE_FILTER,
  KT_GET_ZTRACKING_FILTER,
  KT_UPDATE_FILTER,
} from 'ez-utils';

import { FilterKafkaService } from './services/filter-kafka.service';

@Controller('filter')
export class FilterController {
  private logger = getLoggerConfig(FilterController.name);

  constructor(private readonly filterKafkaService: FilterKafkaService) {
    this.logger.debug(
      `${FilterController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_FILTER)
  async createFilter(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_FILTER}`,
      '',
      'createFilter',
      LogStreamLevel.DebugLight,
    );
    await this.filterKafkaService.createFilter(message, key);
  }

  @MessagePattern(KT_UPDATE_FILTER)
  async updateFilter(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_FILTER}`,
      '',
      'updateFilter',
      LogStreamLevel.DebugLight,
    );
    await this.filterKafkaService.updateFilter(message, key);
  }

  @MessagePattern(KT_DELETE_FILTER)
  async deleteFilter(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_FILTER}`,
      '',
      'deleteFilter',
      LogStreamLevel.DebugLight,
    );
    await this.filterKafkaService.deleteFilter(message, key);
  }

  @MessagePattern(KT_GET_ONE_FILTER)
  async getFilter(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_FILTER}`,
      '',
      'getFilter',
      LogStreamLevel.DebugLight,
    );
    await this.filterKafkaService.getOneFilter(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_FILTER)
  async getZtrackingFilter(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_FILTER}`,
      '',
      'getZtrackingFilter',
      LogStreamLevel.DebugLight,
    );
    await this.filterKafkaService.getZtrackingFilter(message, key);
  }
}
