import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepSummary } from '../../../entities/sleep_summary.entity';
import { ZtrackingSleepSummaryService } from './ztracking-sleep-summary.service';
import {
  SleepSummaryDto,
  GetSleepSummaryDto,
  DeleteSleepSummaryDto,
  encodeKafkaMessage,
  KT_END_SLEEP_SESSION,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepSummaryService {
  private logger = getLoggerConfig(SleepSummaryService.name);

  constructor(
    @InjectRepository(SleepSummary)
    private readonly summaryRepo: Repository<SleepSummary>,
    private readonly ztrackingService: ZtrackingSleepSummaryService,
  ) {
    this.logger.debug(
      `${SleepSummaryService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createSummary(
    sleepSummaryDto: SleepSummaryDto,
    traceId: string,
  ): Promise<SleepSummaryDto> {
    const entity = await this.summaryRepo.save(
      this.summaryRepo.create(sleepSummaryDto),
    );
    await this.ztrackingService.createZtrackingForSleepSummary(entity, traceId);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_END_SLEEP_SESSION,
      encodeKafkaMessage(SleepSummaryService.name, {
        sessionId: entity.sessionId,
        summary: entity,
        traceId,
      }),
    );
    return entity;
  }

  async getSummary(
    getSleepSummaryDto: GetSleepSummaryDto,
    traceId: string,
  ): Promise<SleepSummaryDto | null> {
    const { sessionId } = getSleepSummaryDto;
    const entity = await this.summaryRepo.findOne({ where: { sessionId } });
    if (!entity) {
      this.logger.warn(`Summary not found => ${sessionId}`, traceId, 'getSummary', LogStreamLevel.DebugLight);
      return null;
    }
    this.logger.info('Sleep summary retrieved', traceId, 'getSummary', LogStreamLevel.DebugLight);
    return entity;
  }

  async deleteSummary(
    deleteSleepSummaryDto: DeleteSleepSummaryDto,
    traceId: string,
  ): Promise<void> {
    const { sessionId } = deleteSleepSummaryDto;
    const entity = await this.summaryRepo.findOne({ where: { sessionId } });
    if (!entity) {
      throw new NotFoundException(`No summary found => ${sessionId}`);
    }
    await this.summaryRepo.softDelete(sessionId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepSummary(entity, traceId);
  }
}
