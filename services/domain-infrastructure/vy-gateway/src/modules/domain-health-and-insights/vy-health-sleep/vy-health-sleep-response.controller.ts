import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
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
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class HealthSleepResponseController {
  private logger = getLoggerConfig(HealthSleepResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${HealthSleepResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SLEEP_SESSION + '-response')
  handleCreate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SLEEP_SESSION} | key: ${key}`,
      '',
      'handleCreate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_SESSIONS + '-response')
  handleGet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_SESSIONS} | key: ${key}`,
      '',
      'handleGet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_ZTRACKING_SLEEP_SESSION + '-response')
  handleZtracking(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_ZTRACKING_SLEEP_SESSION} | key: ${key}`,
      '',
      'handleZtracking',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SLEEP_EVENT_LOGGED + '-response')
  handleEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SLEEP_EVENT_LOGGED} | key: ${key}`,
      '',
      'handleEvent',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SLEEP_INTERRUPTED + '-response')
  handleInterruption(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SLEEP_INTERRUPTED} | key: ${key}`,
      '',
      'handleInterruption',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SLEEP_ENVIRONMENT_RECORDED + '-response')
  handleEnvironment(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SLEEP_ENVIRONMENT_RECORDED} | key: ${key}`,
      '',
      'handleEnvironment',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SLEEP_RATED + '-response')
  handleRating(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SLEEP_RATED} | key: ${key}`,
      '',
      'handleRating',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_SLEEP_SESSION_ENDED + '-response')
  handleEnd(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_SLEEP_SESSION_ENDED} | key: ${key}`,
      '',
      'handleEnd',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_EVENTS + '-response')
  handleGetEvents(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_EVENTS} | key: ${key}`,
      '',
      'handleGetEvents',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_INTERRUPTION_REASONS + '-response')
  handleGetInterruptions(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_INTERRUPTION_REASONS} | key: ${key}`,
      '',
      'handleGetInterruptions',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_ENVIRONMENTS + '-response')
  handleGetEnvironments(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_ENVIRONMENTS} | key: ${key}`,
      '',
      'handleGetEnvironments',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_RATINGS + '-response')
  handleGetRatings(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_RATINGS} | key: ${key}`,
      '',
      'handleGetRatings',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_SLEEP_SCHEDULE + '-response')
  handleCreateSchedule(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SLEEP_SCHEDULE} | key: ${key}`,
      '',
      'handleCreateSchedule',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_SCHEDULES + '-response')
  handleGetSchedules(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_SCHEDULES} | key: ${key}`,
      '',
      'handleGetSchedules',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_SLEEP_NOTIFICATION + '-response')
  handleCreateNotification(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SLEEP_NOTIFICATION} | key: ${key}`,
      '',
      'handleCreateNotification',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_NOTIFICATIONS + '-response')
  handleGetNotifications(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_NOTIFICATIONS} | key: ${key}`,
      '',
      'handleGetNotifications',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_PATTERN_SUMMARIES + '-response')
  handleGetPatterns(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_PATTERN_SUMMARIES} | key: ${key}`,
      '',
      'handleGetPatterns',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SLEEP_SUMMARY + '-response')
  handleGetSummary(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SLEEP_SUMMARY} | key: ${key}`,
      '',
      'handleGetSummary',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
