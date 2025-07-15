import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubsetItem } from '../../../entities/filter-subset-item.entity';
import { ZtrackingFilterSubsetItem } from '../../../entities/ztracking-filter-subset-item.entity';

import {
  GetZtrackingFilterSubsetItemDto,
  ZtrackingFilterSubsetItemDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingFilterSubsetItemService {
  private logger = getLoggerConfig(ZtrackingFilterSubsetItemService.name);

  constructor(
    @InjectRepository(ZtrackingFilterSubsetItem)
    private readonly filterSubsetItemRepository: Repository<ZtrackingFilterSubsetItem>,
  ) {
    this.logger.debug(
      `${ZtrackingFilterSubsetItemService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForFilterSubsetItem(
    filterSubsetItem: FilterSubsetItem,
    traceId: string,
  ): Promise<ZtrackingFilterSubsetItem> {
    const ztrackingEntity = await this.filterSubsetItemRepository.save(
      this.filterSubsetItemRepository.create({
        ...filterSubsetItem,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `create ZtrackingFilterSubsetItem saved in database`,
      traceId,
      'createZtrackingForFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForFilterSubsetItem(
    { filterSubsetItemId = '' }: GetZtrackingFilterSubsetItemDto,
    traceId: string,
  ): Promise<ZtrackingFilterSubsetItemDto[]> {
    const ztrackingEntities = await this.filterSubsetItemRepository.find({
      where: { filterSubsetItemId },
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${filterSubsetItemId}`,
        traceId,
        'getZtrackingForFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${filterSubsetItemId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking filterSubsetItem found in database`,
      traceId,
      'getZtrackingForFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
