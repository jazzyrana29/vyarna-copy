import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateOperatorDto,
  GetHistoryOfOperatorDto,
  GetManyOperatorsDto,
  GetOperatorDto,
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
  UpdateOperatorDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class OperatorKafkaService {
  private readonly serviceName = OperatorKafkaService.name;
  private logger = getLoggerConfig(OperatorKafkaService.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOperatorEntity(
    createOperatorDto: CreateOperatorDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorKafkaService.name,
      KT_CREATE_OPERATOR_ENTITY,
      createOperatorDto,
      traceId,
    );
  }

  async updateOperatorEntity(
    updateOperatorDto: UpdateOperatorDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorKafkaService.name,
      KT_UPDATE_OPERATOR_ENTITY,
      updateOperatorDto,
      traceId,
    );
  }

  async getOperatorEntity(getOperatorDto: GetOperatorDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorKafkaService.name,
      KT_GET_OPERATOR_ENTITY,
      getOperatorDto,
      traceId,
    );
  }

  async getManyOperators(
    getManyOperatorsDto: GetManyOperatorsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorKafkaService.name,
      KT_GET_MANY_OPERATORS,
      getManyOperatorsDto,
      traceId,
    );
  }

  async getHistoryOfOperatorEntity(
    getHistoryOfOperatorEntityDto: GetHistoryOfOperatorDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorKafkaService.name,
      KT_GET_HISTORY_OPERATOR_ENTITY,
      getHistoryOfOperatorEntityDto,
      traceId,
    );
  }
}
