import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableDataType } from '../../../entities/evaluation-variable-data-type.entity';

import {
  EvaluationVariableDataTypeDto,
  FuzzySearchEvaluationVariableDataTypesDto,
  GetEvaluationVariableDataTypeDto,
  GetManyEvaluationVariableDataTypesDto,
  PaginatedEvaluationVariableDataTypesResponseDto,
} from 'ez-utils';

@Injectable()
export class EvaluationVariableDataTypeService {
  private logger = getLoggerConfig(EvaluationVariableDataTypeService.name);

  constructor(
    @InjectRepository(EvaluationVariableDataType)
    private readonly evaluationVariableDataTypeRepository: Repository<EvaluationVariableDataType>,
  ) {
    this.logger.debug(
      `${EvaluationVariableDataTypeService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findEvaluationVariableDataType(
    findEvaluationVariableDataTypeDto: GetEvaluationVariableDataTypeDto,
    traceId: string,
  ): Promise<EvaluationVariableDataTypeDto> {
    const { evaluationVariableDataTypeId, name, isDeleted } =
      findEvaluationVariableDataTypeDto;

    if (!evaluationVariableDataTypeId && !name) {
      this.logger.error(
        'At least one parameter (evaluationVariableDataTypeId or name) must be provided',
        traceId,
        'findEvaluationVariableDataType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        'At least one parameter (evaluationVariableDataTypeId or name) must be provided',
      );
    }

    const where = {};
    if (evaluationVariableDataTypeId)
      where['evaluationVariableDataTypeId'] = evaluationVariableDataTypeId;
    if (name) where['name'] = name;
    where['isDeleted'] = isDeleted || false;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findEvaluationVariableDataType',
      LogStreamLevel.ProdStandard,
    );

    const evaluationVariableDataType =
      await this.evaluationVariableDataTypeRepository.findOne({
        where,
        relations: ['evaluationOperators'],
      });

    if (!evaluationVariableDataType) {
      this.logger.error(
        `No evaluation variable data type found with the provided criteria`,
        traceId,
        'findEvaluationVariableDataType',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No evaluation variable data type found with the provided criteria`,
      );
    }

    this.logger.info(
      `Evaluation variable data type found in database`,
      traceId,
      'findEvaluationVariableDataType',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableDataType;
  }

  async getManyEvaluationVariableDataTypes(
    getManyDto: GetManyEvaluationVariableDataTypesDto,
    traceId: string,
  ): Promise<PaginatedEvaluationVariableDataTypesResponseDto> {
    this.logger.debug(
      `getManyEvaluationVariableDataTypes called with parameters: ${JSON.stringify(getManyDto)}`,
      traceId,
      'getManyEvaluationVariableDataTypes',
      LogStreamLevel.DebugLight,
    );

    const {
      name,
      description,
      isDeleted,
      updatedBy,
      pagination,
      sort = [],
    } = getManyDto;

    // 1) Construct the base WHERE conditions for exact matches
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(description && { description }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Constructed WHERE clause: ${JSON.stringify(where)}`,
      traceId,
      'getManyEvaluationVariableDataTypes',
      LogStreamLevel.DebugLight,
    );

    // 2) Build the base query
    let query = this.evaluationVariableDataTypeRepository
      .createQueryBuilder('evdt')
      .where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `evdt.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sort by createdAt ascending
      query = query.orderBy('evdt.createdAt', 'ASC');
    }

    // 4) Get total count for pagination
    const totalCount = await query.getCount();
    this.logger.debug(
      `Total count of records: ${totalCount}`,
      traceId,
      'getManyEvaluationVariableDataTypes',
      LogStreamLevel.DebugLight,
    );

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
      this.logger.debug(
        `Pagination applied - page: ${page}, pageSize: ${pageSize}, maxPages: ${maxPages}`,
        traceId,
        'getManyEvaluationVariableDataTypes',
        LogStreamLevel.DebugLight,
      );
    }

    // 6) Execute query
    const dataTypes = await query.getMany();

    this.logger.info(
      `Found ${dataTypes.length} EvaluationVariableDataTypes`,
      traceId,
      'getManyEvaluationVariableDataTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: dataTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchEvaluationVariableDataTypes(
    fuzzyDto: FuzzySearchEvaluationVariableDataTypesDto,
    traceId: string,
  ): Promise<PaginatedEvaluationVariableDataTypesResponseDto> {
    this.logger.debug(
      `fuzzySearchEvaluationVariableDataTypes called with parameters: ${JSON.stringify(fuzzyDto)}`,
      traceId,
      'fuzzySearchEvaluationVariableDataTypes',
      LogStreamLevel.DebugLight,
    );

    const {
      name,
      description,
      isDeleted,
      updatedBy,
      fuzzyName,
      fuzzyDescription,
      pagination,
      sort = [],
    } = fuzzyDto;

    // 1) Build base query
    let query =
      this.evaluationVariableDataTypeRepository.createQueryBuilder('evdt');

    // 2) Check if we have any filters
    const hasFilters =
      name ||
      description ||
      typeof isDeleted === 'boolean' ||
      updatedBy ||
      fuzzyName ||
      fuzzyDescription;

    if (hasFilters) {
      // Start with a no-op so we can chain AND conditions
      query.where('1 = 1');

      // **Exact matches**:
      if (typeof isDeleted === 'boolean') {
        query.andWhere('evdt.isDeleted = :isDeleted', { isDeleted });
      }
      if (name) {
        query.andWhere('evdt.name = :name', { name });
      }
      if (description) {
        query.andWhere('evdt.description = :description', { description });
      }
      if (updatedBy) {
        query.andWhere('evdt.updatedBy = :updatedBy', { updatedBy });
      }

      // **Fuzzy matches**:
      if (fuzzyName) {
        query.andWhere('evdt.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      }
      if (fuzzyDescription) {
        query.andWhere('evdt.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      }

      this.logger.debug(
        `Filters applied to fuzzy search: ${JSON.stringify({
          name,
          description,
          isDeleted,
          updatedBy,
          fuzzyName,
          fuzzyDescription,
        })}`,
        traceId,
        'fuzzySearchEvaluationVariableDataTypes',
        LogStreamLevel.DebugLight,
      );
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `evdt.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sort by createdAt ascending
      query = query.orderBy('evdt.createdAt', 'ASC');
    }

    // 4) Get total count
    const totalCount = await query.getCount();
    this.logger.debug(
      `Total count of fuzzy search records: ${totalCount}`,
      traceId,
      'fuzzySearchEvaluationVariableDataTypes',
      LogStreamLevel.DebugLight,
    );

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
      this.logger.debug(
        `Pagination applied in fuzzy search - page: ${page}, pageSize: ${pageSize}, maxPages: ${maxPages}`,
        traceId,
        'fuzzySearchEvaluationVariableDataTypes',
        LogStreamLevel.DebugLight,
      );
    }

    // 6) Execute query
    const dataTypes = await query.getMany();

    this.logger.info(
      `Found ${dataTypes.length} EvaluationVariableDataTypes in fuzzy search`,
      traceId,
      'fuzzySearchEvaluationVariableDataTypes',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: dataTypes,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
