import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_DICE_GAME_ENTITY,
  KT_ROLL_DICE_TILE_ENTITY,
  KT_CASHOUT_DICE_GAME_ENTITY,
  KT_GET_DICE_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DICE_GAME,
  KT_AUTO_BET_DICE_GAME,
  StartPersonIdentityGameDto,
  RollPersonIdentityDto,
  CashoutPersonIdentityGameDto,
  PersonIdentityConfigRequestDto,
  AutoBetSettingsDto,
} from 'ez-utils';

@Injectable()
export class PersonIdentityKafkaService {
  private readonly serviceName = PersonIdentityKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(
    startPersonIdentityGameDto: StartPersonIdentityGameDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_DICE_GAME_ENTITY,
      startPersonIdentityGameDto,
      traceId,
    );
  }
}
