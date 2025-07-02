import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateBusinessUnitDto,
  GetBusinessUnitDto,
  GetHistoryOfBusinessUnitsDto,
  GetManyBusinessUnitsDto,
  KT_CREATE_BUSINESS_UNIT_ENTITY,
  KT_GET_BUSINESS_UNIT_ENTITY,
  KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
  KT_GET_MANY_BUSINESS_UNITS,
  KT_UPDATE_BUSINESS_UNIT_ENTITY,
  UpdateBusinessUnitDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class BusinessUnitKafkaService {
  private readonly serviceName = BusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createBusinessUnitEntity(
    createBusinessUnitDto: CreateBusinessUnitDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_BUSINESS_UNIT_ENTITY,
      createBusinessUnitDto,
      traceId,
    );
  }

  async updateBusinessUnitEntity(
    updateBusinessUnitDto: UpdateBusinessUnitDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_BUSINESS_UNIT_ENTITY,
      updateBusinessUnitDto,
      traceId,
    );
  }

  async getBusinessUnitEntity(
    getBusinessUnitDto: GetBusinessUnitDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_BUSINESS_UNIT_ENTITY,
      getBusinessUnitDto,
      traceId,
    );
  }

  async getManyBusinessUnits(
    getManyBusinessUnitsDto: GetManyBusinessUnitsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MANY_BUSINESS_UNITS,
      getManyBusinessUnitsDto,
      traceId,
    );
  }

  async getHistoryBusinessUnitEntity(
    getHistoryOfBusinessUnitDto: GetHistoryOfBusinessUnitsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
      getHistoryOfBusinessUnitDto,
      traceId,
    );
  }
}
