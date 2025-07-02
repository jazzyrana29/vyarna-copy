import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZtrackingBusinessUnit } from '../../../entities/ztracking-business-unit.entity';
import { BusinessUnit } from '../../../entities/business-unit.entity';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import {
  GetHistoryOfBusinessUnitsDto,
  ZtrackingBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingBusinessUnitService {
  private logger = getLoggerConfig(ZtrackingBusinessUnitService.name);

  constructor(
    @InjectRepository(ZtrackingBusinessUnit)
    private ztrackingBusinessUnitRepository: Repository<ZtrackingBusinessUnit>,
  ) {
    this.logger.debug(
      `${ZtrackingBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingBusinessUnitEntity(
    businessUnit: BusinessUnit,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingBusinessUnit =
      await this.ztrackingBusinessUnitRepository.save(
        this.ztrackingBusinessUnitRepository.create({
          ...businessUnit,
          versionDate: new Date(),
        }),
      );
    this.logger.info(
      `createZtrackingBusinessUnitEntity saved in database`,
      traceId,
      'createZtrackingBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingBusinessUnit?.ztrackingVersion);
  }

  async findZtrackingBusinessUnitEntity(
    { businessUnitId }: GetHistoryOfBusinessUnitsDto,
    traceId: string,
  ): Promise<ZtrackingBusinessUnitDto[]> {
    const ztrackingBusinessUnits =
      await this.ztrackingBusinessUnitRepository.find({
        where: { businessUnitId },
      });

    if (!ztrackingBusinessUnits.length) {
      throw new NotFoundException(
        `no ztracking of business unit existed with this id => ${businessUnitId}`,
      );
    }

    this.logger.info(
      `ztracking business unit entity found in database`,
      traceId,
      'findZtrackingBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingBusinessUnits;
  }
}
