import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_DRAGON_TOWER_GAME,
  KT_REVEAL_TILE_DRAGON_TOWER_GAME,
  KT_CASHOUT_DRAGON_TOWER_GAME,
  KT_GET_DRAGON_TOWER_CONFIG,
  KT_GET_DRAGON_TOWER_PF,
  DragonTowerStartGameDto,
  DragonTowerRevealTileDto,
  DragonTowerCashoutDto,
  DragonTowerConfigRequestDto,
  DragonTowerProvablyFairRequestDto,
} from 'ez-utils';

@Injectable()
export class DragonTowerKafkaService {
  private readonly serviceName = DragonTowerKafkaService.name;
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
    dragonTowerStartGameDto: DragonTowerStartGameDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_DRAGON_TOWER_GAME,
      dragonTowerStartGameDto,
      traceId,
    );
  }

  async reveal(
    dragonTowerRevealTileDto: DragonTowerRevealTileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_REVEAL_TILE_DRAGON_TOWER_GAME,
      dragonTowerRevealTileDto,
      traceId,
    );
  }

  async cashout(dragonTowerCashoutDto: DragonTowerCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_DRAGON_TOWER_GAME,
      dragonTowerCashoutDto,
      traceId,
    );
  }

  async config(
    dragonTowerConfigRequestDto: DragonTowerConfigRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DRAGON_TOWER_CONFIG,
      dragonTowerConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    dragonTowerProvablyFairRequestDto: DragonTowerProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DRAGON_TOWER_PF,
      dragonTowerProvablyFairRequestDto,
      traceId,
    );
  }
}
