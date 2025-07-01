import { Controller } from '@nestjs/common';
import { Ctx, Payload, MessagePattern, KafkaContext } from '@nestjs/microservices';
import { KT_START_DICE_GAME_ENTITY, KT_ROLL_DICE_TILE_ENTITY, KT_CASHOUT_DICE_GAME_ENTITY, KT_GET_DICE_CONFIG_ENTITY, KT_GET_PROVABLY_FAIR_DICE_GAME, KT_AUTO_BET_DICE_GAME } from 'ez-utils';
import { DiceKafkaService } from './services/dice-kafka.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('dice')
export class DiceController {
  private logger = getLoggerConfig(DiceController.name);

  constructor(private readonly kafkaService: DiceKafkaService) {
    this.logger.debug(
      `${DiceController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_START_DICE_GAME_ENTITY)
  async startGame(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_START_DICE_GAME_ENTITY}`,
      '',
      'startGame',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.startGame(message, key);
  }

  @MessagePattern(KT_ROLL_DICE_TILE_ENTITY)
  async roll(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_ROLL_DICE_TILE_ENTITY}`,
      '',
      'roll',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.roll(message, key);
  }

  @MessagePattern(KT_CASHOUT_DICE_GAME_ENTITY)
  async cashout(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CASHOUT_DICE_GAME_ENTITY}`,
      '',
      'cashout',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.cashout(message, key);
  }

  @MessagePattern(KT_GET_DICE_CONFIG_ENTITY)
  async config(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_DICE_CONFIG_ENTITY}`,
      '',
      'config',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.config(message, key);
  }

  @MessagePattern(KT_GET_PROVABLY_FAIR_DICE_GAME)
  async provablyFair(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PROVABLY_FAIR_DICE_GAME}`,
      '',
      'provablyFair',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.provablyFair(message, key);
  }

  @MessagePattern(KT_AUTO_BET_DICE_GAME)
  async autoBet(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_AUTO_BET_DICE_GAME}`,
      '',
      'autoBet',
      LogStreamLevel.DebugLight,
    );
    await this.kafkaService.autoBet(message, key);
  }
}
