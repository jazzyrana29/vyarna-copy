import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_START_PLINKO,
  KT_DROP_PLINKO,
  KT_CONFIG_PLINKO,
  KT_CASHOUT_PLINKO,
  KT_PF_PLINKO,
  StartPlinkoDto,
  DropPlinkoDto,
  CashoutPlinkoDto,
  PlinkoConfigRequestDto,
  PlinkoProvablyFairRequestDto,
} from 'ez-utils';

@Injectable()
export class PlinkoKafkaService {
  private readonly serviceName = PlinkoKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async startGame(startPlinkoDto: StartPlinkoDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_START_PLINKO,
      startPlinkoDto,
      traceId,
    );
  }

  async drop(dropPlinkoDto: DropPlinkoDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DROP_PLINKO,
      dropPlinkoDto,
      traceId,
    );
  }

  async config(
    plinkoConfigRequestDto: PlinkoConfigRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CONFIG_PLINKO,
      plinkoConfigRequestDto,
      traceId,
    );
  }

  async cashout(cashoutPlinkoDto: CashoutPlinkoDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CASHOUT_PLINKO,
      cashoutPlinkoDto,
      traceId,
    );
  }

  async provablyFair(
    plinkoProvablyFairDto: PlinkoProvablyFairRequestDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_PF_PLINKO,
      plinkoProvablyFairDto,
      traceId,
    );
  }
}
