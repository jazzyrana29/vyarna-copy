import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { Wave } from '../../../entities/wave.entity';

import {
  CreateWaveDto,
  UpdateWaveDto,
  DeleteWaveDto,
  GetWaveDto,
  WaveDto,
  ExecuteWaveDto,
  GetManyWavesDto,
  PaginatedWavesResponseDto,
  ExecuteWaveResponseDto,
} from 'ez-utils';

import { ZtrackingWaveService } from './ztracking-wave.service';
import { WaveExecutionService } from './wave-execution.service';

@Injectable()
export class WaveService {
  private logger = getLoggerConfig(WaveService.name);

  constructor(
    @InjectRepository(Wave)
    private readonly waveRepository: Repository<Wave>,
    private readonly ztrackingWaveService: ZtrackingWaveService,
    private readonly waveExecutionService: WaveExecutionService,
  ) {
    this.logger.debug(
      `${WaveService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createWave(
    createWaveDto: CreateWaveDto,
    traceId: string,
  ): Promise<WaveDto | null> {
    const {
      waveTypeId,
      executionFlowId,
      executionStartDate,
      executionEndDate,
      waveStatus,
      updatedBy,
    } = createWaveDto;

    const wave = this.waveRepository.create({
      waveType: { waveTypeId },
      executionFlowId,
      executionStartDate,
      executionEndDate,
      waveStatus,
      updatedBy,
    });

    try {
      await this.waveRepository.save(wave);
      this.logger.info(
        `Wave created with ID: ${wave.waveId}`,
        traceId,
        'createWave',
        LogStreamLevel.ProdStandard,
      );

      const ztrackingSuccess =
        await this.ztrackingWaveService.createZtrackingWaveEntity(
          wave,
          traceId,
        );

      return ztrackingSuccess ? wave : null;
    } catch (error) {
      this.logger.error(
        `Error creating wave: ${error.message}`,
        traceId,
        'createWave',
        LogStreamLevel.DebugHeavy,
      );
      return null;
    }
  }

  async updateWave(
    updateWaveDto: UpdateWaveDto,
    traceId: string,
  ): Promise<WaveDto | null> {
    const {
      waveId,
      executionFlowId,
      executionStartDate,
      executionEndDate,
      waveStatus,
      updatedBy,
    } = updateWaveDto;

    const wave = await this.waveRepository.findOne({
      where: { waveId, isDeleted: false },
    });

    if (!wave) {
      this.logger.error(
        `No Wave found with ID: ${waveId}`,
        traceId,
        'updateWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Wave found with ID: ${waveId}`);
    }

    wave.executionFlowId = executionFlowId;
    wave.executionStartDate = executionStartDate;
    wave.executionEndDate = executionEndDate;
    wave.waveStatus = waveStatus;
    wave.updatedBy = updatedBy;

    try {
      await this.waveRepository.save(wave);
      this.logger.info(
        `Wave with ID: ${waveId} updated successfully`,
        traceId,
        'updateWave',
        LogStreamLevel.ProdStandard,
      );

      const ztrackingSuccess =
        await this.ztrackingWaveService.createZtrackingWaveEntity(
          wave,
          traceId,
        );

      return ztrackingSuccess ? wave : null;
    } catch (error) {
      this.logger.error(
        `Error updating wave: ${error.message}`,
        traceId,
        'updateWave',
        LogStreamLevel.DebugHeavy,
      );
      return null;
    }
  }

  async deleteWave(
    deleteWaveDto: DeleteWaveDto,
    traceId: string,
  ): Promise<void> {
    const { waveId } = deleteWaveDto;
    const wave = await this.waveRepository.findOne({
      where: { waveId, isDeleted: false },
    });

    if (!wave) {
      this.logger.error(
        `No Wave found with ID: ${waveId}`,
        traceId,
        'deleteWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Wave found with ID: ${waveId}`);
    }

    wave.isDeleted = true;
    await this.waveRepository.save(wave);
    this.logger.info(
      `Wave with ID: ${waveId} marked as deleted`,
      traceId,
      'deleteWave',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingWaveService.createZtrackingWaveEntity(wave, traceId);
  }

  async getOneWave(
    getOneWaveDto: GetWaveDto,
    traceId: string,
  ): Promise<WaveDto> {
    const { waveId } = getOneWaveDto;

    const wave = await this.waveRepository.findOne({
      where: { waveId, isDeleted: false },
      relations: [
        'executionFlow',
        'waveType',
        'tasks',
        'tasks.taskStatus',
        'tasks.node',
        'tasks.node.nodeType',
        'tasks.isExecutedFrom',
        'tasks.isExecutedFrom.nodeExitType',
      ],
    });

    if (!wave) {
      this.logger.error(
        `No Wave found with ID: ${waveId}`,
        traceId,
        'getOneWave',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(`No Wave found with ID: ${waveId}`);
    }

    this.logger.info(
      `Wave found with ID: ${waveId}`,
      traceId,
      'getOneWave',
      LogStreamLevel.ProdStandard,
    );

    return wave;
  }

  async getManyWaves(
    getManyWaveDto: GetManyWavesDto,
    traceId: string,
  ): Promise<PaginatedWavesResponseDto> {
    const {
      waveStatus,
      executionFlowId,
      waveTypeId,
      isDeleted,
      updatedBy,
      executionStartDateFrom,
      executionStartDateTo,
      executionEndDateFrom,
      executionEndDateTo,
      pagination,
      sort = [],
    } = getManyWaveDto;

    // 1) Construct the base WHERE conditions (excluding waveId, adding waveTypeId)
    const where: Record<string, any> = {
      ...(typeof isDeleted === 'boolean' && { isDeleted }),
      ...(waveStatus && { waveStatus }),
      ...(executionFlowId && { executionFlowId }),
      ...(waveTypeId && { waveTypeId }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyWave: ${JSON.stringify(where)}`,
      traceId,
      'getManyWave',
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base query
    let query = this.waveRepository.createQueryBuilder('wave').where(where);

    // 3) Apply executionStartDate range filters
    if (executionStartDateFrom && executionStartDateTo) {
      const fromDate = new Date(executionStartDateFrom);
      const toDate = new Date(executionStartDateTo);
      query = query.andWhere(
        'wave.executionStartDate BETWEEN :startFrom AND :startTo',
        { startFrom: fromDate, startTo: toDate },
      );
    } else if (executionStartDateFrom) {
      const fromDate = new Date(executionStartDateFrom);
      query = query.andWhere('wave.executionStartDate >= :startFrom', {
        startFrom: fromDate,
      });
    } else if (executionStartDateTo) {
      const toDate = new Date(executionStartDateTo);
      query = query.andWhere('wave.executionStartDate <= :startTo', {
        startTo: toDate,
      });
    }

    // 4) Apply executionEndDate range filters
    if (executionEndDateFrom && executionEndDateTo) {
      const fromDate = new Date(executionEndDateFrom);
      const toDate = new Date(executionEndDateTo);
      query = query.andWhere(
        'wave.executionEndDate BETWEEN :endFrom AND :endTo',
        { endFrom: fromDate, endTo: toDate },
      );
    } else if (executionEndDateFrom) {
      const fromDate = new Date(executionEndDateFrom);
      query = query.andWhere('wave.executionEndDate >= :endFrom', {
        endFrom: fromDate,
      });
    } else if (executionEndDateTo) {
      const toDate = new Date(executionEndDateTo);
      query = query.andWhere('wave.executionEndDate <= :endTo', {
        endTo: toDate,
      });
    }

    // 5) Apply sorting
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, index) => {
        const field = `wave.${s.by}`;
        if (index === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      // Default sorting by creation date
      query = query.orderBy('wave.createdAt', 'ASC');
    }

    // 6) Get total count for pagination calculation
    const totalCount = await query.getCount();

    // 7) Apply pagination if needed
    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);
      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 8) Execute query
    const waves = await query.getMany();

    this.logger.info(
      `${waves.length} Wave(s) found in the database`,
      traceId,
      'getManyWave',
      LogStreamLevel.ProdStandard,
    );

    // 9) Return structured pagination response
    return {
      data: waves,
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }

  async executeWave(
    executeWaveDto: ExecuteWaveDto,
    traceId: string,
  ): Promise<ExecuteWaveResponseDto> {
    const createWaveMethod = async (
      waveTypeId: string,
      flowId: string,
      traceId: string,
    ) => {
      const waveToCreate = {
        waveTypeId,
        executionFlowId: flowId,
        waveStatus: 'InExecution' as const,
      };
      return this.createWave(waveToCreate, traceId);
    };

    try {
      const wave = await this.waveExecutionService.executeWave(
        executeWaveDto,
        traceId,
        createWaveMethod,
      );
      if (!wave) {
        this.logger.error(
          `Wave execution did not return a valid wave`,
          traceId,
          'executeWave',
          LogStreamLevel.DebugHeavy,
        );
        throw new NotFoundException(
          `Wave execution failed to create a valid wave`,
        );
      }
      const ztrackingSuccess =
        await this.ztrackingWaveService.createZtrackingWaveEntity(
          wave as Wave,
          traceId,
        );

      return ztrackingSuccess
        ? {
            waveId: wave.waveId,
            waveStatus: wave.waveStatus,
            returnVariables: wave.returnVariables,
          }
        : null;
    } catch (error) {
      this.logger.error(
        `Error executing wave: ${error.message}`,
        traceId,
        'executeWave',
        LogStreamLevel.DebugHeavy,
      );
      throw error;
    }
  }
}
