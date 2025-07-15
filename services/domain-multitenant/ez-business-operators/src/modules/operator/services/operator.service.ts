import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingOperatorService } from './ztracking-operator.service';
import { LogStreamLevel } from 'ez-logger';

import { getLoggerConfig } from '../../../utils/common';
import { Operator } from '../../../entities/operator.entity';

import {
  CreateOperatorDto,
  GetManyOperatorsDto,
  GetOperatorDto,
  OperatorDto,
  PaginatedOperatorsResponseDto,
  UpdateOperatorDto,
} from 'ez-utils';
import { BusinessUnit } from '../../../entities/business-unit.entity';

@Injectable()
export class OperatorService {
  private logger = getLoggerConfig(OperatorService.name);

  constructor(
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
    @InjectRepository(BusinessUnit)
    private readonly businessUnitRepository: Repository<BusinessUnit>,
    private readonly ztrackingOperatorService: ZtrackingOperatorService,
  ) {
    this.logger.debug(
      `${OperatorService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOperator(
    createOperatorDto: CreateOperatorDto,
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `createOperatorDto : ${JSON.stringify(createOperatorDto)}`,
      traceId,
      'createOperator',
      LogStreamLevel.ProdStandard,
    );

    let rootBusinessUnit = await this.businessUnitRepository.findOne({
      where: { businessUnitId: createOperatorDto.businessUnitId },
    });
    while (rootBusinessUnit.parentBusinessUnitId) {
      rootBusinessUnit = await this.businessUnitRepository.findOne({
        where: { businessUnitId: rootBusinessUnit.parentBusinessUnitId },
      });
    }

    const conflictUser = await this.operatorRepository.findOne({
      where: {
        username: createOperatorDto.username,
        rootBusinessUnitId: rootBusinessUnit.businessUnitId,
      },
    });
    if (conflictUser) {
      throw new BadRequestException(
        `Username "${createOperatorDto.username}" already exists in the root business unit "${rootBusinessUnit.businessUnitId}"`,
      );
    }

    const conflictEmail = await this.operatorRepository.findOne({
      where: { email: createOperatorDto.email },
    });
    if (conflictEmail) {
      throw new BadRequestException(
        `Email "${createOperatorDto.email}" is already in use`,
      );
    }

    const operator = await this.operatorRepository.save(
      this.operatorRepository.create({
        ...createOperatorDto,
        rootBusinessUnitId: rootBusinessUnit.businessUnitId,
      }),
    );

    this.logger.info(
      `operator entity saved in database`,
      traceId,
      'createOperator',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingOperatorService.createZtrackingOperatorEntity(
        operator,
        traceId,
      )
    )
      return operator;
  }

  async updateOperatorUnit(
    updateOperatorDto: UpdateOperatorDto,
    traceId: string,
  ): Promise<any> {
    const operator = await this.operatorRepository.findOne({
      where: { operatorId: updateOperatorDto.operatorId },
    });

    if (!operator) {
      throw new NotFoundException(
        `no operator existed with this id => ${updateOperatorDto.operatorId}`,
      );
    }
    const updatedOperator =
      await this.operatorRepository.save(updateOperatorDto);

    this.logger.info(
      `operator entity updated in database`,
      traceId,
      'updateOperator',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingOperatorService.createZtrackingOperatorEntity(
        updatedOperator,
        traceId,
      )
    )
      return updatedOperator;
  }

  async findOperator(
    { operatorId = '', nameFirst = '', isDeleted = false }: GetOperatorDto,
    traceId: string,
  ): Promise<Operator> {
    if (!operatorId && !nameFirst) {
      throw new NotFoundException(
        'At least one parameter (operatorId or nameFirst) must be provided',
      );
    }

    const where = {};
    if (operatorId) where['operatorId'] = operatorId;
    if (nameFirst) where['nameFirst'] = nameFirst;
    where['isDeleted'] = isDeleted;

    const operator = await this.operatorRepository.findOne({
      where,
    });

    if (!operator) {
      throw new NotFoundException(
        `No operator found with the provided criteria`,
      );
    }

    this.logger.info(
      `Operator entity found in database`,
      traceId,
      'findOperator',
      LogStreamLevel.ProdStandard,
    );

    return operator;
  }

  async getManyOperators(
    getManyOperatorsDto: GetManyOperatorsDto,
    traceId: string,
  ): Promise<PaginatedOperatorsResponseDto> {
    const {
      username,
      nameFirst,
      nameMiddle,
      nameLast,
      email,
      businessUnitId,
      rootBusinessUnitId,
      isDeleted,
      updatedBy,
      pagination,
      sort = [],
    } = getManyOperatorsDto;

    // 1) Build dynamic WHERE filters
    const where: Record<string, any> = {
      ...(username && { username }),
      ...(nameFirst && { nameFirst }),
      ...(nameMiddle && { nameMiddle }),
      ...(nameLast && { nameLast }),
      ...(email && { email }),
      ...(businessUnitId && { businessUnitId }),
      ...(rootBusinessUnitId && { rootBusinessUnitId }),
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyOperators: ${JSON.stringify(where)}`,
      traceId,
      'getManyOperators',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base QueryBuilder and join relations
    let query = this.operatorRepository
      .createQueryBuilder('operator')
      .where(where)
      .leftJoinAndSelect('operator.businessUnit', 'businessUnit')
      .leftJoinAndSelect('operator.rootBusinessUnit', 'rootBusinessUnit');

    // 3) Apply sorting (or default by creation date)
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, idx) => {
        const field = `operator.${s.by}`;
        if (idx === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      query = query.orderBy('operator.createdAt', 'ASC');
    }

    // 4) Get total count for pagination
    const totalCount = await query.getCount();

    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    // 5) Apply pagination if requested
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
    const operators = await query.getMany();
    this.logger.info(
      `${operators.length} operator(s) found`,
      traceId,
      'getManyOperators',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination & sorting response
    return {
      data: operators as OperatorDto[],
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
