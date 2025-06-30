import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { NodeType } from '../../../entities/node-type.entity';

import {
  GetManyNodeTypesDto,
  GetOneNodeTypeDto,
  NodeTypeDto,
  FuzzySearchNodeTypesDto,
  PaginatedNodeTypesResponseDto,
} from 'ez-utils';

@Injectable()
export class NodeTypeService {
  private logger = getLoggerConfig(NodeTypeService.name);

  constructor(
    @InjectRepository(NodeType)
    private readonly nodeTypeRepository: Repository<NodeType>,
  ) {
    this.logger.debug(
      `${NodeTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneNodeType(
    { nodeTypeId = '', name = '' }: GetOneNodeTypeDto,
    traceId: string,
  ): Promise<NodeTypeDto> {
    if (!nodeTypeId && !name) {
      this.logger.error(
        'Either provide nodeTypeId or name',
        traceId,
        'getOneNodeType',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide nodeTypeId or name');
    }

    const where: FindOptionsWhere<NodeType> = {};
    if (name) where.name = name;
    if (nodeTypeId) where.nodeTypeId = nodeTypeId;
    where.isDeleted = false;
    const nodeType = await this.nodeTypeRepository.findOne({ where });

    if (!nodeType) {
      this.logger.error(
        `No NodeType found with ID: ${nodeTypeId} or name: ${name}`,
        traceId,
        'getOneNodeType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No NodeType found with ID: ${nodeTypeId} or name: ${name}`,
      );
    }

    this.logger.info(
      `NodeType found with ID: ${nodeType.nodeTypeId}`,
      traceId,
      'getOneNodeType',
      LogStreamLevel.ProdStandard,
    );
    return nodeType;
  }

  async getManyNodeTypes(
    getManyNodeTypesDto: GetManyNodeTypesDto,
    traceId: string,
  ): Promise<PaginatedNodeTypesResponseDto> {
    const {
      isDeleted,
      name,
      description,
      updatedBy,
      pagination,
      sort = [],
    } = getManyNodeTypesDto;

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
      'getManyNodeTypes',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.nodeTypeRepository
      .createQueryBuilder('nodeType')
      .where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `nodeType.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting if none provided
      query = query.orderBy('nodeType.createdAt', 'ASC');
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
    const nodeTypes = await query.getMany();

    this.logger.info(
      `${nodeTypes.length} NodeType(s) found in the database`,
      traceId,
      'getManyNodeTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: nodeTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchNodeTypes(
    fuzzySearchNodeTypesDto: FuzzySearchNodeTypesDto,
    traceId: string,
  ): Promise<PaginatedNodeTypesResponseDto> {
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
    } = fuzzySearchNodeTypesDto;

    // 1) Build base query
    let query = this.nodeTypeRepository.createQueryBuilder('nodeType');

    // 2) Decide whether we need to add any conditions at all
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

      // **Fuzzy Name or Exact Name**
      if (fuzzyName) {
        query.andWhere('nodeType.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('nodeType.name = :name', { name });
      }

      // **Fuzzy Description or Exact Description**
      if (fuzzyDescription) {
        query.andWhere('nodeType.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('nodeType.description = :description', { description });
      }

      // **Fuzzy UpdatedBy or Exact UpdatedBy**
      if (fuzzyUpdatedBy) {
        // Casting to text ensures a safe ILIKE against numeric fields
        query.andWhere(
          'CAST(nodeType.updatedBy AS text) ILIKE :fuzzyUpdatedBy',
          {
            fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
          },
        );
      } else if (updatedBy) {
        query.andWhere('nodeType.updatedBy = :updatedBy', { updatedBy });
      }

      // **Exact Filter for isDeleted**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('nodeType.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply Sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `nodeType.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('nodeType.createdAt', 'ASC');
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
    const nodeTypes = await query.getMany();

    this.logger.info(
      `${nodeTypes.length} NodeType(s) found matching search criteria`,
      traceId,
      'fuzzySearchNodeTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: nodeTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
