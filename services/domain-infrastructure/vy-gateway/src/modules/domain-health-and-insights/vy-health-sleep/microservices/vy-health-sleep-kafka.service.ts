import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  CreateSleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
  SleepEventDto,
  SleepInterruptionReasonDto,
  SleepEnvironmentDto,
  SleepRatingDto,
  SleepScheduleDto,
  SleepNotificationDto,
  GetSleepEventsDto,
  GetSleepInterruptionReasonsDto,
  GetSleepEnvironmentsDto,
  GetSleepRatingsDto,
  GetSleepSchedulesDto,
  GetSleepNotificationsDto,
  GetSleepPatternSummariesDto,
  GetSleepSummaryDto,
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
  KT_LOG_SLEEP_EVENT,
  KT_INTERRUPT_SLEEP,
  KT_RECORD_SLEEP_ENVIRONMENT,
  KT_RATE_SLEEP,
  KT_END_SLEEP_SESSION,
  KT_GET_SLEEP_EVENTS,
  KT_GET_SLEEP_INTERRUPTION_REASONS,
  KT_GET_SLEEP_ENVIRONMENTS,
  KT_GET_SLEEP_RATINGS,
  KT_CREATE_SLEEP_SCHEDULE,
  KT_GET_SLEEP_SCHEDULES,
  KT_CREATE_SLEEP_NOTIFICATION,
  KT_GET_SLEEP_NOTIFICATIONS,
  KT_GET_SLEEP_PATTERN_SUMMARIES,
  KT_GET_SLEEP_SUMMARY,
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

  async logSleepEvent(sleepEventDto: SleepEventDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_LOG_SLEEP_EVENT,
      sleepEventDto,
      traceId,
    );
  }

  async logSleepInterruption(
    sleepInterruptionReasonDto: SleepInterruptionReasonDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_INTERRUPT_SLEEP,
      sleepInterruptionReasonDto,
      traceId,
    );
  }

  async logSleepEnvironment(
    sleepEnvironmentDto: SleepEnvironmentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_RECORD_SLEEP_ENVIRONMENT,
      sleepEnvironmentDto,
      traceId,
    );
  }

  async logSleepRating(sleepRatingDto: SleepRatingDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_RATE_SLEEP,
      sleepRatingDto,
      traceId,
    );
  }

  async endSleepSession(sessionId: string, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_END_SLEEP_SESSION,
      { sessionId },
      traceId,
    );
  }

  async getSleepEvents(getSleepEventsDto: GetSleepEventsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_EVENTS,
      getSleepEventsDto,
      traceId,
    );
  }

  async getSleepInterruptionReasons(
    getSleepInterruptionReasonsDto: GetSleepInterruptionReasonsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_INTERRUPTION_REASONS,
      getSleepInterruptionReasonsDto,
      traceId,
    );
  }

  async getSleepEnvironments(
    getSleepEnvironmentsDto: GetSleepEnvironmentsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_ENVIRONMENTS,
      getSleepEnvironmentsDto,
      traceId,
    );
  }

  async getSleepRatings(getSleepRatingsDto: GetSleepRatingsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_RATINGS,
      getSleepRatingsDto,
      traceId,
    );
  }

  async createSleepSchedule(sleepScheduleDto: SleepScheduleDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SLEEP_SCHEDULE,
      sleepScheduleDto,
      traceId,
    );
  }

  async getSleepSchedules(
    getSleepSchedulesDto: GetSleepSchedulesDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_SCHEDULES,
      getSleepSchedulesDto,
      traceId,
    );
  }

  async createSleepNotification(
    sleepNotificationDto: SleepNotificationDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SLEEP_NOTIFICATION,
      sleepNotificationDto,
      traceId,
    );
  }

  async getSleepNotifications(
    getSleepNotificationsDto: GetSleepNotificationsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_NOTIFICATIONS,
      getSleepNotificationsDto,
      traceId,
    );
  }

  async getSleepPatternSummaries(
    getSleepPatternSummariesDto: GetSleepPatternSummariesDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_PATTERN_SUMMARIES,
      getSleepPatternSummariesDto,
      traceId,
    );
  }

  async getSleepSummary(getSleepSummaryDto: GetSleepSummaryDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_SUMMARY,
      getSleepSummaryDto,
      traceId,
    );
  }
}
