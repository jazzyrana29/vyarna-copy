import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariable } from '../../../entities/evaluation-variable.entity';

import {
  CreateEvaluationVariableDto,
  UpdateEvaluationVariableDto,
  GetOneEvaluationVariableDto,
  GetManyEvaluationVariablesDto,
  DeleteEvaluationVariableDto,
  EvaluationVariableDto,
  PaginatedEvaluationVariablesResponseDto,
  FuzzySearchEvaluationVariablesDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariableService } from './ztracking-evaluation-variable.service';

@Injectable()
export class EvaluationVariableService {
  private logger = getLoggerConfig(EvaluationVariableService.name);

  constructor(
    @InjectRepository(EvaluationVariable)
    private readonly evaluationVariableRepository: Repository<EvaluationVariable>,
    private readonly ztrackingEvaluationVariableService: ZtrackingEvaluationVariableService, // Injecting ZtrackingEvaluationVariableService
  ) {
    this.logger.debug(
      `${EvaluationVariableService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariable(
    createEvaluationVariableDto: CreateEvaluationVariableDto,
    traceId: string,
  ): Promise<EvaluationVariableDto> {
    const {
      name,
      description,
      evaluationVariableDataTypeId,
      evaluationValueOptions,
    } = createEvaluationVariableDto;
    const evaluationVariable = this.evaluationVariableRepository.create({
      name,
      description,
      evaluationVariableDataTypeId,
      evaluationValueOptions,
    });

    await this.evaluationVariableRepository.save(evaluationVariable);

    this.logger.info(
      `EvaluationVariable created with ID: ${evaluationVariable.evaluationVariableId}`,
      traceId,
      'createEvaluationVariable',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingEvaluationVariableService.createZtrackingEvaluationVariableEntity(
        evaluationVariable,
        traceId,
      )
    )
      return evaluationVariable;
  }

  async updateEvaluationVariable(
    updateEvaluationVariableDto: UpdateEvaluationVariableDto,
    traceId: string,
  ): Promise<EvaluationVariableDto> {
    const {
      evaluationVariableId,
      name,
      description,
      evaluationVariableDataTypeId,
      evaluationValueOptions,
    } = updateEvaluationVariableDto;

    const evaluationVariable = await this.evaluationVariableRepository.findOne({
      where: {
        evaluationVariableId: updateEvaluationVariableDto.evaluationVariableId,
      },
    });

    if (!evaluationVariable) {
      this.logger.error(
        `No EvaluationVariable found with ID: ${evaluationVariableId}`,
        traceId,
        'updateEvaluationVariable',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariable found with ID: ${evaluationVariableId}`,
      );
    }

    evaluationVariable.name = name;
    evaluationVariable.description = description;
    evaluationVariable.evaluationValueOptions = evaluationValueOptions;
    evaluationVariable.evaluationVariableDataType = {
      evaluationVariableDataTypeId,
    } as any;

    const updatedEvaluationVariable =
      await this.evaluationVariableRepository.save({
        ...evaluationVariable,
        ...updateEvaluationVariableDto,
      });

    this.logger.info(
      `EvaluationVariable with ID: ${evaluationVariableId} updated`,
      traceId,
      'updateEvaluationVariable',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingEvaluationVariableService.createZtrackingEvaluationVariableEntity(
        updatedEvaluationVariable,
        traceId,
      )
    )
      return updatedEvaluationVariable;
  }

  async deleteEvaluationVariable(
    deleteEvaluationVariableDto: DeleteEvaluationVariableDto,
    traceId: string,
  ): Promise<EvaluationVariableDto> {
    const { evaluationVariableId } = deleteEvaluationVariableDto;
    const evaluationVariable = await this.evaluationVariableRepository.findOne({
      where: { evaluationVariableId },
    });

    if (!evaluationVariable) {
      this.logger.error(
        `No EvaluationVariable found with ID: ${evaluationVariableId}`,
        traceId,
        'deleteEvaluationVariable',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariable found with ID: ${evaluationVariableId}`,
      );
    }

    evaluationVariable.isDeleted = true;

    const deleteEvaluationVariable =
      await this.evaluationVariableRepository.save(evaluationVariable);

    this.logger.info(
      `EvaluationVariable with ID: ${evaluationVariableId} marked as deleted`,
      traceId,
      'deleteEvaluationVariable',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    await this.ztrackingEvaluationVariableService.createZtrackingEvaluationVariableEntity(
      evaluationVariable,
      traceId,
    );
    return deleteEvaluationVariable;
  }

  async getOneEvaluationVariable(
    getOneEvaluationVariableDto: GetOneEvaluationVariableDto,
    traceId: string,
  ): Promise<EvaluationVariableDto> {
    const { evaluationVariableId, name } = getOneEvaluationVariableDto;

    if (!evaluationVariableId && !name) {
      this.logger.error(
        'Either provide evaluationVariableId or name',
        traceId,
        'getOneEvaluationVariable',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Either provide evaluationVariableId or name',
      );
    }

    const condition: FindOptionsWhere<EvaluationVariable> = {};
    if (name) condition.name = name;
    if (evaluationVariableId)
      condition.evaluationVariableId = evaluationVariableId;

    const evaluationVariable = await this.evaluationVariableRepository.findOne({
      where: condition,
      relations: [
        'evaluationVariableDataType',
        'evaluationVariableDataType.evaluationOperators',
      ],
    });

    if (!evaluationVariable) {
      this.logger.error(
        `No EvaluationVariable found with ID: ${evaluationVariableId} or name: ${name}`,
        traceId,
        'getOneEvaluationVariable',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariable found with ID: ${evaluationVariableId} or name: ${name}`,
      );
    }

    this.logger.info(
      `EvaluationVariable found with ID: ${evaluationVariable.evaluationVariableId}`,
      traceId,
      'getOneEvaluationVariable',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariable;
  }

  async getManyEvaluationVariables(
    getManyEvaluationVariablesDto: GetManyEvaluationVariablesDto,
    traceId: string,
  ): Promise<PaginatedEvaluationVariablesResponseDto> {
    const {
      evaluationVariableDataTypeId,
      isDeleted,
      name,
      description,
      pagination,
      sort = [],
    } = getManyEvaluationVariablesDto;

    // 1) Construct the base WHERE conditions
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(name && { name }),
      ...(description && { description }),
      ...(evaluationVariableDataTypeId && {
        evaluationVariableDataTypeId,
      }),
    };

    this.logger.debug(
      `Filters for getManyEvaluationVariables: ${JSON.stringify(where)}`,
      traceId,
      'getManyEvaluationVariables',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.evaluationVariableRepository
      .createQueryBuilder('ev')
      .leftJoinAndSelect('ev.evaluationVariableDataType', 'dataType')
      .leftJoinAndSelect('dataType.evaluationOperators', 'operators')
      .where(where);

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `ev.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting (by creation date ascending)
      query = query.orderBy('ev.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination)
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
    const evaluationVariables = await query.getMany();

    this.logger.info(
      `${evaluationVariables.length} EvaluationVariable(s) found in the database`,
      traceId,
      'getManyEvaluationVariables',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: evaluationVariables,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async fuzzySearchEvaluationVariables(
    fuzzySearchEvaluationVariablesDto: FuzzySearchEvaluationVariablesDto,
    traceId: string,
  ): Promise<PaginatedEvaluationVariablesResponseDto> {
    const {
      evaluationVariableDataTypeId,
      fuzzyName,
      fuzzyDescription,
      name,
      description,
      isDeleted,
      pagination,
      sort = [],
    } = fuzzySearchEvaluationVariablesDto;

    // 1) Build base query
    let query = this.evaluationVariableRepository
      .createQueryBuilder('ev')
      .leftJoinAndSelect('ev.evaluationVariableDataType', 'dataType')
      .leftJoinAndSelect('dataType.evaluationOperators', 'operators');

    // 2) Determine if we need WHERE clauses
    const hasFilters =
      evaluationVariableDataTypeId ||
      fuzzyName ||
      fuzzyDescription ||
      name ||
      description ||
      typeof isDeleted === 'boolean';

    if (hasFilters) {
      // Start with a no-op condition so we can append "AND" conditions
      query.where('1 = 1');

      // **Exact filter for evaluationVariableDataTypeId**
      if (evaluationVariableDataTypeId) {
        query.andWhere(
          'ev.evaluationVariableDataTypeId = :evaluationVariableDataTypeId',
          {
            evaluationVariableDataTypeId,
          },
        );
      }

      // **Fuzzy or Exact Name**
      if (fuzzyName) {
        query.andWhere('ev.name ILIKE :fuzzyName', {
          fuzzyName: `%${fuzzyName}%`,
        });
      } else if (name) {
        query.andWhere('ev.name = :name', { name });
      }

      // **Fuzzy or Exact Description**
      if (fuzzyDescription) {
        query.andWhere('ev.description ILIKE :fuzzyDescription', {
          fuzzyDescription: `%${fuzzyDescription}%`,
        });
      } else if (description) {
        query.andWhere('ev.description = :description', { description });
      }

      // **Exact Filter for isDeleted**
      if (typeof isDeleted === 'boolean') {
        query.andWhere('ev.isDeleted = :isDeleted', { isDeleted });
      }
    }

    // 3) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `ev.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting (by createdAt ascending)
      query = query.orderBy('ev.createdAt', 'ASC');
    }

    // 4) Get total count (for pagination)
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
    const evaluationVariables = await query.getMany();

    this.logger.info(
      `${evaluationVariables.length} EvaluationVariable(s) found matching search criteria`,
      traceId,
      'fuzzySearchEvaluationVariables',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination response
    return {
      data: evaluationVariables,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
