import { Injectable } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../../utils/common';

import {
  GetHistoryOfMechanismPermitDto,
  GetMechanismPermitDto,
  GetMechanismPermitForSystemMechanismDto,
  KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
  KT_GET_MECHANISM_PERMIT_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class MechanismPermitKafkaService {
  private readonly serviceName = MechanismPermitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getMechanismPermitEntity(
    getMechanismPermitDto: GetMechanismPermitDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MECHANISM_PERMIT_ENTITY,
      getMechanismPermitDto,
      traceId,
    );
  }

  async getHistoryMechanismPermitEntity(
    getHistoryOfMechanismPermitDto: GetHistoryOfMechanismPermitDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
      getHistoryOfMechanismPermitDto,
      traceId,
    );
  }

  async getMechanismPermitsForOneSystemMechanism(
    getMechanismPermitForSystemMechanismDto: GetMechanismPermitForSystemMechanismDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
      getMechanismPermitForSystemMechanismDto,
      traceId,
    );
  }
}
