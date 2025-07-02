import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingEvaluationVariableCollectionService } from './ztracking-evaluation-variable-collection.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariableCollection } from '../../../entities/ztracking-evaluation-variable-collection.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedEvaluationVariableCollection001,
  mockSavedZtrackingEvaluationVariableCollection001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('ZtrackingEvaluationVariableCollectionService', () => {
  let service: ZtrackingEvaluationVariableCollectionService;
  let repository: MockType<Repository<ZtrackingEvaluationVariableCollection>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariableCollectionService,
        {
          provide: getRepositoryToken(ZtrackingEvaluationVariableCollection),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingEvaluationVariableCollectionService>(
      ZtrackingEvaluationVariableCollectionService,
    );
    repository = module.get(
      getRepositoryToken(ZtrackingEvaluationVariableCollection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createZtrackingEvaluationVariableCollectionEntity', () => {
    it('should create a ztracking evaluation variable collection entity successfully', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollection =
        mockSavedEvaluationVariableCollection001;
      const mockZtrackingEvaluationVariableCollection =
        mockSavedZtrackingEvaluationVariableCollection001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingEvaluationVariableCollection as any);

      const result =
        await service.createZtrackingEvaluationVariableCollectionEntity(
          evaluationVariableCollection,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollection =
        mockSavedEvaluationVariableCollection001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingEvaluationVariableCollectionEntity(
          evaluationVariableCollection,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingEvaluationVariableCollectionEntity', () => {
    it('should find ztracking evaluation variable collection entities based on criteria', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionId =
        mockSavedZtrackingEvaluationVariableCollection001.evaluationVariableCollectionId;
      const mockZtrackingEvaluationVariableCollections = [
        mockSavedZtrackingEvaluationVariableCollection001,
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingEvaluationVariableCollections as any);

      const result =
        await service.findZtrackingEvaluationVariableCollectionEntity(
          { evaluationVariableCollectionId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingEvaluationVariableCollections);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionId =
        mockSavedEvaluationVariableCollection001.evaluationVariableCollectionId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingEvaluationVariableCollectionEntity(
          { evaluationVariableCollectionId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const evaluationVariableCollectionId =
        mockSavedEvaluationVariableCollection001.evaluationVariableCollectionId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingEvaluationVariableCollectionEntity(
          { evaluationVariableCollectionId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
