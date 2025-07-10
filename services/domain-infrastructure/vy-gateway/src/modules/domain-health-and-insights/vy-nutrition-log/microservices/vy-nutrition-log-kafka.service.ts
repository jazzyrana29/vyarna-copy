import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
  CreateNutritionSessionDto,
  GetOneNutritionSessionDto,
  NutritionEventDto,
  KT_END_NUTRITION_SESSION,
  KT_LOG_NUTRITION_EVENT,
} from 'ez-utils';

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

  async startSession(dto: CreateNutritionSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_NUTRITION_SESSION,
      dto,
      traceId,
    );
  }

  async logEvent(dto: NutritionEventDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_LOG_NUTRITION_EVENT,
      dto,
      traceId,
    );
  }

  async endSession(dto: GetOneNutritionSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_END_NUTRITION_SESSION,
      dto,
      traceId,
    );
  }

  async getSession(dto: GetOneNutritionSessionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_NUTRITION_SESSION,
      dto,
      traceId,
    );
  }
}
