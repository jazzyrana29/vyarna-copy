import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_PUMP,
  KT_PUMP_BALLOON,
  KT_CASHOUT_PUMP,
  KT_GET_PUMP_CONFIG,
  KT_GET_PUMP_FAIRNESS,
  KT_AUTO_BET_PUMP,
  StartPumpDto,
  PumpDto,
  PumpCashoutDto,
  PumpConfigRequestDto,
  PumpProvablyFairRequestDto,
  PumpAutoBetSettingsDto,
} from 'ez-utils';

@Injectable()
export class PumpKafkaService {
  private readonly serviceName = PumpKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startPumpDto: StartPumpDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_PUMP,
      startPumpDto,
      traceId,
    );
  }

  async pump(pumpDto: PumpDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_PUMP_BALLOON,
      pumpDto,
      traceId,
    );
  }

  async cashout(pumpCashoutDto: PumpCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_PUMP,
      pumpCashoutDto,
      traceId,
    );
  }

  async config(pumpConfigRequestDto: PumpConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PUMP_CONFIG,
      pumpConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    pumpProvablyFairRequestDto: PumpProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PUMP_FAIRNESS,
      pumpProvablyFairRequestDto,
      traceId,
    );
  }

  async autoBet(
    pumpAutoBetSettingsDto: PumpAutoBetSettingsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_AUTO_BET_PUMP,
      pumpAutoBetSettingsDto,
      traceId,
    );
  }
}
