import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentMoment } from '../../../entities/development_moment.entity';
import { ZtrackingDevelopmentMomentService } from './ztracking-development-moment.service';
import {
  CreateDevelopmentMomentDto,
  DevelopmentMomentDto,
  GetManyDevelopmentMomentsDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class DevelopmentMomentService {
  private logger = getLoggerConfig(DevelopmentMomentService.name);

  constructor(
    @InjectRepository(DevelopmentMoment)
    private readonly momentRepo: Repository<DevelopmentMoment>,
    private readonly ztrackingService: ZtrackingDevelopmentMomentService,
  ) {
    this.logger.debug(
      `${DevelopmentMomentService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDevelopmentMoment(
    createDevelopmentMomentDto: CreateDevelopmentMomentDto,
    traceId: string,
  ): Promise<DevelopmentMomentDto> {
    const entity = this.momentRepo.create(createDevelopmentMomentDto);
    await this.momentRepo.save(entity);
    this.logger.info(
      'DevelopmentMoment created',
      traceId,
      'createDevelopmentMoment',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingService.createZtrackingDevelopmentMomentEntity(entity, traceId);

    return entity;
  }

  async getDevelopmentMoments(
    getDevelopmentMomentsDto: GetManyDevelopmentMomentsDto,
    traceId: string,
  ): Promise<DevelopmentMomentDto[]> {
    const { babyId } = getDevelopmentMomentsDto;
    const list = await this.momentRepo.find({ where: { babyId, isDeleted: false } });

    this.logger.info(
      `${list.length} DevelopmentMoment(s) retrieved`,
      traceId,
      'getDevelopmentMoments',
      LogStreamLevel.ProdStandard,
    );

    return list;
  }
}
