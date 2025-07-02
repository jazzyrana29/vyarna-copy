import { Injectable } from "@nestjs/common";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_LIMBO_GAME,
  KT_CASHOUT_LIMBO_GAME,
  KT_GET_LIMBO_CONFIG,
  KT_GET_LIMBO_FAIR_DATA,
  LimboStartGameDto,
  LimboCashoutDto,
  LimboConfigRequestDto,
  LimboProvablyFairRequestDto,
} from "ez-utils";
import { LimboService } from "./limbo.service";

@Injectable()
export class LimboKafkaService {
  public serviceName = LimboKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly limboService: LimboService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${LimboKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_LIMBO_GAME,
      message,
      key,
      async (value: LimboStartGameDto, traceId: string) =>
        await this.limboService.startGame(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_LIMBO_GAME,
      message,
      key,
      async (value: LimboCashoutDto, traceId: string) =>
        await this.limboService.cashout(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_LIMBO_CONFIG,
      message,
      key,
      async (value: LimboConfigRequestDto, traceId: string) =>
        await this.limboService.getConfig(value, traceId),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_LIMBO_FAIR_DATA,
      message,
      key,
      async (value: LimboProvablyFairRequestDto, traceId: string) =>
        await this.limboService.getProvablyFair(value, traceId),
    );
  }
}
