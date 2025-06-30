import { Injectable } from '@nestjs/common';
import { DeviceSessionService } from './device-session.service';

import { LogStreamLevel } from 'ez-logger';

import {
  CloseDeviceSessionDto,
  CreateDeviceSessionDto,
  GetDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  KafkaMessageResponderService,
  KT_CLOSE_DEVICE_SESSION_ENTITY,
  KT_CREATE_DEVICE_SESSION_ENTITY,
  KT_GET_DEVICE_SESSION_ENTITY,
  KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
  KT_START_DEVICE_SESSION_ENTITY,
  KT_UPDATE_DEVICE_SESSION_ENTITY,
  StartDeviceSessionDto,
  UpdateDeviceSessionDto,
} from 'ez-utils';
import { ZtrackingDeviceSessionService } from './ztracking-device-session.service';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class DeviceSessionKafkaService {
  private readonly serviceName = DeviceSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly deviceSessionService: DeviceSessionService,
    private readonly ztrackingDeviceSessionService: ZtrackingDeviceSessionService,
  ) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: CreateDeviceSessionDto, traceId: string) =>
        await this.deviceSessionService.createDeviceSession(value, traceId),
    );
  }

  async updateDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: UpdateDeviceSessionDto, traceId: string) =>
        await this.deviceSessionService.updateDeviceSession(value, traceId),
    );
  }

  async getDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: GetDeviceSessionDto, traceId: string) =>
        await this.deviceSessionService.findDeviceSession(value, traceId),
    );
  }

  async getHistoryDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: GetDeviceSessionHistoryDto, traceId: string) =>
        await this.ztrackingDeviceSessionService.findZtrackingDeviceSessionEntity(
          value,
          traceId,
        ),
    );
  }

  async startDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: StartDeviceSessionDto, traceId: string) =>
        await this.deviceSessionService.startDeviceSession(value, traceId),
    );
  }

  async closeDeviceSession(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CLOSE_DEVICE_SESSION_ENTITY,
      message,
      key,
      async (value: CloseDeviceSessionDto, traceId: string) =>
        await this.deviceSessionService.closeDeviceSession(value, traceId),
    );
  }
}
