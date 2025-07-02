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
  KT_CREATE_OPERATOR_SESSION_ENTITY,
  KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
  KT_GET_OPERATOR_SESSION_ENTITY,
  KT_LOGIN_OPERATOR_SESSION_ENTITY,
  KT_LOGOUT_OPERATOR_SESSION_ENTITY,
  KT_SEARCH_OPERATOR_SESSIONS,
  KT_UPDATE_OPERATOR_SESSION_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class OperatorSessionResponseController {
  private logger = getLoggerConfig(OperatorSessionResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${OperatorSessionResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_OPERATOR_SESSION_ENTITY + '-response')
  createOperatorSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'createOperatorSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_OPERATOR_SESSION_ENTITY + '-response')
  updateOperatorSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_UPDATE_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'updateOperatorSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_OPERATOR_SESSION_ENTITY + '-response')
  getOperatorSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'getOperatorSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_OPERATOR_SESSION_ENTITY + '-response')
  getOperatorSessionHistory(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'getOperatorSessionHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_LOGIN_OPERATOR_SESSION_ENTITY + '-response')
  loginOperatorSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_LOGIN_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'loginOperatorSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_LOGOUT_OPERATOR_SESSION_ENTITY + '-response')
  logoutOperatorSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_LOGOUT_OPERATOR_SESSION_ENTITY} | key: ${key}`,
      '',
      'logoutOperatorSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SEARCH_OPERATOR_SESSIONS + '-response')
  searchOperatorSessions(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_SEARCH_OPERATOR_SESSIONS} | key: ${key}`,
      '',
      'searchOperatorSessions',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
