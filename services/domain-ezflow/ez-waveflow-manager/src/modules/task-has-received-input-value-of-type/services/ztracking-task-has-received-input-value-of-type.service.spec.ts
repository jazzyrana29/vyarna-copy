import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingTaskHasReceiveInputValueOfTypeService } from './ztracking-task-has-received-input-value-of-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingTaskHasReceiveInputValueOfType } from '../../../entities/ztracking-task-has-received-input-value-of-type.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedTaskHasReceivedInputValueOfType001,
  mockSavedZtrackingTaskHasReceivedInputValue001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';

describe('ZtrackingTaskHasReceiveInputValueOfTypeService', () => {
  let service: ZtrackingTaskHasReceiveInputValueOfTypeService;
  let repository: MockType<Repository<ZtrackingTaskHasReceiveInputValueOfType>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingTaskHasReceiveInputValueOfTypeService,
        {
          provide: getRepositoryToken(ZtrackingTaskHasReceiveInputValueOfType),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingTaskHasReceiveInputValueOfTypeService>(
      ZtrackingTaskHasReceiveInputValueOfTypeService,
    );

    repository = module.get(
      getRepositoryToken(ZtrackingTaskHasReceiveInputValueOfType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createZtrackingTaskHasReceiveInputValueOfTypeServiceEntity', () => {
    it('should create a ztracking task input value type entity successfully', async () => {
      const traceId = mockTraceId;
      const inputValueEntity = mockSavedTaskHasReceivedInputValueOfType001;
      const mockZtrackingInputValueEntity =
        mockSavedZtrackingTaskHasReceivedInputValue001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingInputValueEntity as any);

      const result =
        await service.createZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          inputValueEntity,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const inputValueEntity = mockSavedTaskHasReceivedInputValueOfType001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          inputValueEntity,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity', () => {
    it('should find ztracking task input value type entities based on criteria', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedZtrackingTaskHasReceivedInputValue001.taskId;
      const inputValueTypeId =
        mockSavedZtrackingTaskHasReceivedInputValue001.inputValueTypeId;
      const mockZtrackingInputValues = [
        mockSavedZtrackingTaskHasReceivedInputValue001,
      ];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingInputValues as any);

      const result =
        await service.findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          { taskId, inputValueTypeId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingInputValues);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedTaskHasReceivedInputValueOfType001.taskId;
      const inputValueTypeId =
        mockSavedTaskHasReceivedInputValueOfType001.inputValueTypeId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          { taskId, inputValueTypeId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no entities are found', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedTaskHasReceivedInputValueOfType001.taskId;
      const inputValueTypeId =
        mockSavedTaskHasReceivedInputValueOfType001.inputValueTypeId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity(
          { taskId, inputValueTypeId },
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
