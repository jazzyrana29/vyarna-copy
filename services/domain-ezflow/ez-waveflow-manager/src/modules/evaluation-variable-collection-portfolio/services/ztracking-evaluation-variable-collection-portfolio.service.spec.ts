import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingEvaluationVariableCollectionPortfolioService } from './ztracking-evaluation-variable-collection-portfolio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariableCollectionPortfolio } from '../../../entities/ztracking-evaluation-variable-collection-portfolio.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedEvaluationVariableCollectionPortfolio001,
  mockSavedZtrackingEvaluationVariableCollectionPortfolio001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('ZtrackingEvaluationVariableCollectionPortfolioService', () => {
  let service: ZtrackingEvaluationVariableCollectionPortfolioService;
  let repository: MockType<
    Repository<ZtrackingEvaluationVariableCollectionPortfolio>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariableCollectionPortfolioService,
        {
          provide: getRepositoryToken(
            ZtrackingEvaluationVariableCollectionPortfolio,
          ),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingEvaluationVariableCollectionPortfolioService>(
      ZtrackingEvaluationVariableCollectionPortfolioService,
    );
    repository = module.get(
      getRepositoryToken(ZtrackingEvaluationVariableCollectionPortfolio),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createZtrackingEvaluationVariableCollectionPortfolioEntity', () => {
    it('should create a ztracking evaluation variable collection portfolio entity successfully', async () => {
      const traceId = mockTraceId;
      const portfolio = mockSavedEvaluationVariableCollectionPortfolio001;
      const mockZtrackingPortfolio =
        mockSavedZtrackingEvaluationVariableCollectionPortfolio001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingPortfolio as any);

      const result =
        await service.createZtrackingEvaluationVariableCollectionPortfolioEntity(
          portfolio,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const portfolio = mockSavedEvaluationVariableCollectionPortfolio001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingEvaluationVariableCollectionPortfolioEntity(
          portfolio,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingEvaluationVariableCollectionPortfolioEntity', () => {
    it('should find ztracking evaluation variable collection portfolio entities based on criteria', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionPortfolioId =
        mockSavedZtrackingEvaluationVariableCollectionPortfolio001.evaluationVariableCollectionPortfolioId;
      const mockZtrackingPortfolios = [
        mockSavedZtrackingEvaluationVariableCollectionPortfolio001,
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingPortfolios as any);

      const result =
        await service.findZtrackingEvaluationVariableCollectionPortfolioEntity(
          { evaluationVariableCollectionPortfolioId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingPortfolios);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionPortfolioId =
        mockSavedEvaluationVariableCollectionPortfolio001.evaluationVariableCollectionPortfolioId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingEvaluationVariableCollectionPortfolioEntity(
          { evaluationVariableCollectionPortfolioId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionPortfolioId =
        mockSavedEvaluationVariableCollectionPortfolio001.evaluationVariableCollectionPortfolioId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingEvaluationVariableCollectionPortfolioEntity(
          { evaluationVariableCollectionPortfolioId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
