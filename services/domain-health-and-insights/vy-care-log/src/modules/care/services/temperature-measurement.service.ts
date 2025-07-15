import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureMeasurement } from '../../../entities/temperature_measurement.entity';
import { ZtrackingTemperatureMeasurementService } from './ztracking-temperature-measurement.service';
import {
  CreateTemperatureMeasurementDto,
  GetManyTemperatureMeasurementsDto,
  TemperatureMeasurementDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { validateEventTime } from '../../../utils/validate-event-time';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class TemperatureMeasurementService {
  private logger = getLoggerConfig(TemperatureMeasurementService.name);

  constructor(
    @InjectRepository(TemperatureMeasurement)
    private readonly tempRepo: Repository<TemperatureMeasurement>,
    private readonly ztrackingService: ZtrackingTemperatureMeasurementService,
  ) {
    this.logger.debug(
      `${TemperatureMeasurementService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  async createTemperatureMeasurement(
    createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
    traceId: string,
  ): Promise<TemperatureMeasurementDto> {
    await validateEventTime({
      repo: this.tempRepo,
      babyId: createTemperatureMeasurementDto.babyId,
      eventTime: createTemperatureMeasurementDto.eventTime,
      errorMessage:
        'Event time cannot be more than one hour older than the latest temperature measurement',
    });
    const entity = this.tempRepo.create(createTemperatureMeasurementDto);
    await this.tempRepo.save(entity);
    this.logger.info(
      'TemperatureMeasurement created',
      traceId,
      'createTemperatureMeasurement',
      LogStreamLevel.ProdStandard,
    );
    await this.ztrackingService.createZtrackingForTemperatureMeasurement(
      entity,
      traceId,
    );
    return entity;
  }

  async getTemperatureMeasurements(
    getTemperatureMeasurementsDto: GetManyTemperatureMeasurementsDto,
    traceId: string,
  ): Promise<TemperatureMeasurementDto[]> {
    const { babyId } = getTemperatureMeasurementsDto;
    const list = await this.tempRepo.find({
      where: { babyId, isDeleted: false },
    });
    this.logger.info(
      `${list.length} TemperatureMeasurement(s) retrieved`,
      traceId,
      'getTemperatureMeasurements',
      LogStreamLevel.ProdStandard,
    );
    return list;
  }
}
