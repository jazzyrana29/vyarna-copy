import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import {
  KT_START_FLIP_GAME,
  KT_EXECUTE_FLIP_GAME,
  KT_CASHOUT_FLIP_GAME,
  KT_GET_FLIP_CONFIG,
  KT_GET_PROVABLY_FAIR_FLIP_GAME,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class FlipResponseController {
  private logger = getLoggerConfig(FlipResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${FlipResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_FLIP_GAME + '-response')
  handleStart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_START_FLIP_GAME} | key: ${key}`,
      '',
      'handleStart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_EXECUTE_FLIP_GAME + '-response')
  handleFlip(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_EXECUTE_FLIP_GAME} | key: ${key}`,
      '',
      'handleFlip',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CASHOUT_FLIP_GAME + '-response')
  handleCashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CASHOUT_FLIP_GAME} | key: ${key}`,
      '',
      'handleCashout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_FLIP_CONFIG + '-response')
  handleConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_FLIP_CONFIG} | key: ${key}`,
      '',
      'handleConfig',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_FLIP_GAME + '-response')
  handleProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PROVABLY_FAIR_FLIP_GAME} | key: ${key}`,
      '',
      'handleProvablyFair',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
