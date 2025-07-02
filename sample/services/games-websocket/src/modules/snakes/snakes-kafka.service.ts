import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_SNAKES_ROUND_ENTITY,
  KT_UPDATE_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_CONFIG,
  KT_GET_PROVABLY_FAIR_SNAKES_GAME,
  KT_ROLL_DICE_SNAKES_GAME,
  KT_CASHOUT_SNAKES_GAME,
  CreateSnakesRoundDto,
  UpdateSnakesRoundDto,
  GetSnakesRoundDto,
  SnakesProvablyFairRequestDto,
  SnakesConfigRequestDto,
  SnakesRollDiceDto,
  SnakesCashoutDto,
} from 'ez-utils';

@Injectable()
export class SnakesKafkaService {
  private readonly serviceName = SnakesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createRound(
    createSnakesRoundDto: CreateSnakesRoundDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SNAKES_ROUND_ENTITY,
      createSnakesRoundDto,
      traceId,
    );
  }

  async updateRound(
    updateSnakesRoundDto: UpdateSnakesRoundDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_SNAKES_ROUND_ENTITY,
      updateSnakesRoundDto,
      traceId,
    );
  }

  async getRound(getSnakesRoundDto: GetSnakesRoundDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SNAKES_ROUND_ENTITY,
      getSnakesRoundDto,
      traceId,
    );
  }

  async getConfig(
    snakesConfigRequestDto: SnakesConfigRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SNAKES_CONFIG,
      snakesConfigRequestDto,
      traceId,
    );
  }

  async getProvablyFair(
    snakesProvablyFairRequestDto: SnakesProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_SNAKES_GAME,
      snakesProvablyFairRequestDto,
      traceId,
    );
  }

  async rollDice(snakesRollDiceDto: SnakesRollDiceDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_ROLL_DICE_SNAKES_GAME,
      snakesRollDiceDto,
      traceId,
    );
  }

  async cashout(snakesCashoutDto: SnakesCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_SNAKES_GAME,
      snakesCashoutDto,
      traceId,
    );
  }
}
