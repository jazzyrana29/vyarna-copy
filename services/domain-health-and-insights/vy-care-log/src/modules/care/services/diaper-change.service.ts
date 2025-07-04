import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiaperChange } from '../../../entities/diaper_change.entity';
import { ZtrackingDiaperChangeService } from './ztracking-diaper-change.service';
import {
  CreateDiaperChangeDto,
  DiaperChangeDto,
  GetDiaperChangesDto,
  GetZtrackingDiaperChangeDto,
  ZtrackingDiaperChangeDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class DiaperChangeService {
  private logger = getLoggerConfig(DiaperChangeService.name);

  constructor(
    @InjectRepository(DiaperChange)
    private readonly diaperChangeRepo: Repository<DiaperChange>,
    private readonly ztrackingDiaperChangeService: ZtrackingDiaperChangeService,
  ) {
    this.logger.debug(
      `${DiaperChangeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createDiaperChange(
    createDiaperChangeDto: CreateDiaperChangeDto,
    traceId: string,
  ): Promise<DiaperChangeDto> {
    const entity = this.diaperChangeRepo.create(createDiaperChangeDto);
    await this.diaperChangeRepo.save(entity);
    this.logger.info(
      'DiaperChange created',
      traceId,
      'createDiaperChange',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingDiaperChangeService.createZtrackingForDiaperChange(
      entity,
      traceId,
    );

    return entity;
  }

  async getDiaperChanges(
    getDiaperChangesDto: GetDiaperChangesDto,
    traceId: string,
  ): Promise<DiaperChangeDto[]> {
    const { babyId } = getDiaperChangesDto;
    const diaperChanges = await this.diaperChangeRepo.find({
      where: { babyId, isDeleted: false },
    });

    this.logger.info(
      `${diaperChanges.length} DiaperChange(s) retrieved`,
      traceId,
      'getDiaperChanges',
      LogStreamLevel.ProdStandard,
    );

    return diaperChanges;
  }

  async getZtrackingDiaperChange(
    getDto: GetZtrackingDiaperChangeDto,
    traceId: string,
  ): Promise<ZtrackingDiaperChangeDto[]> {
    return this.ztrackingDiaperChangeService.getZtrackingForDiaperChange(
      getDto,
      traceId,
    );
  }
}
