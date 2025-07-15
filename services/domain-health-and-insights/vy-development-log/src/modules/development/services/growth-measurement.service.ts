import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowthMeasurement } from '../../../entities/growth_measurement.entity';
import { ZtrackingGrowthMeasurementService } from './ztracking-growth-measurement.service';
import {
  CreateGrowthMeasurementDto,
  GrowthMeasurementDto,
  GetManyGrowthMeasurementsDto,
  GetZtrackingGrowthMeasurementDto,
  ZtrackingGrowthMeasurementDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class GrowthMeasurementService {
  private logger = getLoggerConfig(GrowthMeasurementService.name);

  constructor(
    @InjectRepository(GrowthMeasurement)
    private readonly growthMeasurementRepo: Repository<GrowthMeasurement>,
    private readonly ztrackingGrowthMeasurementService: ZtrackingGrowthMeasurementService,
  ) {
    this.logger.debug(
      `${GrowthMeasurementService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createGrowthMeasurement(
    createGrowthMeasurementDto: CreateGrowthMeasurementDto,
    traceId: string,
  ): Promise<GrowthMeasurementDto> {
    const entity = this.growthMeasurementRepo.create(createGrowthMeasurementDto);
    await this.growthMeasurementRepo.save(entity);
    this.logger.info(
      'GrowthMeasurement created',
      traceId,
      'createGrowthMeasurement',
      LogStreamLevel.ProdStandard,
    );
    return entity;
  }

  async getGrowthMeasurements(
    getGrowthMeasurementsDto: GetManyGrowthMeasurementsDto,
    traceId: string,
  ): Promise<GrowthMeasurementDto[]> {
    const { babyId } = getGrowthMeasurementsDto;
    const measurements = await this.growthMeasurementRepo.find({
      where: { babyId, isDeleted: false },
    });

    this.logger.info(
      `${measurements.length} GrowthMeasurement(s) retrieved`,
      traceId,
      'getGrowthMeasurements',
      LogStreamLevel.ProdStandard,
    );

    return measurements;
  }


  async getGrowthMeasurementHistory(
    getZtrackingGrowthMeasurementDto: GetZtrackingGrowthMeasurementDto,
    traceId: string,
  ): Promise<ZtrackingGrowthMeasurementDto[]> {
    return await this.ztrackingGrowthMeasurementService.findZtrackingGrowthMeasurementEntity(
      getZtrackingGrowthMeasurementDto,
      traceId,
    );
  }
}
