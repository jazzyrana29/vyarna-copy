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
  KT_SLEEP_EVENT_LOGGED,
  KT_SLEEP_INTERRUPTED,
  KT_SLEEP_ENVIRONMENT_RECORDED,
  KT_SLEEP_RATED,
  KT_SLEEP_SESSION_ENDED,
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
      KT_SLEEP_EVENT_LOGGED,
      sleepEventDto,
      traceId,
    );
  }

  async logSleepInterruption(
    interruptionDto: SleepInterruptionReasonDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SLEEP_INTERRUPTED,
      interruptionDto,
      traceId,
    );
  }

  async logSleepEnvironment(envDto: SleepEnvironmentDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SLEEP_ENVIRONMENT_RECORDED,
      envDto,
      traceId,
    );
  }

  async logSleepRating(ratingDto: SleepRatingDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SLEEP_RATED,
      ratingDto,
      traceId,
    );
  }

  async endSleepSession(sessionId: string, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SLEEP_SESSION_ENDED,
      { sessionId },
      traceId,
    );
  }

  async getSleepEvents(dto: GetSleepEventsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_EVENTS,
      dto,
      traceId,
    );
  }

  async getSleepInterruptionReasons(
    dto: GetSleepInterruptionReasonsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_INTERRUPTION_REASONS,
      dto,
      traceId,
    );
  }

  async getSleepEnvironments(dto: GetSleepEnvironmentsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_ENVIRONMENTS,
      dto,
      traceId,
    );
  }

  async getSleepRatings(dto: GetSleepRatingsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_RATINGS,
      dto,
      traceId,
    );
  }

  async createSleepSchedule(dto: SleepScheduleDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SLEEP_SCHEDULE,
      dto,
      traceId,
    );
  }

  async getSleepSchedules(dto: GetSleepSchedulesDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_SCHEDULES,
      dto,
      traceId,
    );
  }

  async createSleepNotification(dto: SleepNotificationDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SLEEP_NOTIFICATION,
      dto,
      traceId,
    );
  }

  async getSleepNotifications(dto: GetSleepNotificationsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_NOTIFICATIONS,
      dto,
      traceId,
    );
  }

  async getSleepPatternSummaries(
    dto: GetSleepPatternSummariesDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_PATTERN_SUMMARIES,
      dto,
      traceId,
    );
  }

  async getSleepSummary(dto: GetSleepSummaryDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SLEEP_SUMMARY,
      dto,
      traceId,
    );
  }
}
