import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../../entities/evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';

import {
  AddEvaluationVariableToCollectionDto,
  CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';

@Injectable()
export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService {
  private logger = getLoggerConfig(
    EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.name,
  );

  constructor(
    @InjectRepository(
      EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    )
    private readonly evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository: Repository<EvaluationVariableIsGroupedThroughEvaluationVariableCollection>,
    private readonly ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService, // Injecting ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService
  ) {
    this.logger.debug(
      `${EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    createEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto> {
    const createdEvaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
        this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.create(
          createEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        ),
      );

    this.logger.info(
      `EvaluationVariableIsGroupedThroughEvaluationVariableCollection created with ID: ${createdEvaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      traceId,
      'createEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        createdEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        traceId,
      )
    )
      return createdEvaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }

  async updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    updateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto> {
    const evaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.findOne(
        {
          where: {
            evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
              updateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
          },
        },
      );

    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${updateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
        traceId,
        'updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${updateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      );
    }

    const updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
        {
          ...evaluationVariableIsGroupedThroughEvaluationVariableCollection,
          ...updateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        },
      );

    this.logger.info(
      `EvaluationVariableIsGroupedThroughEvaluationVariableCollection with ID: ${updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId} updated`,
      traceId,
      'updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        traceId,
      )
    )
      return updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }

  async deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    {
      evaluationVariableIsGroupedThroughEvaluationVariableCollectionId = '',
      updatedBy = '',
    }: DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto> {
    if (
      !evaluationVariableIsGroupedThroughEvaluationVariableCollectionId ||
      !updatedBy
    ) {
      this.logger.error(
        'You need to provide both evaluationVariableIsGroupedThroughEvaluationVariableCollectionId and updatedBy',
        traceId,
        'deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'You need to provide both evaluationVariableIsGroupedThroughEvaluationVariableCollectionId and updatedBy',
      );
    }

    const evaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.findOne(
        {
          where: {
            evaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
          },
        },
      );

    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
        traceId,
        'deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      );
    }

    evaluationVariableIsGroupedThroughEvaluationVariableCollection.isDeleted = true;
    evaluationVariableIsGroupedThroughEvaluationVariableCollection.updatedBy =
      updatedBy;
    const deletedEvaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
        evaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );

    this.logger.info(
      `EvaluationVariableIsGroupedThroughEvaluationVariableCollection with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId} marked as deleted`,
      traceId,
      'deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    // Track changes
    if (
      await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        deletedEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        traceId,
      )
    )
      return deletedEvaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }

  async getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
    {
      evaluationVariableIsGroupedThroughEvaluationVariableCollectionId = '',
      isDeleted = false,
    }: GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto> {
    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollectionId) {
      this.logger.error(
        'Provide evaluationVariableIsGroupedThroughEvaluationVariableCollectionId',
        traceId,
        'getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Provide evaluationVariableIsGroupedThroughEvaluationVariableCollectionId',
      );
    }

    const where: FindOptionsWhere<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> =
      {};
    if (evaluationVariableIsGroupedThroughEvaluationVariableCollectionId)
      where.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId =
        evaluationVariableIsGroupedThroughEvaluationVariableCollectionId;
    where.isDeleted = isDeleted;

    const evaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.findOne(
        {
          where,
        },
      );

    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
        traceId,
        'getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      );
    }

    this.logger.info(
      `EvaluationVariableIsGroupedThroughEvaluationVariableCollection found with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
      traceId,
      'getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }

  async addEvaluationVariableToCollection(
    {
      evaluationVariableId = '',
      evaluationVariableCollectionId = '',
    }: AddEvaluationVariableToCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
    if (!evaluationVariableId || !evaluationVariableCollectionId) {
      this.logger.error(
        'Provide both evaluationVariableId and evaluationVariableCollectionId',
        traceId,
        'addEvaluationVariableToCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Provide both evaluationVariableId and evaluationVariableCollectionId',
      );
    }

    let evaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.findOne(
        {
          where: {
            evaluationVariable: { evaluationVariableId },
            evaluationVariableCollection: { evaluationVariableCollectionId },
          },
        },
      );

    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollection) {
      // Relationship does not exist, create a new one
      evaluationVariableIsGroupedThroughEvaluationVariableCollection =
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
          this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.create(
            {
              evaluationVariable: { evaluationVariableId },
              evaluationVariableCollection: { evaluationVariableCollectionId },
            },
          ),
        );

      this.logger.info(
        `New EvaluationVariableIsGroupedThroughEvaluationVariableCollection created with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId}`,
        traceId,
        'addEvaluationVariableToCollection',
        LogStreamLevel.ProdStandard,
      );
    } else if (
      evaluationVariableIsGroupedThroughEvaluationVariableCollection.isDeleted
    ) {
      // Relationship exists but is deleted, update it to mark it as not deleted
      evaluationVariableIsGroupedThroughEvaluationVariableCollection.isDeleted = false;
      evaluationVariableIsGroupedThroughEvaluationVariableCollection =
        await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
          evaluationVariableIsGroupedThroughEvaluationVariableCollection,
        );

      this.logger.info(
        `Existing EvaluationVariableIsGroupedThroughEvaluationVariableCollection with ID: ${evaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId} marked as not deleted`,
        traceId,
        'addEvaluationVariableToCollection',
        LogStreamLevel.ProdStandard,
      );
    }

    // Track changes via ztracking
    if (
      await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        evaluationVariableIsGroupedThroughEvaluationVariableCollection,
        traceId,
      )
    )
      return evaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }

  async removeEvaluationVariableToCollection(
    {
      evaluationVariableId = '',
      evaluationVariableCollectionId = '',
    }: AddEvaluationVariableToCollectionDto, // Reusing DTO as the parameters are the same
    traceId: string,
  ): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
    if (!evaluationVariableId || !evaluationVariableCollectionId) {
      this.logger.error(
        'Provide both evaluationVariableId and evaluationVariableCollectionId',
        traceId,
        'removeEvaluationVariableToCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Provide both evaluationVariableId and evaluationVariableCollectionId',
      );
    }

    const evaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.findOne(
        {
          where: {
            evaluationVariable: { evaluationVariableId },
            evaluationVariableCollection: { evaluationVariableCollectionId },
            isDeleted: false, // Find only active relationships
          },
        },
      );

    if (!evaluationVariableIsGroupedThroughEvaluationVariableCollection) {
      this.logger.error(
        `No active relationship found for EvaluationVariableId: ${evaluationVariableId} and EvaluationVariableCollectionId: ${evaluationVariableCollectionId}`,
        traceId,
        'removeEvaluationVariableToCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No active relationship found for EvaluationVariableId: ${evaluationVariableId} and EvaluationVariableCollectionId: ${evaluationVariableCollectionId}`,
      );
    }

    // Mark the relationship as deleted
    evaluationVariableIsGroupedThroughEvaluationVariableCollection.isDeleted = true;
    const updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection =
      await this.evaluationVariableIsGroupedThroughEvaluationVariableCollectionRepository.save(
        evaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );

    this.logger.info(
      `EvaluationVariableIsGroupedThroughEvaluationVariableCollection with ID: ${updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId} marked as deleted`,
      traceId,
      'removeEvaluationVariableToCollection',
      LogStreamLevel.ProdStandard,
    );

    // Track changes via ztracking
    if (
      await this.ztrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        traceId,
      )
    )
      return updatedEvaluationVariableIsGroupedThroughEvaluationVariableCollection;
  }
}
