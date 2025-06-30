import { Injectable, NotFoundException } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeIsAllowedToAccessBusinessUnit } from '../../../entities/wave-type-is-allowed-to-access-business-unit.entity';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnit } from '../../../entities/ztracking-wave-type-is-allowed-to-access-business-unit.entity';

import {
  GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
  ZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService {
  private logger = getLoggerConfig(
    ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(ZtrackingWaveTypeIsAllowedToAccessBusinessUnit)
    private readonly waveTypeIsAllowedToAccessBusinessUnitRepository: Repository<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit>,
  ) {
    this.logger.debug(
      `${ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
    waveTypeIsAllowedToAccessBusinessUnit: WaveTypeIsAllowedToAccessBusinessUnit,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.save(
        this.waveTypeIsAllowedToAccessBusinessUnitRepository.create({
          ...waveTypeIsAllowedToAccessBusinessUnit,
          versionDate: new Date(),
        }),
      );

    this.logger.info(
      `create ZtrackingWaveTypeIsAllowedToAccessBusinessUnit saved in database`,
      traceId,
      'createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
    {
      businessUnitId = '',
      waveTypeId = '',
    }: GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
    traceId: string,
  ): Promise<ZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto[]> {
    const ztrackingEntities =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.find({
        where: { businessUnitId, waveTypeId },
      });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with => businessUnitId: ${businessUnitId}  or waveTypeId: ${waveTypeId}`,
        traceId,
        'getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with => businessUnitId: ${businessUnitId}  or waveTypeId: ${waveTypeId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking wave-type-is-allowed-to-access-business-unit found in database`,
      traceId,
      'getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
