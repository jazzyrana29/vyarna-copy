import { Injectable } from "@nestjs/common";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_DARTS_GAME_ENTITY,
  KT_START_DARTS_BATCH_ENTITY,
  KT_THROW_DART_ENTITY,
  KT_CASHOUT_DARTS_GAME_ENTITY,
  KT_GET_DARTS_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DARTS_GAME,
  StartDartsGameDto,
  StartDartsBatchDto,
  ThrowDartDto,
  CashoutDartsGameDto,
  DartsConfigRequestDto,
  DartsProvablyFairRequestDto,
} from "ez-utils";
import { DartsService } from "./darts.service";

@Injectable()
export class DartsKafkaService {
  public serviceName = DartsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly dartsService: DartsService) {
    this.logger.debug(
      `${DartsKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER || "localhost:9092",
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_DARTS_GAME_ENTITY,
      message,
      key,
      async (value: StartDartsGameDto, traceId: string) =>
        await this.dartsService.startDartsGame(value, traceId),
    );
  }

  async startBatch(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_DARTS_BATCH_ENTITY,
      message,
      key,
      async (value: StartDartsBatchDto, traceId: string) =>
        await this.dartsService.processBetsBatch(value.games, traceId),
    );
  }

  async throwDart(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_THROW_DART_ENTITY,
      message,
      key,
      async (value: ThrowDartDto, traceId: string) =>
        await this.dartsService.throwDart(value, traceId),
    );
  }

  async cashoutGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_DARTS_GAME_ENTITY,
      message,
      key,
      async (value: CashoutDartsGameDto, traceId: string) =>
        await this.dartsService.cashoutDartsGame(value, traceId),
    );
  }

  async config(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DARTS_CONFIG_ENTITY,
      message,
      key,
      async (value: DartsConfigRequestDto, traceId: string) =>
        await this.dartsService.getConfig(value, traceId),
    );
  }

  async provablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DARTS_GAME,
      message,
      key,
      async (value: DartsProvablyFairRequestDto, traceId: string) =>
        await this.dartsService.getProvablyFair(value, traceId),
    );
  }
}
