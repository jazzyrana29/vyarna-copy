import { Injectable } from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
  CreateSleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSessionKafkaService {
  public serviceName = SleepSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly sleepService: SleepSessionService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${SleepSessionKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSleepSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SLEEP_SESSION,
      message,
      key,
      async (value: CreateSleepSessionDto, traceId: string) =>
        await this.sleepService.createSleepSession(value, traceId),
    );
  }

  async getSleepSessions(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_SESSIONS,
      message,
      key,
      async (value: GetSleepSessionsDto, traceId: string) =>
        await this.sleepService.getSleepSessions(value, traceId),
    );
  }

  async getZtrackingSleepSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_SLEEP_SESSION,
      message,
      key,
      async (value: GetZtrackingSleepSessionDto, traceId: string) =>
        await this.sleepService.getZtrackingSleepSession(value, traceId),
    );
  }
}
