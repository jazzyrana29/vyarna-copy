import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SleepEnvironment } from '../../../entities/sleep_environment.entity';
import { ZtrackingSleepEnvironment } from '../../../entities/ztracking_sleep_environment.entity';
import { GetZtrackingSleepSessionDto, ZtrackingSleepEnvironmentDto } from 'ez-utils';

@Injectable()
export class ZtrackingSleepEnvironmentService {
  private logger = getLoggerConfig(ZtrackingSleepEnvironmentService.name);

  constructor(
    @InjectRepository(ZtrackingSleepEnvironment)
    private readonly ztrackingRepo: Repository<ZtrackingSleepEnvironment>,
  ) {
    this.logger.debug(
      `${ZtrackingSleepEnvironmentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForSleepEnvironment(env: SleepEnvironment, traceId: string): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...env, versionDate: new Date() }),
    );
    this.logger.info(
      `ztracking sleep environment saved in database`,
      traceId,
      'createZtrackingForSleepEnvironment',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForSleepEnvironment(
    { sessionId = '' }: GetZtrackingSleepSessionDto,
    traceId: string,
  ): Promise<ZtrackingSleepEnvironmentDto[]> {
    const entities = await this.ztrackingRepo.find({ where: { sessionId } });
    if (!entities.length) {
      this.logger.error(
        `No ztracking entities found with this session id => ${sessionId}`,
        traceId,
        'getZtrackingForSleepEnvironment',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this session id => ${sessionId}`,
      );
    }
    this.logger.info(
      `${entities.length} ztracking sleep environment found in database`,
      traceId,
      'getZtrackingForSleepEnvironment',
      LogStreamLevel.ProdStandard,
    );
    return entities;
  }
}
