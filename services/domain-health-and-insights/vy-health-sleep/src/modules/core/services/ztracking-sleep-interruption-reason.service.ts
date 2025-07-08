import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepInterruptionReason } from '../../../entities/sleep_interruption_reason.entity';
import { ZtrackingSleepInterruptionReason } from '../../../entities/ztracking_sleep_interruption_reason.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepInterruptionReasonDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepInterruptionReasonService {
  private logger = getLoggerConfig(ZtrackingSleepInterruptionReasonService.name);

  constructor(
    @InjectRepository(ZtrackingSleepInterruptionReason)
    private readonly ztrackingRepo: Repository<ZtrackingSleepInterruptionReason>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepInterruptionReasonService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepInterruptionReason(reason: SleepInterruptionReason, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...reason, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep interruption saved in database`,
      traceId,
      'createZtrackingForSleepInterruptionReason',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepInterruptionReason(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepInterruptionReasonDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this session id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepInterruptionReason',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this session id => ${sessionId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep interruption found in database`,
      traceId,
      'getZtrackingForSleepInterruptionReason',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
