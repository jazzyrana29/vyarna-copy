import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_BLACKJACK_GAME,
  KT_HIT_BLACKJACK_GAME,
  KT_STAND_BLACKJACK_GAME,
  KT_SPLIT_BLACKJACK_GAME,
  KT_DOUBLE_BLACKJACK_GAME,
  KT_INSURANCE_BLACKJACK_GAME,
  KT_GET_BLACKJACK_CONFIG,
  KT_GET_PROVABLY_FAIR_DATA,
  BlackjackStartGameDto,
  BlackjackHitDto,
  BlackjackStandDto,
  BlackjackSplitDto,
  BlackjackDoubleDto,
  BlackjackInsuranceDto,
  BlackjackConfigRequestDto,
  BlackjackProvablyFairRequestDto,
} from 'ez-utils';

@Injectable()
export class BlackjackKafkaService {
  private readonly serviceName = BlackjackKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(
    blackjackStartGameDto: BlackjackStartGameDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_BLACKJACK_GAME,
      blackjackStartGameDto,
      traceId,
    );
  }

  async hit(blackjackHitDto: BlackjackHitDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_HIT_BLACKJACK_GAME,
      blackjackHitDto,
      traceId,
    );
  }

  async stand(blackjackStandDto: BlackjackStandDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_STAND_BLACKJACK_GAME,
      blackjackStandDto,
      traceId,
    );
  }

  async split(blackjackSplitDto: BlackjackSplitDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_SPLIT_BLACKJACK_GAME,
      blackjackSplitDto,
      traceId,
    );
  }

  async double(blackjackDoubleDto: BlackjackDoubleDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DOUBLE_BLACKJACK_GAME,
      blackjackDoubleDto,
      traceId,
    );
  }

  async insurance(
    blackjackInsuranceDto: BlackjackInsuranceDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_INSURANCE_BLACKJACK_GAME,
      blackjackInsuranceDto,
      traceId,
    );
  }

  async config(
    blackjackConfigRequestDto: BlackjackConfigRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_BLACKJACK_CONFIG,
      blackjackConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    blackjackProvablyFairRequestDto: BlackjackProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DATA,
      blackjackProvablyFairRequestDto,
      traceId,
    );
  }
}
