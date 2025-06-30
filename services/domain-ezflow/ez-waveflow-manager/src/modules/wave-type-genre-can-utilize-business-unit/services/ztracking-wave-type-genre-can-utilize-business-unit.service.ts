import { Injectable, NotFoundException } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeGenreCanUtilizeBusinessUnit } from '../../../entities/wave-type-genre-can-utilize-business-unit.entity';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnit } from '../../../entities/ztracking-wave-type-genre-can-utilize-business-unit.entity';

import {
  GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
  ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService {
  private logger = getLoggerConfig(
    ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(ZtrackingWaveTypeGenreCanUtilizeBusinessUnit)
    private readonly waveTypeGenreCanUtilizeBusinessUnitRepository: Repository<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit>,
  ) {
    this.logger.debug(
      `${ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
    waveTypeGenreCanUtilizeBusinessUnit: WaveTypeGenreCanUtilizeBusinessUnit,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.save(
        this.waveTypeGenreCanUtilizeBusinessUnitRepository.create({
          ...waveTypeGenreCanUtilizeBusinessUnit,
          versionDate: new Date(),
        }),
      );

    this.logger.info(
      `create ZtrackingWaveTypeGenreCanUtilizeBusinessUnit saved in database`,
      traceId,
      'createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
    {
      businessUnitId = '',
      waveTypeGenreId = '',
    }: GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
    traceId: string,
  ): Promise<ZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto[]> {
    const ztrackingEntities =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.find({
        where: { businessUnitId, waveTypeGenreId },
      });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with => businessUnitId: ${businessUnitId}  or waveTypeGenreId: ${waveTypeGenreId}`,
        traceId,
        'getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with => businessUnitId: ${businessUnitId}  or waveTypeGenreId: ${waveTypeGenreId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking wave-type-genre-can-utilize-business-unit found in database`,
      traceId,
      'getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
