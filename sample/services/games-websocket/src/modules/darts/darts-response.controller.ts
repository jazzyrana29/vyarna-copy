import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import {
  KT_START_DARTS_GAME_ENTITY,
  KT_START_DARTS_BATCH_ENTITY,
  KT_THROW_DART_ENTITY,
  KT_CASHOUT_DARTS_GAME_ENTITY,
  KT_GET_DARTS_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DARTS_GAME,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class DartsResponseController {
  private logger = getLoggerConfig(DartsResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${DartsResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_DARTS_GAME_ENTITY + '-response')
  handleStart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_START_DARTS_GAME_ENTITY} | key: ${key}`,
      '',
      'handleStart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_START_DARTS_BATCH_ENTITY + '-response')
  handleStartBatch(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_START_DARTS_BATCH_ENTITY} | key: ${key}`,
      '',
      'handleStartBatch',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_THROW_DART_ENTITY + '-response')
  handleThrow(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_THROW_DART_ENTITY} | key: ${key}`,
      '',
      'handleThrow',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CASHOUT_DARTS_GAME_ENTITY + '-response')
  handleCashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CASHOUT_DARTS_GAME_ENTITY} | key: ${key}`,
      '',
      'handleCashout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_DARTS_CONFIG_ENTITY + '-response')
  handleConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_DARTS_CONFIG_ENTITY} | key: ${key}`,
      '',
      'handleConfig',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_DARTS_GAME + '-response')
  handleProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PROVABLY_FAIR_DARTS_GAME} | key: ${key}`,
      '',
      'handleProvablyFair',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
