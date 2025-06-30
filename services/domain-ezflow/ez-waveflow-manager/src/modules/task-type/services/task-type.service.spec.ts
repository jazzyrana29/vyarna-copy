import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockGetManyTaskTypesDto,
  mockGetOneTaskTypeDto,
  mockTaskTypeCase001,
  mockTraceIdForTaskType as mockTraceId,
} from '../test-values.spec';
import { TaskTypeService } from './task-type.service';
import { TaskType } from '../../../entities/task-type.entity';

describe('TaskTypeService', () => {
  let service: TaskTypeService;
  let repository: Repository<TaskType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypeService,
        {
          provide: getRepositoryToken(TaskType),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskTypeService>(TaskTypeService);
    repository = module.get<Repository<TaskType>>(getRepositoryToken(TaskType));
  });

  describe('getOneTaskType', () => {
    it('should return a task type', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockTaskTypeCase001);

      const result = await service.getOneTaskType(
        mockGetOneTaskTypeDto,
        mockTraceId,
      );

      expect(result).toEqual(mockTaskTypeCase001);
    });

    it('should throw NotFoundException if the task type is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneTaskType(mockGetOneTaskTypeDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneTaskType({ taskTypeId: '', name: '' }, mockTraceId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getManyTaskTypes', () => {
    it('should return an array of task types', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockTaskTypeCase001]);

      const result = await service.getManyTaskTypes(
        mockGetManyTaskTypesDto,
        mockTraceId,
      );

      expect(result).toEqual([mockTaskTypeCase001]);
    });

    it('should throw NotFoundException if no task types are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyTaskTypes(mockGetManyTaskTypesDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });

    // Uncomment and implement when details are available
    // it('should throw BadRequestException if request is invalid', async () => {
    //   await expect(service.getManyTaskTypes({}, mockTraceId)).rejects.toThrow(BadRequestException);
    // });
  });
});
