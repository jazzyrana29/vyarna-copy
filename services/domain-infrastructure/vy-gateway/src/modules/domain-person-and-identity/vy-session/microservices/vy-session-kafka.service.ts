import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
} from 'ez-utils';

@Injectable()
export class PersonSessionKafkaService {
  private readonly serviceName = PersonSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSession(dto: CreateSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SESSION,
      dto,
      traceId,
    );
  }

  async updateSession(dto: UpdateSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_SESSION,
      dto,
      traceId,
    );
  }

  async getSession(dto: GetOneSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SESSION,
      dto,
      traceId,
    );
  }

  async deleteSession(dto: DeleteSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DELETE_SESSION,
      dto,
      traceId,
    );
  }
}
