import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepSummary } from '../../../entities/sleep_summary.entity';
import { ZtrackingSleepSummary } from '../../../entities/ztracking_sleep_summary.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepSummaryDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepSummaryService {
  private logger = getLoggerConfig(ZtrackingSleepSummaryService.name);

  constructor(
    @InjectRepository(ZtrackingSleepSummary)
    private readonly ztrackingRepo: Repository<ZtrackingSleepSummary>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepSummaryService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepSummary(summary: SleepSummary, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...summary, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep summary saved in database`,
      traceId,
      'createZtrackingForSleepSummary',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepSummary(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepSummaryDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this session id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepSummary',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this session id => ${sessionId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep summary found in database`,
      traceId,
      'getZtrackingForSleepSummary',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
