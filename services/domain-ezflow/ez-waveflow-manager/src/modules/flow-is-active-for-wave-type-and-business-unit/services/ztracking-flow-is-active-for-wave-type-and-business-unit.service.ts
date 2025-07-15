import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/flow-is-active-for-wave-type-and-business-unit.entity';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/ztracking-flow-is-active-for-wave-type-and-business-unit.entity';

import {
  GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
  ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService {
  private logger = getLoggerConfig(
    ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit)
    private readonly flowIsActiveForWaveTypeAndBusinessUnitRepository: Repository<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit>,
  ) {
    this.logger.debug(
      `${ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
    flowIsActiveForWaveTypeAndBusinessUnit: FlowIsActiveForWaveTypeAndBusinessUnit,
    traceId: string,
  ): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit> {
    const ztrackingEntity =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.save(
        this.flowIsActiveForWaveTypeAndBusinessUnitRepository.create({
          ...flowIsActiveForWaveTypeAndBusinessUnit,
          versionDate: new Date(),
        }),
      );

    this.logger.info(
      `create ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit saved in database`,
      traceId,
      'createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );
    return ztrackingEntity;
  }

  async getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
    {
      waveTypeId = '',
      businessUnitId = '',
    }: GetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto[]> {
    if (!businessUnitId || !waveTypeId) {
      this.logger.error(
        'Please provide both waveTypeId and businessUnitId',
        traceId,
        'getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both waveTypeId and businessUnitId',
      );
    }
    const ztrackingEntities =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.find({
        where: { businessUnitId, waveTypeId },
      });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found with this id => ${waveTypeId} and ${businessUnitId}`,
        traceId,
        'getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found with this id => ${waveTypeId} and ${businessUnitId}`,
      );
    }

    this.logger.info(
      `${ztrackingEntities.length} ztracking flow is active for wave type and business unit found in database`,
      traceId,
      'getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
