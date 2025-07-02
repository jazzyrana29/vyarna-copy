import { Injectable } from '@nestjs/common';
import { SystemMechanismService } from './system-mechanism.service';

import { LogStreamLevel } from 'ez-logger';

import {
  GetHistoryOfSystemMechanismDto,
  GetManySystemMechanismDto,
  GetSystemMechanismDto,
  KafkaMessageResponderService,
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
  KT_GET_SYSTEM_MECHANISM_ENTITY,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class SystemMechanismKafkaService {
  private readonly serviceName = SystemMechanismKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly systemMechanismService: SystemMechanismService) {
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

  async getSystemMechanismEntityViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SYSTEM_MECHANISM_ENTITY,
      message,
      key,
      async (value: GetSystemMechanismDto, traceId: string) =>
        await this.systemMechanismService.findSystemMechanism(value, traceId),
    );
  }

  async getHistoryOfSystemMechanismEntityViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
      message,
      key,
      async (value: GetHistoryOfSystemMechanismDto, traceId: string) =>
        await this.systemMechanismService.findHistoricalData(value, traceId),
    );
  }

  async getManySystemMechanismsViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
      message,
      key,
      async (value: GetManySystemMechanismDto, traceId: string) =>
        await this.systemMechanismService.getManySystemMechanisms(
          value,
          traceId,
        ),
    );
  }
}
