import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepPatternSummary } from '../../../entities/sleep_pattern_summary.entity';
import { ZtrackingSleepPatternSummary } from '../../../entities/ztracking_sleep_pattern_summary.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepPatternSummaryDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepPatternSummaryService {
  private logger = getLoggerConfig(ZtrackingSleepPatternSummaryService.name);

  constructor(
    @InjectRepository(ZtrackingSleepPatternSummary)
    private readonly ztrackingRepo: Repository<ZtrackingSleepPatternSummary>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepPatternSummaryService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepPatternSummary(summary: SleepPatternSummary, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...summary, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep pattern summary saved in database`,
      traceId,
      'createZtrackingForSleepPatternSummary',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepPatternSummary(
    { babyId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepPatternSummaryDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { babyId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this baby id => ${babyId}`,
        traceId,
        'getZtrackingForSleepPatternSummary',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this baby id => ${babyId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep pattern summary found in database`,
      traceId,
      'getZtrackingForSleepPatternSummary',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
