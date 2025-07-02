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
  StartFlipDto,
  FlipDto,
  KT_START_FLIP_GAME,
  KT_EXECUTE_FLIP_GAME,
  KT_CASHOUT_FLIP_GAME,
  KT_GET_FLIP_CONFIG,
  KT_GET_PROVABLY_FAIR_FLIP_GAME,
} from "ez-utils";
import { FlipKafkaService } from "./services/flip-kafka.service";

@Controller("flip")
export class FlipController {
  private logger = getLoggerConfig(FlipController.name);

  constructor(private readonly kafkaService: FlipKafkaService) {
    this.logger.debug(
      `${FlipController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_FLIP_GAME)
  async start(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_FLIP_GAME}`,
      "",
      "start",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_EXECUTE_FLIP_GAME)
  async flip(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_EXECUTE_FLIP_GAME}`,
      "",
      "flip",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.executeFlip(message, key);
  }

  @MessagePattern(KT_CASHOUT_FLIP_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_FLIP_GAME}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_FLIP_CONFIG)
  async config(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_FLIP_CONFIG}`,
      "",
      "config",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_FLIP_GAME)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_FLIP_GAME}`,
      "",
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFair(message, key);
  }
}
