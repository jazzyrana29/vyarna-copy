import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Filter } from '../../../entities/filter.entity';
import { ZtrackingFilter } from '../../../entities/ztracking-filter.entity';

import { GetZtrackingFilterDto, ZtrackingFilterDto } from 'ez-utils';

@Injectable()
export class ZtrackingFilterService {
  private logger = getLoggerConfig(ZtrackingFilterService.name);

  constructor(
    @InjectRepository(ZtrackingFilter)
    private readonly filterRepository: Repository<ZtrackingFilter>,
  ) {
    this.logger.debug(
      `${ZtrackingFilterService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForFilter(
    filter: Filter,
    traceId: string,
  ): Promise<ZtrackingFilter> {
    const ztrackingEntity = await this.filterRepository.save(
      this.filterRepository.create({
        ...filter,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingFilter saved in database`,
      traceId,
      'createZtrackingForFilter',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForFilter(
    { filterId = '' }: GetZtrackingFilterDto,
    traceId: string,
  ): Promise<ZtrackingFilterDto[]> {
    const ztrackingEntities = await this.filterRepository.find({
      where: { filterId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${filterId}`,
        traceId,
        'getZtrackingForFilter',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${filterId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking filter found in database`,
      traceId,
      'getZtrackingForFilter',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
