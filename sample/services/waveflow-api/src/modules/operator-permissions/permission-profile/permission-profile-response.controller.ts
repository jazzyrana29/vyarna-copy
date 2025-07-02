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
  KT_CREATE_PERMISSION_PROFILE_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_ENTITY,
  KT_GET_PERMISSION_PROFILE_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_ENTITY,
  KT_GET_LIST_OF_PERMISSION_PROFILE,
  KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
  KT_POPULATE_PERMISSION_PROFILE_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class PermissionProfileResponseController {
  private logger = getLoggerConfig(PermissionProfileResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${PermissionProfileResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PERMISSION_PROFILE_ENTITY + '-response')
  createPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_CREATE_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'createPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_PERMISSION_PROFILE_ENTITY + '-response')
  updatePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_UPDATE_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'updatePermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PERMISSION_PROFILE_ENTITY + '-response')
  getPermissionProfile(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'getPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY + '-response')
  getPermissionProfileHistory(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'getPermissionProfileHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_DELETE_PERMISSION_PROFILE_ENTITY + '-response')
  deletePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_DELETE_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'deletePermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_LIST_OF_PERMISSION_PROFILE + '-response')
  getListOfPermissionProfiles(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_LIST_OF_PERMISSION_PROFILE} | key: ${key}`,
      '',
      'getListOfPermissionProfiles',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PERMITS_FOR_PERMISSION_PROFILE + '-response')
  getPermitsForPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_PERMITS_FOR_PERMISSION_PROFILE} | key: ${key}`,
      '',
      'getPermitsForPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_POPULATE_PERMISSION_PROFILE_ENTITY + '-response')
  populatePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_POPULATE_PERMISSION_PROFILE_ENTITY} | key: ${key}`,
      '',
      'populatePermissionProfile',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
