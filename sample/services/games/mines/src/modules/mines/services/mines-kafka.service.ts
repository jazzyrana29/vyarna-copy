import { Injectable } from "@nestjs/common";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_MINES_GAME,
  KT_REVEAL_TILE_MINES_GAME,
  KT_CASHOUT_MINES_GAME,
  KT_GET_MINES_CONFIG,
  KT_GET_PROVABLY_FAIR_MINES_GAME,
  MinesStartGameDto,
  MinesRevealTileDto,
  MinesCashoutDto,
  MinesConfigRequestDto,
  MinesProvablyFairRequestDto,
} from "ez-utils";
import { MinesService } from "./mines.service";

@Injectable()
export class MinesKafkaService {
  public serviceName = MinesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly minesService: MinesService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${MinesKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_MINES_GAME,
      message,
      key,
      async (value: MinesStartGameDto, traceId: string) =>
        await this.minesService.startGame(value, traceId),
    );
  }

  async revealTile(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REVEAL_TILE_MINES_GAME,
      message,
      key,
      async (value: MinesRevealTileDto, traceId: string) =>
        await this.minesService.revealTile(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_MINES_GAME,
      message,
      key,
      async (value: MinesCashoutDto, traceId: string) =>
        await this.minesService.cashout(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MINES_CONFIG,
      message,
      key,
      async (value: MinesConfigRequestDto, traceId: string) =>
        await this.minesService.getConfig(value, traceId),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_MINES_GAME,
      message,
      key,
      async (value: MinesProvablyFairRequestDto, traceId: string) =>
        await this.minesService.getProvablyFair(value, traceId),
    );
  }
}
