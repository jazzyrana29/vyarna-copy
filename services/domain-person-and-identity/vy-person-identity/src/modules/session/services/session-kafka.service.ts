import { Injectable } from '@nestjs/common';
import { SessionService } from './session.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SessionKafkaService {
  public serviceName = SessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly sessionService: SessionService) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(`${SessionKafkaService.name} initialized`, '', 'constructor', LogStreamLevel.DebugLight);
  }

  async createSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SESSION,
      message,
      key,
      async (value: CreateSessionDto, traceId: string) =>
        await this.sessionService.createSession(value, traceId),
    );
  }

  async updateSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_SESSION,
      message,
      key,
      async (value: UpdateSessionDto, traceId: string) =>
        await this.sessionService.updateSession(value, traceId),
    );
  }

  async getSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SESSION,
      message,
      key,
      async (value: GetOneSessionDto, traceId: string) =>
        await this.sessionService.getSession(value, traceId),
    );
  }

  async deleteSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_SESSION,
      message,
      key,
      async (value: DeleteSessionDto, traceId: string) =>
        await this.sessionService.deleteSession(value, traceId),
    );
  }
}
