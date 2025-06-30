import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../../entities/ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import {
  mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
  mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
  mockZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
} from '../test-values.spec';

describe('ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService', () => {
  let service: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService;
  let repository: Repository<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
        {
          provide: getRepositoryToken(
            ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
          ),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service =
      module.get<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService>(
        ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
      );
    repository = module.get<
      Repository<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection>
    >(
      getRepositoryToken(
        ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      ),
    );
  });

  describe('createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should save the Ztracking entity and return true', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValue(
          mockZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        );

      const result =
        await service.createZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
          mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should return a list of Ztracking entities', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValue([
          mockZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
        ]);

      const result =
        await service.getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        );

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
            mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
        },
      });
      expect(result).toEqual([
        mockZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
      ]);
    });

    it('should throw NotFoundException if no entities found', async () => {
      repository.find = jest.fn().mockResolvedValue([]);

      await expect(
        service.getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
          mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
          mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
        ),
      ).rejects.toThrow(NotFoundException);

      expect(repository.find).toHaveBeenCalled();
    });
  });
});
