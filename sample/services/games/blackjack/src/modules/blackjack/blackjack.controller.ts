import { Controller } from "@nestjs/common";
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from "@nestjs/microservices";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../utils/common";
import {
  KT_START_BLACKJACK_GAME,
  KT_HIT_BLACKJACK_GAME,
  KT_STAND_BLACKJACK_GAME,
  KT_SPLIT_BLACKJACK_GAME,
  KT_DOUBLE_BLACKJACK_GAME,
  KT_INSURANCE_BLACKJACK_GAME,
  KT_GET_BLACKJACK_CONFIG,
  KT_GET_PROVABLY_FAIR_DATA,
} from "ez-utils";
import { BlackjackKafkaService } from "./services/blackjack-kafka.service";

@Controller("blackjack")
export class BlackjackController {
  private readonly logger = getLoggerConfig(BlackjackController.name);

  constructor(private readonly kafkaService: BlackjackKafkaService) {
    this.logger.debug(
      `${BlackjackController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_BLACKJACK_GAME)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_BLACKJACK_GAME}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_HIT_BLACKJACK_GAME)
  async hit(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_HIT_BLACKJACK_GAME}`,
      "",
      "hit",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.hitGame(message, key);
  }

  @MessagePattern(KT_STAND_BLACKJACK_GAME)
  async stand(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_STAND_BLACKJACK_GAME}`,
      "",
      "stand",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.standGame(message, key);
  }

  @MessagePattern(KT_SPLIT_BLACKJACK_GAME)
  async split(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_SPLIT_BLACKJACK_GAME}`,
      "",
      "split",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.splitGame(message, key);
  }

  @MessagePattern(KT_DOUBLE_BLACKJACK_GAME)
  async double(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DOUBLE_BLACKJACK_GAME}`,
      "",
      "double",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.doubleGame(message, key);
  }

  @MessagePattern(KT_INSURANCE_BLACKJACK_GAME)
  async insurance(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_INSURANCE_BLACKJACK_GAME}`,
      "",
      "insurance",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.insuranceGame(message, key);
  }

  @MessagePattern(KT_GET_BLACKJACK_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_BLACKJACK_CONFIG}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_DATA)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_DATA}`,
      "",
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFairData(message, key);
  }
}
