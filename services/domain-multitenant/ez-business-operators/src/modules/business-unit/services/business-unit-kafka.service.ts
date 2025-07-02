import { Injectable } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { ZtrackingBusinessUnitService } from './ztracking-business-unit.service';
import {
  CreateBusinessUnitDto,
  GetBusinessUnitDto,
  GetHistoryOfBusinessUnitsDto,
  GetManyBusinessUnitsDto,
  KafkaMessageResponderService,
  KT_CREATE_BUSINESS_UNIT_ENTITY,
  KT_GET_BUSINESS_UNIT_ENTITY,
  KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
  KT_GET_MANY_BUSINESS_UNITS,
  KT_UPDATE_BUSINESS_UNIT_ENTITY,
  UpdateBusinessUnitDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class BusinessUnitKafkaService {
  private serviceName = BusinessUnitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly businessUnitService: BusinessUnitService,
    private readonly ztrackingBusinessUnitService: ZtrackingBusinessUnitService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createBusinessEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_BUSINESS_UNIT_ENTITY,
      message,
      key,
      async (value: CreateBusinessUnitDto, traceId: string) =>
        await this.businessUnitService.createBusinessUnit(value, traceId),
    );
  }

  async updateBusinessEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_BUSINESS_UNIT_ENTITY,
      message,
      key,
      async (value: UpdateBusinessUnitDto, traceId: string) =>
        await this.businessUnitService.updateBusinessUnit(value, traceId),
    );
  }

  async getBusinessEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_BUSINESS_UNIT_ENTITY,
      message,
      key,
      async (value: GetBusinessUnitDto, traceId: string) =>
        await this.businessUnitService.findBusinessUnit(value, traceId),
    );
  }

  async getManyBusinessUnit(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_BUSINESS_UNITS,
      message,
      key,
      async (value: GetManyBusinessUnitsDto, traceId: string) =>
        await this.businessUnitService.getManyBusinessUnit(value, traceId),
    );
  }

  async getHistoryOfBusinessEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
      message,
      key,
      async (value: GetHistoryOfBusinessUnitsDto, traceId: string) =>
        await this.ztrackingBusinessUnitService.findZtrackingBusinessUnitEntity(
          value,
          traceId,
        ),
    );
  }
}
