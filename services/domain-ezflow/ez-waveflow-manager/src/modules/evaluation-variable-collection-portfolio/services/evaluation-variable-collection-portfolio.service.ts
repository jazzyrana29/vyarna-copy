import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { EvaluationVariableCollectionPortfolio } from '../../../entities/evaluation-variable-collection-portfolio.entity';

import {
  GetManyEvaluationVariableCollectionPortfoliosDto,
  GetOneEvaluationVariableCollectionPortfolioDto,
  CreateEvaluationVariableCollectionPortfolioDto,
  UpdateEvaluationVariableCollectionPortfolioDto,
  DeleteEvaluationVariableCollectionPortfolioDto,
  EvaluationVariableCollectionPortfolioDto,
} from 'ez-utils';

import { ZtrackingEvaluationVariableCollectionPortfolioService } from './ztracking-evaluation-variable-collection-portfolio.service';

@Injectable()
export class EvaluationVariableCollectionPortfolioService {
  private logger = getLoggerConfig(
    EvaluationVariableCollectionPortfolioService.name,
  );

  constructor(
    @InjectRepository(EvaluationVariableCollectionPortfolio)
    private readonly evaluationVariableCollectionPortfolioRepository: Repository<EvaluationVariableCollectionPortfolio>,
    private readonly ztrackingEvaluationVariableCollectionPortfolioService: ZtrackingEvaluationVariableCollectionPortfolioService,
  ) {
    this.logger.debug(
      `${EvaluationVariableCollectionPortfolioService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createEvaluationVariableCollectionPortfolio(
    createEvaluationVariableCollectionPortfolioDto: CreateEvaluationVariableCollectionPortfolioDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionPortfolioDto> {
    const { businessUnitId, name, description, updatedBy } =
      createEvaluationVariableCollectionPortfolioDto;
    const evaluationVariableCollectionPortfolio =
      this.evaluationVariableCollectionPortfolioRepository.create({
        businessUnitId,
        name,
        description,
        updatedBy,
      });

    await this.evaluationVariableCollectionPortfolioRepository.save(
      evaluationVariableCollectionPortfolio,
    );
    this.logger.info(
      `EvaluationVariableCollectionPortfolio created with ID: ${evaluationVariableCollectionPortfolio.evaluationVariableCollectionPortfolioId}`,
      traceId,
      'createEvaluationVariableCollectionPortfolio',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariableCollectionPortfolioService.createZtrackingEvaluationVariableCollectionPortfolioEntity(
        evaluationVariableCollectionPortfolio,
        traceId,
      )
    ) {
      return evaluationVariableCollectionPortfolio;
    }
  }
  async updateEvaluationVariableCollectionPortfolio(
    updateEvaluationVariableCollectionPortfolioDto: UpdateEvaluationVariableCollectionPortfolioDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionPortfolioDto> {
    const {
      evaluationVariableCollectionPortfolioId,
      name,
      description,
      updatedBy,
    } = updateEvaluationVariableCollectionPortfolioDto;

    const evaluationVariableCollectionPortfolio =
      await this.evaluationVariableCollectionPortfolioRepository.findOne({
        where: { evaluationVariableCollectionPortfolioId, isDeleted: false },
      });

    if (!evaluationVariableCollectionPortfolio) {
      this.logger.error(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId}`,
        traceId,
        'updateEvaluationVariableCollectionPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId}`,
      );
    }

    evaluationVariableCollectionPortfolio.name = name;
    evaluationVariableCollectionPortfolio.description = description;
    evaluationVariableCollectionPortfolio.updatedBy = updatedBy;

    await this.evaluationVariableCollectionPortfolioRepository.save(
      evaluationVariableCollectionPortfolio,
    );
    this.logger.info(
      `EvaluationVariableCollectionPortfolio with ID: ${evaluationVariableCollectionPortfolioId} updated`,
      traceId,
      'updateEvaluationVariableCollectionPortfolio',
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingEvaluationVariableCollectionPortfolioService.createZtrackingEvaluationVariableCollectionPortfolioEntity(
        evaluationVariableCollectionPortfolio,
        traceId,
      )
    ) {
      return evaluationVariableCollectionPortfolio;
    }
  }

  async deleteEvaluationVariableCollectionPortfolio(
    deleteEvaluationVariableCollectionPortfolioDto: DeleteEvaluationVariableCollectionPortfolioDto,
    traceId: string,
  ): Promise<void> {
    const { evaluationVariableCollectionPortfolioId } =
      deleteEvaluationVariableCollectionPortfolioDto;
    const evaluationVariableCollectionPortfolio =
      await this.evaluationVariableCollectionPortfolioRepository.findOne({
        where: { evaluationVariableCollectionPortfolioId, isDeleted: false },
      });

    if (!evaluationVariableCollectionPortfolio) {
      this.logger.error(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId}`,
        traceId,
        'deleteEvaluationVariableCollectionPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId}`,
      );
    }

    evaluationVariableCollectionPortfolio.isDeleted = true;
    await this.evaluationVariableCollectionPortfolioRepository.save(
      evaluationVariableCollectionPortfolio,
    );
    this.logger.info(
      `EvaluationVariableCollectionPortfolio with ID: ${evaluationVariableCollectionPortfolioId} marked as deleted`,
      traceId,
      'deleteEvaluationVariableCollectionPortfolio',
      LogStreamLevel.ProdStandard,
    );

    await this.ztrackingEvaluationVariableCollectionPortfolioService.createZtrackingEvaluationVariableCollectionPortfolioEntity(
      evaluationVariableCollectionPortfolio,
      traceId,
    );
  }

  async getOneEvaluationVariableCollectionPortfolio(
    getOneEvaluationVariableCollectionPortfolioDto: GetOneEvaluationVariableCollectionPortfolioDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionPortfolioDto> {
    const { evaluationVariableCollectionPortfolioId, name } =
      getOneEvaluationVariableCollectionPortfolioDto;

    if (!evaluationVariableCollectionPortfolioId && !name) {
      this.logger.error(
        'Either provide evaluationVariableCollectionPortfolioId or name',
        traceId,
        'getOneEvaluationVariableCollectionPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException(
        'Either provide evaluationVariableCollectionPortfolioId or name',
      );
    }

    const condition: FindOptionsWhere<EvaluationVariableCollectionPortfolio> =
      {};
    if (name) condition.name = name;
    if (evaluationVariableCollectionPortfolioId)
      condition.evaluationVariableCollectionPortfolioId =
        evaluationVariableCollectionPortfolioId;
    condition.isDeleted = false;

    const evaluationVariableCollectionPortfolio =
      await this.evaluationVariableCollectionPortfolioRepository.findOne({
        where: condition,
      });

    if (!evaluationVariableCollectionPortfolio) {
      this.logger.error(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId} or name: ${name}`,
        traceId,
        'getOneEvaluationVariableCollectionPortfolio',
        LogStreamLevel.DebugHeavy,
      );
      throw new NotFoundException(
        `No EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId} or name: ${name}`,
      );
    }

    this.logger.info(
      `EvaluationVariableCollectionPortfolio found with ID: ${evaluationVariableCollectionPortfolioId}`,
      traceId,
      'getOneEvaluationVariableCollectionPortfolio',
      LogStreamLevel.ProdStandard,
    );
    return evaluationVariableCollectionPortfolio;
  }

  async getManyEvaluationVariableCollectionPortfolios(
    getManyEvaluationVariableCollectionPortfoliosDto: GetManyEvaluationVariableCollectionPortfoliosDto,
    traceId: string,
  ): Promise<EvaluationVariableCollectionPortfolioDto[]> {
    const { businessUnitId, isDeleted } =
      getManyEvaluationVariableCollectionPortfoliosDto;

    if (!businessUnitId) {
      this.logger.error(
        'Please provide businessUnitId',
        traceId,
        'getManyEvaluationVariableCollectionPortfolios',
        LogStreamLevel.DebugHeavy,
      );
      throw new BadRequestException('Please provide businessUnitId');
    }

    const evaluationVariableCollectionPortfolios =
      await this.evaluationVariableCollectionPortfolioRepository.find({
        where: { businessUnitId, isDeleted },
      });

    this.logger.info(
      `${evaluationVariableCollectionPortfolios.length} EvaluationVariableCollectionPortfolios found in the database`,
      traceId,
      'getManyEvaluationVariableCollectionPortfolios',
      LogStreamLevel.ProdStandard,
    );
    return evaluationVariableCollectionPortfolios;
  }
}
