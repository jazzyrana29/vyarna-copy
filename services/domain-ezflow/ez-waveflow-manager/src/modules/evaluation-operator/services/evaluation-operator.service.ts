import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  EvaluationOperatorDto,
  FuzzySearchEvaluationOperatorsDto,
  GetManyEvaluationOperatorsDto,
  GetOneEvaluationOperatorDto,
  PaginatedEvaluationOperatorsResponseDto,
} from 'ez-utils';

import { EvaluationOperator } from '../../../entities/evaluation-operator.entity';

@Injectable()
export class EvaluationOperatorService {
  private logger = getLoggerConfig(EvaluationOperatorService.name);

  constructor(
    @InjectRepository(EvaluationOperator)
    private readonly evaluationOperatorRepository: Repository<EvaluationOperator>,
  ) {
    this.logger.debug(
      `${EvaluationOperatorService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneEvaluationOperator(
    {
      evaluationOperatorId = '',
      name = '',
      isDeleted = false,
    }: GetOneEvaluationOperatorDto,
    traceId: string,
  ): Promise<EvaluationOperatorDto> {
    if (!evaluationOperatorId && !name) {
      this.logger.error(
        'Either provide evaluationOperatorId or name',
        traceId,
        'getOneEvaluationOperator',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Either provide evaluationOperatorId or name',
      );
    }

    const where: FindOptionsWhere<EvaluationOperator> = {};
    if (name) where.name = name;
    if (evaluationOperatorId) where.evaluationOperatorId = evaluationOperatorId;
    where.isDeleted = isDeleted;
    const evaluationOperator = await this.evaluationOperatorRepository.findOne({
      where,
      relations: ['evaluationVariableDataTypes'],
    });

    if (!evaluationOperator) {
      this.logger.error(
        `No EvaluationOperator found with ID: ${evaluationOperatorId} or name: ${name}`,
        traceId,
        'getOneEvaluationOperator',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationOperator found with ID: ${evaluationOperatorId} or name: ${name}`,
      );
    }

    this.logger.info(
      `EvaluationOperator found with ID: ${evaluationOperator.evaluationOperatorId}`,
      traceId,
      'getOneEvaluationOperator',
      LogStreamLevel.ProdStandard,
    );

    return evaluationOperator;
  }

  async getManyEvaluationOperators(
    getManyDto: GetManyEvaluationOperatorsDto,
    traceId: string,
  ): Promise<PaginatedEvaluationOperatorsResponseDto> {
    this.logger.debug(
      `getManyEvaluationOperators called with parameters: ${JSON.stringify(getManyDto)}`,
      traceId,
      'getManyEvaluationOperators',
      LogStreamLevel.DebugLight,
    );

    const {
      name,
      symbol,
      description,
      choiceType,
      isDeleted,
      updatedBy,
      evaluationVariableDataTypeId,
      pagination,
      sort = [],
    } = getManyDto;

    // 1) Construct base WHERE conditions for exact matches.
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(symbol && { symbol }),
      ...(description && { description }),
      ...(choiceType && { choiceType }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Constructed WHERE clause: ${JSON.stringify(where)}`,
      traceId,
      'getManyEvaluationOperators',
      LogStreamLevel.DebugLight,
    );

    // 2) Build base query
    let query = this.evaluationOperatorRepository
      .createQueryBuilder('eo')
      .where(where);

    if (evaluationVariableDataTypeId) {
      query = query
        .leftJoin('eo.evaluationVariableDataTypes', 'dt')
        .andWhere(
          'dt.evaluationVariableDataTypeId = :evaluationVariableDataTypeId',
          {
            evaluationVariableDataTypeId,
          },
        );
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `eo.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting by createdAt ascending
      query = query.orderBy('eo.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination calculation)
    const totalCount = await query.getCount();
    this.logger.debug(
      `Total count of EvaluationOperators: ${totalCount}`,
      traceId,
      'getManyEvaluationOperators',
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
        'getManyEvaluationOperators',
        LogStreamLevel.DebugLight,
      );
    }

    // 6) Execute query
    const operators = await query.getMany();

    this.logger.info(
      `Found ${operators.length} EvaluationOperators`,
      traceId,
      'getManyEvaluationOperators',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: operators,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchEvaluationOperators(
    fuzzyDto: FuzzySearchEvaluationOperatorsDto,
    traceId: string,
  ): Promise<PaginatedEvaluationOperatorsResponseDto> {
    this.logger.debug(
      `fuzzySearchEvaluationOperators called with parameters: ${JSON.stringify(fuzzyDto)}`,
      traceId,
      'fuzzySearchEvaluationOperators',
      LogStreamLevel.DebugLight,
    );

    const {
      name,
      symbol,
      description,
      choiceType,
      isDeleted,
      updatedBy,
      fuzzyName,
      fuzzySymbol,
      fuzzyDescription,
      evaluationVariableDataTypeId,
      pagination,
      sort = [],
    } = fuzzyDto;

    // 1) Build base query
    let query = this.evaluationOperatorRepository.createQueryBuilder('eo');

    // 2) Determine if we have any filters
    const hasFilters =
      name ||
      symbol ||
      description ||
      choiceType ||
      typeof isDeleted === 'boolean' ||
      updatedBy ||
      fuzzyName ||
      fuzzySymbol ||
      fuzzyDescription;

    if (hasFilters) {
      // Start with a no-op so we can safely append .andWhere() calls
      query.where('1 = 1');

      // **Exact matches**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('eo.isDeleted = :isDeleted', { isDeleted });
      }
      if (name) {
        query.andWhere('eo.name = :name', { name });
      }
      if (symbol) {
        query.andWhere('eo.symbol = :symbol', { symbol });
      }
      if (description) {
        query.andWhere('eo.description = :description', { description });
      }
      if (choiceType) {
        query.andWhere('eo.choiceType = :choiceType', { choiceType });
      }
      if (updatedBy) {
        query.andWhere('eo.updatedBy = :updatedBy', { updatedBy });
      }

      // **Fuzzy matches** (using ILIKE for PostgreSQL)
      if (fuzzyName) {
        query.andWhere('eo.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      }
      if (fuzzySymbol) {
        query.andWhere('eo.symbol ILIKE :fuzzySymbol', {
          fuzzySymbol: `%${fuzzySymbol}%`,
        });
      }
      if (fuzzyDescription) {
        query.andWhere('eo.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      }

      if (evaluationVariableDataTypeId) {
        query
          .leftJoin('eo.evaluationVariableDataTypes', 'dt')
          .andWhere(
            'dt.evaluationVariableDataTypeId = :evaluationVariableDataTypeId',
            {
              evaluationVariableDataTypeId,
            },
          );
      }

      this.logger.debug(
        `Filters applied in fuzzy search: ${JSON.stringify({
          name,
          symbol,
          description,
          choiceType,
          isDeleted,
          updatedBy,
          fuzzyName,
          fuzzySymbol,
          fuzzyDescription,
          evaluationVariableDataTypeId,
        })}`,
        traceId,
        'fuzzySearchEvaluationOperators',
        LogStreamLevel.DebugLight,
      );
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `eo.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting by createdAt ascending
      query = query.orderBy('eo.createdAt', 'ASC');
    }

    // 4) Get total count
    const totalCount = await query.getCount();
    this.logger.debug(
      `Total count of fuzzy search EvaluationOperators: ${totalCount}`,
      traceId,
      'fuzzySearchEvaluationOperators',
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
        'fuzzySearchEvaluationOperators',
        LogStreamLevel.DebugLight,
      );
    }

    // 6) Execute query
    const operators = await query.getMany();

    this.logger.info(
      `Found ${operators.length} EvaluationOperators in fuzzy search`,
      traceId,
      'fuzzySearchEvaluationOperators',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: operators,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
