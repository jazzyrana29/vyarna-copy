import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SleepInterruptionReason } from '../../../entities/sleep_interruption_reason.entity';
import { ZtrackingSleepInterruptionReasonService } from './ztracking-sleep-interruption-reason.service';
import {
  SleepInterruptionReasonDto,
  GetSleepInterruptionReasonsDto,
  DeleteSleepInterruptionReasonDto,
  encodeKafkaMessage,
  KT_SLEEP_INTERRUPTED,
} from 'ez-utils';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class SleepInterruptionService {
  private logger = getLoggerConfig(SleepInterruptionService.name);

  constructor(
    @InjectRepository(SleepInterruptionReason)
    private readonly reasonRepo: Repository<SleepInterruptionReason>,
    private readonly ztrackingService: ZtrackingSleepInterruptionReasonService,
  ) {
    this.logger.debug(
      `${SleepInterruptionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createReason(
    sleepInterruptionReasonDto: SleepInterruptionReasonDto,
    traceId: string,
  ): Promise<SleepInterruptionReasonDto> {
    const entity = await this.reasonRepo.save(
      this.reasonRepo.create(sleepInterruptionReasonDto),
    );
    await this.ztrackingService.createZtrackingForSleepInterruptionReason(entity, traceId);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_SLEEP_INTERRUPTED,
      encodeKafkaMessage(SleepInterruptionService.name, {
        sessionId: entity.sessionId,
        reasonId: entity.reasonId,
        reasonType: entity.reasonType,
        eventTime: entity.eventTime,
        traceId,
      }),
    );
    return entity;
  }

  async getReasons(
    getSleepInterruptionReasonsDto: GetSleepInterruptionReasonsDto,
    traceId: string,
  ): Promise<SleepInterruptionReasonDto[]> {
    const { sessionId } = getSleepInterruptionReasonsDto;
    const list = await this.reasonRepo.find({ where: { sessionId } });
    this.logger.info(
      `Retrieved ${list.length} interruption reasons`,
      traceId,
      'getReasons',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async deleteReason(
    deleteSleepInterruptionReasonDto: DeleteSleepInterruptionReasonDto,
    traceId: string,
  ): Promise<void> {
    const { reasonId } = deleteSleepInterruptionReasonDto;
    const entity = await this.reasonRepo.findOne({ where: { reasonId } });
    if (!entity) {
      throw new NotFoundException(`No interruption reason found => ${reasonId}`);
    }
    await this.reasonRepo.softDelete(reasonId);
    entity.deletedAt = new Date();
    await this.ztrackingService.createZtrackingForSleepInterruptionReason(entity, traceId);
  }
}
