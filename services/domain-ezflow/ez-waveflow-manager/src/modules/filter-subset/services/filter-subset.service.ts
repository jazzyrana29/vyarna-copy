import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FilterSubset } from '../../../entities/filter-subset.entity';
import { Filter } from '../../../entities/filter.entity';

import {
  CreateFilterSubsetDto,
  DeleteFilterSubsetDto,
  FilterSubsetDto,
  GetOneFilterSubsetDto,
  UpdateFilterSubsetDto,
} from 'ez-utils';

import { ZtrackingFilterSubsetService } from './ztracking-filter-subset.service';

@Injectable()
export class FilterSubsetService {
  private logger = getLoggerConfig(FilterSubsetService.name);

  constructor(
    @InjectRepository(FilterSubset)
    private readonly filterSubsetRepository: Repository<FilterSubset>,
    @InjectRepository(Filter)
    private readonly filterRepository: Repository<Filter>,
    private readonly ztrackingFilterSubsetService: ZtrackingFilterSubsetService, // Injecting ZtrackingFilterSubsetService
  ) {
    this.logger.debug(
      `${FilterSubsetService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFilterSubset(
    createFilterSubsetDto: CreateFilterSubsetDto,
    traceId: string,
  ): Promise<FilterSubsetDto> {
    const filter = await this.filterRepository.findOneBy({
      filterId: createFilterSubsetDto.filterId,
    });

    if (!filter) {
      this.logger.error(
        'Filter not found',
        traceId,
        'createFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new NotFoundException('Filter not found');
    }

    const { max } = await this.filterSubsetRepository
      .createQueryBuilder('f')
      .select('MAX(f.filterOrder)', 'max')
      .where('f.isDeleted = false')
      .andWhere('f.filterId = :filterId', {
        filterId: createFilterSubsetDto.filterId,
      })
      .getRawOne();

    const maxOrder = max ?? 0; // Use 0 if no filters exist yet

    const createdFilterSubset = await this.filterSubsetRepository.save(
      this.filterSubsetRepository.create({
        ...createFilterSubsetDto,
        filterOrder: maxOrder + 1,
      }),
    );

    this.logger.info(
      `FilterSubset created with ID: ${createdFilterSubset.filterSubsetId}`,
      traceId,
      'createFilterSubset',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterSubsetService.createZtrackingForFilterSubset(
        createdFilterSubset,
        traceId,
      )
    ) {
      return createdFilterSubset;
    }
  }

  async updateFilterSubset(
    updateFilterSubsetDto: UpdateFilterSubsetDto,
    traceId: string,
  ): Promise<FilterSubsetDto> {
    // 1) Find the existing subset
    const filterSubset = await this.filterSubsetRepository.findOne({
      where: { filterSubsetId: updateFilterSubsetDto.filterSubsetId },
      relations: [
        'filter',
        'filter.manifold',
        'filter.manifold.node',
        'filter.manifold.node.flow',
      ],
    });

    if (!filterSubset) {
      this.logger.error(
        `No FilterSubset found with ID: ${updateFilterSubsetDto.filterSubsetId}`,
        traceId,
        'updateFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new NotFoundException(
        `No FilterSubset found with ID: ${updateFilterSubsetDto.filterSubsetId}`,
      );
    }

    if (
      filterSubset.filter &&
      filterSubset.filter.manifold &&
      filterSubset.filter.manifold.node &&
      filterSubset.filter.manifold.node.flow &&
      filterSubset.filter.manifold.node.flow.isPublished
    ) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateFilterSubsetDto);
      const invalidFields = updateKeys.filter(
        (key) => key !== 'filterSubsetId' && !allowedFields.includes(key),
      );
      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter subset of a published flow.`,
          traceId,
          'updateFilterSubset',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a filter subset of a published flow.`,
        );
      }
    }

    // 2) Compare old vs. new
    const oldOrder = filterSubset.filterOrder;
    const newOrder = updateFilterSubsetDto.filterOrder;

    if (newOrder !== undefined && newOrder !== oldOrder) {
      if (newOrder < oldOrder) {
        await this.filterSubsetRepository
          .createQueryBuilder()
          .update(FilterSubset)
          .set({ filterOrder: () => 'filterOrder + 1' })
          .where('filterId = :filterId', { filterId: filterSubset.filterId })
          .andWhere('isDeleted = false')
          .andWhere('filterSubsetId != :fsId', {
            fsId: filterSubset.filterSubsetId,
          })
          .andWhere('filterOrder >= :newOrder', { newOrder })
          .andWhere('filterOrder < :oldOrder', { oldOrder })
          .execute();
      } else {
        await this.filterSubsetRepository
          .createQueryBuilder()
          .update(FilterSubset)
          .set({ filterOrder: () => 'filterOrder - 1' })
          .where('filterId = :filterId', { filterId: filterSubset.filterId })
          .andWhere('isDeleted = false')
          .andWhere('filterSubsetId != :fsId', {
            fsId: filterSubset.filterSubsetId,
          })
          .andWhere('filterOrder > :oldOrder', { oldOrder })
          .andWhere('filterOrder <= :newOrder', { newOrder })
          .execute();
      }

      // After shifting others, update this one
      filterSubset.filterOrder = newOrder;
    }

    // 3) Merge any other fields from the DTO and save
    const updatedFilterSubset = await this.filterSubsetRepository.save({
      ...filterSubset,
      ...updateFilterSubsetDto,
    });

    // 4) Logging
    this.logger.info(
      `FilterSubset with ID: ${updatedFilterSubset.filterSubsetId} updated`,
      traceId,
      'updateFilterSubset',
      LogStreamLevel.ProdStandard,
    );

    // 5) Track changes
    const trackingDone =
      await this.ztrackingFilterSubsetService.createZtrackingForFilterSubset(
        updatedFilterSubset,
        traceId,
      );
    if (trackingDone) {
      return updatedFilterSubset;
    }

    return updatedFilterSubset;
  }

  async deleteFilterSubset(
    { filterSubsetId = '', updatedBy = '' }: DeleteFilterSubsetDto,
    traceId: string,
  ): Promise<FilterSubsetDto> {
    if (!filterSubsetId || !updatedBy) {
      this.logger.error(
        'You need to provide both filterSubsetId and updatedBy',
        traceId,
        'deleteFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new BadRequestException(
        'You need to provide both filterSubsetId and updatedBy',
      );
    }

    const filterSubset = await this.filterSubsetRepository.findOne({
      where: { filterSubsetId },
    });

    if (!filterSubset) {
      this.logger.error(
        `No FilterSubset found with ID: ${filterSubsetId}`,
        traceId,
        'deleteFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new NotFoundException(
        `No FilterSubset found with ID: ${filterSubsetId}`,
      );
    }

    filterSubset.isDeleted = true;
    filterSubset.updatedBy = updatedBy;
    const deletedFilterSubset =
      await this.filterSubsetRepository.save(filterSubset);

    this.logger.info(
      `FilterSubset with ID: ${filterSubsetId} marked as deleted`,
      traceId,
      'deleteFilterSubset',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFilterSubsetService.createZtrackingForFilterSubset(
        deletedFilterSubset,
        traceId,
      )
    ) {
      return deletedFilterSubset;
    }
  }

  async getOneFilterSubset(
    { filterSubsetId = '', isDeleted = false }: GetOneFilterSubsetDto,
    traceId: string,
  ): Promise<FilterSubsetDto> {
    if (!filterSubsetId) {
      this.logger.error(
        'Provide filterSubsetId',
        traceId,
        'getOneFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new BadRequestException('Provide filterSubsetId');
    }

    const where: FindOptionsWhere<FilterSubset> = {};
    if (filterSubsetId) where.filterSubsetId = filterSubsetId;
    where.isDeleted = isDeleted;
    const filterSubset = await this.filterSubsetRepository.findOne({
      where,
      relations: ['filter', 'filterSubsetItems'],
    });

    if (!filterSubset) {
      this.logger.error(
        `No FilterSubset found with ID: ${filterSubsetId}`,
        traceId,
        'getOneFilterSubset',
        LogStreamLevel.DebugHeavy, // Updated Log Level
      );
      throw new NotFoundException(
        `No FilterSubset found with ID: ${filterSubsetId}`,
      );
    }

    this.logger.info(
      `FilterSubset found with ID: ${filterSubset.filterSubsetId}`,
      traceId,
      'getOneFilterSubset',
      LogStreamLevel.ProdStandard,
    );

    return filterSubset;
  }
}
