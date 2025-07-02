import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import {
  KT_START_DRAGON_TOWER_GAME,
  KT_REVEAL_TILE_DRAGON_TOWER_GAME,
  KT_CASHOUT_DRAGON_TOWER_GAME,
  KT_GET_DRAGON_TOWER_CONFIG,
  KT_GET_DRAGON_TOWER_PF,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class DragonTowerResponseController {
  private logger = getLoggerConfig(DragonTowerResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${DragonTowerResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_DRAGON_TOWER_GAME + '-response')
  handleStart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_START_DRAGON_TOWER_GAME} | key: ${key}`,
      '',
      'handleStart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_REVEAL_TILE_DRAGON_TOWER_GAME + '-response')
  handleReveal(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_REVEAL_TILE_DRAGON_TOWER_GAME} | key: ${key}`,
      '',
      'handleReveal',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CASHOUT_DRAGON_TOWER_GAME + '-response')
  handleCashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CASHOUT_DRAGON_TOWER_GAME} | key: ${key}`,
      '',
      'handleCashout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_DRAGON_TOWER_CONFIG + '-response')
  handleConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_DRAGON_TOWER_CONFIG} | key: ${key}`,
      '',
      'handleConfig',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_DRAGON_TOWER_PF + '-response')
  handleProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_DRAGON_TOWER_PF} | key: ${key}`,
      '',
      'handleProvablyFair',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
