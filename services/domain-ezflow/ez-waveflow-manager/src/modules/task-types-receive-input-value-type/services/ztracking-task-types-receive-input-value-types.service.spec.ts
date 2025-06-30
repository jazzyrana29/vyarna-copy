import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingTaskTypesReceiveInputValueTypeService } from './ztracking-task-types-receive-input-value-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingTaskTypesReceiveInputValueType } from '../../../entities/ztracking-task-type-receives-input-value-type.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedTaskTypesReceiveInputValueType001,
  mockSavedZtrackingTaskTypeReceivesInputValue001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { GetHistoryTaskTypesReceiveInputValueTypeDto } from 'ez-utils';

describe('ZtrackingTaskTypesReceiveInputValueTypeService', () => {
  let service: ZtrackingTaskTypesReceiveInputValueTypeService;
  let repository: MockType<Repository<ZtrackingTaskTypesReceiveInputValueType>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingTaskTypesReceiveInputValueTypeService,
        {
          provide: getRepositoryToken(ZtrackingTaskTypesReceiveInputValueType),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingTaskTypesReceiveInputValueTypeService>(
      ZtrackingTaskTypesReceiveInputValueTypeService,
    );
    repository = module.get(
      getRepositoryToken(ZtrackingTaskTypesReceiveInputValueType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createZtrackingTaskTypesReceiveInputValueType', () => {
    it('should create a ztracking task type input value successfully', async () => {
      const traceId = mockTraceId;
      const taskTypesReceiveInputValueType =
        mockSavedTaskTypesReceiveInputValueType001;
      const mockZtrackingInputTypeEntity =
        mockSavedZtrackingTaskTypeReceivesInputValue001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingInputTypeEntity as any);

      const result =
        await service.createZtrackingTaskTypesReceiveInputValueType(
          taskTypesReceiveInputValueType,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const taskTypesReceiveInputValueType =
        mockSavedTaskTypesReceiveInputValueType001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingTaskTypesReceiveInputValueType(
          taskTypesReceiveInputValueType,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingTaskTypesReceiveInputValueTypes', () => {
    it('should find ztracking task type input values based on criteria', async () => {
      const traceId = mockTraceId;
      const taskTypeId =
        mockSavedZtrackingTaskTypeReceivesInputValue001.taskTypeId;
      const inputValueTypeId =
        mockSavedZtrackingTaskTypeReceivesInputValue001.inputValueTypeId;
      const mockZtrackingInputTypes = [
        mockSavedZtrackingTaskTypeReceivesInputValue001,
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingInputTypes as any);

      const result = await service.findZtrackingTaskTypesReceiveInputValueTypes(
        { taskTypeId, inputValueTypeId },
        traceId,
      );

      expect(result).toEqual(mockZtrackingInputTypes);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const taskTypeId = mockSavedTaskTypesReceiveInputValueType001.taskTypeId;
      const inputValueTypeId =
        mockSavedTaskTypesReceiveInputValueType001.inputValueTypeId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingTaskTypesReceiveInputValueTypes(
          { taskTypeId, inputValueTypeId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const taskTypeId = mockSavedTaskTypesReceiveInputValueType001.taskTypeId;
      const inputValueTypeId =
        mockSavedTaskTypesReceiveInputValueType001.inputValueTypeId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingTaskTypesReceiveInputValueTypes(
          { taskTypeId, inputValueTypeId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
