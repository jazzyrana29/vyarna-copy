import { Controller } from "@nestjs/common";
import {
  Ctx,
  Payload,
  MessagePattern,
  KafkaContext,
} from "@nestjs/microservices";
import {
  KT_START_PUMP,
  KT_PUMP_BALLOON,
  KT_CASHOUT_PUMP,
  KT_GET_PUMP_CONFIG,
  KT_GET_PUMP_FAIRNESS,
  KT_AUTO_BET_PUMP,
} from "ez-utils";
import { PumpKafkaService } from "./services/pump-kafka.service";
import { getLoggerConfig } from "../../utils/common";
import { LogStreamLevel } from "ez-logger";

@Controller("pump")
export class PumpController {
  private logger = getLoggerConfig(PumpController.name);

  constructor(private readonly kafkaService: PumpKafkaService) {
    this.logger.debug(
      `${PumpController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_PUMP)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_PUMP}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_PUMP_BALLOON)
  async pump(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PUMP_BALLOON}`,
      "",
      "pump",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.pump(message, key);
  }

  @MessagePattern(KT_CASHOUT_PUMP)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_PUMP}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_PUMP_CONFIG)
  async config(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PUMP_CONFIG}`,
      "",
      "config",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.config(message, key);
  }

  @MessagePattern(KT_GET_PUMP_FAIRNESS)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PUMP_FAIRNESS}`,
      "",
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.provablyFair(message, key);
  }

  @MessagePattern(KT_AUTO_BET_PUMP)
  async autoBet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_AUTO_BET_PUMP}`,
      "",
      "autoBet",
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.autoBet(message, key);
  }
}
