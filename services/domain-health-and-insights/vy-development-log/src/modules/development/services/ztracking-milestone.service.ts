import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestone } from '../../../entities/milestone.entity';
import { ZtrackingMilestone } from '../../../entities/ztracking_milestone.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ZtrackingMilestoneService {
  private logger = getLoggerConfig(ZtrackingMilestoneService.name);

  constructor(
    @InjectRepository(ZtrackingMilestone)
    private readonly ztrackingRepo: Repository<ZtrackingMilestone>,
  ) {
    this.logger.debug(
      `${ZtrackingMilestoneService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingMilestoneEntity(
    milestone: Milestone,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...milestone, versionDate: new Date() }),
    );
    this.logger.info(
      'ztracking milestone saved in database',
      traceId,
      'createZtrackingMilestoneEntity',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(entity?.ztrackingVersion);
  }
}
