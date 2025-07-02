import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_MINES_GAME,
  KT_REVEAL_TILE_MINES_GAME,
  KT_CASHOUT_MINES_GAME,
  KT_GET_MINES_CONFIG,
  KT_GET_PROVABLY_FAIR_MINES_GAME,
  MinesStartGameDto,
  MinesRevealTileDto,
  MinesCashoutDto,
  MinesConfigRequestDto,
} from 'ez-utils';

@Injectable()
export class MinesKafkaService {
  private readonly serviceName = MinesKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(minesStartGameDto: MinesStartGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_MINES_GAME,
      minesStartGameDto,
      traceId,
    );
  }

  async revealTile(minesRevealTileDto: MinesRevealTileDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_REVEAL_TILE_MINES_GAME,
      minesRevealTileDto,
      traceId,
    );
  }

  async cashout(minesCashoutDto: MinesCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_MINES_GAME,
      minesCashoutDto,
      traceId,
    );
  }

  async getConfig(
    minesConfigRequestDto: MinesConfigRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MINES_CONFIG,
      minesConfigRequestDto,
      traceId,
    );
  }

  async getProvablyFair(minesCashoutDto: MinesCashoutDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_MINES_GAME,
      minesCashoutDto,
      traceId,
    );
  }
}
