import { Injectable } from "@nestjs/common";
import { getLoggerConfig } from "../../../utils/common";
import { LogStreamLevel } from "ez-logger";
import {
  KafkaMessageResponderService,
  KT_START_PUMP,
  KT_PUMP_BALLOON,
  KT_CASHOUT_PUMP,
  KT_GET_PUMP_CONFIG,
  KT_GET_PUMP_FAIRNESS,
  KT_AUTO_BET_PUMP,
  StartPumpDto,
  PumpDto,
  PumpCashoutDto,
  PumpConfigRequestDto,
  PumpProvablyFairRequestDto,
  PumpAutoBetSettingsDto,
} from "ez-utils";
import { PumpService } from "./pump.service";

@Injectable()
export class PumpKafkaService {
  public serviceName = PumpKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly pumpService: PumpService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${PumpKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_PUMP,
      message,
      key,
      async (value: StartPumpDto, traceId: string) =>
        await this.pumpService.startGame(value, traceId),
    );
  }

  async pump(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PUMP_BALLOON,
      message,
      key,
      async (value: PumpDto, traceId: string) =>
        await this.pumpService.pump(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_PUMP,
      message,
      key,
      async (value: PumpCashoutDto, traceId: string) =>
        await this.pumpService.cashout(value, traceId),
    );
  }

  async config(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PUMP_CONFIG,
      message,
      key,
      async (value: PumpConfigRequestDto, traceId: string) =>
        await this.pumpService.getConfig(value, traceId),
    );
  }

  async provablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PUMP_FAIRNESS,
      message,
      key,
      async (value: PumpProvablyFairRequestDto, traceId: string) =>
        await this.pumpService.getProvablyFair(value, traceId),
    );
  }

  async autoBet(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_AUTO_BET_PUMP,
      message,
      key,
      async (value: PumpAutoBetSettingsDto, traceId: string) =>
        await this.pumpService.autoBet(value, traceId),
    );
  }
}
