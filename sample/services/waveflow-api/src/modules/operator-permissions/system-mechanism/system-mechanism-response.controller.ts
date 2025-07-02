import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_GET_SYSTEM_MECHANISM_ENTITY,
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
} from 'ez-utils';

import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';

@Controller()
export class SystemMechanismResponseController {
  private logger = getLoggerConfig(SystemMechanismResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${SystemMechanismResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_SYSTEM_MECHANISM_ENTITY + '-response')
  getSystemMechanism(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_SYSTEM_MECHANISM_ENTITY} | key: ${key}`,
      '',
      'getSystemMechanism',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY + '-response')
  getSystemMechanismHistory(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY} | key: ${key}`,
      '',
      'getSystemMechanismHistory',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY + '-response')
  getManySystemMechanisms(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for Kafka topic: ${KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY} | key: ${key}`,
      '',
      'getManySystemMechanisms',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
