import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubsetItem } from '../../../entities/filter-subset-item.entity';

import {
  CreateFilterSubsetItemDto,
  DeleteFilterSubsetItemDto,
  FilterSubsetItemDto,
  GetOneFilterSubsetItemDto,
  UpdateFilterSubsetItemDto,
} from 'ez-utils';

import { ZtrackingFilterSubsetItemService } from './ztracking-filter-subset-item.service';

@Injectable()
export class FilterSubsetItemService {
  private logger = getLoggerConfig(FilterSubsetItemService.name);

  constructor(
    @InjectRepository(FilterSubsetItem)
    private readonly filterSubsetItemRepository: Repository<FilterSubsetItem>,
    private readonly ztrackingFilterSubsetItemService: ZtrackingFilterSubsetItemService, // Injecting ZtrackingFilterSubsetService
  ) {
    this.logger.debug(
      `${FilterSubsetItemService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilterSubsetItem(
    createFilterSubsetItemDto: CreateFilterSubsetItemDto,
    traceId: string,
  ): Promise<FilterSubsetItemDto> {
    const createdFilterSubsetItem = await this.filterSubsetItemRepository.save(
      this.filterSubsetItemRepository.create(createFilterSubsetItemDto),
    );

    this.logger.info(
      `FilterSubsetItem created with ID: ${createdFilterSubsetItem.filterSubsetItemId}`,
      traceId,
      'createFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterSubsetItemService.createZtrackingForFilterSubsetItem(
        createdFilterSubsetItem,
        traceId,
      )
    )
      return createdFilterSubsetItem;
  }

  async updateFilterSubsetItem(
    updateFilterSubsetItemDto: UpdateFilterSubsetItemDto,
    traceId: string,
  ): Promise<FilterSubsetItemDto> {
    const filterSubsetItem = await this.filterSubsetItemRepository.findOne({
      where: {
        filterSubsetItemId: updateFilterSubsetItemDto.filterSubsetItemId,
      },
      relations: [
        'filterSubset',
        'filterSubset.filter',
        'filterSubset.filter.manifold',
        'filterSubset.filter.manifold.node',
        'filterSubset.filter.manifold.node.flow',
      ],
    });

    if (!filterSubsetItem) {
      this.logger.error(
        `No FilterSubsetItem found with ID: ${updateFilterSubsetItemDto.filterSubsetItemId}`,
        traceId,
        'updateFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No FilterSubsetItem found with ID: ${updateFilterSubsetItemDto.filterSubsetItemId}`,
      );
    }

    // If the associated Flow is published, restrict updates to only allowed fields.
    if (
      filterSubsetItem.filterSubset &&
      filterSubsetItem.filterSubset.filter &&
      filterSubsetItem.filterSubset.filter.manifold &&
      filterSubsetItem.filterSubset.filter.manifold.node &&
      filterSubsetItem.filterSubset.filter.manifold.node.flow &&
      filterSubsetItem.filterSubset.filter.manifold.node.flow.isPublished
    ) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateFilterSubsetItemDto);
      const invalidFields = updateKeys.filter(
        (key) => key !== 'filterSubsetItemId' && !allowedFields.includes(key),
      );

      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter subset item of a published flow.`,
          traceId,
          'updateFilterSubsetItem',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter subset item of a published flow.`,
        );
      }
    }

    const updatedFilterSubsetItem = await this.filterSubsetItemRepository.save({
      ...filterSubsetItem,
      ...updateFilterSubsetItemDto,
    });

    this.logger.info(
      `FilterSubsetItem with ID: ${updatedFilterSubsetItem.filterSubsetItemId} updated`,
      traceId,
      'updateFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterSubsetItemService.createZtrackingForFilterSubsetItem(
        updatedFilterSubsetItem,
        traceId,
      )
    ) {
      return updatedFilterSubsetItem;
    }
  }

  async deleteFilterSubsetItem(
    { filterSubsetItemId = '', updatedBy = '' }: DeleteFilterSubsetItemDto,
    traceId: string,
  ): Promise<FilterSubsetItemDto> {
    if (!filterSubsetItemId || !updatedBy) {
      this.logger.error(
        'You need to provide both filterSubsetItemId and updatedBy',
        traceId,
        'deleteFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide both filterSubsetItemId and updatedBy',
      );
    }

    const filterSubsetItem = await this.filterSubsetItemRepository.findOne({
      where: { filterSubsetItemId },
    });

    if (!filterSubsetItem) {
      this.logger.error(
        `No FilterSubsetItem found with ID: ${filterSubsetItemId}`,
        traceId,
        'deleteFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No FilterSubsetItem found with ID: ${filterSubsetItemId}`,
      );
    }

    filterSubsetItem.isDeleted = true;
    filterSubsetItem.updatedBy = updatedBy;
    const deletedFilterSubsetItem =
      await this.filterSubsetItemRepository.save(filterSubsetItem);

    this.logger.info(
      `FilterSubsetItem with ID: ${filterSubsetItemId} marked as deleted`,
      traceId,
      'deleteFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterSubsetItemService.createZtrackingForFilterSubsetItem(
        deletedFilterSubsetItem,
        traceId,
      )
    ) {
      return deletedFilterSubsetItem;
    }
  }

  async getOneFilterSubsetItem(
    { filterSubsetItemId = '', isDeleted = false }: GetOneFilterSubsetItemDto,
    traceId: string,
  ): Promise<FilterSubsetItemDto> {
    if (!filterSubsetItemId) {
      this.logger.error(
        'Provide filterSubsetItemId',
        traceId,
        'getOneFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Provide filterSubsetItemId');
    }

    const where: FindOptionsWhere<FilterSubsetItem> = {};

    if (filterSubsetItemId) where.filterSubsetItemId = filterSubsetItemId;
    where.isDeleted = isDeleted;
    const filterSubsetItem = await this.filterSubsetItemRepository.findOne({
      where,
      relations: [
        'filterSubset',
        'evaluationVariable',
        'evaluationVariable.evaluationVariableDataType',
        'evaluationOperator',
      ],
    });

    if (!filterSubsetItem) {
      this.logger.error(
        `No FilterSubsetItem found with ID: ${filterSubsetItemId}`,
        traceId,
        'getOneFilterSubsetItem',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No FilterSubsetItem found with ID: ${filterSubsetItemId}`,
      );
    }

    this.logger.info(
      `FilterSubsetItem found with ID: ${filterSubsetItem.filterSubsetItemId}`,
      traceId,
      'getOneFilterSubsetItem',
      LogStreamLevel.ProdStandard,
    );

    return filterSubsetItem;
  }
}
