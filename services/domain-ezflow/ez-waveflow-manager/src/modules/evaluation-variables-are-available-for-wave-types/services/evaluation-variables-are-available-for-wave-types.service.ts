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

import {
  GetManyEvaluationVariablesAreAvailableForWaveTypesDto,
  GetOneEvaluationVariablesAreAvailableForWaveTypesDto,
  CreateEvaluationVariablesAreAvailableForWaveTypesDto,
  UpdateEvaluationVariablesAreAvailableForWaveTypesDto,
  DeleteEvaluationVariablesAreAvailableForWaveTypesDto,
  EvaluationVariablesAreAvailableForWaveTypesDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './ztracking-evaluation-variables-are-available-for-wave-types.service';

@Injectable()
export class EvaluationVariablesAreAvailableForWaveTypesService {
  private logger = getLoggerConfig(
    EvaluationVariablesAreAvailableForWaveTypesService.name,
  );

  constructor(
    @InjectRepository(EvaluationVariablesAreAvailableForWaveTypes)
    private readonly evaluationVariablesAreAvailableForWaveTypesRepository: Repository<EvaluationVariablesAreAvailableForWaveTypes>,
    private readonly ztrackingEvaluationVariablesAreAvailableForWaveTypesService: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
  ) {
    this.logger.debug(
      `${EvaluationVariablesAreAvailableForWaveTypesService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariablesAreAvailableForWaveTypesEntity(
    createEvaluationVariablesAreAvailableForWaveTypesDto: CreateEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<EvaluationVariablesAreAvailableForWaveTypesDto> {
    const { waveTypeId, environmentalVariableId, isAvailable, updatedBy } =
      createEvaluationVariablesAreAvailableForWaveTypesDto;

    const newEntity =
      this.evaluationVariablesAreAvailableForWaveTypesRepository.create({
        waveTypeId,
        environmentalVariableId,
        isAvailable,
        updatedBy,
      });

    await this.evaluationVariablesAreAvailableForWaveTypesRepository.save(
      newEntity,
    );
    this.logger.info(
      `Created EvaluationVariablesAreAvailableForWaveTypes - WaveTypeId: ${waveTypeId}, EnvironmentalVariableId: ${environmentalVariableId}`,
      traceId,
      'createEvaluationVariablesAreAvailableForWaveTypesEntity',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariablesAreAvailableForWaveTypesService.createZtrackingEntity(
        newEntity,
        traceId,
      )
    ) {
      return newEntity;
    }
  }

  async updateEvaluationVariablesAreAvailableForWaveTypesEntity(
    updateEvaluationVariablesAreAvailableForWaveTypesDto: UpdateEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<EvaluationVariablesAreAvailableForWaveTypesDto> {
    const { waveTypeId, environmentalVariableId, isAvailable, updatedBy } =
      updateEvaluationVariablesAreAvailableForWaveTypesDto;

    const existingEntity =
      await this.evaluationVariablesAreAvailableForWaveTypesRepository.findOne({
        where: { waveTypeId, environmentalVariableId, isDeleted: false },
      });

    if (!existingEntity) {
      this.logger.error(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
        traceId,
        'updateEvaluationVariablesAreAvailableForWaveTypesEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
      );
    }

    existingEntity.isAvailable = isAvailable;
    existingEntity.updatedBy = updatedBy;

    await this.evaluationVariablesAreAvailableForWaveTypesRepository.save(
      existingEntity,
    );
    this.logger.info(
      `Updated EvaluationVariablesAreAvailableForWaveTypes - WaveTypeId: ${waveTypeId}, EnvironmentalVariableId: ${environmentalVariableId}`,
      traceId,
      'updateEvaluationVariablesAreAvailableForWaveTypesEntity',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariablesAreAvailableForWaveTypesService.createZtrackingEntity(
        existingEntity,
        traceId,
      )
    ) {
      return existingEntity;
    }
  }

  async deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
    deleteEvaluationVariablesAreAvailableForWaveTypesDto: DeleteEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<void> {
    const { waveTypeId, environmentalVariableId } =
      deleteEvaluationVariablesAreAvailableForWaveTypesDto;

    const existingEntity =
      await this.evaluationVariablesAreAvailableForWaveTypesRepository.findOne({
        where: { waveTypeId, environmentalVariableId, isDeleted: false },
      });

    if (!existingEntity) {
      this.logger.error(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
        traceId,
        'deleteEvaluationVariablesAreAvailableForWaveTypesEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
      );
    }

    existingEntity.isDeleted = true;

    await this.evaluationVariablesAreAvailableForWaveTypesRepository.save(
      existingEntity,
    );
    this.logger.info(
      `Deleted EvaluationVariablesAreAvailableForWaveTypes - WaveTypeId: ${waveTypeId}, EnvironmentalVariableId: ${environmentalVariableId}`,
      traceId,
      'deleteEvaluationVariablesAreAvailableForWaveTypesEntity',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingEvaluationVariablesAreAvailableForWaveTypesService.createZtrackingEntity(
      existingEntity,
      traceId,
    );
  }

  async getOneEvaluationVariablesAreAvailableForWaveTypesEntity(
    getOneEvaluationVariablesAreAvailableForWaveTypesDto: GetOneEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<EvaluationVariablesAreAvailableForWaveTypesDto> {
    const { waveTypeId, environmentalVariableId } =
      getOneEvaluationVariablesAreAvailableForWaveTypesDto;

    if (!waveTypeId || !environmentalVariableId) {
      this.logger.error(
        'Both waveTypeId and environmentalVariableId are required',
        traceId,
        'getOneEvaluationVariablesAreAvailableForWaveTypesEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Both waveTypeId and environmentalVariableId are required',
      );
    }

    const existingEntity =
      await this.evaluationVariablesAreAvailableForWaveTypesRepository.findOne({
        where: { waveTypeId, environmentalVariableId, isDeleted: false },
      });

    if (!existingEntity) {
      this.logger.error(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
        traceId,
        'getOneEvaluationVariablesAreAvailableForWaveTypesEntity',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariablesAreAvailableForWaveTypes found with WaveTypeId: ${waveTypeId} and EnvironmentalVariableId: ${environmentalVariableId}`,
      );
    }

    this.logger.info(
      `Retrieved EvaluationVariablesAreAvailableForWaveTypes - WaveTypeId: ${waveTypeId}, EnvironmentalVariableId: ${environmentalVariableId}`,
      traceId,
      'getOneEvaluationVariablesAreAvailableForWaveTypesEntity',
      LogStreamLevel.ProdStandard,
    );

    return existingEntity;
  }

  async getManyEvaluationVariablesAreAvailableForWaveTypesEntities(
    getManyEvaluationVariablesAreAvailableForWaveTypesDto: GetManyEvaluationVariablesAreAvailableForWaveTypesDto,
    traceId: string,
  ): Promise<EvaluationVariablesAreAvailableForWaveTypesDto[]> {
    const { isDeleted = false, isAvailable = true } =
      getManyEvaluationVariablesAreAvailableForWaveTypesDto;

    const entities =
      await this.evaluationVariablesAreAvailableForWaveTypesRepository.find({
        where: { isAvailable, isDeleted },
      });

    this.logger.info(
      `${entities.length} EvaluationVariablesAreAvailableForWaveTypes entities retrieved`,
      traceId,
      'getManyEvaluationVariablesAreAvailableForWaveTypesEntities',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
