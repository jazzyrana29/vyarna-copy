import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepSchedule } from '../../../entities/sleep_schedule.entity';
import { ZtrackingSleepSchedule } from '../../../entities/ztracking_sleep_schedule.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepScheduleDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepScheduleService {
  private logger = getLoggerConfig(ZtrackingSleepScheduleService.name);

  constructor(
    @InjectRepository(ZtrackingSleepSchedule)
    private readonly ztrackingRepo: Repository<ZtrackingSleepSchedule>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepScheduleService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepSchedule(schedule: SleepSchedule, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...schedule, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep schedule saved in database`,
      traceId,
      'createZtrackingForSleepSchedule',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepSchedule(
    { babyId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepScheduleDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { babyId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this baby id => ${babyId}`,
        traceId,
        'getZtrackingForSleepSchedule',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this baby id => ${babyId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep schedule found in database`,
      traceId,
      'getZtrackingForSleepSchedule',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
