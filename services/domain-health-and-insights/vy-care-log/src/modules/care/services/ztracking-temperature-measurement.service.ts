import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { TemperatureMeasurement } from '../../../entities/temperature_measurement.entity';
import { ZtrackingTemperatureMeasurement } from '../../../entities/ztracking_temperature_measurement.entity';
import {
  GetZtrackingTemperatureMeasurementDto,
  ZtrackingTemperatureMeasurementDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingTemperatureMeasurementService {
  private logger = getLoggerConfig(ZtrackingTemperatureMeasurementService.name);

  constructor(
    @InjectRepository(ZtrackingTemperatureMeasurement)
    private readonly zRepo: Repository<ZtrackingTemperatureMeasurement>,
  ) {
    this.logger.debug(
      `${ZtrackingTemperatureMeasurementService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForTemperatureMeasurement(
    temp: TemperatureMeasurement,
    traceId: string,
  ): Promise<boolean> {
    const entity = await this.zRepo.save(
      this.zRepo.create({ ...temp, versionDate: new Date() }),
    );

    this.logger.info(
      `ztracking temperature measurement saved in database`,
      traceId,
      'createZtrackingForTemperatureMeasurement',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(entity?.ztrackingVersion);
  }

  async getZtrackingForTemperatureMeasurement(
    getZtrackingTemperatureMeasurementDto: GetZtrackingTemperatureMeasurementDto,
    traceId: string,
  ): Promise<ZtrackingTemperatureMeasurementDto[]> {
    const { tempId = '' } = getZtrackingTemperatureMeasurementDto;
    const list = await this.zRepo.find({ where: { tempId } });

    if (!list.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${tempId}`,
        traceId,
        'getZtrackingForTemperatureMeasurement',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${tempId}`,
      );
    }

    this.logger.info(
      `${list.length} ztracking temperature measurement found in database`,
      traceId,
      'getZtrackingForTemperatureMeasurement',
      LogStreamLevel.ProdStandard,
    );

    return list;
  }
}
