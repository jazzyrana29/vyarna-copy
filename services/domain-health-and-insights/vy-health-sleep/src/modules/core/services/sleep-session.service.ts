import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepSession } from '../../../entities/sleep_session.entity';
import { ZtrackingSleepSessionService } from './ztracking-sleep-session.service';
import {
  CreateSleepSessionDto,
  SleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
  ZtrackingSleepSessionDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSessionService {
  private logger = getLoggerConfig(SleepSessionService.name);

  constructor(
    @InjectRepository(SleepSession)
    private readonly sleepRepo: Repository<SleepSession>,
    private readonly ztrackingSleepSessionService: ZtrackingSleepSessionService,
  ) {
    this.logger.debug(
      `${SleepSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSleepSession(
    createDto: CreateSleepSessionDto,
    traceId: string,
  ): Promise<SleepSessionDto> {
    const entity = this.sleepRepo.create(createDto);
    await this.sleepRepo.save(entity);
    this.logger.info(
      'SleepSession created',
      traceId,
      'createSleepSession',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingSleepSessionService.createZtrackingForSleepSession(
      entity,
      traceId,
    );

    return entity;
  }

  async getSleepSessions(
    _getDto: GetSleepSessionsDto,
    traceId: string,
  ): Promise<SleepSessionDto[]> {
    const list = await this.sleepRepo.find();
    this.logger.info(
      `Retrieved ${list.length} sleep sessions`,
      traceId,
      'getSleepSessions',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async getZtrackingSleepSession(
    getDto: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepSessionDto[]> {
    return this.ztrackingSleepSessionService.getZtrackingForSleepSession(
      getDto,
      traceId,
    );
  }
}
