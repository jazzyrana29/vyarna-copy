import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  StartCrashDto,
  CrashConfigRequestDto,
  CrashProvablyFairRequestDto,
  CashoutCrashGameDto,
  KT_START_CRASH,
  KT_CRASH_CONFIG,
  KT_CRASH_PROVABLY_FAIR,
  KT_CASHOUT_CRASH_GAME,
} from 'ez-utils';

@Injectable()
export class CrashKafkaService {
  private readonly serviceName = CrashKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startCrashDto: StartCrashDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_CRASH,
      startCrashDto,
      traceId,
    );
  }

  async config(crashConfigRequestDto: CrashConfigRequestDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CRASH_CONFIG,
      crashConfigRequestDto,
      traceId,
    );
  }

  async provablyFair(
    crashProvablyFairRequestDto: CrashProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CRASH_PROVABLY_FAIR,
      crashProvablyFairRequestDto,
      traceId,
    );
  }

  async cashout(cashoutDto: CashoutCrashGameDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_CRASH_GAME,
      cashoutDto,
      traceId,
    );
  }
}
