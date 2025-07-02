import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_CREATE_BUSINESS_UNIT_ENTITY,
  KT_UPDATE_BUSINESS_UNIT_ENTITY,
  KT_GET_BUSINESS_UNIT_ENTITY,
  KT_GET_MANY_BUSINESS_UNITS,
  KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class BusinessUnitResponseController {
  private logger = getLoggerConfig(BusinessUnitResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${BusinessUnitResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_BUSINESS_UNIT_ENTITY + '-response')
  createBusinessUnit(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_BUSINESS_UNIT_ENTITY} | key: ${key}`,
      '',
      'createBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_BUSINESS_UNIT_ENTITY + '-response')
  updateBusinessUnit(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_UPDATE_BUSINESS_UNIT_ENTITY} | key: ${key}`,
      '',
      'updateBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_BUSINESS_UNIT_ENTITY + '-response')
  getBusinessUnit(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_BUSINESS_UNIT_ENTITY} | key: ${key}`,
      '',
      'getBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_MANY_BUSINESS_UNITS + '-response')
  getManyBusinessUnits(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_MANY_BUSINESS_UNITS} | key: ${key}`,
      '',
      'getManyBusinessUnits',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_BUSINESS_UNIT_ENTITY + '-response')
  getHistoryBusinessUnit(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_BUSINESS_UNIT_ENTITY} | key: ${key}`,
      '',
      'getHistoryBusinessUnit',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
