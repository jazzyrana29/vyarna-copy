import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeethingEvent } from '../../../entities/teething_event.entity';
import { ZtrackingTeethingEvent } from '../../../entities/ztracking_teething_event.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ZtrackingTeethingEventService {
  private logger = getLoggerConfig(ZtrackingTeethingEventService.name);

  constructor(
    @InjectRepository(ZtrackingTeethingEvent)
    private readonly ztrackingRepo: Repository<ZtrackingTeethingEvent>,
  ) {
    this.logger.debug(
      `${ZtrackingTeethingEventService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingTeethingEventEntity(
    event: TeethingEvent,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...event, versionDate: new Date() }),
    );
    this.logger.info(
      'ztracking teething event saved in database',
      traceId,
      'createZtrackingTeethingEventEntity',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }
}
