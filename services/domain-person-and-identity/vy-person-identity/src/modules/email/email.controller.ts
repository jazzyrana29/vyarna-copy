import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { EmailKafkaService } from './services/email-kafka.service';
import {
  KT_CREATE_EMAIL,
  KT_UPDATE_EMAIL,
  KT_GET_EMAIL,
  KT_GET_ZTRACKING_EMAIL,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('email')
export class EmailController {
  private logger = getLoggerConfig(EmailController.name);

  constructor(private readonly emailKafkaService: EmailKafkaService) {
    this.logger.debug(
      `${EmailController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_EMAIL)
  async createEmail(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_EMAIL}`,
      '',
      'createEmail',
      LogStreamLevel.DebugLight,
    );
    await this.emailKafkaService.createEmail(message, key);
  }

  @MessagePattern(KT_UPDATE_EMAIL)
  async updateEmail(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_EMAIL}`,
      '',
      'updateEmail',
      LogStreamLevel.DebugLight,
    );
    await this.emailKafkaService.updateEmail(message, key);
  }

  @MessagePattern(KT_GET_EMAIL)
  async getEmail(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_EMAIL}`,
      '',
      'getEmail',
      LogStreamLevel.DebugLight,
    );
    await this.emailKafkaService.getEmail(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_EMAIL)
  async getZtrackingEmail(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_EMAIL}`,
      '',
      'getZtrackingEmail',
      LogStreamLevel.DebugLight,
    );
    await this.emailKafkaService.getZtrackingEmail(message, key);
  }
}
