import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepSchedule } from '../../../entities/sleep_schedule.entity';
import { ZtrackingSleepScheduleService } from './ztracking-sleep-schedule.service';
import {
  SleepScheduleDto,
  GetSleepSchedulesDto,
  DeleteSleepScheduleDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepScheduleService {
  private logger = getLoggerConfig(SleepScheduleService.name);

  constructor(
    @InjectRepository(SleepSchedule)
    private readonly scheduleRepo: Repository<SleepSchedule>,
    private readonly ztrackingService: ZtrackingSleepScheduleService,
  ) {
    this.logger.debug(
      `${SleepScheduleService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSchedule(
    sleepScheduleDto: SleepScheduleDto,
    traceId: string,
  ): Promise<SleepScheduleDto> {
    const entity = await this.scheduleRepo.save(
      this.scheduleRepo.create(sleepScheduleDto),
    );
    await this.ztrackingService.createZtrackingForSleepSchedule(entity, traceId);
    return entity;
  }

  async getSchedules(
    getSleepSchedulesDto: GetSleepSchedulesDto,
    traceId: string,
  ): Promise<SleepScheduleDto[]> {
    const { babyId } = getSleepSchedulesDto;
    const list = await this.scheduleRepo.find({ where: { babyId } });
    this.logger.info(
      `Retrieved ${list.length} schedules`,
      traceId,
      'getSchedules',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteSchedule(
    deleteSleepScheduleDto: DeleteSleepScheduleDto,
    traceId: string,
  ): Promise<void> {
    const { scheduleId } = deleteSleepScheduleDto;
    const entity = await this.scheduleRepo.findOne({ where: { scheduleId } });
    if (!entity) {
      throw new NotFoundException(`No schedule found => ${scheduleId}`);
    }
    await this.scheduleRepo.softDelete(scheduleId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepSchedule(entity, traceId);
  }
}
