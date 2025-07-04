import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepSession } from '../../../entities/sleep_session.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSessionService {
  private logger = getLoggerConfig(SleepSessionService.name);

  constructor(
    @InjectRepository(SleepSession)
    private readonly sleepRepo: Repository<SleepSession>,
  ) {
    this.logger.debug(
      `${SleepSessionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(session: Partial<SleepSession>, traceId: string): Promise<SleepSession> {
    const entity = this.sleepRepo.create(session);
    await this.sleepRepo.save(entity);
    this.logger.info('SleepSession created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async findAll(traceId: string): Promise<SleepSession[]> {
    const list = await this.sleepRepo.find();
    this.logger.info(`Retrieved ${list.length} sleep sessions`, traceId, 'findAll', LogStreamLevel.DebugLight);
    return list;
  }
}
