import { Injectable } from '@nestjs/common';
import { MechanismPermitService } from './mechanism-permit.service';

import { LogStreamLevel } from 'ez-logger';

import {
  GetHistoryOfMechanismPermitDto,
  GetMechanismPermitDto,
  GetMechanismPermitForSystemMechanismDto,
  KafkaMessageResponderService,
  KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class MechanismPermitKafkaService {
  private readonly serviceName = MechanismPermitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly mechanismPermitsService: MechanismPermitService,
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

  async getMechanismPermitEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (value: GetMechanismPermitDto, traceId: string) =>
        await this.mechanismPermitsService.getMechanismPermitEntity(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfMechanismPermitEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (value: GetHistoryOfMechanismPermitDto, traceId: string) =>
        await this.mechanismPermitsService.findHistoricalData(value, traceId),
    );
  }

  async getMechanismPermitForSystemMechanism(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
      message,
      key,
      async (value: GetMechanismPermitForSystemMechanismDto, traceId: string) =>
        await this.mechanismPermitsService.getMechanismPermitsForSystemMechanism(
          value,
          traceId,
        ),
    );
  }
}
