import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class PersonPhysicalAddressResponseController {
  private logger = getLoggerConfig(
    PersonPhysicalAddressResponseController.name,
  );

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${PersonPhysicalAddressResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PHYSICAL_ADDRESS + '-response')
  handleCreate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_PHYSICAL_ADDRESS} | key: ${key}`,
      '',
      'handleCreate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_PHYSICAL_ADDRESS + '-response')
  handleUpdate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_UPDATE_PHYSICAL_ADDRESS} | key: ${key}`,
      '',
      'handleUpdate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PHYSICAL_ADDRESS + '-response')
  handleGet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PHYSICAL_ADDRESS} | key: ${key}`,
      '',
      'handleGet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
