import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../../entities/evaluation-variable-collections-are-presented-through-portfolios.entity';

import {
  GetManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  GetOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  CreateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  UpdateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  DeleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  EvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
  AddEvaluationVariableCollectionToPortfolioDto,
  RemoveEvaluationVariableCollectionToPortfolioDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';

@Injectable()
export class EvaluationVariableCollectionsArePresentedThroughPortfoliosService {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionsArePresentedThroughPortfoliosService.name,
  );

  constructor(
    @InjectRepository(
      EvaluationVariableCollectionsArePresentedThroughPortfolios,
    )
    private readonly evaluationVariableCollectionsArePresentedThroughPortfoliosRepository: Repository<EvaluationVariableCollectionsArePresentedThroughPortfolios>,
    private readonly ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService: ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionsArePresentedThroughPortfoliosService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollectionsArePresentedThroughPortfolios(
    createEvaluationVariableCollectionsArePresentedThroughPortfoliosDto: CreateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfoliosDto> {
    const {
      evaluationVariableCollectionPortfolio,
      evaluationVariableCollection,
      updatedBy,
    } = createEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
    const { evaluationVariableCollectionPortfolioId } =
      evaluationVariableCollectionPortfolio;
    const { evaluationVariableCollectionId } = evaluationVariableCollection;

    const evaluationVariableCollectionsArePresentedThroughPortfolios =
      this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.create(
        {
          evaluationVariableCollectionPortfolio: {
            evaluationVariableCollectionPortfolioId,
          } as any,
          evaluationVariableCollection: {
            evaluationVariableCollectionId,
          } as any,
          updatedBy,
        },
      );

    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.save(
      evaluationVariableCollectionsArePresentedThroughPortfolios,
    );

    this.logger.info(
      `EvaluationVariableCollectionsArePresentedThroughPortfolios created with ID: ${evaluationVariableCollectionsArePresentedThroughPortfolios.evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
      traceId,
      'createEvaluationVariableCollectionsArePresentedThroughPortfolios',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
        evaluationVariableCollectionsArePresentedThroughPortfolios,
        traceId,
      )
    )
      return evaluationVariableCollectionsArePresentedThroughPortfolios;
  }

  async updateEvaluationVariableCollectionsArePresentedThroughPortfolios(
    updateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto: UpdateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfoliosDto> {
    const {
      evaluationVariableCollectionsArePresentedThroughPortfoliosId,
      evaluationVariableCollectionPortfolio,
      evaluationVariableCollection,
      updatedBy,
    } = updateEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
    const { evaluationVariableCollectionPortfolioId } =
      evaluationVariableCollectionPortfolio;
    const { evaluationVariableCollectionId } = evaluationVariableCollection;

    const evaluationVariableCollectionsArePresentedThroughPortfolios =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.findOne(
        {
          where: {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId,
          },
        },
      );

    if (!evaluationVariableCollectionsArePresentedThroughPortfolios) {
      this.logger.error(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
        traceId,
        'updateEvaluationVariableCollectionsArePresentedThroughPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
      );
    }

    evaluationVariableCollectionsArePresentedThroughPortfolios.evaluationVariableCollectionPortfolio =
      { evaluationVariableCollectionPortfolioId } as any;
    evaluationVariableCollectionsArePresentedThroughPortfolios.evaluationVariableCollection =
      { evaluationVariableCollectionId } as any;
    evaluationVariableCollectionsArePresentedThroughPortfolios.updatedBy =
      updatedBy;

    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.save(
      evaluationVariableCollectionsArePresentedThroughPortfolios,
    );

    this.logger.info(
      `EvaluationVariableCollectionsArePresentedThroughPortfolios with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId} updated`,
      traceId,
      'updateEvaluationVariableCollectionsArePresentedThroughPortfolios',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
        evaluationVariableCollectionsArePresentedThroughPortfolios,
        traceId,
      )
    )
      return evaluationVariableCollectionsArePresentedThroughPortfolios;
  }

  async deleteEvaluationVariableCollectionsArePresentedThroughPortfolios(
    deleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto: DeleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<void> {
    const { evaluationVariableCollectionsArePresentedThroughPortfoliosId } =
      deleteEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
    const evaluationVariableCollectionsArePresentedThroughPortfolios =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.findOne(
        {
          where: {
            evaluationVariableCollectionsArePresentedThroughPortfoliosId,
          },
        },
      );

    if (!evaluationVariableCollectionsArePresentedThroughPortfolios) {
      this.logger.error(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
        traceId,
        'deleteEvaluationVariableCollectionsArePresentedThroughPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
      );
    }

    evaluationVariableCollectionsArePresentedThroughPortfolios.isDeleted = true;

    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.save(
      evaluationVariableCollectionsArePresentedThroughPortfolios,
    );

    this.logger.info(
      `EvaluationVariableCollectionsArePresentedThroughPortfolios with ID: ${evaluationVariableCollectionsArePresentedThroughPortfoliosId} marked as deleted`,
      traceId,
      'deleteEvaluationVariableCollectionsArePresentedThroughPortfolios',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
      evaluationVariableCollectionsArePresentedThroughPortfolios,
      traceId,
    );
  }

  async getOneEvaluationVariableCollectionsArePresentedThroughPortfolios(
    getOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto: GetOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfoliosDto> {
    const { evaluationVariableCollectionsArePresentedThroughPortfoliosId } =
      getOneEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;

    if (!evaluationVariableCollectionsArePresentedThroughPortfoliosId) {
      this.logger.error(
        'Either provide evaluationVariableCollectionsArePresentedThroughPortfoliosId or both evaluationVariableCollectionPortfolioId and evaluationVariableCollectionId',
        traceId,
        'getOneEvaluationVariableCollectionsArePresentedThroughPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Either provide evaluationVariableCollectionsArePresentedThroughPortfoliosId or both evaluationVariableCollectionPortfolioId and evaluationVariableCollectionId',
      );
    }

    const condition: FindOptionsWhere<EvaluationVariableCollectionsArePresentedThroughPortfolios> =
      {};
    if (evaluationVariableCollectionsArePresentedThroughPortfoliosId)
      condition.evaluationVariableCollectionsArePresentedThroughPortfoliosId =
        evaluationVariableCollectionsArePresentedThroughPortfoliosId;

    condition.isDeleted = false;

    const evaluationVariableCollectionsArePresentedThroughPortfolios =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.findOne(
        {
          where: condition,
        },
      );

    if (!evaluationVariableCollectionsArePresentedThroughPortfolios) {
      this.logger.error(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with the provided criteria`,
        traceId,
        'getOneEvaluationVariableCollectionsArePresentedThroughPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionsArePresentedThroughPortfolios found with the provided criteria`,
      );
    }

    this.logger.info(
      `EvaluationVariableCollectionsArePresentedThroughPortfolios found with ID: ${evaluationVariableCollectionsArePresentedThroughPortfolios.evaluationVariableCollectionsArePresentedThroughPortfoliosId}`,
      traceId,
      'getOneEvaluationVariableCollectionsArePresentedThroughPortfolios',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableCollectionsArePresentedThroughPortfolios;
  }

  async getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
    getManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto: GetManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfoliosDto[]> {
    const { evaluationVariableCollectionPortfolio, isDeleted } =
      getManyEvaluationVariableCollectionsArePresentedThroughPortfoliosDto;
    const { evaluationVariableCollectionPortfolioId } =
      evaluationVariableCollectionPortfolio;

    if (!evaluationVariableCollectionPortfolioId) {
      this.logger.error(
        'Please provide evaluationVariableCollectionPortfolioId',
        traceId,
        'getManyEvaluationVariableCollectionsArePresentedThroughPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Please provide evaluationVariableCollectionPortfolioId',
      );
    }

    const evaluationVariableCollectionsArePresentedThroughPortfolios =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.find(
        {
          where: {
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId,
            } as any,
            isDeleted,
          },
        },
      );

    this.logger.info(
      `${evaluationVariableCollectionsArePresentedThroughPortfolios.length} EvaluationVariableCollectionsArePresentedThroughPortfolios found in the database`,
      traceId,
      'getManyEvaluationVariableCollectionsArePresentedThroughPortfolios',
      LogStreamLevel.ProdStandard,
    );

    return evaluationVariableCollectionsArePresentedThroughPortfolios;
  }

  async addEvaluationVariableCollectionToPortfolio(
    {
      evaluationVariableCollectionId,
      evaluationVariableCollectionPortfolioId,
    }: AddEvaluationVariableCollectionToPortfolioDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
    if (
      !evaluationVariableCollectionId ||
      !evaluationVariableCollectionPortfolioId
    ) {
      this.logger.error(
        'CollectionId and PortfolioId cannot be null.',
        traceId,
        'addEvaluationVariableCollectionToPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'CollectionId and PortfolioId cannot be null.',
      );
    }

    let entity =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.findOne(
        {
          where: {
            evaluationVariableCollection: { evaluationVariableCollectionId },
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId,
            },
          },
        },
      );

    if (entity && entity.isDeleted) {
      entity.isDeleted = false;
    } else if (!entity) {
      entity =
        this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.create(
          {
            evaluationVariableCollection: { evaluationVariableCollectionId },
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId,
            },
          },
        );
    }

    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.save(
      entity,
    );

    this.logger.info(
      `EvaluationVariableCollection been added or updated for Collection ID: ${evaluationVariableCollectionId} and Portfolio ID: ${evaluationVariableCollectionPortfolioId}.`,
      traceId,
      'addEvaluationVariableCollectionToPortfolio',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
      entity,
      traceId,
    );

    return entity;
  }

  async removeEvaluationVariableCollectionToPortfolio(
    {
      evaluationVariableCollectionId,
      evaluationVariableCollectionPortfolioId,
    }: RemoveEvaluationVariableCollectionToPortfolioDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
    if (
      !evaluationVariableCollectionId ||
      !evaluationVariableCollectionPortfolioId
    ) {
      this.logger.error(
        'CollectionId and PortfolioId cannot be null.',
        traceId,
        'removeEvaluationVariableCollectionToPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'CollectionId and PortfolioId cannot be null.',
      );
    }

    const entity =
      await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.findOne(
        {
          where: {
            evaluationVariableCollection: { evaluationVariableCollectionId },
            evaluationVariableCollectionPortfolio: {
              evaluationVariableCollectionPortfolioId,
            },
            isDeleted: false,
          },
        },
      );

    if (!entity) {
      this.logger.error(
        'No such entry found.',
        traceId,
        'removeEvaluationVariableCollectionToPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException('No such entry found.');
    }

    entity.isDeleted = true;

    await this.evaluationVariableCollectionsArePresentedThroughPortfoliosRepository.save(
      entity,
    );

    this.logger.info(
      `EvaluationVariableCollection marked as deleted for Collection ID: ${evaluationVariableCollectionId} and Portfolio ID: ${evaluationVariableCollectionPortfolioId}.`,
      traceId,
      'removeEvaluationVariableCollectionToPortfolio',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
      entity,
      traceId,
    );

    return entity;
  }
}
