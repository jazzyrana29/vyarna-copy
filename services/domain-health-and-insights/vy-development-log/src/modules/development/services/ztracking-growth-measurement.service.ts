import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { GrowthMeasurement } from '../../../entities/growth_measurement.entity';
import { ZtrackingGrowthMeasurement } from '../../../entities/ztracking_growth_measurement.entity';
import { GetZtrackingGrowthMeasurementDto } from 'ez-utils';

@Injectable()
export class ZtrackingGrowthMeasurementService {
  private logger = getLoggerConfig(ZtrackingGrowthMeasurementService.name);

  constructor(
    @InjectRepository(ZtrackingGrowthMeasurement)
    private readonly ztrackingRepo: Repository<ZtrackingGrowthMeasurement>,
  ) {
    this.logger.debug(
      `${ZtrackingGrowthMeasurementService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingGrowthMeasurementEntity(
    measurement: GrowthMeasurement,
    traceId: string,
  ): Promise<boolean> {
    const ztracking = await this.ztrackingRepo.save(
      this.ztrackingRepo.create({ ...measurement, versionDate: new Date() }),
    );
    this.logger.info(
      'ztracking growth measurement saved in database',
      traceId,
      'createZtrackingGrowthMeasurementEntity',
      LogStreamLevel.ProdStandard,
    );
    return Boolean(ztracking?.ztrackingVersion);
  }

  async findZtrackingGrowthMeasurementEntity(
    findZtrackingGrowthMeasurementEntityDto: GetZtrackingGrowthMeasurementDto,
    traceId: string,
  ): Promise<ZtrackingGrowthMeasurement[]> {
    const { growthId } = findZtrackingGrowthMeasurementEntityDto;
    const records = await this.ztrackingRepo.find({ where: { growthId } });

    if (!records.length) {
      throw new NotFoundException(
        `no ztracking growth measurements existed with this id => ${growthId}`,
      );
    }

    this.logger.info(
      'ztracking growth measurement entities found in database',
      traceId,
      'findZtrackingGrowthMeasurementEntity',
      LogStreamLevel.ProdStandard,
    );

    return records;
  }
}
