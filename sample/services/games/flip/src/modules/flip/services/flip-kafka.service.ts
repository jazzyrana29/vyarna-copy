import { Injectable } from "@nestjs/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_FLIP_GAME,
  KT_EXECUTE_FLIP_GAME,
  KT_CASHOUT_FLIP_GAME,
  KT_GET_FLIP_CONFIG,
  KT_GET_PROVABLY_FAIR_FLIP_GAME,
  StartFlipDto,
  FlipDto,
  FlipCashoutDto,
  FlipConfigRequestDto,
  FlipProvablyFairRequestDto,
} from "ez-utils";
import { FlipService } from "./flip.service";
import { getLoggerConfig } from "../../../utils/common";

@Injectable()
export class FlipKafkaService {
  public serviceName = FlipKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly flipService: FlipService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${FlipKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_FLIP_GAME,
      message,
      key,
      async (value: StartFlipDto, traceId: string) =>
        await this.flipService.startSession(value, traceId),
    );
  }

  async executeFlip(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_EXECUTE_FLIP_GAME,
      message,
      key,
      async (value: FlipDto, traceId: string) =>
        await this.flipService.flip(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_FLIP_GAME,
      message,
      key,
      async (value: FlipCashoutDto, traceId: string) =>
        await this.flipService.cashout(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_FLIP_CONFIG,
      message,
      key,
      async (value: FlipConfigRequestDto, traceId: string) =>
        await this.flipService.getConfig(value, traceId),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_FLIP_GAME,
      message,
      key,
      async (value: FlipProvablyFairRequestDto, traceId: string) =>
        await this.flipService.getProvablyFair(value, traceId),
    );
  }
}
