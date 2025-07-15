import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepSession } from '../../../entities/sleep_session.entity';
import { ZtrackingSleepSession } from '../../../entities/ztracking_sleep_session.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepSessionDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepSessionService {
  private logger = getLoggerConfig(ZtrackingSleepSessionService.name);

  constructor(
    @InjectRepository(ZtrackingSleepSession)
    private readonly ztrackingRepo: Repository<ZtrackingSleepSession>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepSession(
    session: SleepSession,
    traceId: string,
  ): Promise<ZtrackingSleepSession> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...session, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking sleep session saved in database`,
      traceId,
      'createZtrackingForSleepSession',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getZtrackingForSleepSession(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepSessionDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });

    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepSession',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${sessionId}`,
      );
    }

    this.logger.info(
      `${entities.length} ztracking sleep session found in database`,
      traceId,
      'getZtrackingForSleepSession',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
