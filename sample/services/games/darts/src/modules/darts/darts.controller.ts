import { Controller } from "@nestjs/common";
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from "@nestjs/microservices";
import { LogStreamLevel } from "ez-logger";

import {
  KT_START_DARTS_GAME_ENTITY,
  KT_START_DARTS_BATCH_ENTITY,
  KT_THROW_DART_ENTITY,
  KT_CASHOUT_DARTS_GAME_ENTITY,
  KT_GET_DARTS_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DARTS_GAME,
} from "ez-utils";

import { DartsKafkaService } from "./services/darts-kafka.service";
import { getLoggerConfig } from "../../utils/common";

@Controller("darts")
export class DartsController {
  private readonly logger = getLoggerConfig(DartsController.name);

  constructor(private readonly dartsKafkaService: DartsKafkaService) {
    this.logger.debug(
      `${DartsController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_DARTS_GAME_ENTITY)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_DARTS_GAME_ENTITY}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.startGame(message, key);
  }

  @MessagePattern(KT_START_DARTS_BATCH_ENTITY)
  async startBatch(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_DARTS_BATCH_ENTITY}`,
      "",
      "startBatch",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.startBatch(message, key);
  }

  @MessagePattern(KT_THROW_DART_ENTITY)
  async throwDart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_THROW_DART_ENTITY}`,
      "",
      "throwDart",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.throwDart(message, key);
  }

  @MessagePattern(KT_CASHOUT_DARTS_GAME_ENTITY)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_DARTS_GAME_ENTITY}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.cashoutGame(message, key);
  }

  @MessagePattern(KT_GET_DARTS_CONFIG_ENTITY)
  async config(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DARTS_CONFIG_ENTITY}`,
      "",
      "config",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.config(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_DARTS_GAME)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_DARTS_GAME}`,
      "",
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.dartsKafkaService.provablyFair(message, key);
  }
}
