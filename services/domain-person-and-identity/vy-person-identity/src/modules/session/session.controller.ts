import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SessionKafkaService } from './services/session-kafka.service';
import {
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  KT_LOGIN_SESSION,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('session')
export class SessionController {
  private logger = getLoggerConfig(SessionController.name);

  constructor(private readonly sessionKafkaService: SessionKafkaService) {
    this.logger.debug(
      `${SessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SESSION)
  async create(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SESSION}`,
      '',
      'create',
      LogStreamLevel.DebugLight,
    );
    await this.sessionKafkaService.createSession(message, key);
  }

  @MessagePattern(KT_UPDATE_SESSION)
  async update(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_SESSION}`,
      '',
      'update',
      LogStreamLevel.DebugLight,
    );
    await this.sessionKafkaService.updateSession(message, key);
  }

  @MessagePattern(KT_GET_SESSION)
  async get(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SESSION}`,
      '',
      'get',
      LogStreamLevel.DebugLight,
    );
    await this.sessionKafkaService.getSession(message, key);
  }

  @MessagePattern(KT_DELETE_SESSION)
  async delete(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_SESSION}`,
      '',
      'delete',
      LogStreamLevel.DebugLight,
    );
    await this.sessionKafkaService.deleteSession(message, key);
  }

  @MessagePattern(KT_LOGIN_SESSION)
  async login(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_LOGIN_SESSION}`,
      '',
      'login',
      LogStreamLevel.DebugLight,
    );
    await this.sessionKafkaService.loginSession(message, key);
  }
}
