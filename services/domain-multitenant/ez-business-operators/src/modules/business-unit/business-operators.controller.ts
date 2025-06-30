import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { BusinessUnitKafkaService } from './services/business-unit-kafka.service';
import {
  KT_CREATE_BUSINESS_UNIT_ENTITY,
  KT_GET_BUSINESS_UNIT_ENTITY,
  KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
  KT_GET_MANY_BUSINESS_UNITS,
  KT_UPDATE_BUSINESS_UNIT_ENTITY,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('business-unit')
export class BusinessUnitController {
  private logger = getLoggerConfig(BusinessUnitController.name);

  constructor(
    private readonly businessUnitKafkaService: BusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${BusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_BUSINESS_UNIT_ENTITY)
  async createBusinessUnitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_BUSINESS_UNIT_ENTITY}`,
      '',
      'createBusinessUnitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.businessUnitKafkaService.createBusinessEntity(message, key);
  }

  @MessagePattern(KT_UPDATE_BUSINESS_UNIT_ENTITY)
  async updateBusinessUnitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_BUSINESS_UNIT_ENTITY}`,
      '',
      'updateBusinessUnitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.businessUnitKafkaService.updateBusinessEntity(message, key);
  }

  @MessagePattern(KT_GET_BUSINESS_UNIT_ENTITY)
  async getBusinessUnitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_BUSINESS_UNIT_ENTITY}`,
      '',
      'getBusinessUnitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.businessUnitKafkaService.getBusinessEntity(message, key);
  }

  @MessagePattern(KT_GET_MANY_BUSINESS_UNITS)
  async getManyBusinessUnitsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_BUSINESS_UNITS}`,
      '',
      'getManyBusinessUnitsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.businessUnitKafkaService.getManyBusinessUnit(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_BUSINESS_UNIT_ENTITY)
  async getHistoryOfBusinessUnitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_BUSINESS_UNIT_ENTITY}`,
      '',
      'getHistoryOfBusinessUnitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.businessUnitKafkaService.getHistoryOfBusinessEntity(
      message,
      key,
    );
  }
}
