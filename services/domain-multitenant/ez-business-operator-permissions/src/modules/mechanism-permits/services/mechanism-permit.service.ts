import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MechanismPermit } from '../../../entities/mechanism-permit.entity';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  GetMechanismPermitDto,
  GetMechanismPermitForSystemMechanismDto,
} from 'ez-utils';

@Injectable()
export class MechanismPermitService {
  private logger = getLoggerConfig(MechanismPermitService.name);

  constructor(
    @InjectRepository(MechanismPermit)
    private readonly mechanismPermitRepository: Repository<MechanismPermit>,
  ) {
    this.logger.debug(
      `${MechanismPermitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getMechanismPermitEntity(
    {
      mechanismPermitId = '',
      name = '',
      isDeleted = false,
    }: GetMechanismPermitDto,
    traceId: string,
  ): Promise<MechanismPermit> {
    if (!mechanismPermitId && !name)
      throw new BadRequestException(
        'At least one parameter (mechanismPermitId or name) must be provided',
      );
    const where = {};
    if (mechanismPermitId) where['mechanismPermitId'] = mechanismPermitId;
    if (name) where['name'] = name;
    where['isDeleted'] = isDeleted;
    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(where)}`,
      traceId,
      'findMechanismPermit',
      LogStreamLevel.ProdStandard,
    );
    const mechanismPermit = await this.mechanismPermitRepository.findOne({
      where: where,
    });

    if (!mechanismPermit)
      throw new NotFoundException(
        `No mechanism permit found with the provided criteria`,
      );

    this.logger.info(
      `Mechanism permit entity found in database`,
      traceId,
      'findMechanismPermit',
      LogStreamLevel.ProdStandard,
    );

    return mechanismPermit;
  }

  async findHistoricalData(
    filter: { permitId?: string; name?: string; isDeleted?: boolean },
    traceId: string,
  ): Promise<MechanismPermit[]> {
    try {
      const conditions: any = {};

      if (filter.permitId) {
        conditions.permitId = filter.permitId;
      }
      if (filter.name) {
        conditions.name = filter.name;
      }
      if (filter.isDeleted !== undefined && filter.isDeleted !== null) {
        conditions.isDeleted = filter.isDeleted;
      }

      this.logger.debug(
        `Conditions Filters for historical search : ${JSON.stringify(conditions)}`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.DebugLight,
      );

      const historicalData = await this.mechanismPermitRepository.find({
        where: conditions,
      });

      if (!historicalData.length) {
        throw new NotFoundException(
          `No historical data found with the provided criteria`,
        );
      }

      this.logger.info(
        `Historical data entity found in database`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.ProdStandard,
      );

      return historicalData;
    } catch (e) {
      this.logger.error(
        `Error while fetching historical data: ${e.message}`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.ProdStandard,
      );
      throw e;
    }
  }

  async getMechanismPermitsForSystemMechanism(
    { systemMechanismId = '' }: GetMechanismPermitForSystemMechanismDto,
    traceId: string,
  ): Promise<MechanismPermit[]> {
    this.logger.debug(
      `Fetching mechanism permits for systemMechanismId: ${systemMechanismId}`,
      traceId,
      'getMechanismPermitsForSystemMechanism',
      LogStreamLevel.DebugLight,
    );

    const whereCondition: any = {};
    if (systemMechanismId) {
      whereCondition.systemMechanismId = systemMechanismId;
    }

    const permits = await this.mechanismPermitRepository.find({
      where: whereCondition,
    });

    this.logger.info(
      `${permits.length} mechanism permits found for systemMechanismId: ${systemMechanismId}`,
      traceId,
      'getMechanismPermitsForSystemMechanism',
      LogStreamLevel.ProdStandard,
    );

    return permits;
  }
}
