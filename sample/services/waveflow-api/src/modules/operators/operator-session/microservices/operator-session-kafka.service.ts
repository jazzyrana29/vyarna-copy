import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreateOperatorSessionDto,
  GetHistoryOfOperatorSessionDto,
  GetOperatorSessionDto,
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

import { AuthService } from '../../../../services/auth.service';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class OperatorSessionKafkaService {
  private readonly authService = AuthService;
  private readonly serviceName = OperatorSessionKafkaService.name;
  private logger = getLoggerConfig(OperatorSessionKafkaService.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOperatorSessionEntity(
    createOperatorSessionDto: CreateOperatorSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_CREATE_OPERATOR_SESSION_ENTITY,
      createOperatorSessionDto,
      traceId,
    );
  }

  async updateOperatorSessionEntity(
    updateOperatorSessionDto: UpdateOperatorSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_UPDATE_OPERATOR_SESSION_ENTITY,
      updateOperatorSessionDto,
      traceId,
    );
  }

  async getOperatorSessionEntity(
    getOperatorSessionDto: GetOperatorSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_GET_OPERATOR_SESSION_ENTITY,
      getOperatorSessionDto,
      traceId,
    );
  }

  async getHistoryOperatorSessionEntity(
    getHistoryOfOperatorSessionDto: GetHistoryOfOperatorSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
      getHistoryOfOperatorSessionDto,
      traceId,
    );
  }

  async loginOperatorSession(
    loginOperatorSessionDto: LoginOperatorSessionDto,
    traceId: string,
  ) {
    return await this.authService.loginOperatorSession(
      await this.kafkaResponder.sendMessageAndWaitForResponse(
        OperatorSessionKafkaService.name,
        KT_LOGIN_OPERATOR_SESSION_ENTITY,
        loginOperatorSessionDto,
        traceId,
      ),
    );
  }

  async logoutOperatorSession(
    logoutOperatorSessionDto: LogoutOperatorSessionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_LOGOUT_OPERATOR_SESSION_ENTITY,
      logoutOperatorSessionDto,
      traceId,
    );
  }

  async searchOperatorSessions(
    searchOperatorSessionsDto: SearchOperatorSessionsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      OperatorSessionKafkaService.name,
      KT_SEARCH_OPERATOR_SESSIONS,
      searchOperatorSessionsDto,
      traceId,
    );
  }
}
