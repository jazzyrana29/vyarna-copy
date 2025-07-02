import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import {
  KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
  KT_IS_OPERATOR_ALLOWED_TO,
  KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class OperatorPermissionProfileResponseController {
  private logger = getLoggerConfig(
    OperatorPermissionProfileResponseController.name,
  );

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${OperatorPermissionProfileResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_OPERATORS_FOR_PERMISSION_PROFILE + '-response')
  getOperatorsForPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_OPERATORS_FOR_PERMISSION_PROFILE} | key: ${key}`,
      '',
      'getOperatorsForPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PERMISSION_PROFILE_FOR_OPERATOR + '-response')
  getPermissionProfileForOperator(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_PERMISSION_PROFILE_FOR_OPERATOR} | key: ${key}`,
      '',
      'getPermissionProfileForOperator',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_IS_OPERATOR_ALLOWED_TO + '-response')
  isOperatorAllowedTo(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_IS_OPERATOR_ALLOWED_TO} | key: ${key}`,
      '',
      'isOperatorAllowedTo',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY + '-response')
  createOperatorPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'createOperatorPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY + '-response')
  removeOperatorPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'removeOperatorPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
