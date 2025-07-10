import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepEvent } from '../../../entities/sleep_event.entity';
import { ZtrackingSleepEventService } from './ztracking-sleep-event.service';
import {
  SleepEventDto,
  GetSleepEventsDto,
  DeleteSleepEventDto,
  encodeKafkaMessage,
  KT_LOG_SLEEP_EVENT,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepEventService {
  private logger = getLoggerConfig(SleepEventService.name);

  constructor(
    @InjectRepository(SleepEvent)
    private readonly eventRepo: Repository<SleepEvent>,
    private readonly ztrackingService: ZtrackingSleepEventService,
  ) {
    this.logger.debug(
      `${SleepEventService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvent(
    sleepEventDto: SleepEventDto,
    traceId: string,
  ): Promise<SleepEventDto> {
    const entity = await this.eventRepo.save(
      this.eventRepo.create(sleepEventDto),
    );
    await this.ztrackingService.createZtrackingForSleepEvent(entity, traceId);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_LOG_SLEEP_EVENT,
      encodeKafkaMessage(SleepEventService.name, {
        sessionId: entity.sessionId,
        eventId: entity.eventId,
        eventType: entity.eventType,
        eventTime: entity.eventTime,
        traceId,
      }),
    );
    return entity;
  }

  async getEvents(
    getSleepEventsDto: GetSleepEventsDto,
    traceId: string,
  ): Promise<SleepEventDto[]> {
    const { sessionId } = getSleepEventsDto;
    const list = await this.eventRepo.find({ where: { sessionId } });
    this.logger.info(
      `Retrieved ${list.length} sleep events`,
      traceId,
      'getEvents',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteEvent(
    deleteSleepEventDto: DeleteSleepEventDto,
    traceId: string,
  ): Promise<void> {
    const { eventId } = deleteSleepEventDto;
    const entity = await this.eventRepo.findOne({ where: { eventId } });
    if (!entity) {
      throw new NotFoundException(`No sleep event found => ${eventId}`);
    }
    await this.eventRepo.softDelete(eventId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepEvent(entity, traceId);
  }
}
