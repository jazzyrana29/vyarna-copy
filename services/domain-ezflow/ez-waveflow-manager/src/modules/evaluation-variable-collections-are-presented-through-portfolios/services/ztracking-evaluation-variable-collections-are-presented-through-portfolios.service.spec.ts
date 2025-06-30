import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

// Entities
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../../entities/ztracking-evaluation-variable-collections-are-presented-through-portfolios.entity';

// Mocks
import {
  mockZtrackingVersion001,
  mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001,
  mockZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios001,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService', () => {
  let service: ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService;
  let repository: MockType<
    Repository<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
        {
          provide: getRepositoryToken(
            ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios,
          ),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service =
      module.get<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService>(
        ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
      );
    repository = module.get(
      getRepositoryToken(
        ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios,
      ),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity', () => {
    it('should create a ztracking collection entity successfully', async () => {
      const entity =
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001;
      const traceId = 'mockTraceId';

      jest.spyOn(repository, 'save').mockResolvedValue(entity as any);

      const result =
        await service.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          entity,
          traceId,
        );

      expect(result).toBe(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const entity =
        mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001;
      const traceId = 'mockTraceId';

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          entity,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity', () => {
    it('should find ztracking collection entities by criteria', async () => {
      const traceId = 'mockTraceId';
      const evaluationVariableCollectionsArePresentedThroughPortfoliosId =
        mockZtrackingVersion001;
      const mockZtrackingEntities = [
        mockZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios001,
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingEntities as any);

      const result =
        await service.findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          { evaluationVariableCollectionsArePresentedThroughPortfoliosId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingEntities);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = 'mockTraceId';
      const evaluationVariableCollectionsArePresentedThroughPortfoliosId =
        mockZtrackingVersion001;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          { evaluationVariableCollectionsArePresentedThroughPortfoliosId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = 'mockTraceId';
      const evaluationVariableCollectionsArePresentedThroughPortfoliosId =
        mockZtrackingVersion001;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
          { evaluationVariableCollectionsArePresentedThroughPortfoliosId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
