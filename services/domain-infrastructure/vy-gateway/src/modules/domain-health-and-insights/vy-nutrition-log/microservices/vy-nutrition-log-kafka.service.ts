import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
  StartNutritionSessionDto,
  GetNutritionSessionDto,
} from 'ez-utils';
import { NutritionEventDto } from '../dto/nutrition-event.dto';
import { KT_END_NUTRITION_SESSION, KT_LOG_NUTRITION_EVENT } from '../constants/kafka-topics';

@Injectable()
export class NutritionLogKafkaService {
  private readonly serviceName = NutritionLogKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startSession(dto: StartNutritionSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_NUTRITION_SESSION,
      dto,
      traceId,
    );
  }

  async logEvent(sessionId: string, dto: NutritionEventDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_LOG_NUTRITION_EVENT,
      { sessionId, ...dto },
      traceId,
    );
  }

  async endSession(sessionId: string, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_END_NUTRITION_SESSION,
      { sessionId },
      traceId,
    );
  }

  async getSession(sessionId: string, traceId: string) {
    const payload: GetNutritionSessionDto = { sessionId } as any;
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_NUTRITION_SESSION,
      payload,
      traceId,
    );
  }
}
