import { Controller } from "@nestjs/common";
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from "@nestjs/microservices";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../utils/common";
import { PlinkoKafkaService } from "./services/plinko-kafka.service";
import {
  KT_CASHOUT_PLINKO,
  KT_CONFIG_PLINKO,
  KT_DROP_PLINKO,
  KT_PF_PLINKO,
  KT_START_PLINKO,
} from "ez-utils";

@Controller("plinko")
export class PlinkoController {
  private logger = getLoggerConfig(PlinkoController.name);
  constructor(private readonly plinkoKafkaService: PlinkoKafkaService) {
    this.logger.debug(
      `${PlinkoController.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_PLINKO)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_PLINKO}`,
      "",
      "startGame",
      LogStreamLevel.DebugLight,
    );
    await this.plinkoKafkaService.startGame(message, key);
  }

  @MessagePattern(KT_DROP_PLINKO)
  async drop(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DROP_PLINKO}`,
      "",
      "drop",
      LogStreamLevel.DebugLight,
    );
    await this.plinkoKafkaService.drop(message, key);
  }

  @MessagePattern(KT_CONFIG_PLINKO)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CONFIG_PLINKO}`,
      "",
      "getConfig",
      LogStreamLevel.DebugLight,
    );
    await this.plinkoKafkaService.config(message, key);
  }

  @MessagePattern(KT_CASHOUT_PLINKO)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_PLINKO}`,
      "",
      "cashout",
      LogStreamLevel.DebugLight,
    );
    await this.plinkoKafkaService.cashout(message, key);
  }

  @MessagePattern(KT_PF_PLINKO)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PF_PLINKO}`,
      "",
      "provablyFair",
      LogStreamLevel.DebugLight,
    );
    await this.plinkoKafkaService.provablyFair(message, key);
  }
}
