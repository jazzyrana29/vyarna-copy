import { Controller } from "@nestjs/common";
import {
  Ctx,
  Payload,
  MessagePattern,
  KafkaContext,
} from "@nestjs/microservices";
import {
  KT_START_MINES_GAME,
  KT_REVEAL_TILE_MINES_GAME,
  KT_CASHOUT_MINES_GAME,
  KT_GET_MINES_CONFIG,
  KT_GET_PROVABLY_FAIR_MINES_GAME,
} from "ez-utils";
import { MinesKafkaService } from "./services/mines-kafka.service";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Controller("mines")
export class MinesController {
  private logger = getLoggerConfig(MinesController.name);

  constructor(private readonly kafkaService: MinesKafkaService) {
    this.logger.debug(
      `${MinesController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_MINES_GAME)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_MINES_GAME}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_REVEAL_TILE_MINES_GAME)
  async revealTile(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REVEAL_TILE_MINES_GAME}`,
      "",
      "revealTile",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.revealTile(message, key);
  }

  @MessagePattern(KT_CASHOUT_MINES_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_MINES_GAME}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_MINES_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MINES_CONFIG}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_MINES_GAME)
  async getProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_MINES_GAME}`,
      "",
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFair(message, key);
  }
}
