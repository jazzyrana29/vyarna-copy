import { Injectable } from '@nestjs/common';
import { NutritionSessionService } from './nutrition-session.service';
import {
  KafkaMessageResponderService,
  KT_START_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
  KT_GET_ZTRACKING_NUTRITION_SESSION,
  StartNutritionSessionDto,
  GetNutritionSessionDto,
  GetZtrackingNutritionSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


@Injectable()
export class NutritionSessionKafkaService {
  public serviceName = NutritionSessionKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly sessionService: NutritionSessionService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${NutritionSessionKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_START_NUTRITION_SESSION,
      message,
      key,
      async (value: StartNutritionSessionDto, traceId: string) =>
        await this.sessionService.startNutritionSession(value, traceId),
    );
  }

  async getSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_NUTRITION_SESSION,
      message,
      key,
      async (value: GetNutritionSessionDto, traceId: string) =>
        await this.sessionService.getNutritionSession(value, traceId),
    );
  }

  async getZtrackingSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_NUTRITION_SESSION,
      message,
      key,
      async (value: GetZtrackingNutritionSessionDto, traceId: string) =>
        await this.sessionService.getZtrackingNutritionSession(value, traceId),
    );
  }
}
