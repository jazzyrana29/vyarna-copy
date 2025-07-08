import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentMoment } from '../../../entities/development_moment.entity';
import { ZtrackingDevelopmentMoment } from '../../../entities/ztracking_development_moment.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ZtrackingDevelopmentMomentService {
  private logger = getLoggerConfig(ZtrackingDevelopmentMomentService.name);

  constructor(
    @InjectRepository(ZtrackingDevelopmentMoment)
    private readonly ztrackingRepo: Repository<ZtrackingDevelopmentMoment>,
  ) {
    this.logger.debug(
      `${ZtrackingDevelopmentMomentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingDevelopmentMomentEntity(
    moment: DevelopmentMoment,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...moment, versionDate: new Date() }),
    );
    this.logger.info(
      'ztracking development moment saved in database',
      traceId,
      'createZtrackingDevelopmentMomentEntity',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }
}
