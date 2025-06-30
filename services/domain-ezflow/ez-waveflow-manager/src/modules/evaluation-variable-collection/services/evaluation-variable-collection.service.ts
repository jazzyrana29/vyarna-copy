import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollection } from '../../../entities/evaluation-variable-collection.entity';

import {
  GetManyEvaluationVariableCollectionsDto,
  GetOneEvaluationVariableCollectionDto,
  CreateEvaluationVariableCollectionDto,
  UpdateEvaluationVariableCollectionDto,
  DeleteEvaluationVariableCollectionDto,
  EvaluationVariableCollectionDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariableCollectionService } from './ztracking-evaluation-variable-collection.service';

@Injectable()
export class EvaluationVariableCollectionService {
  private logger = getLoggerConfig(EvaluationVariableCollectionService.name);

  constructor(
    @InjectRepository(EvaluationVariableCollection)
    private readonly evaluationVariableCollectionRepository: Repository<EvaluationVariableCollection>,
    private readonly ztrackingEvaluationVariableCollectionService: ZtrackingEvaluationVariableCollectionService, // Inject Ztracking Service
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollection(
    createEvaluationVariableCollectionDto: CreateEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionDto> {
    const { name, description, updatedBy } =
      createEvaluationVariableCollectionDto;

    const evaluationVariableCollection =
      this.evaluationVariableCollectionRepository.create({
        name,
        description,
        updatedBy,
      });

    await this.evaluationVariableCollectionRepository.save(
      evaluationVariableCollection,
    );

    this.logger.info(
      `EvaluationVariableCollection created with ID: ${evaluationVariableCollection.evaluationVariableCollectionId}`,
      traceId,
      'createEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    const savedCollection =
      await this.ztrackingEvaluationVariableCollectionService.createZtrackingEvaluationVariableCollectionEntity(
        evaluationVariableCollection,
        traceId,
      );

    if (savedCollection) return evaluationVariableCollection;
  }
  async updateEvaluationVariableCollection(
    updateEvaluationVariableCollectionDto: UpdateEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionDto> {
    const { evaluationVariableCollectionId, name, description, updatedBy } =
      updateEvaluationVariableCollectionDto;

    const evaluationVariableCollection =
      await this.evaluationVariableCollectionRepository.findOne({
        where: { evaluationVariableCollectionId },
      });

    if (!evaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId}`,
        traceId,
        'updateEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId}`,
      );
    }

    evaluationVariableCollection.name = name;
    evaluationVariableCollection.description = description;
    evaluationVariableCollection.updatedBy = updatedBy;

    await this.evaluationVariableCollectionRepository.save(
      evaluationVariableCollection,
    );

    this.logger.info(
      `EvaluationVariableCollection with ID: ${evaluationVariableCollectionId} updated`,
      traceId,
      'updateEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    const savedCollection =
      await this.ztrackingEvaluationVariableCollectionService.createZtrackingEvaluationVariableCollectionEntity(
        evaluationVariableCollection,
        traceId,
      );

    if (savedCollection) return evaluationVariableCollection;
  }

  async deleteEvaluationVariableCollection(
    deleteEvaluationVariableCollectionDto: DeleteEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<void> {
    const { evaluationVariableCollectionId } =
      deleteEvaluationVariableCollectionDto;
    const evaluationVariableCollection =
      await this.evaluationVariableCollectionRepository.findOne({
        where: { evaluationVariableCollectionId },
      });

    if (!evaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId}`,
        traceId,
        'deleteEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId}`,
      );
    }

    evaluationVariableCollection.isDeleted = true;

    await this.evaluationVariableCollectionRepository.save(
      evaluationVariableCollection,
    );

    this.logger.info(
      `EvaluationVariableCollection with ID: ${evaluationVariableCollectionId} marked as deleted`,
      traceId,
      'deleteEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );
  }

  async getOneEvaluationVariableCollection(
    getOneEvaluationVariableCollectionDto: GetOneEvaluationVariableCollectionDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionDto> {
    const { evaluationVariableCollectionId, name } =
      getOneEvaluationVariableCollectionDto;

    if (!evaluationVariableCollectionId && !name) {
      this.logger.error(
        'Either provide evaluationVariableCollectionId or name',
        traceId,
        'getOneEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Either provide evaluationVariableCollectionId or name',
      );
    }

    const condition: FindOptionsWhere<EvaluationVariableCollection> = {};
    if (name) condition.name = name;
    if (evaluationVariableCollectionId)
      condition.evaluationVariableCollectionId = evaluationVariableCollectionId;

    const evaluationVariableCollection =
      await this.evaluationVariableCollectionRepository.findOne({
        where: condition,
      });

    if (!evaluationVariableCollection) {
      this.logger.error(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId} or name: ${name}`,
        traceId,
        'getOneEvaluationVariableCollection',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId} or name: ${name}`,
      );
    }

    this.logger.info(
      `EvaluationVariableCollection found with ID: ${evaluationVariableCollectionId}`,
      traceId,
      'getOneEvaluationVariableCollection',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableCollection;
  }

  async getManyEvaluationVariableCollections(
    getManyEvaluationVariableCollectionsDto: GetManyEvaluationVariableCollectionsDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionDto[]> {
    const { isDeleted } = getManyEvaluationVariableCollectionsDto;
    const evaluationVariableCollections =
      await this.evaluationVariableCollectionRepository.find({
        where: { isDeleted },
      });

    this.logger.info(
      `${evaluationVariableCollections.length} EvaluationVariableCollections found in the database`,
      traceId,
      'getManyEvaluationVariableCollections',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableCollections;
  }
}
