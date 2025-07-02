import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_FLIP_GAME,
  KT_EXECUTE_FLIP_GAME,
  KT_CASHOUT_FLIP_GAME,
  KT_GET_FLIP_CONFIG,
  KT_GET_PROVABLY_FAIR_FLIP_GAME,
  StartFlipDto,
  FlipDto,
  FlipCashoutDto,
  FlipProvablyFairRequestDto,
  FlipConfigRequestDto,
} from 'ez-utils';

@Injectable()
export class FlipKafkaService {
  private readonly serviceName = FlipKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startFlipDto: StartFlipDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_FLIP_GAME,
      startFlipDto,
      traceId,
    );
  }

  async executeFlip(flipDto: FlipDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_EXECUTE_FLIP_GAME,
      flipDto,
      traceId,
    );
  }

  async cashout(flipCashoutDto: FlipCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_FLIP_GAME,
      flipCashoutDto,
      traceId,
    );
  }

  async config(flipConfigRequestDto: FlipConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_FLIP_CONFIG,
      flipConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    flipProvablyFairRequestDto: FlipProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_FLIP_GAME,
      flipProvablyFairRequestDto,
      traceId,
    );
  }
}
