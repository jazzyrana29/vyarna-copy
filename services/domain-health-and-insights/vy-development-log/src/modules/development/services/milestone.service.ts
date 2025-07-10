import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestone } from '../../../entities/milestone.entity';
import { ZtrackingMilestoneService } from './ztracking-milestone.service';
import {
  CreateMilestoneDto,
  MilestoneDto,
  GetManyMilestonesDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class MilestoneService {
  private logger = getLoggerConfig(MilestoneService.name);

  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepo: Repository<Milestone>,
    private readonly ztrackingMilestoneService: ZtrackingMilestoneService,
  ) {
    this.logger.debug(
      `${MilestoneService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createMilestone(
    createMilestoneDto: CreateMilestoneDto,
    traceId: string,
  ): Promise<MilestoneDto> {
    const entity = this.milestoneRepo.create(createMilestoneDto);
    await this.milestoneRepo.save(entity);
    this.logger.info(
      'Milestone created',
      traceId,
      'createMilestone',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingMilestoneService.createZtrackingMilestoneEntity(
      entity,
      traceId,
    );

    return entity;
  }

  async getMilestones(
    getMilestonesDto: GetManyMilestonesDto,
    traceId: string,
  ): Promise<MilestoneDto[]> {
    const { babyId } = getMilestonesDto;
    const milestones = await this.milestoneRepo.find({
      where: { babyId, isDeleted: false },
    });

    this.logger.info(
      `${milestones.length} Milestone(s) retrieved`,
      traceId,
      'getMilestones',
      LogStreamLevel.ProdStandard,
    );

    return milestones;
  }
}
