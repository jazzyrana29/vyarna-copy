import { Injectable } from "@nestjs/common";
import {
  KafkaMessageResponderService,
  KT_START_PLINKO,
  KT_DROP_PLINKO,
  KT_CONFIG_PLINKO,
  KT_CASHOUT_PLINKO,
  KT_PF_PLINKO,
  StartPlinkoDto,
  DropPlinkoDto,
  CashoutPlinkoDto,
  PlinkoConfigRequestDto,
  PlinkoProvablyFairRequestDto,
} from "ez-utils";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../../utils/common";
import { PlinkoService } from "./plinko.service";

@Injectable()
export class PlinkoKafkaService {
  public serviceName = PlinkoKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly plinkoService: PlinkoService) {
    this.logger.debug(
      `${PlinkoKafkaService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async startGame(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_PLINKO,
      message,
      key,
      async (value: StartPlinkoDto, traceId: string) =>
        await this.plinkoService.startGame(value, traceId),
    );
  }

  async drop(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DROP_PLINKO,
      message,
      key,
      async (value: DropPlinkoDto, traceId: string) =>
        await this.plinkoService.drop(value, traceId),
    );
  }

  async config(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CONFIG_PLINKO,
      message,
      key,
      async (value: PlinkoConfigRequestDto, traceId: string) =>
        await this.plinkoService.getConfig(value, traceId),
    );
  }

  async cashout(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CASHOUT_PLINKO,
      message,
      key,
      async (value: CashoutPlinkoDto, traceId: string) =>
        await this.plinkoService.cashout(value, traceId),
    );
  }

  async provablyFair(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PF_PLINKO,
      message,
      key,
      async (value: PlinkoProvablyFairRequestDto, traceId: string) =>
        await this.plinkoService.provablyFair(value, traceId),
    );
  }
}
