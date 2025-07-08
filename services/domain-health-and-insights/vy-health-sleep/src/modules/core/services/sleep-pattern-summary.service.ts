import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepPatternSummary } from '../../../entities/sleep_pattern_summary.entity';
import { ZtrackingSleepPatternSummaryService } from './ztracking-sleep-pattern-summary.service';
import {
  SleepPatternSummaryDto,
  GetSleepPatternSummariesDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepPatternSummaryService {
  private logger = getLoggerConfig(SleepPatternSummaryService.name);

  constructor(
    @InjectRepository(SleepPatternSummary)
    private readonly summaryRepo: Repository<SleepPatternSummary>,
    private readonly ztrackingService: ZtrackingSleepPatternSummaryService,
  ) {
    this.logger.debug(
      `${SleepPatternSummaryService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSummary(
    sleepPatternSummaryDto: SleepPatternSummaryDto,
    traceId: string,
  ): Promise<SleepPatternSummaryDto> {
    const entity = await this.summaryRepo.save(
      this.summaryRepo.create(sleepPatternSummaryDto),
    );
    await this.ztrackingService.createZtrackingForSleepPatternSummary(entity, traceId);
    return entity;
  }

  async getSummaries(
    getSleepPatternSummariesDto: GetSleepPatternSummariesDto,
    traceId: string,
  ): Promise<SleepPatternSummaryDto[]> {
    const { babyId } = getSleepPatternSummariesDto;
    const list = await this.summaryRepo.find({ where: { babyId } });
    this.logger.info(
      `Retrieved ${list.length} pattern summaries`,
      traceId,
      'getSummaries',
      LogStreamLevel.DebugLight,
    );
    return list;
  }
}
