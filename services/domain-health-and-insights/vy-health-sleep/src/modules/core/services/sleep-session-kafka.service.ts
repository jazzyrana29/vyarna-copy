import { Injectable } from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { SleepEventService } from './sleep-event.service';
import { SleepInterruptionService } from './sleep-interruption.service';
import { SleepEnvironmentService } from './sleep-environment.service';
import { SleepRatingService } from './sleep-rating.service';
import { SleepScheduleService } from './sleep-schedule.service';
import { SleepNotificationService } from './sleep-notification.service';
import { SleepSummaryService } from './sleep-summary.service';
import { SleepPatternSummaryService } from './sleep-pattern-summary.service';
import {
  KafkaMessageResponderService,
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
  SleepSummaryDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSessionKafkaService {
  public serviceName = SleepSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly sleepService: SleepSessionService,
    private readonly sleepEventService: SleepEventService,
    private readonly sleepInterruptionService: SleepInterruptionService,
    private readonly sleepEnvironmentService: SleepEnvironmentService,
    private readonly sleepRatingService: SleepRatingService,
    private readonly sleepScheduleService: SleepScheduleService,
    private readonly sleepNotificationService: SleepNotificationService,
    private readonly sleepSummaryService: SleepSummaryService,
    private readonly sleepPatternSummaryService: SleepPatternSummaryService,
  ) {
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

  async logSleepEvent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_LOG_SLEEP_EVENT,
      message,
      key,
      async (value: SleepEventDto, traceId: string) =>
        await this.sleepEventService.createEvent(value, traceId),
    );
  }

  async logSleepInterruption(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_INTERRUPT_SLEEP,
      message,
      key,
      async (value: SleepInterruptionReasonDto, traceId: string) =>
        await this.sleepInterruptionService.createReason(value, traceId),
    );
  }

  async logSleepEnvironment(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RECORD_SLEEP_ENVIRONMENT,
      message,
      key,
      async (value: SleepEnvironmentDto, traceId: string) =>
        await this.sleepEnvironmentService.createEnvironment(value, traceId),
    );
  }

  async logSleepRating(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RATE_SLEEP,
      message,
      key,
      async (value: SleepRatingDto, traceId: string) =>
        await this.sleepRatingService.createRating(value, traceId),
    );
  }

  async endSleepSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_END_SLEEP_SESSION,
      message,
      key,
      async (value: SleepSummaryDto, traceId: string) =>
        await this.sleepSummaryService.createSummary(value, traceId),
    );
  }

  async getSleepEvents(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_EVENTS,
      message,
      key,
      async (value: GetSleepEventsDto, traceId: string) =>
        await this.sleepEventService.getEvents(value, traceId),
    );
  }

  async getSleepInterruptionReasons(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_INTERRUPTION_REASONS,
      message,
      key,
      async (value: GetSleepInterruptionReasonsDto, traceId: string) =>
        await this.sleepInterruptionService.getReasons(value, traceId),
    );
  }

  async getSleepEnvironments(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_ENVIRONMENTS,
      message,
      key,
      async (value: GetSleepEnvironmentsDto, traceId: string) =>
        await this.sleepEnvironmentService.getEnvironments(value, traceId),
    );
  }

  async getSleepRatings(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_RATINGS,
      message,
      key,
      async (value: GetSleepRatingsDto, traceId: string) =>
        await this.sleepRatingService.getRatings(value, traceId),
    );
  }

  async createSleepSchedule(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SLEEP_SCHEDULE,
      message,
      key,
      async (value: SleepScheduleDto, traceId: string) =>
        await this.sleepScheduleService.createSchedule(value, traceId),
    );
  }

  async getSleepSchedules(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_SCHEDULES,
      message,
      key,
      async (value: GetSleepSchedulesDto, traceId: string) =>
        await this.sleepScheduleService.getSchedules(value, traceId),
    );
  }

  async createSleepNotification(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SLEEP_NOTIFICATION,
      message,
      key,
      async (value: SleepNotificationDto, traceId: string) =>
        await this.sleepNotificationService.createNotification(value, traceId),
    );
  }

  async getSleepNotifications(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_NOTIFICATIONS,
      message,
      key,
      async (value: GetSleepNotificationsDto, traceId: string) =>
        await this.sleepNotificationService.getNotifications(value, traceId),
    );
  }

  async getSleepPatternSummaries(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_PATTERN_SUMMARIES,
      message,
      key,
      async (value: GetSleepPatternSummariesDto, traceId: string) =>
        await this.sleepPatternSummaryService.getSummaries(value, traceId),
    );
  }

  async getSleepSummary(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SLEEP_SUMMARY,
      message,
      key,
      async (value: GetSleepSummaryDto, traceId: string) =>
        await this.sleepSummaryService.getSummary(value, traceId),
    );
  }
}
