import { Injectable } from '@nestjs/common';
import {
  GetHistoryOfSystemMechanismDto,
  GetManySystemMechanismDto,
  GetSystemMechanismDto,
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
  KT_GET_SYSTEM_MECHANISM_ENTITY,
} from 'ez-utils';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class SystemMechanismKafkaService {
  private readonly serviceName = SystemMechanismKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getSystemMechanismEntity(
    getSystemMechanismDto: GetSystemMechanismDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SYSTEM_MECHANISM_ENTITY,
      getSystemMechanismDto,
      traceId,
    );
  }

  async getHistorySystemMechanismEntity(
    getHistoryOfSystemMechanismDto: GetHistoryOfSystemMechanismDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
      getHistoryOfSystemMechanismDto,
      traceId,
    );
  }

  async getManySystemMechanisms(
    getManySystemMechanismDto: GetManySystemMechanismDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
      getManySystemMechanismDto,
      traceId,
    );
  }
}
