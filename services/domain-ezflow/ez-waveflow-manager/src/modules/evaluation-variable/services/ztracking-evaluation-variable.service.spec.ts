import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingEvaluationVariableService } from './ztracking-evaluation-variable.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingEvaluationVariable } from '../../../entities/ztracking-evaluation-variable.entity';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedEvaluationVariable001,
  mockSavedZtrackingEvaluationVariable001,
  mockTraceId,
} from '../test-values.spec';

describe('ZtrackingEvaluationVariableService', () => {
  let ztrackingEvaluationVariableService: ZtrackingEvaluationVariableService;
  let ztrackingEvaluationVariableRepository: MockType<
    Repository<ZtrackingEvaluationVariable>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingEvaluationVariableService,
        {
          provide: getRepositoryToken(ZtrackingEvaluationVariable),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ztrackingEvaluationVariableService =
      module.get<ZtrackingEvaluationVariableService>(
        ZtrackingEvaluationVariableService,
      );
    ztrackingEvaluationVariableRepository = module.get(
      getRepositoryToken(ZtrackingEvaluationVariable),
    );
  });

  it('should be defined', () => {
    expect(ztrackingEvaluationVariableService).toBeDefined();
  });

  describe('createZtrackingEvaluationVariableEntity', () => {
    it('should create a ztracking evaluation variable entity successfully', async () => {
      const traceId = mockTraceId;
      const evaluationVariable = mockSavedEvaluationVariable001;
      const mockZtrackingEvaluationVariable =
        mockSavedZtrackingEvaluationVariable001;

      jest
        .spyOn(ztrackingEvaluationVariableRepository, 'save')
        .mockResolvedValue(mockZtrackingEvaluationVariable as any);

      const result =
        await ztrackingEvaluationVariableService.createZtrackingEvaluationVariableEntity(
          evaluationVariable,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const evaluationVariable = mockSavedEvaluationVariable001;

      jest
        .spyOn(ztrackingEvaluationVariableRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingEvaluationVariableService.createZtrackingEvaluationVariableEntity(
          evaluationVariable,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingEvaluationVariableEntity', () => {
    it('should find ztracking evaluation variable entities based on criteria', async () => {
      const traceId = mockTraceId;
      const evaluationVariableId =
        mockSavedZtrackingEvaluationVariable001.evaluationVariableId;
      const mockZtrackingEvaluationVariables = [
        mockSavedZtrackingEvaluationVariable001,
      ];

      jest
        .spyOn(ztrackingEvaluationVariableRepository, 'find')
        .mockResolvedValue(mockZtrackingEvaluationVariables as any);

      const result =
        await ztrackingEvaluationVariableService.findZtrackingEvaluationVariableEntity(
          { evaluationVariableId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingEvaluationVariables);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const evaluationVariableId =
        mockSavedEvaluationVariable001.evaluationVariableId;

      jest
        .spyOn(ztrackingEvaluationVariableRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingEvaluationVariableService.findZtrackingEvaluationVariableEntity(
          { evaluationVariableId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const evaluationVariableId =
        mockSavedEvaluationVariable001.evaluationVariableId;

      jest
        .spyOn(ztrackingEvaluationVariableRepository, 'find')
        .mockResolvedValue([]);

      await expect(
        ztrackingEvaluationVariableService.findZtrackingEvaluationVariableEntity(
          { evaluationVariableId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
