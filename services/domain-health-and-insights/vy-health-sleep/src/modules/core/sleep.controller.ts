import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SleepSessionKafkaService } from './services/sleep-session-kafka.service';
import {
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
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('sleep')
export class SleepController {
  private logger = getLoggerConfig(SleepController.name);

  constructor(private readonly sleepKafkaService: SleepSessionKafkaService) {
    this.logger.debug(
      `${SleepController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SLEEP_SESSION)
  async createSleepSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SLEEP_SESSION}`,
      '',
      'createSleepSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.createSleepSession(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_SESSIONS)
  async getSleepSessionsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_SESSIONS}`,
      '',
      'getSleepSessionsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepSessions(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_SLEEP_SESSION)
  async getZtrackingSleepSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_SLEEP_SESSION}`,
      '',
      'getZtrackingSleepSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getZtrackingSleepSession(message, key);
  }

  @MessagePattern(KT_LOG_SLEEP_EVENT)
  async logSleepEventWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_LOG_SLEEP_EVENT}`,
      '',
      'logSleepEventWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.logSleepEvent(message, key);
  }

  @MessagePattern(KT_INTERRUPT_SLEEP)
  async logSleepInterruptionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_INTERRUPT_SLEEP}`,
      '',
      'logSleepInterruptionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.logSleepInterruption(message, key);
  }

  @MessagePattern(KT_RECORD_SLEEP_ENVIRONMENT)
  async logSleepEnvironmentWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_RECORD_SLEEP_ENVIRONMENT}`,
      '',
      'logSleepEnvironmentWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.logSleepEnvironment(message, key);
  }

  @MessagePattern(KT_RATE_SLEEP)
  async logSleepRatingWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_RATE_SLEEP}`,
      '',
      'logSleepRatingWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.logSleepRating(message, key);
  }

  @MessagePattern(KT_END_SLEEP_SESSION)
  async endSleepSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_END_SLEEP_SESSION}`,
      '',
      'endSleepSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.endSleepSession(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_EVENTS)
  async getSleepEventsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_EVENTS}`,
      '',
      'getSleepEventsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepEvents(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_INTERRUPTION_REASONS)
  async getSleepInterruptionReasonsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_INTERRUPTION_REASONS}`,
      '',
      'getSleepInterruptionReasonsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepInterruptionReasons(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_ENVIRONMENTS)
  async getSleepEnvironmentsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_ENVIRONMENTS}`,
      '',
      'getSleepEnvironmentsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepEnvironments(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_RATINGS)
  async getSleepRatingsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_RATINGS}`,
      '',
      'getSleepRatingsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepRatings(message, key);
  }

  @MessagePattern(KT_CREATE_SLEEP_SCHEDULE)
  async createSleepScheduleWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SLEEP_SCHEDULE}`,
      '',
      'createSleepScheduleWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.createSleepSchedule(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_SCHEDULES)
  async getSleepSchedulesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_SCHEDULES}`,
      '',
      'getSleepSchedulesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepSchedules(message, key);
  }

  @MessagePattern(KT_CREATE_SLEEP_NOTIFICATION)
  async createSleepNotificationWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SLEEP_NOTIFICATION}`,
      '',
      'createSleepNotificationWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.createSleepNotification(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_NOTIFICATIONS)
  async getSleepNotificationsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_NOTIFICATIONS}`,
      '',
      'getSleepNotificationsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepNotifications(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_PATTERN_SUMMARIES)
  async getSleepPatternSummariesWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_PATTERN_SUMMARIES}`,
      '',
      'getSleepPatternSummariesWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepPatternSummaries(message, key);
  }

  @MessagePattern(KT_GET_SLEEP_SUMMARY)
  async getSleepSummaryWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SLEEP_SUMMARY}`,
      '',
      'getSleepSummaryWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.sleepKafkaService.getSleepSummary(message, key);
  }
}
