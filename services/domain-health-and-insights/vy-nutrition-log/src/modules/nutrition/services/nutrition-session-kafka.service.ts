import { Injectable } from '@nestjs/common';
import { NutritionSessionService } from './nutrition-session.service';
import { KafkaMessageResponderService } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

export const KT_START_NUTRITION_SESSION = 'start-nutrition-session';
export const KT_GET_NUTRITION_SESSION = 'get-nutrition-session';

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
      async (value: any, traceId: string) =>
        await this.sessionService.startSession(value, traceId),
    );
  }

  async getSession(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_NUTRITION_SESSION,
      message,
      key,
      async (value: { sessionId: string }, traceId: string) =>
        await this.sessionService.getSession(value.sessionId),
    );
  }
}
