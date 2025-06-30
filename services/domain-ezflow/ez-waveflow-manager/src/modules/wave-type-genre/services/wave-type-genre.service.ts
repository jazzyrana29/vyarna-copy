import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeGenre } from '../../../entities/wave-type-genre.entity';

import {
  FuzzySearchWaveTypeGenresDto,
  GetManyWaveTypeGenresDto,
  GetOneWaveTypeGenreDto,
  PaginatedWaveTypeGenresResponseDto,
  WaveTypeGenreDto,
} from 'ez-utils';

@Injectable()
export class WaveTypeGenreService {
  private logger = getLoggerConfig(WaveTypeGenreService.name);

  constructor(
    @InjectRepository(WaveTypeGenre)
    private readonly waveTypeGenreRepository: Repository<WaveTypeGenre>,
  ) {
    this.logger.debug(
      `${WaveTypeGenreService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneWaveTypeGenre(
    { waveTypeGenreId = '', name = '' }: GetOneWaveTypeGenreDto,
    traceId: string,
  ): Promise<WaveTypeGenreDto> {
    if (!waveTypeGenreId && !name) {
      this.logger.error(
        'Either provide waveTypeGenreId or name',
        traceId,
        'getOneWaveTypeGenre',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide waveTypeGenreId or name');
    }

    const where: FindOptionsWhere<WaveTypeGenre> = {};
    if (name) where.name = name;
    if (waveTypeGenreId) where.waveTypeGenreId = waveTypeGenreId;
    where.isDeleted = false;
    const waveTypeGenre = await this.waveTypeGenreRepository.findOne({ where });

    if (!waveTypeGenre) {
      this.logger.error(
        `No WaveTypeGenre found with ID: ${waveTypeGenreId} or name: ${name}`,
        traceId,
        'getOneWaveTypeGenre',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveTypeGenre found with ID: ${waveTypeGenreId} or name: ${name}`,
      );
    }

    this.logger.info(
      `WaveTypeGenre found with ID: ${waveTypeGenre.waveTypeGenreId}`,
      traceId,
      'getOneWaveTypeGenre',
      LogStreamLevel.ProdStandard,
    );

    return waveTypeGenre;
  }

  async getManyWaveTypeGenres(
    getManyWaveTypeGenresDto: GetManyWaveTypeGenresDto,
    traceId: string,
  ): Promise<PaginatedWaveTypeGenresResponseDto> {
    const {
      isDeleted,
      name,
      description,
      updatedBy,
      pagination,
      sort = [],
    } = getManyWaveTypeGenresDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(description && { description }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyWaveTypeGenres: ${JSON.stringify(where)}`,
      traceId,
      'getManyWaveTypeGenres',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.waveTypeGenreRepository
      .createQueryBuilder('waveTypeGenre')
      .where(where)
      .leftJoinAndSelect('waveTypeGenre.waveTypes', 'waveType');

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `waveTypeGenre.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting if none provided
      query = query.orderBy('waveTypeGenre.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply pagination if pagination is defined
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
    const waveTypeGenres = await query.getMany();

    this.logger.info(
      `${waveTypeGenres.length} WaveTypeGenre(s) found in the database`,
      traceId,
      'getManyWaveTypeGenres',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: waveTypeGenres,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchWaveTypeGenres(
    fuzzySearchWaveTypeGenresDto: FuzzySearchWaveTypeGenresDto,
    traceId: string,
  ): Promise<PaginatedWaveTypeGenresResponseDto> {
    const {
      fuzzyName,
      fuzzyDescription,
      fuzzyUpdatedBy,
      name,
      description,
      updatedBy,
      isDeleted,
      pagination,
      sort = [],
    } = fuzzySearchWaveTypeGenresDto;

    // 1) Build base query
    let query = this.waveTypeGenreRepository
      .createQueryBuilder('waveTypeGenre')
      .leftJoinAndSelect('waveTypeGenre.waveTypes', 'waveType');

    // 2) Determine if we need WHERE clauses
    const hasFilters =
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

      // **Fuzzy or Exact Name**
      if (fuzzyName) {
        query.andWhere('waveTypeGenre.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('waveTypeGenre.name = :name', { name });
      }

      // **Fuzzy or Exact Description**
      if (fuzzyDescription) {
        query.andWhere('waveTypeGenre.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('waveTypeGenre.description = :description', {
          description,
        });
      }

      // **Fuzzy or Exact UpdatedBy**
      if (fuzzyUpdatedBy) {
        // Casting updatedBy to text for ILIKE if it's numeric
        query.andWhere(
          'CAST(waveTypeGenre.updatedBy AS text) ILIKE :fuzzyUpdatedBy',
          {
            fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
          },
        );
      } else if (updatedBy) {
        query.andWhere('waveTypeGenre.updatedBy = :updatedBy', { updatedBy });
      }

      // **Exact Filter for isDeleted**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('waveTypeGenre.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `waveTypeGenre.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('waveTypeGenre.createdAt', 'ASC');
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
    const waveTypeGenres = await query.getMany();

    this.logger.info(
      `${waveTypeGenres.length} WaveTypeGenre(s) found matching search criteria`,
      traceId,
      'fuzzySearchWaveTypeGenres',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: waveTypeGenres,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
