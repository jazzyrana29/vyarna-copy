import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeExitType } from '../../../entities/node-exit-type.entity';

import {
  GetNodeExitTypeDto,
  GetManyNodeExitTypesDto,
  NodeExitTypeDto,
  FuzzySearchNodeExitTypesDto,
  PaginatedNodeExitTypesResponseDto,
} from 'ez-utils';

@Injectable()
export class NodeExitTypeService {
  private logger = getLoggerConfig(NodeExitTypeService.name);

  constructor(
    @InjectRepository(NodeExitType)
    private readonly nodeExitTypeRepository: Repository<NodeExitType>,
  ) {
    this.logger.debug(
      `${NodeExitTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findNodeExitType(
    getNodeExitTypeDto: GetNodeExitTypeDto,
    traceId: string,
  ): Promise<NodeExitTypeDto> {
    const { nodeExitTypeId, name } = getNodeExitTypeDto;
    if (!nodeExitTypeId && !name) {
      this.logger.error(
        'At least one parameter (nodeExitTypeId or name) must be provided',
        traceId,
        'findNodeExitType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'At least one parameter (nodeExitTypeId or name) must be provided',
      );
    }

    const where: Record<string, any> = {};
    if (nodeExitTypeId) where['nodeExitTypeId'] = nodeExitTypeId;
    if (name) where['name'] = name;
    where['isDeleted'] = false;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findNodeExitType',
      LogStreamLevel.ProdStandard,
    );

    const nodeExitType = await this.nodeExitTypeRepository.findOne({
      where,
    });

    if (!nodeExitType) {
      this.logger.error(
        `No node exit type found with the provided criteria`,
        traceId,
        'findNodeExitType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No node exit type found with the provided criteria`,
      );
    }

    this.logger.info(
      `Node exit type found in database`,
      traceId,
      'findNodeExitType',
      LogStreamLevel.ProdStandard,
    );

    return nodeExitType;
  }

  async getManyNodeExitType(
    getManyNodeExitTypesDto: GetManyNodeExitTypesDto,
    traceId: string,
  ): Promise<PaginatedNodeExitTypesResponseDto> {
    const {
      isDeleted,
      name,
      description,
      updatedBy,
      pagination,
      sort = [],
    } = getManyNodeExitTypesDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(description && { description }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'getManyNodeExitType',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.nodeExitTypeRepository
      .createQueryBuilder('nodeExitType')
      .where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `nodeExitType.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting if none provided
      query = query.orderBy('nodeExitType.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply pagination if pagination is defined (not null)
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
    const nodeExitTypes = await query.getMany();

    this.logger.info(
      `${nodeExitTypes.length} NodeExitType(s) found in the database`,
      traceId,
      'getManyNodeExitType',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: nodeExitTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchNodeExitType(
    fuzzySearchNodeExitTypesDto: FuzzySearchNodeExitTypesDto,
    traceId: string,
  ): Promise<PaginatedNodeExitTypesResponseDto> {
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
    } = fuzzySearchNodeExitTypesDto;

    // 1) Build base query
    let query = this.nodeExitTypeRepository.createQueryBuilder('nodeExitType');

    // 2) Apply filters only if at least one is provided
    //    We'll use a dynamic WHERE to incorporate both fuzzy and exact matches
    const hasFilters =
      fuzzyName ||
      fuzzyDescription ||
      fuzzyUpdatedBy ||
      name ||
      description ||
      updatedBy ||
      typeof isDeleted === 'boolean';

    if (hasFilters) {
      // Start with a no-op condition so we can safely add AND conditions
      query.where('1 = 1');

      // **Fuzzy Search (Priority)**
      if (fuzzyName) {
        query.andWhere('nodeExitType.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('nodeExitType.name = :name', { name });
      }

      if (fuzzyDescription) {
        query.andWhere('nodeExitType.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('nodeExitType.description = :description', {
          description,
        });
      }

      if (fuzzyUpdatedBy) {
        // Because updatedBy might be a number in DB, cast to text for ILIKE
        query.andWhere(
          'CAST(nodeExitType.updatedBy AS text) ILIKE :fuzzyUpdatedBy',
          {
            fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
          },
        );
      } else if (updatedBy) {
        query.andWhere('nodeExitType.updatedBy = :updatedBy', {
          updatedBy,
        });
      }

      // **Exact Filters**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('nodeExitType.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply Sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        if (index === 0) {
          query = query.orderBy(`nodeExitType.${s.by}`, s.order);
        } else {
          query = query.addOrderBy(`nodeExitType.${s.by}`, s.order);
        }
      });
    } else {
      query = query.orderBy('nodeExitType.createdAt', 'ASC'); // Default sorting
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();

    // 5) Apply Pagination if defined
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
    const nodeExitTypes = await query.getMany();

    this.logger.info(
      `${nodeExitTypes.length} NodeExitType(s) found matching search criteria`,
      traceId,
      'fuzzySearchNodeExitType',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: nodeExitTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
