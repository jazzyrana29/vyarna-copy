import { Injectable } from '@nestjs/common';
import { DiaperChangeService } from './diaper-change.service';
import { KafkaMessageResponderService } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

export const KT_CREATE_DIAPER_CHANGE = 'create-diaper-change';
export const KT_GET_DIAPER_CHANGES = 'get-diaper-changes';

@Injectable()
export class DiaperChangeKafkaService {
  public serviceName = DiaperChangeKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly diaperChangeService: DiaperChangeService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${DiaperChangeKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDiaperChange(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_DIAPER_CHANGE,
      message,
      key,
      async (value: any, traceId: string) =>
        await this.diaperChangeService.create(value, traceId),
    );
  }

  async getDiaperChanges(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DIAPER_CHANGES,
      message,
      key,
      async (value: { babyId: string }, traceId: string) =>
        await this.diaperChangeService.findAll(value.babyId),
    );
  }
}
