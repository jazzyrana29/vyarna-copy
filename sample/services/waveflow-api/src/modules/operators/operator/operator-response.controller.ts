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
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class OperatorResponseController {
  private logger = getLoggerConfig(OperatorResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${OperatorResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_OPERATOR_ENTITY + '-response')
  createOperator(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_OPERATOR_ENTITY} | key: ${key}`,
      '',
      'createOperator',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_OPERATOR_ENTITY + '-response')
  updateOperator(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_UPDATE_OPERATOR_ENTITY} | key: ${key}`,
      '',
      'updateOperator',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_OPERATOR_ENTITY + '-response')
  getOperator(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_OPERATOR_ENTITY} | key: ${key}`,
      '',
      'getOperator',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_MANY_OPERATORS + '-response')
  getManyOperators(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_MANY_OPERATORS} | key: ${key}`,
      '',
      'getManyOperators',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_OPERATOR_ENTITY + '-response')
  getOperatorHistory(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_OPERATOR_ENTITY} | key: ${key}`,
      '',
      'getOperatorHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
