import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import { SnakesKafkaService } from './services/snakes-kafka.service';
import {
  KT_CREATE_SNAKES_ROUND_ENTITY,
  KT_UPDATE_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_ROUND_ENTITY,
  KT_GET_SNAKES_CONFIG,
  KT_GET_PROVABLY_FAIR_SNAKES_GAME,
  KT_ROLL_DICE_SNAKES_GAME,
  KT_CASHOUT_SNAKES_GAME,
} from 'ez-utils';

@Controller('snakes')
export class SnakesController {
  private logger = getLoggerConfig(SnakesController.name);

  constructor(private readonly kafkaService: SnakesKafkaService) {
    this.logger.debug(
      `${SnakesController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_SNAKES_ROUND_ENTITY)
  async createRound(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_SNAKES_ROUND_ENTITY}`,
      '',
      'createRound',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.createRound(message, key);
  }

  @MessagePattern(KT_UPDATE_SNAKES_ROUND_ENTITY)
  async updateRound(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_SNAKES_ROUND_ENTITY}`,
      '',
      'updateRound',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.updateRound(message, key);
  }

  @MessagePattern(KT_GET_SNAKES_ROUND_ENTITY)
  async getRound(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SNAKES_ROUND_ENTITY}`,
      '',
      'getRound',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getRound(message, key);
  }

  @MessagePattern(KT_GET_SNAKES_CONFIG)
  async getConfig(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_SNAKES_CONFIG}`,
      '',
      'getConfig',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getConfig(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_SNAKES_GAME)
  async getProvablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_SNAKES_GAME}`,
      '',
      'getProvablyFair',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.getProvablyFair(message, key);
  }

  @MessagePattern(KT_ROLL_DICE_SNAKES_GAME)
  async rollDice(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_ROLL_DICE_SNAKES_GAME}`,
      '',
      'rollDice',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.rollDice(message, key);
  }

  @MessagePattern(KT_CASHOUT_SNAKES_GAME)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_SNAKES_GAME}`,
      '',
      'cashout',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }
}
