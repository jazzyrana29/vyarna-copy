import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessUnit } from '../../../entities/business-unit.entity';
import { ZtrackingBusinessUnitService } from './ztracking-business-unit.service';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  BusinessUnitDto,
  CreateBusinessUnitDto,
  GetBusinessUnitDto,
  GetManyBusinessUnitsDto,
  PaginatedBusinessUnitResponseDto,
  UpdateBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class BusinessUnitService {
  private logger = getLoggerConfig(BusinessUnitService.name);

  constructor(
    @InjectRepository(BusinessUnit)
    private readonly businessUnitRepository: Repository<BusinessUnit>,
    private readonly ztrackingBusinessUnitService: ZtrackingBusinessUnitService,
  ) {
    this.logger.debug(
      `${BusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createBusinessUnit(
    createBusinessUnitDto: CreateBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    this.logger.log(
      `createBusinessUnitDto : ${JSON.stringify(createBusinessUnitDto)}`,
      traceId,
      'createBusinessUnit',
      LogStreamLevel.ProdStandard,
    );
    const businessUnit = await this.businessUnitRepository.save(
      this.businessUnitRepository.create(createBusinessUnitDto),
    );

    this.logger.info(
      `business unit entity saved in database`,
      traceId,
      'createBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity(
        businessUnit,
        traceId,
      )
    )
      return businessUnit;
  }

  async updateBusinessUnit(
    updateBusinessUnitDto: UpdateBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    const businessUnit = await this.businessUnitRepository.findOne({
      where: { businessUnitId: updateBusinessUnitDto.businessUnitId },
    });

    if (!businessUnit) {
      throw new NotFoundException(
        `no business unit existed with this id => ${updateBusinessUnitDto.businessUnitId}`,
      );
    }
    const updatedBusinessUnit = await this.businessUnitRepository.save(
      updateBusinessUnitDto,
    );

    this.logger.info(
      `business unit entity updated in database`,
      traceId,
      'updateBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity(
        updatedBusinessUnit,
        traceId,
      )
    )
      return updatedBusinessUnit;
  }

  async findBusinessUnit(
    { businessUnitId = '', name = '', isDeleted = false }: GetBusinessUnitDto,
    traceId: string,
  ): Promise<BusinessUnitDto> {
    if (!businessUnitId && !name) {
      throw new NotFoundException(
        'At least one parameter (businessUnitId or name) must be provided',
      );
    }

    const where = {};

    if (businessUnitId) where['businessUnitId'] = businessUnitId;
    if (name) where['name'] = name;
    where['isDeleted'] = isDeleted;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findBusinessUnit',
      LogStreamLevel.ProdStandard,
    );
    const businessUnit = await this.businessUnitRepository.findOne({
      where,
    });

    if (!businessUnit) {
      throw new NotFoundException(
        `No business unit found with the provided criteria`,
      );
    }

    this.logger.info(
      `Business unit entity found in database`,
      traceId,
      'findBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return businessUnit;
  }

  async getManyBusinessUnit(
    getManyBusinessUnitDto: GetManyBusinessUnitsDto,
    traceId: string,
  ): Promise<PaginatedBusinessUnitResponseDto> {
    const {
      parentBusinessUnitId,
      name,
      isDeleted,
      updatedBy,
      pagination,
      sort = [],
    } = getManyBusinessUnitDto;

    // 1) Build dynamic WHERE filters
    const where: Record<string, any> = {
      ...(parentBusinessUnitId && { parentBusinessUnitId }),
      ...(name && { name }),
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyBusinessUnit: ${JSON.stringify(where)}`,
      traceId,
      'getManyBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base QueryBuilder with relations
    let query = this.businessUnitRepository
      .createQueryBuilder('businessUnit')
      .where(where)
      .leftJoinAndSelect('businessUnit.operators', 'operator')
      .leftJoinAndSelect('businessUnit.children', 'child');

    // 3) Apply sorting (or default)
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, i) => {
        const field = `businessUnit.${s.by}`;
        if (i === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      query = query.orderBy('businessUnit.createdAt', 'ASC');
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

    // 6) Execute query and log
    const businessUnits = await query.getMany();
    this.logger.info(
      `${businessUnits.length} Business unit(s) found`,
      traceId,
      'getManyBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // 7) Return paginated response DTO
    return {
      data: businessUnits,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
