import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemMechanism } from '../../../entities/system-mechanism.entity';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  GetHistoryOfSystemMechanismDto,
  GetManySystemMechanismDto,
  GetSystemMechanismDto,
} from 'ez-utils';

@Injectable()
export class SystemMechanismService {
  private logger = getLoggerConfig(SystemMechanismService.name);

  constructor(
    @InjectRepository(SystemMechanism)
    private readonly systemMechanismRepository: Repository<SystemMechanism>,
  ) {
    this.logger.debug(
      `${SystemMechanismService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findSystemMechanism(
    {
      systemMechanismId = '',
      name = '',
      isDeleted = false,
    }: GetSystemMechanismDto,
    traceId: string,
  ): Promise<SystemMechanism> {
    if (!systemMechanismId && !name) {
      throw new NotFoundException(
        'At least one parameter (systemMechanismId or name) must be provided',
      );
    }

    const conditions: any = {};

    if (systemMechanismId) {
      conditions.systemMechanismId = systemMechanismId;
    }
    if (name) {
      conditions.name = name;
    }
    conditions.isDeleted = isDeleted;

    this.logger.debug(
      `Conditions Filters for search : ${JSON.stringify(conditions)}`,
      traceId,
      'findSystemMechanism',
      LogStreamLevel.ProdStandard,
    );

    const systemMechanism = await this.systemMechanismRepository.findOne({
      where: conditions,
    });

    if (!systemMechanism) {
      throw new NotFoundException(
        `No system mechanism found with the provided criteria`,
      );
    }

    this.logger.info(
      `System mechanism entity found in database`,
      traceId,
      'findSystemMechanism',
      LogStreamLevel.ProdStandard,
    );

    return systemMechanism;
  }

  async findHistoricalData(
    filter: GetHistoryOfSystemMechanismDto,
    traceId: string,
  ): Promise<SystemMechanism[]> {
    try {
      const conditions: any = {};

      if (filter.systemMechanismId) {
        conditions.systemMechanismId = filter.systemMechanismId;
      }
      if (filter.name) {
        conditions.name = filter.name;
      }
      if (filter.isDeleted != null) {
        conditions.isDeleted = filter.isDeleted;
      }

      this.logger.debug(
        `Conditions Filters for historical search : ${JSON.stringify(conditions)}`,
        traceId,
        'findHistoricalData',
        LogStreamLevel.DebugLight,
      );

      const historicalData = await this.systemMechanismRepository.find({
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

  async getManySystemMechanisms(
    { isDeleted = false }: GetManySystemMechanismDto,
    traceId: string,
  ): Promise<SystemMechanism[]> {
    try {
      this.logger.debug(
        `Fetching system mechanisms that are not deleted`,
        traceId,
        'getManySystemMechanisms',
        LogStreamLevel.DebugLight,
      );

      const systemMechanisms = await this.systemMechanismRepository.find({
        where: { isDeleted },
      });

      this.logger.info(
        `Non-deleted system mechanisms found in database`,
        traceId,
        'getManySystemMechanisms',
        LogStreamLevel.ProdStandard,
      );

      return systemMechanisms;
    } catch (e) {
      this.logger.error(
        `Error while fetching non-deleted system mechanisms: ${e.message}`,
        traceId,
        'getManySystemMechanisms',
        LogStreamLevel.ProdStandard,
      );
      throw e;
    }
  }
}
