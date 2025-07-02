import { Injectable } from '@nestjs/common';
import {
  KafkaMessageResponderService,
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
  SnakesConfigRequestDto,
  SnakesProvablyFairDto,
  SnakesProvablyFairRequestDto,
  SnakesRollDiceDto,
  RollDiceResponseDto,
  SnakesCashoutDto,
  CashoutResponseDto,
} from 'ez-utils';
import { SnakesService } from './snakes.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SnakesKafkaService {
  public serviceName = SnakesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly snakesService: SnakesService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${SnakesKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createRound(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_SNAKES_ROUND_ENTITY,
      message,
      key,
      async (value: CreateSnakesRoundDto, traceId: string) =>
        await this.snakesService.createRound(value, traceId),
    );
  }

  async updateRound(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_SNAKES_ROUND_ENTITY,
      message,
      key,
      async (value: UpdateSnakesRoundDto, traceId: string) =>
        await this.snakesService.updateRound(value, traceId),
    );
  }

  async getRound(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SNAKES_ROUND_ENTITY,
      message,
      key,
      async (value: GetSnakesRoundDto, traceId: string) =>
        await this.snakesService.findRound(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_SNAKES_CONFIG,
      message,
      key,
      async (value: SnakesConfigRequestDto, traceId: string) =>
        await this.snakesService.getConfig(value, traceId),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_SNAKES_GAME,
      message,
      key,
      async (value: SnakesProvablyFairRequestDto, traceId: string) =>
        await this.snakesService.getProvablyFair(value, traceId),
    );
  }

  async rollDice(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ROLL_DICE_SNAKES_GAME,
      message,
      key,
      async (value: SnakesRollDiceDto, traceId: string) =>
        await this.snakesService.rollDice(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_SNAKES_GAME,
      message,
      key,
      async (value: SnakesCashoutDto, traceId: string) =>
        await this.snakesService.cashout(value, traceId),
    );
  }
}
