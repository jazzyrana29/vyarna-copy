import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_EMAIL,
  KT_UPDATE_EMAIL,
  KT_GET_EMAIL,
  KT_GET_ZTRACKING_EMAIL,
  CreateEmailDto,
  UpdateEmailDto,
  GetOneEmailDto,
  GetZtrackingEmailDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class EmailKafkaService {
  public serviceName = EmailKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly emailService: EmailService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${EmailKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEmail(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_EMAIL,
      message,
      key,
      async (value: CreateEmailDto, traceId: string) =>
        await this.emailService.createEmail(value, traceId),
    );
  }

  async updateEmail(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_EMAIL,
      message,
      key,
      async (value: UpdateEmailDto, traceId: string) =>
        await this.emailService.updateEmail(value, traceId),
    );
  }

  async getEmail(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_EMAIL,
      message,
      key,
      async (value: GetOneEmailDto, traceId: string) =>
        await this.emailService.getEmail(value, traceId),
    );
  }

  async getZtrackingEmail(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_EMAIL,
      message,
      key,
      async (value: GetZtrackingEmailDto, traceId: string) =>
        await this.emailService.getZtrackingEmail(value, traceId),
    );
  }
}
