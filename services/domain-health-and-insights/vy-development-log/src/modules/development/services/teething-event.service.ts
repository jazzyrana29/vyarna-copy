import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeethingEvent } from '../../../entities/teething_event.entity';
import { ZtrackingTeethingEventService } from './ztracking-teething-event.service';
import {
  CreateTeethingEventDto,
  TeethingEventDto,
  GetTeethingEventsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class TeethingEventService {
  private logger = getLoggerConfig(TeethingEventService.name);

  constructor(
    @InjectRepository(TeethingEvent)
    private readonly teethingRepo: Repository<TeethingEvent>,
    private readonly ztrackingService: ZtrackingTeethingEventService,
  ) {
    this.logger.debug(
      `${TeethingEventService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createTeethingEvent(
    createTeethingEventDto: CreateTeethingEventDto,
    traceId: string,
  ): Promise<TeethingEventDto> {
    const entity = this.teethingRepo.create(createTeethingEventDto);
    await this.teethingRepo.save(entity);
    this.logger.info(
      'TeethingEvent created',
      traceId,
      'createTeethingEvent',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingService.createZtrackingTeethingEventEntity(entity, traceId);

    return entity;
  }

  async getTeethingEvents(
    getTeethingEventsDto: GetTeethingEventsDto,
    traceId: string,
  ): Promise<TeethingEventDto[]> {
    const { babyId } = getTeethingEventsDto;
    const list = await this.teethingRepo.find({ where: { babyId, isDeleted: false } });

    this.logger.info(
      `${list.length} TeethingEvent(s) retrieved`,
      traceId,
      'getTeethingEvents',
      LogStreamLevel.ProdStandard,
    );

    return list;
  }
}
