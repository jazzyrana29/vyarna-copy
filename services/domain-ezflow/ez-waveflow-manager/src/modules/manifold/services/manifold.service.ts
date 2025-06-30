import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Manifold } from '../../../entities/manifold.entity';
import { Node } from '../../../entities/node.entity';

import {
  CreateManifoldDto,
  DeleteManifoldDto,
  FuzzySearchManifoldsDto,
  GetOneManifoldDto,
  ManifoldDto,
  PaginatedManifoldsResponseDto,
  UpdateManifoldDto,
} from 'ez-utils';

import { ZtrackingManifoldService } from './ztracking-manifold.service';

@Injectable()
export class ManifoldService {
  private logger = getLoggerConfig(ManifoldService.name);

  constructor(
    @InjectRepository(Manifold)
    private readonly manifoldRepository: Repository<Manifold>,
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    private readonly ztrackingManifoldService: ZtrackingManifoldService,
  ) {
    this.logger.debug(
      `${ManifoldService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createManifold(
    createManifoldDto: CreateManifoldDto,
    traceId: string,
  ): Promise<ManifoldDto> {
    const node = await this.nodeRepository.findOneBy({
      nodeId: createManifoldDto.nodeId,
    });
    if (!node) {
      this.logger.error(
        'Node not found',
        traceId,
        'createManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException('Node not found');
    }

    const createdManifold = await this.manifoldRepository.save(
      this.manifoldRepository.create(createManifoldDto),
    );

    node.manifold = createdManifold;
    await this.nodeRepository.save(node);

    this.logger.info(
      `Manifold created with ID: ${createdManifold.manifoldId}`,
      traceId,
      'createManifold',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingManifoldService.createZtrackingForManifold(
        createdManifold,
        traceId,
      )
    )
      return createdManifold;
  }

  async updateManifold(
    updateManifoldDto: UpdateManifoldDto,
    traceId: string,
  ): Promise<ManifoldDto> {
    const manifold = await this.manifoldRepository.findOne({
      where: { manifoldId: updateManifoldDto.manifoldId },
      relations: ['node', 'node.flow'],
    });

    if (!manifold) {
      this.logger.error(
        `No Manifold found with ID: ${updateManifoldDto.manifoldId}`,
        traceId,
        'updateManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Manifold found with ID: ${updateManifoldDto.manifoldId}`,
      );
    }

    // If the associated Node's Flow is published, restrict updates.
    if (manifold.node && manifold.node.flow && manifold.node.flow.isPublished) {
      const allowedFields = [];
      const updateKeys = Object.keys(updateManifoldDto);
      const invalidFields = updateKeys.filter(
        (key) => key !== 'manifoldId' && !allowedFields.includes(key),
      );

      if (invalidFields.length > 0) {
        this.logger.error(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a manifold whose flow is published.`,
          traceId,
          'updateManifold',
          LogStreamLevel.DebugHeavy,
        );
        throw new BadRequestException(
          `Cannot update fields [${invalidFields.join(
            ', ',
          )}] on a manifold whose flow is published.`,
        );
      }
    }

    const updatedManifold = await this.manifoldRepository.save({
      ...manifold,
      ...updateManifoldDto,
    });

    this.logger.info(
      `Manifold with ID: ${updatedManifold.manifoldId} updated`,
      traceId,
      'updateManifold',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingManifoldService.createZtrackingForManifold(
        updatedManifold,
        traceId,
      )
    )
      return updatedManifold;
  }

  async deleteManifold(
    { manifoldId = '', updatedBy = '' }: DeleteManifoldDto,
    traceId: string,
  ): Promise<ManifoldDto> {
    if (!manifoldId || !updatedBy) {
      this.logger.error(
        'You need to provide both manifoldId and updatedBy',
        traceId,
        'deleteManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide both manifoldId and updatedBy',
      );
    }
    const manifold = await this.manifoldRepository.findOne({
      where: { manifoldId },
    });

    if (!manifold) {
      this.logger.error(
        `No Manifold found with ID: ${manifoldId}`,
        traceId,
        'deleteManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Manifold found with ID: ${manifoldId}`);
    }

    manifold.isDeleted = true;
    manifold.updatedBy = updatedBy;
    const deletedManifold = await this.manifoldRepository.save(manifold);

    this.logger.info(
      `Manifold with ID: ${manifoldId} marked as deleted`,
      traceId,
      'deleteManifold',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingManifoldService.createZtrackingForManifold(
        deletedManifold,
        traceId,
      )
    )
      return deletedManifold;
  }

  async getOneManifold(
    { manifoldId = '', name = '', isDeleted = false }: GetOneManifoldDto,
    traceId: string,
  ): Promise<ManifoldDto> {
    if (!manifoldId && !name) {
      this.logger.error(
        'Either provide manifoldId or name',
        traceId,
        'getOneManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Either provide manifoldId or name');
    }

    const where: FindOptionsWhere<Manifold> = {};
    if (name) where.name = name;
    if (manifoldId) where.manifoldId = manifoldId;
    where.isDeleted = isDeleted;
    const manifold = await this.manifoldRepository.findOne({
      where,
      relations: [
        'filters',
        'filters.nodeExit',
        'filters.filterSubsets',
        'filters.filterSubsets.filterSubsetItems',
        'filters.filterSubsets.filterSubsetItems.evaluationVariable',
        'filters.filterSubsets.filterSubsetItems.evaluationVariable.evaluationVariableDataType',
        'filters.filterSubsets.filterSubsetItems.evaluationOperator',
      ],
    });

    if (!manifold) {
      this.logger.error(
        `No Manifold found with ID: ${manifoldId} or name: ${name}`,
        traceId,
        'getOneManifold',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Manifold found with ID: ${manifoldId} or name: ${name}`,
      );
    }

    this.logger.info(
      `Manifold found with ID: ${manifold.manifoldId}`,
      traceId,
      'getOneManifold',
      LogStreamLevel.ProdStandard,
    );

    return manifold;
  }

  async fuzzySearchManifolds(
    fuzzySearchManifoldsDto: FuzzySearchManifoldsDto,
    traceId: string,
  ): Promise<PaginatedManifoldsResponseDto> {
    const {
      // Fuzzy filters
      fuzzyName,
      fuzzyDescription,
      fuzzyExecutionStyle,
      fuzzyUpdatedBy,

      // Exact filters
      name,
      description,
      executionStyle,
      updatedBy,
      nodeId,
      isDeleted,

      // Pagination & Sorting
      pagination,
      sort = [],
    } = fuzzySearchManifoldsDto;

    // 1) Build base query
    let query = this.manifoldRepository
      .createQueryBuilder('manifold')
      .leftJoin('manifold.node', 'node');

    // 2) Apply filters only if at least one is provided
    const hasFilters =
      fuzzyName ||
      fuzzyDescription ||
      fuzzyExecutionStyle ||
      fuzzyUpdatedBy ||
      name ||
      description ||
      executionStyle ||
      updatedBy ||
      nodeId ||
      typeof isDeleted === 'boolean';

    if (hasFilters) {
      // Allows dynamic AND conditions
      query.where('1 = 1');

      // --- Fuzzy Name ---
      if (fuzzyName) {
        query.andWhere('manifold.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('manifold.name = :name', { name });
      }

      // --- Fuzzy Description ---
      if (fuzzyDescription) {
        query.andWhere('manifold.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('manifold.description = :description', { description });
      }

      // --- Fuzzy Execution Style ---
      if (fuzzyExecutionStyle) {
        query.andWhere('manifold.executionStyle ILIKE :fuzzyExecutionStyle', {
          fuzzyExecutionStyle: `%${fuzzyExecutionStyle}%`,
        });
      } else if (executionStyle) {
        query.andWhere('manifold.executionStyle = :executionStyle', {
          executionStyle,
        });
      }

      // --- Fuzzy UpdatedBy ---
      if (fuzzyUpdatedBy) {
        query.andWhere(
          'CAST(manifold.updatedBy AS text) ILIKE :fuzzyUpdatedBy',
          {
            fuzzyUpdatedBy: `%${fuzzyUpdatedBy}%`,
          },
        );
      } else if (updatedBy) {
        query.andWhere('manifold.updatedBy = :updatedBy', { updatedBy });
      }

      // --- Exact nodeId ---
      if (nodeId) {
        // You could also filter by "node.nodeId" if desired
        query.andWhere('manifold.nodeId = :nodeId', { nodeId });
      }

      // --- isDeleted ---
      if (typeof isDeleted === 'boolean') {
        query.andWhere('manifold.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply Sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        if (index === 0) {
          query = query.orderBy(`manifold.${s.by}`, s.order);
        } else {
          query = query.addOrderBy(`manifold.${s.by}`, s.order);
        }
      });
    } else {
      // Default sorting
      query = query.orderBy('manifold.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination)
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

    // 6) Execute the query
    const manifolds = await query.getMany();

    this.logger.info(
      `${manifolds.length} Manifold(s) found matching search criteria`,
      traceId,
      'fuzzySearchManifolds',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: manifolds,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
