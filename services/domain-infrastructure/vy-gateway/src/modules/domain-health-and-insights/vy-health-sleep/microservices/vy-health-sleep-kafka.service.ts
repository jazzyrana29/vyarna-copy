import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateSleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
  SleepEventDto,
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
  KT_SLEEP_EVENT_LOGGED,
} from 'ez-utils';

@Injectable()
export class HealthSleepKafkaService {
  private readonly serviceName = HealthSleepKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSleepSession(
    createSleepSessionDto: CreateSleepSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SLEEP_SESSION,
      createSleepSessionDto,
      traceId,
    );
  }

  async getSleepSessions(
    getSleepSessionsDto: GetSleepSessionsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_SESSIONS,
      getSleepSessionsDto,
      traceId,
    );
  }

  async getZtrackingSleepSession(
    getZtrackingSleepSessionDto: GetZtrackingSleepSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_SLEEP_SESSION,
      getZtrackingSleepSessionDto,
      traceId,
    );
  }

  async logSleepEvent(
    sessionId: string,
    sleepEventDto: SleepEventDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SLEEP_EVENT_LOGGED,
      { sessionId, ...sleepEventDto },
      traceId,
    );
  }
}
