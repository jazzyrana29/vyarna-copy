import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_EMAIL,
  KT_UPDATE_EMAIL,
  KT_GET_EMAIL,
  KT_GET_ZTRACKING_EMAIL,
  CreateEmailDto,
  UpdateEmailDto,
  GetEmailDto,
  GetZtrackingEmailDto,
} from 'ez-utils';

@Injectable()
export class PersonEmailKafkaService {
  private readonly serviceName = PersonEmailKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEmail(createEmailDto: CreateEmailDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_EMAIL,
      createEmailDto,
      traceId,
    );
  }

  async updateEmail(updateEmailDto: UpdateEmailDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_EMAIL,
      updateEmailDto,
      traceId,
    );
  }

  async getEmail(getEmailDto: GetEmailDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_EMAIL,
      getEmailDto,
      traceId,
    );
  }

  async getHistory(getDto: GetZtrackingEmailDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_EMAIL,
      getDto,
      traceId,
    );
  }
}
