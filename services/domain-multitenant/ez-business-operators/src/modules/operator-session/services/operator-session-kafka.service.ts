import { Injectable } from '@nestjs/common';
import { OperatorSessionService } from './operator-session.service';

import { LogStreamLevel } from 'ez-logger';

import {
  CreateOperatorSessionDto,
  GetHistoryOfOperatorSessionDto,
  GetOperatorSessionDto,
  KafkaMessageResponderService,
  KT_CREATE_OPERATOR_SESSION_ENTITY,
  KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
  KT_GET_OPERATOR_SESSION_ENTITY,
  KT_LOGIN_OPERATOR_SESSION_ENTITY,
  KT_LOGOUT_OPERATOR_SESSION_ENTITY,
  KT_SEARCH_OPERATOR_SESSIONS,
  KT_UPDATE_OPERATOR_SESSION_ENTITY,
  LoginOperatorSessionDto,
  LogoutOperatorSessionDto,
  SearchOperatorSessionsDto,
  UpdateOperatorSessionDto,
} from 'ez-utils';
import { ZtrackingOperatorSessionService } from './ztracking-operator-session.service';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class OperatorSessionKafkaService {
  private readonly serviceName = OperatorSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly operatorSessionService: OperatorSessionService,
    private readonly ztrackingOperatorSessionService: ZtrackingOperatorSessionService,
  ) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createOperatorSessionViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: CreateOperatorSessionDto, traceId: string) =>
        await this.operatorSessionService.createOperatorSession(value, traceId),
    );
  }

  async updateOperatorSessionViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: UpdateOperatorSessionDto, traceId: string) =>
        await this.operatorSessionService.updateOperatorSession(value, traceId),
    );
  }

  async getOperatorSessionViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: GetOperatorSessionDto, traceId: string) =>
        await this.operatorSessionService.findOperatorSession(value, traceId),
    );
  }

  async getHistoryOfOperatorSessionViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: GetHistoryOfOperatorSessionDto, traceId: string) =>
        await this.ztrackingOperatorSessionService.findZtrackingOperatorSessionEntity(
          value,
          traceId,
        ),
    );
  }

  async loginOperatorSessionViaKafka(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_LOGIN_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: LoginOperatorSessionDto, traceId: string) =>
        await this.operatorSessionService.loginOperator(value, traceId),
    );
  }

  async logoutOperatorSessionViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_LOGOUT_OPERATOR_SESSION_ENTITY,
      message,
      key,
      async (value: LogoutOperatorSessionDto, traceId: string) =>
        await this.operatorSessionService.logoutOperatorSession(value, traceId),
    );
  }

  async searchOperatorSessionsViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_SEARCH_OPERATOR_SESSIONS,
      message,
      key,
      async (value: SearchOperatorSessionsDto, traceId: string) =>
        await this.operatorSessionService.searchOperatorSessions(
          value,
          traceId,
        ),
    );
  }
}
