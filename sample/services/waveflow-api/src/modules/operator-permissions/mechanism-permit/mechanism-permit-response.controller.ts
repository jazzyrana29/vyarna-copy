import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from './../../../utils/common';

import {
  KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
  KT_GET_MECHANISM_PERMIT_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from './../../../utils/kafka/kafka-responder.service';

@Controller()
export class MechanismPermitResponseController {
  private logger = getLoggerConfig(MechanismPermitResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${MechanismPermitResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_MECHANISM_PERMIT_ENTITY + '-response')
  getMechanismPermit(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_MECHANISM_PERMIT_ENTITY} | key: ${key}`,
      '',
      'getMechanismPermit',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY + '-response')
  getMechanismPermitHistory(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY} | key: ${key}`,
      '',
      'getMechanismPermitHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM + '-response')
  getMechanismPermitsForSystem(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM} | key: ${key}`,
      '',
      'getMechanismPermitsForSystem',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
