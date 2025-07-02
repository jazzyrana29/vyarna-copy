import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import {
  KT_CREATE_SNAKES_ROUND_ENTITY,
  KT_UPDATE_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_CONFIG,
  KT_GET_PROVABLY_FAIR_SNAKES_GAME,
  KT_ROLL_DICE_SNAKES_GAME,
  KT_CASHOUT_SNAKES_GAME,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class SnakesResponseController {
  private logger = getLoggerConfig(SnakesResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${SnakesResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SNAKES_ROUND_ENTITY + '-response')
  handleCreate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SNAKES_ROUND_ENTITY} | key: ${key}`,
      '',
      'handleCreate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_SNAKES_ROUND_ENTITY + '-response')
  handleUpdate(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_UPDATE_SNAKES_ROUND_ENTITY} | key: ${key}`,
      '',
      'handleUpdate',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SNAKES_ROUND_ENTITY + '-response')
  handleGet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SNAKES_ROUND_ENTITY} | key: ${key}`,
      '',
      'handleGet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SNAKES_CONFIG + '-response')
  handleConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SNAKES_CONFIG} | key: ${key}`,
      '',
      'handleConfig',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_SNAKES_GAME + '-response')
  handleProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PROVABLY_FAIR_SNAKES_GAME} | key: ${key}`,
      '',
      'handleProvablyFair',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_ROLL_DICE_SNAKES_GAME + '-response')
  handleRoll(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_ROLL_DICE_SNAKES_GAME} | key: ${key}`,
      '',
      'handleRoll',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CASHOUT_SNAKES_GAME + '-response')
  handleCashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CASHOUT_SNAKES_GAME} | key: ${key}`,
      '',
      'handleCashout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
