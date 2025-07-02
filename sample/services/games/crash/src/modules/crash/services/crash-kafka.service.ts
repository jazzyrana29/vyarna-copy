import { Injectable } from "@nestjs/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_CRASH,
  KT_CRASH_CONFIG,
  KT_CRASH_PROVABLY_FAIR,
  KT_CASHOUT_CRASH_GAME,
  StartCrashDto,
  CrashConfigRequestDto,
  CrashProvablyFairRequestDto,
  CashoutCrashGameDto,
} from "ez-utils";
import { getLoggerConfig } from "../../../utils/common";
import { CrashService } from "./crash.service";

@Injectable()
export class CrashKafkaService {
  public serviceName = CrashKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly crashService: CrashService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${CrashKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startCrashRound(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_CRASH,
      message,
      key,
      async (value: StartCrashDto, traceId: string) =>
        await this.crashService.startRound(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CRASH_CONFIG,
      message,
      key,
      async (value: CrashConfigRequestDto, traceId: string) =>
        await this.crashService.getConfig(value, traceId),
    );
  }

  async getProvablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CRASH_PROVABLY_FAIR,
      message,
      key,
      async (value: CrashProvablyFairRequestDto, traceId: string) =>
        await this.crashService.getProvablyFair(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_CRASH_GAME,
      message,
      key,
      async (value: CashoutCrashGameDto, traceId: string) =>
        await this.crashService.cashout(value, traceId),
    );
  }
}
