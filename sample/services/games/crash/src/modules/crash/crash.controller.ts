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
  KT_START_CRASH,
  KT_CRASH_CONFIG,
  KT_CRASH_PROVABLY_FAIR,
  KT_CASHOUT_CRASH_GAME,
} from "ez-utils";
import { CrashKafkaService } from "./services/crash-kafka.service";

@Controller()
export class CrashController {
  private logger = getLoggerConfig(CrashController.name);

  constructor(private readonly crashKafkaService: CrashKafkaService) {
    this.logger.debug(
      `${CrashController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_CRASH)
  async startCrash(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_CRASH}`,
      "",
      "startCrash",
      LogStreamLevel.DebugLight,
    );
    await this.crashKafkaService.startCrashRound(message, key);
  }

  @MessagePattern(KT_CRASH_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CRASH_CONFIG}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.crashKafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_CRASH_PROVABLY_FAIR)
  async getProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CRASH_PROVABLY_FAIR}`,
      "",
      "getProvablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.crashKafkaService.getProvablyFair(message, key);
  }

  @MessagePattern(KT_CASHOUT_CRASH_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_CRASH_GAME}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.crashKafkaService.cashout(message, key);
  }
}
