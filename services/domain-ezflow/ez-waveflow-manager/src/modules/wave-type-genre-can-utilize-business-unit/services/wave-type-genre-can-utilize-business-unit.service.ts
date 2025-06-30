import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { WaveTypeGenreCanUtilizeBusinessUnit } from '../../../entities/wave-type-genre-can-utilize-business-unit.entity';

import {
  CreateWaveTypeGenreCanUtilizeBusinessUnitDto,
  DeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
  GetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
  UpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
  WaveTypeGenreCanUtilizeBusinessUnitDto,
} from 'ez-utils';

import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './ztracking-wave-type-genre-can-utilize-business-unit.service';

@Injectable()
export class WaveTypeGenreCanUtilizeBusinessUnitService {
  private logger = getLoggerConfig(
    WaveTypeGenreCanUtilizeBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(WaveTypeGenreCanUtilizeBusinessUnit)
    private readonly waveTypeGenreCanUtilizeBusinessUnitRepository: Repository<WaveTypeGenreCanUtilizeBusinessUnit>,
    private readonly ztrackingWaveTypeGenreCanUtilizeBusinessUnitService: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
  ) {
    this.logger.debug(
      `${WaveTypeGenreCanUtilizeBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWaveTypeGenreCanUtilizeBusinessUnit(
    createWaveTypeGenreCanUtilizeBusinessUnitDto: CreateWaveTypeGenreCanUtilizeBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeGenreCanUtilizeBusinessUnitDto> {
    const createdWaveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.save(
        this.waveTypeGenreCanUtilizeBusinessUnitRepository.create(
          createWaveTypeGenreCanUtilizeBusinessUnitDto,
        ),
      );

    this.logger.info(
      `WaveTypeGenreCanUtilizeBusinessUnit created with businessUnitId: ${createdWaveTypeGenreCanUtilizeBusinessUnit.businessUnitId} and waveTypeGenreId: ${createdWaveTypeGenreCanUtilizeBusinessUnit.waveTypeGenreId}`,
      traceId,
      'createWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeGenreCanUtilizeBusinessUnitService.createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
        createdWaveTypeGenreCanUtilizeBusinessUnit,
        traceId,
      )
    ) {
      return createdWaveTypeGenreCanUtilizeBusinessUnit;
    }
  }

  async updateWaveTypeGenreCanUtilizeBusinessUnit(
    updateWaveTypeGenreCanUtilizeBusinessUnitDto: UpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeGenreCanUtilizeBusinessUnitDto> {
    const waveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.findOne({
        where: {
          businessUnitId:
            updateWaveTypeGenreCanUtilizeBusinessUnitDto.businessUnitId,
          waveTypeGenreId:
            updateWaveTypeGenreCanUtilizeBusinessUnitDto.waveTypeGenreId,
        },
      });

    if (!waveTypeGenreCanUtilizeBusinessUnit) {
      this.logger.error(
        `No WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.businessUnitId} and waveTypeGenreId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.waveTypeGenreId}`,
        traceId,
        'updateWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.businessUnitId} and waveTypeGenreId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.waveTypeGenreId}`,
      );
    }

    const updatedWaveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.save({
        ...waveTypeGenreCanUtilizeBusinessUnit,
        ...updateWaveTypeGenreCanUtilizeBusinessUnitDto,
      });

    this.logger.info(
      `WaveTypeGenreCanUtilizeBusinessUnit with businessUnitId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.businessUnitId} and waveTypeGenreId: ${updateWaveTypeGenreCanUtilizeBusinessUnitDto.waveTypeGenreId} updated`,
      traceId,
      'updateWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeGenreCanUtilizeBusinessUnitService.createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
        updatedWaveTypeGenreCanUtilizeBusinessUnit,
        traceId,
      )
    ) {
      return updatedWaveTypeGenreCanUtilizeBusinessUnit;
    }
  }

  async deleteWaveTypeGenreCanUtilizeBusinessUnit(
    {
      businessUnitId = '',
      waveTypeGenreId = '',
      updatedBy = null,
    }: DeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeGenreCanUtilizeBusinessUnitDto> {
    if (!businessUnitId && !waveTypeGenreId && !updatedBy) {
      this.logger.error(
        'You need to provide businessUnitId, waveTypeGenreId, and updatedBy',
        traceId,
        'deleteWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide businessUnitId, waveTypeGenreId, and updatedBy',
      );
    }

    const waveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.findOne({
        where: {
          waveTypeGenreId,
          businessUnitId,
          isDeleted: false,
        },
      });

    if (!waveTypeGenreCanUtilizeBusinessUnit) {
      this.logger.error(
        `No Active WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId}`,
        traceId,
        'deleteWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No Active WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId}`,
      );
    }

    waveTypeGenreCanUtilizeBusinessUnit.isDeleted = true;
    waveTypeGenreCanUtilizeBusinessUnit.updatedBy = updatedBy;

    const deletedWaveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.save(
        waveTypeGenreCanUtilizeBusinessUnit,
      );

    this.logger.info(
      `WaveTypeGenreCanUtilizeBusinessUnit with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId} marked as deleted`,
      traceId,
      'deleteWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingWaveTypeGenreCanUtilizeBusinessUnitService.createZtrackingForWaveTypeGenreCanUtilizeBusinessUnit(
        deletedWaveTypeGenreCanUtilizeBusinessUnit,
        traceId,
      )
    ) {
      return deletedWaveTypeGenreCanUtilizeBusinessUnit;
    }
  }

  async getOneWaveTypeGenreCanUtilizeBusinessUnit(
    {
      waveTypeGenreId = '',
      businessUnitId = '',
      isDeleted = false,
    }: GetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
    traceId: string,
  ): Promise<WaveTypeGenreCanUtilizeBusinessUnitDto> {
    if (!waveTypeGenreId && !businessUnitId) {
      this.logger.error(
        'Please provide both businessUnitId and waveTypeGenreId',
        traceId,
        'getOneWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both businessUnitId and waveTypeGenreId',
      );
    }

    const where: FindOptionsWhere<WaveTypeGenreCanUtilizeBusinessUnit> = {};
    if (waveTypeGenreId) where.waveTypeGenreId = waveTypeGenreId;
    if (businessUnitId) where.businessUnitId = businessUnitId;
    where.isDeleted = isDeleted;

    const waveTypeGenreCanUtilizeBusinessUnit =
      await this.waveTypeGenreCanUtilizeBusinessUnitRepository.findOne({
        where,
      });

    if (!waveTypeGenreCanUtilizeBusinessUnit) {
      this.logger.error(
        `No WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId}`,
        traceId,
        'getOneWaveTypeGenreCanUtilizeBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId}`,
      );
    }

    this.logger.info(
      `WaveTypeGenreCanUtilizeBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeGenreId: ${waveTypeGenreId}`,
      traceId,
      'getOneWaveTypeGenreCanUtilizeBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return waveTypeGenreCanUtilizeBusinessUnit;
  }
}
