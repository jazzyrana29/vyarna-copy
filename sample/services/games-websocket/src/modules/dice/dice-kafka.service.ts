import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_DICE_GAME_ENTITY,
  KT_ROLL_DICE_TILE_ENTITY,
  KT_CASHOUT_DICE_GAME_ENTITY,
  KT_GET_DICE_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DICE_GAME,
  KT_AUTO_BET_DICE_GAME,
  StartDiceGameDto,
  RollDiceDto,
  CashoutDiceGameDto,
  DiceConfigRequestDto,
  AutoBetSettingsDto,
} from 'ez-utils';

@Injectable()
export class DiceKafkaService {
  private readonly serviceName = DiceKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startDiceGameDto: StartDiceGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_DICE_GAME_ENTITY,
      startDiceGameDto,
      traceId,
    );
  }

  async roll(rollDiceDto: RollDiceDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_ROLL_DICE_TILE_ENTITY,
      rollDiceDto,
      traceId,
    );
  }

  async cashout(cashoutDiceGameDto: CashoutDiceGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_DICE_GAME_ENTITY,
      cashoutDiceGameDto,
      traceId,
    );
  }

  async config(diceConfigRequestDto: DiceConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DICE_CONFIG_ENTITY,
      diceConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(cashoutDiceGameDto: CashoutDiceGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DICE_GAME,
      cashoutDiceGameDto,
      traceId,
    );
  }

  async autoBet(autoBetSettingsDto: AutoBetSettingsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_AUTO_BET_DICE_GAME,
      autoBetSettingsDto,
      traceId,
    );
  }
}
