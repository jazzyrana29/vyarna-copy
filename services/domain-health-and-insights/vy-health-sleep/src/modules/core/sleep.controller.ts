import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SleepSessionKafkaService } from './services/sleep-session-kafka.service';
import {
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
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
}
