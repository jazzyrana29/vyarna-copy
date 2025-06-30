import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { ZtrackingWave } from '../../../entities/ztracking-wave.entity';
import { Wave } from '../../../entities/wave.entity';

import { GetHistoryWaveDto, ZtrackingWaveDto } from 'ez-utils';

@Injectable()
export class ZtrackingWaveService {
  private logger = getLoggerConfig(ZtrackingWaveService.name);

  constructor(
    @InjectRepository(ZtrackingWave)
    private ztrackingRepository: Repository<ZtrackingWave>,
  ) {
    this.logger.debug(
      `${ZtrackingWaveService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingWaveEntity(
    wave: Wave,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        waveId: wave.waveId,
        executionFlowId: wave.executionFlowId,
        executionStartDate: wave.executionStartDate,
        executionEndDate: wave.executionEndDate,
        waveStatus: wave.waveStatus,
        isDeleted: wave.isDeleted,
        createdAt: wave.createdAt,
        updatedBy: wave.updatedBy,
        versionDate: new Date(),
      }),
    );

    this.logger.info(
      `Ztracking entry for Wave with ID: ${wave.waveId} saved in database`,
      traceId,
      'createZtrackingWaveEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }

  async findZtrackingWaveEntity(
    { waveId }: GetHistoryWaveDto,
    traceId: string,
  ): Promise<ZtrackingWaveDto[]> {
    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { waveId },
      order: { versionDate: 'DESC' },
    });

    if (!ztrackingEntities.length) {
      throw new NotFoundException(
        `No ztracking entries found for Wave with ID: ${waveId}`,
      );
    }

    this.logger.info(
      `Ztracking entries for Wave with ID: ${waveId} found in database`,
      traceId,
      'findZtrackingWaveEntity',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
