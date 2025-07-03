import { Injectable } from '@nestjs/common';
import { DiaperChangeService } from './diaper-change.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_DIAPER_CHANGE,
  KT_GET_DIAPER_CHANGES,
  CreateDiaperChangeDto,
  GetDiaperChangesDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';


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
      async (value: CreateDiaperChangeDto, traceId: string) =>
        await this.diaperChangeService.create(value, traceId),
    );
  }

  async getDiaperChanges(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_DIAPER_CHANGES,
      message,
      key,
      async (value: GetDiaperChangesDto, traceId: string) =>
        await this.diaperChangeService.findAll(value.babyId),
    );
  }
}
