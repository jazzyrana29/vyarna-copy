import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { OperatorSessionKafkaService } from './services/operator-session-kafka.service';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import {
  KT_CREATE_OPERATOR_SESSION_ENTITY,
  KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
  KT_GET_OPERATOR_SESSION_ENTITY,
  KT_UPDATE_OPERATOR_SESSION_ENTITY,
  KT_LOGIN_OPERATOR_SESSION_ENTITY,
  KT_LOGOUT_OPERATOR_SESSION_ENTITY,
  KT_SEARCH_OPERATOR_SESSIONS,
} from 'ez-utils';

@Controller('operator-session')
export class OperatorSessionController {
  private logger = getLoggerConfig(OperatorSessionController.name);

  constructor(
    private readonly operatorSessionKafkaService: OperatorSessionKafkaService,
  ) {
    this.logger.debug(
      `${OperatorSessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_OPERATOR_SESSION_ENTITY)
  async createOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_OPERATOR_SESSION_ENTITY}`,
      '',
      'createOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.createOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_OPERATOR_SESSION_ENTITY)
  async updateOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_OPERATOR_SESSION_ENTITY}`,
      '',
      'updateOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.updateOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_OPERATOR_SESSION_ENTITY)
  async getOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_OPERATOR_SESSION_ENTITY}`,
      '',
      'getOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.getOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_OPERATOR_SESSION_ENTITY)
  async getHistoryOfOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_OPERATOR_SESSION_ENTITY}`,
      '',
      'getHistoryOfOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.getHistoryOfOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_LOGIN_OPERATOR_SESSION_ENTITY) // Add message pattern for login
  async loginOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_LOGIN_OPERATOR_SESSION_ENTITY}`,
      '',
      'loginOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.loginOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_LOGOUT_OPERATOR_SESSION_ENTITY) // Add message pattern for logout
  async logoutOperatorSessionWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_LOGOUT_OPERATOR_SESSION_ENTITY}`,
      '',
      'logoutOperatorSessionWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.logoutOperatorSessionViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_SEARCH_OPERATOR_SESSIONS)
  async searchOperatorSessionsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic: ${KT_SEARCH_OPERATOR_SESSIONS}`,
      '',
      'searchOperatorSessionsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.operatorSessionKafkaService.searchOperatorSessionsViaKafka(
      message,
      key,
    );
  }
}
