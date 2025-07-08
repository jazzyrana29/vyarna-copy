import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  KT_CREATE_MEDICATION_ADMINISTRATION,
  KT_GET_MEDICATION_ADMINISTRATIONS,
  KT_CREATE_TEMPERATURE_MEASUREMENT,
  KT_GET_TEMPERATURE_MEASUREMENTS,
  KT_CREATE_SYMPTOM_REPORT,
  KT_GET_SYMPTOM_REPORTS,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class CareLogResponseController {
  private logger = getLoggerConfig(CareLogResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${CareLogResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_DIAPER_CHANGE + '-response')
  handleCreateDiaper(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_DIAPER_CHANGE} | key: ${key}`,
      '',
      'handleCreateDiaper',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_DIAPER_CHANGES + '-response')
  handleGetDiapers(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_DIAPER_CHANGES} | key: ${key}`,
      '',
      'handleGetDiapers',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_MEDICATION_ADMINISTRATION + '-response')
  handleCreateMedication(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_MEDICATION_ADMINISTRATION} | key: ${key}`,
      '',
      'handleCreateMedication',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_MEDICATION_ADMINISTRATIONS + '-response')
  handleGetMedications(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_MEDICATION_ADMINISTRATIONS} | key: ${key}`,
      '',
      'handleGetMedications',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_TEMPERATURE_MEASUREMENT + '-response')
  handleCreateTemperature(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_TEMPERATURE_MEASUREMENT} | key: ${key}`,
      '',
      'handleCreateTemperature',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_TEMPERATURE_MEASUREMENTS + '-response')
  handleGetTemperatures(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_TEMPERATURE_MEASUREMENTS} | key: ${key}`,
      '',
      'handleGetTemperatures',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_SYMPTOM_REPORT + '-response')
  handleCreateSymptom(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SYMPTOM_REPORT} | key: ${key}`,
      '',
      'handleCreateSymptom',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SYMPTOM_REPORTS + '-response')
  handleGetSymptoms(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SYMPTOM_REPORTS} | key: ${key}`,
      '',
      'handleGetSymptoms',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
