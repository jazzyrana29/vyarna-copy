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
  KT_CREATE_DEVICE_SESSION_ENTITY,
  KT_UPDATE_DEVICE_SESSION_ENTITY,
  KT_GET_DEVICE_SESSION_ENTITY,
  KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
  KT_START_DEVICE_SESSION_ENTITY,
  KT_CLOSE_DEVICE_SESSION_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class DeviceSessionResponseController {
  private logger = getLoggerConfig(DeviceSessionResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${DeviceSessionResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_DEVICE_SESSION_ENTITY + '-response')
  createDeviceSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'createDeviceSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_DEVICE_SESSION_ENTITY + '-response')
  updateDeviceSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_UPDATE_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'updateDeviceSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_DEVICE_SESSION_ENTITY + '-response')
  getDeviceSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'getDeviceSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_DEVICE_SESSION_ENTITY + '-response')
  getDeviceSessionHistory(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'getDeviceSessionHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_START_DEVICE_SESSION_ENTITY + '-response')
  startDeviceSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_START_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'startDeviceSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CLOSE_DEVICE_SESSION_ENTITY + '-response')
  closeDeviceSession(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CLOSE_DEVICE_SESSION_ENTITY} | key: ${key}`,
      '',
      'closeDeviceSession',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
