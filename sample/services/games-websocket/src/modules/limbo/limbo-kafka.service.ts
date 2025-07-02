import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_LIMBO_GAME,
  KT_CASHOUT_LIMBO_GAME,
  KT_GET_LIMBO_CONFIG,
  KT_GET_LIMBO_FAIR_DATA,
  LimboStartGameDto,
  LimboCashoutDto,
  LimboConfigRequestDto,
  LimboProvablyFairRequestDto,
} from 'ez-utils';

@Injectable()
export class LimboKafkaService {
  private readonly serviceName = LimboKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(limboStartGameDto: LimboStartGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_LIMBO_GAME,
      limboStartGameDto,
      traceId,
    );
  }

  async cashout(limboCashoutDto: LimboCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_LIMBO_GAME,
      limboCashoutDto,
      traceId,
    );
  }

  async config(limboConfigRequestDto: LimboConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_LIMBO_CONFIG,
      limboConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    limboProvablyFairRequestDto: LimboProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_LIMBO_FAIR_DATA,
      limboProvablyFairRequestDto,
      traceId,
    );
  }
}
