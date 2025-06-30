import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariablesAreAvailableForWaveTypes } from '../../../entities/evaluation-variables-are-available-for-wave-types.entity';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypes } from '../../../entities/ztracking-evaluation-variables-are-available-for-wave-types.entity';

import {
  GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto,
  ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto,
} from 'ez-utils';

@Injectable()
export class ZtrackingEvaluationVariablesAreAvailableForWaveTypesService {
  private logger = getLoggerConfig(
    ZtrackingEvaluationVariablesAreAvailableForWaveTypesService.name,
  );

  constructor(
    @InjectRepository(ZtrackingEvaluationVariablesAreAvailableForWaveTypes)
    private ztrackingRepository: Repository<ZtrackingEvaluationVariablesAreAvailableForWaveTypes>,
  ) {
    this.logger.debug(
      `${ZtrackingEvaluationVariablesAreAvailableForWaveTypesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingEntity(
    entity: EvaluationVariablesAreAvailableForWaveTypes,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingEntity = await this.ztrackingRepository.save(
      this.ztrackingRepository.create({
        ...entity,
        versionDate: new Date(), // Ensures the current date is recorded
      }),
    );

    this.logger.info(
      `Ztracking entity for EvaluationVariablesAreAvailableForWaveTypes saved in database`,
      traceId,
      'createZtrackingEntity',
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingEntity?.ztrackingVersion);
  }
  async findZtrackingEntities(
    getHistoryOfEvaluationVariablesAreAvailableForWaveTypesDto: GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto[]> {
    const { waveTypeId, environmentalVariableId } =
      getHistoryOfEvaluationVariablesAreAvailableForWaveTypesDto;

    if (!waveTypeId || !environmentalVariableId) {
      this.logger.error(
        'waveTypeId and environmentalVariableId are required for ztracking history retrieval',
        traceId,
        'findZtrackingEntities',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'waveTypeId and environmentalVariableId are required for ztracking history retrieval',
      );
    }

    const ztrackingEntities = await this.ztrackingRepository.find({
      where: { waveTypeId, environmentalVariableId },
      order: { versionDate: 'DESC' }, // Optionally order by most recent
    });

    if (!ztrackingEntities.length) {
      this.logger.error(
        `No ztracking entities found for WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
        traceId,
        'findZtrackingEntities',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No ztracking entities found for WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
      );
    }

    this.logger.info(
      `Ztracking entities for EvaluationVariablesAreAvailableForWaveTypes found in database`,
      traceId,
      'findZtrackingEntities',
      LogStreamLevel.ProdStandard,
    );

    return ztrackingEntities;
  }
}
