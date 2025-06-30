import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingTaskService } from './ztracking-task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingTask } from '../../../entities/ztracking-task.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockSavedTask001,
  mockSavedZtrackingTask001,
  mockTraceId,
} from '../test-values.spec';
import { MockType, repositoryMockFactory } from 'ez-utils';
import { GetHistoryTaskDto } from 'ez-utils';

describe('ZtrackingTaskService', () => {
  let service: ZtrackingTaskService;
  let repository: MockType<Repository<ZtrackingTask>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingTaskService,
        {
          provide: getRepositoryToken(ZtrackingTask),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ZtrackingTaskService>(ZtrackingTaskService);
    repository = module.get(getRepositoryToken(ZtrackingTask));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createZtrackingTaskEntity', () => {
    it('should create a ztracking task entity successfully', async () => {
      const traceId = mockTraceId;
      const task = mockSavedTask001;
      const mockZtrackingTask = mockSavedZtrackingTask001;

      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockZtrackingTask as any);

      const result = await service.createZtrackingTaskEntity(task, traceId);

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking task entity', async () => {
      const traceId = mockTraceId;
      const task = mockSavedTask001;

      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createZtrackingTaskEntity(task, traceId),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingTaskEntity', () => {
    it('should find ztracking task entities based on criteria', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedZtrackingTask001.taskId;
      const mockZtrackingTasks = [mockSavedZtrackingTask001];

      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(mockZtrackingTasks as any);

      const result = await service.findZtrackingTaskEntity({ taskId }, traceId);

      expect(result).toEqual(mockZtrackingTasks);
    });

    it('should handle errors gracefully when finding ztracking task entities', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedTask001.taskId;

      jest
        .spyOn(repository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.findZtrackingTaskEntity({ taskId }, traceId),
      ).rejects.toThrow('Database error');
    });

    it('should throw NotFoundException if no ztracking task entities are found', async () => {
      const traceId = mockTraceId;
      const taskId = mockSavedTask001.taskId;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.findZtrackingTaskEntity({ taskId }, traceId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
