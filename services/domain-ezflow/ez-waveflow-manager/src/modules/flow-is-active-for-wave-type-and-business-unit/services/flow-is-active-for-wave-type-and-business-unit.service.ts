import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { FlowIsActiveForWaveTypeAndBusinessUnit } from '../../../entities/flow-is-active-for-wave-type-and-business-unit.entity';

import {
  CreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
  DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
  FlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto,
  GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
  UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from 'ez-utils';

import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './ztracking-flow-is-active-for-wave-type-and-business-unit.service';

@Injectable()
export class FlowIsActiveForWaveTypeAndBusinessUnitService {
  private logger = getLoggerConfig(
    FlowIsActiveForWaveTypeAndBusinessUnitService.name,
  );

  constructor(
    @InjectRepository(FlowIsActiveForWaveTypeAndBusinessUnit)
    private readonly flowIsActiveForWaveTypeAndBusinessUnitRepository: Repository<FlowIsActiveForWaveTypeAndBusinessUnit>,
    private readonly ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
  ) {
    this.logger.debug(
      `${FlowIsActiveForWaveTypeAndBusinessUnitService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createFlowIsActiveForWaveTypeAndBusinessUnit(
    createFlowIsActiveForWaveTypeAndBusinessUnitDto: CreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<FlowIsActiveForWaveTypeAndBusinessUnitDto> {
    const { businessUnitId, waveTypeId, activeFlowId } =
      createFlowIsActiveForWaveTypeAndBusinessUnitDto;

    if (!businessUnitId || !waveTypeId || !activeFlowId) {
      this.logger.error(
        'Please provide waveTypeId, businessUnitId, and activeFlowId',
        traceId,
        'createFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide waveTypeId, businessUnitId, and activeFlowId',
      );
    }

    // Check if an entity already exists
    const existingEntity =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.findOne({
        where: { waveTypeId },
      });

    if (existingEntity) {
      if (
        existingEntity.activeFlowId === activeFlowId &&
        existingEntity.businessUnitId
      ) {
        // The entity with the same IDs already exists; do not create
        this.logger.info(
          `Entity already exists with same activeFlowId; no action taken`,
          traceId,
          'createFlowIsActiveForWaveTypeAndBusinessUnit',
          LogStreamLevel.ProdStandard,
        );
        return existingEntity;
      } else {
        await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.remove(
          existingEntity,
        );
        this.logger.info(
          `Existing entity deleted`,
          traceId,
          'createFlowIsActiveForWaveTypeAndBusinessUnit',
          LogStreamLevel.ProdStandard,
        );
      }
    }

    // Create the new entity
    const newEntity =
      this.flowIsActiveForWaveTypeAndBusinessUnitRepository.create(
        createFlowIsActiveForWaveTypeAndBusinessUnitDto,
      );
    const createdEntity =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.save(
        newEntity,
      );

    this.logger.info(
      `New FlowIsActiveForWaveTypeAndBusinessUnit created`,
      traceId,
      'createFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    await this.ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService.createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
      createdEntity,
      traceId,
    );

    return createdEntity;
  }

  async updateFlowIsActiveForWaveTypeAndBusinessUnit(
    updateFlowIsActiveForWaveTypeAndBusinessUnitDto: UpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<FlowIsActiveForWaveTypeAndBusinessUnitDto> {
    const { businessUnitId, waveTypeId } =
      updateFlowIsActiveForWaveTypeAndBusinessUnitDto;
    if (!businessUnitId || !waveTypeId) {
      this.logger.error(
        'Please provide both waveTypeId and businessUnitId',
        traceId,
        'updateFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both waveTypeId and businessUnitId',
      );
    }
    const flowIsActiveForWaveTypeAndBusinessUnit =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.findOne({
        where: {
          businessUnitId,
          waveTypeId,
        },
      });

    if (!flowIsActiveForWaveTypeAndBusinessUnit) {
      this.logger.error(
        `No FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
        traceId,
        'updateFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      );
    }

    const updatedFlowIsActiveForWaveTypeAndBusinessUnit =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.save({
        ...flowIsActiveForWaveTypeAndBusinessUnit,
        ...updateFlowIsActiveForWaveTypeAndBusinessUnitDto,
      });

    this.logger.info(
      `FlowIsActiveForWaveTypeAndBusinessUnit with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId} updated`,
      traceId,
      'updateFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService.createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
        updatedFlowIsActiveForWaveTypeAndBusinessUnit,
        traceId,
      )
    )
      return updatedFlowIsActiveForWaveTypeAndBusinessUnit;
  }

  async deleteFlowIsActiveForWaveTypeAndBusinessUnit(
    deleteFlowIsActiveForWaveTypeAndBusinessUnitDto: DeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<FlowIsActiveForWaveTypeAndBusinessUnitDto> {
    const { businessUnitId, waveTypeId, updatedBy } =
      deleteFlowIsActiveForWaveTypeAndBusinessUnitDto;
    if (!businessUnitId || !waveTypeId || !updatedBy) {
      this.logger.error(
        'Please provide all waveTypeId, businessUnitId and updatedBy',
        traceId,
        'deleteFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide all waveTypeId, businessUnitId and updatedBy',
      );
    }

    const flowIsActiveForWaveTypeAndBusinessUnit =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.findOne({
        where: { businessUnitId, waveTypeId, isDeleted: false },
      });

    if (!flowIsActiveForWaveTypeAndBusinessUnit) {
      this.logger.error(
        `No active FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
        traceId,
        'deleteFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No active FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      );
    }

    flowIsActiveForWaveTypeAndBusinessUnit.isDeleted = true;
    flowIsActiveForWaveTypeAndBusinessUnit.updatedBy = updatedBy;
    const deletedFlowIsActiveForWaveTypeAndBusinessUnit =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.save(
        flowIsActiveForWaveTypeAndBusinessUnit,
      );

    this.logger.info(
      `FlowIsActiveForWaveTypeAndBusinessUnit with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId} marked as deleted`,
      traceId,
      'deleteFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService.createZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit(
        deletedFlowIsActiveForWaveTypeAndBusinessUnit,
        traceId,
      )
    )
      return deletedFlowIsActiveForWaveTypeAndBusinessUnit;
  }

  async getOneFlowIsActiveForWaveTypeAndBusinessUnit(
    getOneFlowIsActiveForWaveTypeAndBusinessUnitDto: GetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<FlowIsActiveForWaveTypeAndBusinessUnitDto> {
    const { businessUnitId, waveTypeId, isDeleted } =
      getOneFlowIsActiveForWaveTypeAndBusinessUnitDto;
    if (!businessUnitId || !waveTypeId) {
      this.logger.error(
        'Please provide both waveTypeId and businessUnitId',
        traceId,
        'getOneFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide both waveTypeId and businessUnitId',
      );
    }

    const where: FindOptionsWhere<FlowIsActiveForWaveTypeAndBusinessUnit> = {};
    if (businessUnitId) where.businessUnitId = businessUnitId;
    if (waveTypeId) where.waveTypeId = waveTypeId;
    where.isDeleted = isDeleted;
    const flowIsActiveForWaveTypeAndBusinessUnit =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.findOne({
        where,
      });

    if (!flowIsActiveForWaveTypeAndBusinessUnit) {
      this.logger.error(
        `No FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
        traceId,
        'getOneFlowIsActiveForWaveTypeAndBusinessUnit',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      );
    }

    this.logger.info(
      `FlowIsActiveForWaveTypeAndBusinessUnit found with businessUnitId: ${businessUnitId} and waveTypeId: ${waveTypeId}`,
      traceId,
      'getOneFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return flowIsActiveForWaveTypeAndBusinessUnit;
  }

  async getManyFlowIsActiveForWaveTypeAndBusinessUnit(
    getManyFlowIsActiveForWaveTypeAndBusinessUnitDto: GetManyFlowIsActiveForWaveTypeAndBusinessUnitDto,
    traceId: string,
  ): Promise<FlowIsActiveForWaveTypeAndBusinessUnitDto[]> {
    const { activeFlowId, waveTypeId, businessUnitId, isDeleted } =
      getManyFlowIsActiveForWaveTypeAndBusinessUnitDto;

    const where: FindOptionsWhere<FlowIsActiveForWaveTypeAndBusinessUnit> = {};

    if (activeFlowId) where.activeFlowId = activeFlowId;
    if (waveTypeId) where.waveTypeId = waveTypeId;
    if (businessUnitId) where.businessUnitId = businessUnitId;
    if (isDeleted !== undefined) where.isDeleted = isDeleted;

    const entities =
      await this.flowIsActiveForWaveTypeAndBusinessUnitRepository.find({
        where,
      });

    this.logger.info(
      `${entities.length} records found in the database`,
      traceId,
      'getManyFlowIsActiveForWaveTypeAndBusinessUnit',
      LogStreamLevel.ProdStandard,
    );

    return entities;
  }
}
