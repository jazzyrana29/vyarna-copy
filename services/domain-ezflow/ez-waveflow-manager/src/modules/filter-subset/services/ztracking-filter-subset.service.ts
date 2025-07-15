import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubset } from '../../../entities/filter-subset.entity';
import { ZtrackingFilterSubset } from '../../../entities/ztracking-filter-subset.entity';

import {
  GetZtrackingFilterSubsetDto,
  ZtrackingFilterSubsetDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingFilterSubsetService {
  private logger = getLoggerConfig(ZtrackingFilterSubsetService.name);

  constructor(
    @InjectRepository(ZtrackingFilterSubset)
    private readonly filterSubsetRepository: Repository<ZtrackingFilterSubset>,
  ) {
    this.logger.debug(
      `${ZtrackingFilterSubsetService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForFilterSubset(
    filterSubset: FilterSubset,
    traceId: string,
  ): Promise<ZtrackingFilterSubset> {
    const ztrackingEntity = await this.filterSubsetRepository.save(
      this.filterSubsetRepository.create({
        ...filterSubset,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingFilterSubset saved in database`,
      traceId,
      'createZtrackingForFilterSubset',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForFilterSubset(
    { filterSubsetId = '' }: GetZtrackingFilterSubsetDto,
    traceId: string,
  ): Promise<ZtrackingFilterSubsetDto[]> {
    const ztrackingEntities = await this.filterSubsetRepository.find({
      where: { filterSubsetId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${filterSubsetId}`,
        traceId,
        'getZtrackingForFilterSubset',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${filterSubsetId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking filterSubset found in database`,
      traceId,
      'getZtrackingForFilterSubset',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
