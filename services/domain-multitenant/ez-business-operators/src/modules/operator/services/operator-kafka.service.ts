import { Injectable } from '@nestjs/common';
import { OperatorService } from './operator.service';

import { LogStreamLevel } from 'ez-logger';

import {
  CreateOperatorDto,
  GetHistoryOfOperatorDto,
  GetManyOperatorsDto,
  GetOperatorDto,
  KafkaMessageResponderService,
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
  UpdateOperatorDto,
} from 'ez-utils';
import { ZtrackingOperatorService } from './ztracking-operator.service';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class OperatorKafkaService {
  private logger = getLoggerConfig(OperatorKafkaService.name);
  private readonly kafkaResponder: KafkaMessageResponderService;
  private readonly serviceName = OperatorKafkaService.name;

  constructor(
    private readonly operatorService: OperatorService,
    private readonly ztrackingOperatorService: ZtrackingOperatorService,
  ) {
    this.logger.debug(
      `${OperatorKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createOperatorViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_OPERATOR_ENTITY,
      message,
      key,
      async (value: CreateOperatorDto, traceId: string) =>
        await this.operatorService.createOperator(value, traceId),
    );
  }

  async updateOperatorViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_OPERATOR_ENTITY,
      message,
      key,
      async (value: UpdateOperatorDto, traceId: string) =>
        await this.operatorService.updateOperatorUnit(value, traceId),
    );
  }

  async getOperatorEntityViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_OPERATOR_ENTITY,
      message,
      key,
      async (value: GetOperatorDto, traceId: string) =>
        await this.operatorService.findOperator(value, traceId),
    );
  }

  async getManyOperatorsViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_OPERATORS,
      message,
      key,
      async (value: GetManyOperatorsDto, traceId: string) =>
        await this.operatorService.getManyOperators(value, traceId),
    );
  }

  async getHistoryOfOperatorEntityViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_OPERATOR_ENTITY,
      message,
      key,
      async (value: GetHistoryOfOperatorDto, traceId: string) =>
        await this.ztrackingOperatorService.findZtrackingOperatorEntity(
          value,
          traceId,
        ),
    );
  }
}
