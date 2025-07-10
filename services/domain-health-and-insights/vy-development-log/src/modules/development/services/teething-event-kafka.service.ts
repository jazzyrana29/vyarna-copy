import { Injectable } from '@nestjs/common';
import { TeethingEventService } from './teething-event.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_TEETHING_EVENT,
  KT_GET_TEETHING_EVENTS,
  CreateTeethingEventDto,
  GetManyTeethingEventsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class TeethingEventKafkaService {
  public serviceName = TeethingEventKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly teethingEventService: TeethingEventService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${TeethingEventKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTeethingEvent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_TEETHING_EVENT,
      message,
      key,
      async (
        createTeethingEventDto: CreateTeethingEventDto,
        traceId: string,
      ) =>
        await this.teethingEventService.createTeethingEvent(
          createTeethingEventDto,
          traceId,
        ),
    );
  }

  async getTeethingEvents(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_TEETHING_EVENTS,
      message,
      key,
      async (
        getTeethingEventsDto: GetManyTeethingEventsDto,
        traceId: string,
      ) =>
        await this.teethingEventService.getTeethingEvents(
          getTeethingEventsDto,
          traceId,
        ),
    );
  }
}
