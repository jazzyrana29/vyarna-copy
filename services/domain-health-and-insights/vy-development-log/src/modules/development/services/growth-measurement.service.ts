import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrowthMeasurement } from '../../../entities/growth_measurement.entity';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class GrowthMeasurementService {
  private logger = getLoggerConfig(GrowthMeasurementService.name);

  constructor(
    @InjectRepository(GrowthMeasurement)
    private readonly repo: Repository<GrowthMeasurement>,
  ) {
    this.logger.debug(
      `${GrowthMeasurementService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async create(data: Partial<GrowthMeasurement>, traceId: string): Promise<GrowthMeasurement> {
    const entity = this.repo.create(data);
    await this.repo.save(entity);
    this.logger.info('GrowthMeasurement created', traceId, 'create', LogStreamLevel.ProdStandard);
    return entity;
  }

  async getAll(babyId: string): Promise<GrowthMeasurement[]> {
    return this.repo.find({ where: { babyId, isDeleted: false } });
  }
}
