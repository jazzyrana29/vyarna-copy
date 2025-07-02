import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { DeviceSessionKafkaService } from './services/device-session-kafka.service';
import {
  KT_CLOSE_DEVICE_SESSION_ENTITY,
  KT_CREATE_DEVICE_SESSION_ENTITY,
  KT_GET_DEVICE_SESSION_ENTITY,
  KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
  KT_START_DEVICE_SESSION_ENTITY,
  KT_UPDATE_DEVICE_SESSION_ENTITY,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('device-session')
export class DeviceSessionController {
  private logger = getLoggerConfig(DeviceSessionController.name);

  constructor(
    private readonly deviceSessionKafkaService: DeviceSessionKafkaService,
  ) {
    this.logger.debug(
      `${DeviceSessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_DEVICE_SESSION_ENTITY)
  async createDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_DEVICE_SESSION_ENTITY}`,
      '',
      'createDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.deviceSessionKafkaService.createDeviceSession(message, key);
  }

  @MessagePattern(KT_UPDATE_DEVICE_SESSION_ENTITY)
  async updateDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_DEVICE_SESSION_ENTITY}`,
      '',
      'updateDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.deviceSessionKafkaService.updateDeviceSession(message, key);
  }

  @MessagePattern(KT_GET_DEVICE_SESSION_ENTITY)
  async getDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DEVICE_SESSION_ENTITY}`,
      '',
      'getDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.deviceSessionKafkaService.getDeviceSession(message, key);
  }

  @MessagePattern(KT_START_DEVICE_SESSION_ENTITY) // Define new MessagePattern for starting device session
  async startDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_DEVICE_SESSION_ENTITY}`,
      '',
      'startDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.deviceSessionKafkaService.startDeviceSession(message, key);
  }

  @MessagePattern(KT_CLOSE_DEVICE_SESSION_ENTITY)
  async closeDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CLOSE_DEVICE_SESSION_ENTITY}`,
      '',
      'closeDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.deviceSessionKafkaService.closeDeviceSession(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_DEVICE_SESSION_ENTITY)
  async getHistoryOfDeviceSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_DEVICE_SESSION_ENTITY}`,
      '',
      'getHistoryOfDeviceSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    return await this.deviceSessionKafkaService.getHistoryDeviceSession(
      message,
      key,
    );
  }
}
