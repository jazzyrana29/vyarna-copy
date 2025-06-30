import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveType } from '../../../entities/wave-type.entity';

import {
  FuzzySearchWaveTypesDto,
  GetManyWaveTypesDto,
  GetOneWaveTypeDto,
  PaginatedWaveTypesResponseDto,
  WaveTypeDto,
} from 'ez-utils';

@Injectable()
export class WaveTypeService {
  private logger = getLoggerConfig(WaveTypeService.name);

  constructor(
    @InjectRepository(WaveType)
    private readonly waveTypeRepository: Repository<WaveType>,
  ) {
    this.logger.debug(
      `${WaveTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneWaveType(
    { waveTypeId = '', name = '' }: GetOneWaveTypeDto,
    traceId: string,
  ): Promise<WaveTypeDto> {
    if (!waveTypeId && !name) {
      this.logger.error(
        'Either provide waveTypeId or name',
        traceId,
        'getOneWaveType',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide waveTypeId or name');
    }

    const where: FindOptionsWhere<WaveType> = {};
    if (name) where.name = name;
    if (waveTypeId) where.waveTypeId = waveTypeId;
    where.isDeleted = false;
    const waveType = await this.waveTypeRepository.findOne({ where });

    if (!waveType) {
      this.logger.error(
        `No WaveType found with ID: ${waveTypeId} or name: ${name}`,
        traceId,
        'getOneWaveType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveType found with ID: ${waveTypeId} or name: ${name}`,
      );
    }

    this.logger.info(
      `WaveType found with ID: ${waveType.waveTypeId}`,
      traceId,
      'getOneWaveType',
      LogStreamLevel.ProdStandard,
    );

    return waveType;
  }

  async getManyWaveTypes(
    getManyWaveTypesDto: GetManyWaveTypesDto,
    traceId: string,
  ): Promise<PaginatedWaveTypesResponseDto> {
    const {
      waveTypeGenreId,
      isDeleted,
      name,
      description,
      updatedBy,
      pagination,
      sort = [],
    } = getManyWaveTypesDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(description && { description }),
      ...(updatedBy && { updatedBy }),
      ...(waveTypeGenreId && { waveTypeGenreId }),
    };

    this.logger.debug(
      `Filters for getManyWaveTypes: ${JSON.stringify(where)}`,
      traceId,
      'getManyWaveTypes',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.waveTypeRepository
      .createQueryBuilder('waveType')
      .where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `waveType.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('waveType.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply pagination if needed
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);
      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 6) Execute query
    const waveTypes = await query.getMany();

    this.logger.info(
      `${waveTypes.length} WaveType(s) found in the database`,
      traceId,
      'getManyWaveTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: waveTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchWaveTypes(
    fuzzySearchWaveTypesDto: FuzzySearchWaveTypesDto,
    traceId: string,
  ): Promise<PaginatedWaveTypesResponseDto> {
    const {
      waveTypeGenreId,
      fuzzyName,
      fuzzyDescription,
      fuzzyUpdatedBy,
      name,
      description,
      updatedBy,
      isDeleted,
      pagination,
      sort = [],
    } = fuzzySearchWaveTypesDto;

    // 1) Build base query
    let query = this.waveTypeRepository.createQueryBuilder('waveType');

    // 2) Determine if we need to add WHERE clauses
    const hasFilters =
      waveTypeGenreId ||
      fuzzyName ||
      fuzzyDescription ||
      fuzzyUpdatedBy ||
      name ||
      description ||
      updatedBy ||
      typeof isDeleted === 'boolean';

    if (hasFilters) {
      // Start with a no-op condition so we can safely append AND conditions
      query.where('1 = 1');

      // **Exact filter for waveTypeGenreId**
      if (waveTypeGenreId) {
        query.andWhere('waveType.waveTypeGenreId = :waveTypeGenreId', {
          waveTypeGenreId,
        });
      }

      // **Fuzzy or Exact Name**
      if (fuzzyName) {
        query.andWhere('waveType.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('waveType.name = :name', { name });
      }

      // **Fuzzy or Exact Description**
      if (fuzzyDescription) {
        query.andWhere('waveType.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('waveType.description = :description', { description });
      }

      // **Fuzzy or Exact UpdatedBy**
      if (fuzzyUpdatedBy) {
        query.andWhere(
          'CAST(waveType.updatedBy AS text) ILIKE :fuzzyUpdatedBy',
          {
            fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
          },
        );
      } else if (updatedBy) {
        query.andWhere('waveType.updatedBy = :updatedBy', { updatedBy });
      }

      // **Exact Filter for isDeleted**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('waveType.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `waveType.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('waveType.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply pagination if needed
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);
      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 6) Execute query
    const waveTypes = await query.getMany();

    this.logger.info(
      `${waveTypes.length} WaveType(s) found matching search criteria`,
      traceId,
      'fuzzySearchWaveTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: waveTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
