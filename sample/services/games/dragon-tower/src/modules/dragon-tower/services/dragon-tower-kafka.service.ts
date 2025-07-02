import { Injectable } from "@nestjs/common";
import {
  KafkaMessageResponderService,
  KT_START_DRAGON_TOWER_GAME,
  KT_REVEAL_TILE_DRAGON_TOWER_GAME,
  KT_CASHOUT_DRAGON_TOWER_GAME,
  KT_GET_DRAGON_TOWER_CONFIG,
  KT_GET_DRAGON_TOWER_PF,
  DragonTowerStartGameDto,
  DragonTowerRevealTileDto,
  DragonTowerCashoutDto,
  DragonTowerConfigRequestDto,
  DragonTowerProvablyFairRequestDto,
} from "ez-utils";
import { DragonTowerService } from "./dragon-tower.service";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Injectable()
export class DragonTowerKafkaService {
  public serviceName = DragonTowerKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly dragonTowerService: DragonTowerService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_DRAGON_TOWER_GAME,
      message,
      key,
      async (value: DragonTowerStartGameDto, traceId: string) =>
        await this.dragonTowerService.startGame(value, traceId),
    );
  }

  async revealTile(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REVEAL_TILE_DRAGON_TOWER_GAME,
      message,
      key,
      async (value: DragonTowerRevealTileDto, traceId: string) =>
        await this.dragonTowerService.revealTile(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_DRAGON_TOWER_GAME,
      message,
      key,
      async (value: DragonTowerCashoutDto, traceId: string) =>
        await this.dragonTowerService.cashout(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DRAGON_TOWER_CONFIG,
      message,
      key,
      async (value: DragonTowerConfigRequestDto, traceId: string) =>
        await this.dragonTowerService.getConfig(value),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DRAGON_TOWER_PF,
      message,
      key,
      async (value: DragonTowerProvablyFairRequestDto, traceId: string) =>
        await this.dragonTowerService.getProvablyFair(value, traceId),
    );
  }
}
