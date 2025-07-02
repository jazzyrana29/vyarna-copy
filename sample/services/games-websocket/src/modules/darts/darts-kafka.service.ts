import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_DARTS_GAME_ENTITY,
  KT_START_DARTS_BATCH_ENTITY,
  KT_THROW_DART_ENTITY,
  KT_CASHOUT_DARTS_GAME_ENTITY,
  KT_GET_DARTS_CONFIG_ENTITY,
  KT_GET_PROVABLY_FAIR_DARTS_GAME,
  StartDartsGameDto,
  StartDartsBatchDto,
  ThrowDartDto,
  CashoutDartsGameDto,
  DartsConfigRequestDto,
} from 'ez-utils';

@Injectable()
export class DartsKafkaService {
  private readonly serviceName = DartsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startDartsGameDto: StartDartsGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_DARTS_GAME_ENTITY,
      startDartsGameDto,
      traceId,
    );
  }

  async startBatch(startDartsBatchDto: StartDartsBatchDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_DARTS_BATCH_ENTITY,
      startDartsBatchDto,
      traceId,
    );
  }

  async throwDart(throwDartDto: ThrowDartDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_THROW_DART_ENTITY,
      throwDartDto,
      traceId,
    );
  }

  async cashout(cashoutDartsGameDto: CashoutDartsGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_DARTS_GAME_ENTITY,
      cashoutDartsGameDto,
      traceId,
    );
  }

  async config(dartsConfigRequestDto: DartsConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_DARTS_CONFIG_ENTITY,
      dartsConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    cashoutDartsGameDto: CashoutDartsGameDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PROVABLY_FAIR_DARTS_GAME,
      cashoutDartsGameDto,
      traceId,
    );
  }
}
