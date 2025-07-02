import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import {
  KT_START_PUMP,
  KT_PUMP_BALLOON,
  KT_CASHOUT_PUMP,
  KT_GET_PUMP_CONFIG,
  KT_GET_PUMP_FAIRNESS,
  KT_AUTO_BET_PUMP,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class PumpResponseController {
  private logger = getLoggerConfig(PumpResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${PumpResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_PUMP + '-response')
  handleStart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_START_PUMP} | key: ${key}`,
      '',
      'handleStart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_PUMP_BALLOON + '-response')
  handlePump(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_PUMP_BALLOON} | key: ${key}`,
      '',
      'handlePump',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CASHOUT_PUMP + '-response')
  handleCashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CASHOUT_PUMP} | key: ${key}`,
      '',
      'handleCashout',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PUMP_CONFIG + '-response')
  handleConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PUMP_CONFIG} | key: ${key}`,
      '',
      'handleConfig',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PUMP_FAIRNESS + '-response')
  handleProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PUMP_FAIRNESS} | key: ${key}`,
      '',
      'handleProvablyFair',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_AUTO_BET_PUMP + '-response')
  handleAutoBet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_AUTO_BET_PUMP} | key: ${key}`,
      '',
      'handleAutoBet',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
