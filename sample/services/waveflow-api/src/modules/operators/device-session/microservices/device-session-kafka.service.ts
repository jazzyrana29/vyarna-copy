import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_CLOSE_DEVICE_SESSION_ENTITY,
  KT_CREATE_DEVICE_SESSION_ENTITY,
  KT_GET_DEVICE_SESSION_ENTITY,
  KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
  KT_START_DEVICE_SESSION_ENTITY,
  KT_UPDATE_DEVICE_SESSION_ENTITY,
  UpdateDeviceSessionDto,
  CreateDeviceSessionDto,
  GetDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  StartDeviceSessionDto,
  CloseDeviceSessionDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class DeviceSessionKafkaService {
  private readonly serviceName = DeviceSessionKafkaService.name;
  private logger = getLoggerConfig(DeviceSessionKafkaService.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDeviceSessionEntityViaKafka(
    createDeviceSessionDto: CreateDeviceSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_CREATE_DEVICE_SESSION_ENTITY,
      createDeviceSessionDto,
      traceId,
    );
  }

  async updateDeviceSessionEntityViaKafka(
    updateDeviceSessionDto: UpdateDeviceSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_UPDATE_DEVICE_SESSION_ENTITY,
      updateDeviceSessionDto,
      traceId,
    );
  }

  async getDeviceSessionEntityViaKafka(
    getDeviceSessionDto: GetDeviceSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_GET_DEVICE_SESSION_ENTITY,
      getDeviceSessionDto,
      traceId,
    );
  }

  async getDeviceSessionHistoryViaKafka(
    deviceSessionHistoryDto: GetDeviceSessionHistoryDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
      deviceSessionHistoryDto,
      traceId,
    );
  }

  async startDeviceSession(
    startDeviceSessionDto: StartDeviceSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_START_DEVICE_SESSION_ENTITY,
      startDeviceSessionDto,
      traceId,
    );
  }

  async closeDeviceSessionViaKafka(
    closeDeviceSessionDto: CloseDeviceSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      DeviceSessionKafkaService.name,
      KT_CLOSE_DEVICE_SESSION_ENTITY,
      closeDeviceSessionDto,
      traceId,
    );
  }
}
