import { Injectable } from "@nestjs/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_BLACKJACK_GAME,
  KT_HIT_BLACKJACK_GAME,
  KT_STAND_BLACKJACK_GAME,
  KT_SPLIT_BLACKJACK_GAME,
  KT_DOUBLE_BLACKJACK_GAME,
  KT_INSURANCE_BLACKJACK_GAME,
  KT_GET_BLACKJACK_CONFIG,
  KT_GET_PROVABLY_FAIR_DATA,
  BlackjackStartGameDto,
  BlackjackHitDto,
  BlackjackStandDto,
  BlackjackSplitDto,
  BlackjackDoubleDto,
  BlackjackInsuranceDto,
  BlackjackConfigRequestDto,
  BlackjackProvablyFairRequestDto,
} from "ez-utils";
import { BlackjackService } from "./blackjack.service";
import { getLoggerConfig } from "../../../utils/common";

@Injectable()
export class BlackjackKafkaService {
  public serviceName = BlackjackKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly blackjackService: BlackjackService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${BlackjackKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackStartGameDto, traceId: string) =>
        await this.blackjackService.startGame(value, traceId),
    );
  }

  async hitGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_HIT_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackHitDto, traceId: string) =>
        await this.blackjackService.hit(value, traceId),
    );
  }

  async standGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_STAND_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackStandDto, traceId: string) =>
        await this.blackjackService.stand(value, traceId),
    );
  }

  async splitGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_SPLIT_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackSplitDto, traceId: string) =>
        await this.blackjackService.split(value, traceId),
    );
  }

  async doubleGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DOUBLE_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackDoubleDto, traceId: string) =>
        await this.blackjackService.double(value, traceId),
    );
  }

  async insuranceGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_INSURANCE_BLACKJACK_GAME,
      message,
      key,
      async (value: BlackjackInsuranceDto, traceId: string) =>
        await this.blackjackService.insurance(value, traceId),
    );
  }

  async getConfig(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_BLACKJACK_CONFIG,
      message,
      key,
      async (value: BlackjackConfigRequestDto, traceId: string) =>
        await this.blackjackService.getConfig(value, traceId),
    );
  }

  async getProvablyFairData(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DATA,
      message,
      key,
      async (value: BlackjackProvablyFairRequestDto, traceId: string) =>
        await this.blackjackService.getProvablyFairData(value, traceId),
    );
  }
}
