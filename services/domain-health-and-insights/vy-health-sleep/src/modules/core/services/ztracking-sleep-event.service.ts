import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepEvent } from '../../../entities/sleep_event.entity';
import { ZtrackingSleepEvent } from '../../../entities/ztracking_sleep_event.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepEventDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepEventService {
  private logger = getLoggerConfig(ZtrackingSleepEventService.name);

  constructor(
    @InjectRepository(ZtrackingSleepEvent)
    private readonly ztrackingRepo: Repository<ZtrackingSleepEvent>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepEventService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepEvent(
    event: SleepEvent,
    traceId: string,
  ): Promise<ZtrackingSleepEvent> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...event, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep event saved in database`,
      traceId,
      'createZtrackingForSleepEvent',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForSleepEvent(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepEventDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this session id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepEvent',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this session id => ${sessionId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep event found in database`,
      traceId,
      'getZtrackingForSleepEvent',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
