import { Controller } from "@nestjs/common";
import {
  Ctx,
  Payload,
  MessagePattern,
  KafkaContext,
} from "@nestjs/microservices";
import {
  KT_START_LIMBO_GAME,
  KT_CASHOUT_LIMBO_GAME,
  KT_GET_LIMBO_CONFIG,
  KT_GET_LIMBO_FAIR_DATA,
} from "ez-utils";
import { LimboKafkaService } from "./services/limbo-kafka.service";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Controller("limbo")
export class LimboController {
  private logger = getLoggerConfig(LimboController.name);

  constructor(private readonly kafkaService: LimboKafkaService) {
    this.logger.debug(
      `${LimboController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_LIMBO_GAME)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_LIMBO_GAME}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_CASHOUT_LIMBO_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_LIMBO_GAME}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_LIMBO_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_LIMBO_CONFIG}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_LIMBO_FAIR_DATA)
  async getProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_LIMBO_FAIR_DATA}`,
      "",
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFair(message, key);
  }
}
