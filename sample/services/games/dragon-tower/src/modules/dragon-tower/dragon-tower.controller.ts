import { Controller } from "@nestjs/common";
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from "@nestjs/microservices";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../utils/common";
import {
  KT_START_DRAGON_TOWER_GAME,
  KT_REVEAL_TILE_DRAGON_TOWER_GAME,
  KT_CASHOUT_DRAGON_TOWER_GAME,
  KT_GET_DRAGON_TOWER_CONFIG,
  KT_GET_DRAGON_TOWER_PF,
} from "ez-utils";
import { DragonTowerKafkaService } from "./services/dragon-tower-kafka.service";

@Controller("dragon-tower")
export class DragonTowerController {
  private logger = getLoggerConfig(DragonTowerController.name);

  constructor(private readonly kafkaService: DragonTowerKafkaService) {
    this.logger.debug(
      `${DragonTowerController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_DRAGON_TOWER_GAME)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_DRAGON_TOWER_GAME}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_REVEAL_TILE_DRAGON_TOWER_GAME)
  async revealTile(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REVEAL_TILE_DRAGON_TOWER_GAME}`,
      "",
      "revealTile",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.revealTile(message, key);
  }

  @MessagePattern(KT_CASHOUT_DRAGON_TOWER_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_DRAGON_TOWER_GAME}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_DRAGON_TOWER_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DRAGON_TOWER_CONFIG}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_DRAGON_TOWER_PF)
  async getProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DRAGON_TOWER_PF}`,
      "",
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFair(message, key);
  }
}
