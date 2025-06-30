import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeIsAllowedToAccessBusinessUnit } from '../../../entities/wave-type-is-allowed-to-access-business-unit.entity';

import {
  CreateWaveTypeIsAllowedToAccessBusinessUnitDto,
  DeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
  GetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
  UpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
  WaveTypeIsAllowedToAccessBusinessUnitDto,
} from 'ez-utils';

import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './ztracking-wave-type-is-allowed-to-access-business-unit.service';

@Injectable()
export class WaveTypeIsAllowedToAccessBusinessUnitService {
  private logger = getLoggerConfig(
    WaveTypeIsAllowedToAccessBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(WaveTypeIsAllowedToAccessBusinessUnit)
    private readonly waveTypeIsAllowedToAccessBusinessUnitRepository: Repository<WaveTypeIsAllowedToAccessBusinessUnit>,
    private readonly ztrackingWaveTypeIsAllowedToAccessBusinessUnitService: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
  ) {
    this.logger.debug(
      `${WaveTypeIsAllowedToAccessBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWaveTypeIsAllowedToAccessBusinessUnit(
    createWaveTypeIsAllowedToAccessBusinessUnitDto: CreateWaveTypeIsAllowedToAccessBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeIsAllowedToAccessBusinessUnitDto> {
    const createdWaveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.save(
        this.waveTypeIsAllowedToAccessBusinessUnitRepository.create(
          createWaveTypeIsAllowedToAccessBusinessUnitDto,
        ),
      );

    this.logger.info(
      `WaveTypeIsAllowedToAccessBusinessUnit created with businessUnitId: ${createdWaveTypeIsAllowedToAccessBusinessUnit.businessUnitId} and waveTypeId: ${createdWaveTypeIsAllowedToAccessBusinessUnit.waveTypeId}`,
      traceId,
      'createWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeIsAllowedToAccessBusinessUnitService.createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
        createdWaveTypeIsAllowedToAccessBusinessUnit,
        traceId,
      )
    ) {
      return createdWaveTypeIsAllowedToAccessBusinessUnit;
    }
  }

  async updateWaveTypeIsAllowedToAccessBusinessUnit(
    updateWaveTypeIsAllowedToAccessBusinessUnitDto: UpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeIsAllowedToAccessBusinessUnitDto> {
    const waveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.findOne({
        where: {
          businessUnitId:
            updateWaveTypeIsAllowedToAccessBusinessUnitDto.businessUnitId,
          waveTypeId: updateWaveTypeIsAllowedToAccessBusinessUnitDto.waveTypeId,
        },
      });

    if (!waveTypeIsAllowedToAccessBusinessUnit) {
      this.logger.error(
        `No WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.businessUnitId} and waveTypeId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.waveTypeId}`,
        traceId,
        'updateWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.businessUnitId} and waveTypeId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.waveTypeId}`,
      );
    }

    const updatedWaveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.save({
        ...waveTypeIsAllowedToAccessBusinessUnit,
        ...updateWaveTypeIsAllowedToAccessBusinessUnitDto,
      });

    this.logger.info(
      `WaveTypeIsAllowedToAccessBusinessUnit with businessUnitId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.businessUnitId} and waveTypeId: ${updateWaveTypeIsAllowedToAccessBusinessUnitDto.waveTypeId} updated`,
      traceId,
      'updateWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeIsAllowedToAccessBusinessUnitService.createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
        updatedWaveTypeIsAllowedToAccessBusinessUnit,
        traceId,
      )
    ) {
      return updatedWaveTypeIsAllowedToAccessBusinessUnit;
    }
  }

  async deleteWaveTypeIsAllowedToAccessBusinessUnit(
    {
      businessUnitId = '',
      waveTypeId = '',
      updatedBy = null,
    }: DeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeIsAllowedToAccessBusinessUnitDto> {
    if (!businessUnitId && !waveTypeId && !updatedBy) {
      this.logger.error(
        'You need to provide businessUnitId, waveTypeId, and updatedBy',
        traceId,
        'deleteWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide businessUnitId, waveTypeId, and updatedBy',
      );
    }

    const waveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.findOne({
        where: { waveTypeId, businessUnitId, isDeleted: false },
      });

    if (!waveTypeIsAllowedToAccessBusinessUnit) {
      this.logger.error(
        `No Active WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
        traceId,
        'deleteWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Active WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      );
    }

    waveTypeIsAllowedToAccessBusinessUnit.isDeleted = true;
    waveTypeIsAllowedToAccessBusinessUnit.updatedBy = updatedBy;

    const deletedWaveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.save(
        waveTypeIsAllowedToAccessBusinessUnit,
      );

    this.logger.info(
      `WaveTypeIsAllowedToAccessBusinessUnit with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId} marked as deleted`,
      traceId,
      'deleteWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeIsAllowedToAccessBusinessUnitService.createZtrackingForWaveTypeIsAllowedToAccessBusinessUnit(
        deletedWaveTypeIsAllowedToAccessBusinessUnit,
        traceId,
      )
    ) {
      return deletedWaveTypeIsAllowedToAccessBusinessUnit;
    }
  }

  async getOneWaveTypeIsAllowedToAccessBusinessUnit(
    {
      waveTypeId = '',
      businessUnitId = '',
      isDeleted = false,
    }: GetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeIsAllowedToAccessBusinessUnitDto> {
    if (!waveTypeId && !businessUnitId) {
      this.logger.error(
        'Please provide both businessUnitId and waveTypeId',
        traceId,
        'getOneWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both businessUnitId and waveTypeId',
      );
    }

    const where: FindOptionsWhere<WaveTypeIsAllowedToAccessBusinessUnit> = {};
    if (waveTypeId) where.waveTypeId = waveTypeId;
    if (businessUnitId) where.businessUnitId = businessUnitId;
    where.isDeleted = isDeleted;

    const waveTypeIsAllowedToAccessBusinessUnit =
      await this.waveTypeIsAllowedToAccessBusinessUnitRepository.findOne({
        where,
      });

    if (!waveTypeIsAllowedToAccessBusinessUnit) {
      this.logger.error(
        `No WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
        traceId,
        'getOneWaveTypeIsAllowedToAccessBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      );
    }

    this.logger.info(
      `WaveTypeIsAllowedToAccessBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      traceId,
      'getOneWaveTypeIsAllowedToAccessBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return waveTypeIsAllowedToAccessBusinessUnit;
  }
}
