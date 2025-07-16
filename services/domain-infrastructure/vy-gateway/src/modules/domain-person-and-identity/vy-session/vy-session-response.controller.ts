import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  KT_LOGIN_SESSION,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class PersonSessionResponseController {
  private logger = getLoggerConfig(PersonSessionResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${PersonSessionResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SESSION + '-response')
  handleCreate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SESSION} | key: ${key}`,
      '',
      'handleCreate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_SESSION + '-response')
  handleUpdate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_UPDATE_SESSION} | key: ${key}`,
      '',
      'handleUpdate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SESSION + '-response')
  handleGet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SESSION} | key: ${key}`,
      '',
      'handleGet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_DELETE_SESSION + '-response')
  handleDelete(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_DELETE_SESSION} | key: ${key}`,
      '',
      'handleDelete',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_LOGIN_SESSION + '-response')
  handleLogin(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_LOGIN_SESSION} | key: ${key}`,
      '',
      'handleLogin',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
