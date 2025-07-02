import { Injectable } from "@nestjs/common";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_DICE_GAME_ENTITY,
  KT_ROLL_DICE_TILE_ENTITY,
  KT_CASHOUT_DICE_GAME_ENTITY,
  KT_GET_DICE_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DICE_GAME,
  KT_AUTO_BET_DICE_GAME,
  StartDiceGameDto,
  RollDiceDto,
  CashoutDiceGameDto,
  DiceConfigRequestDto,
  DiceProvablyFairRequestDto,
  AutoBetSettingsDto,
} from "ez-utils";
import { DiceService } from "./dice.service";

@Injectable()
export class DiceKafkaService {
  public serviceName = DiceKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly diceService: DiceService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${DiceKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_DICE_GAME_ENTITY,
      message,
      key,
      async (value: StartDiceGameDto, traceId: string) =>
        await this.diceService.startGame(value, traceId),
    );
  }

  async roll(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ROLL_DICE_TILE_ENTITY,
      message,
      key,
      async (value: RollDiceDto, traceId: string) =>
        await this.diceService.roll(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_DICE_GAME_ENTITY,
      message,
      key,
      async (value: CashoutDiceGameDto, traceId: string) =>
        await this.diceService.cashout(value, traceId),
    );
  }

  async config(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DICE_CONFIG_ENTITY,
      message,
      key,
      async (value: DiceConfigRequestDto, traceId: string) =>
        await this.diceService.getConfig(value, traceId),
    );
  }

  async provablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DICE_GAME,
      message,
      key,
      async (value: DiceProvablyFairRequestDto, traceId: string) =>
        await this.diceService.getProvablyFair(value, traceId),
    );
  }

  async autoBet(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_AUTO_BET_DICE_GAME,
      message,
      key,
      async (value: AutoBetSettingsDto, traceId: string) =>
        await this.diceService.autoBet(value, traceId),
    );
  }
}
