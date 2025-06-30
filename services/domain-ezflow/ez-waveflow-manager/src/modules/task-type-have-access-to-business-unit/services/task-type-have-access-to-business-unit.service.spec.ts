import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Import mocks from the shared file
import {
  mockCreateTaskTypeHaveAccessToBusinessUnitDto,
  mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
  mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
  mockTaskTypeHaveAccessToBusinessUnitCase001,
  mockTraceIdForTaskTypeHaveAccessToBusinessUnit as mockTraceId,
  mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
} from '../test-values.spec';
import { TaskTypeHaveAccessToBusinessUnitService } from './task-type-have-access-to-business-unit.service';
import { TaskTypeHaveAccessToBusinessUnit } from '../../../entities/task-type-have-access-to-business-unit.entity';
import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './ztracking-task-type-have-access-to-business-unit.service';

describe('TaskTypeHaveAccessToBusinessUnitService', () => {
  let service: TaskTypeHaveAccessToBusinessUnitService;
  let repository: Repository<TaskTypeHaveAccessToBusinessUnit>;
  let ztrackingService: ZtrackingTaskTypeHaveAccessToBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypeHaveAccessToBusinessUnitService,
        {
          provide: getRepositoryToken(TaskTypeHaveAccessToBusinessUnit),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingTaskTypeHaveAccessToBusinessUnitService,
          useValue: {
            createZtrackingForTaskTypeHaveAccessToBusinessUnit: jest
              .fn()
              .mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TaskTypeHaveAccessToBusinessUnitService>(
      TaskTypeHaveAccessToBusinessUnitService,
    );
    repository = module.get<Repository<TaskTypeHaveAccessToBusinessUnit>>(
      getRepositoryToken(TaskTypeHaveAccessToBusinessUnit),
    );
    ztrackingService =
      module.get<ZtrackingTaskTypeHaveAccessToBusinessUnitService>(
        ZtrackingTaskTypeHaveAccessToBusinessUnitService,
      );
  });

  describe('createTaskTypeHaveAccessToBusinessUnit', () => {
    it('should create and return a new task-type-have-access-to-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockTaskTypeHaveAccessToBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForTaskTypeHaveAccessToBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.createTaskTypeHaveAccessToBusinessUnit(
        mockCreateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockTaskTypeHaveAccessToBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockCreateTaskTypeHaveAccessToBusinessUnitDto),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });
  });

  describe('updateTaskTypeHaveAccessToBusinessUnit', () => {
    it('should update and return the updated task-type-have-access-to-business-unit and call the ztracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockTaskTypeHaveAccessToBusinessUnitCase001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockTaskTypeHaveAccessToBusinessUnitCase001);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForTaskTypeHaveAccessToBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.updateTaskTypeHaveAccessToBusinessUnit(
        mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockTaskTypeHaveAccessToBusinessUnitCase001);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateTaskTypeHaveAccessToBusinessUnitDto),
      );
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw NotFoundException if the task-type-have-access-to-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.updateTaskTypeHaveAccessToBusinessUnit(
          mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTaskTypeHaveAccessToBusinessUnit', () => {
    it('should mark the task-type-have-access-to-business-unit as deleted and call the zTracking service', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockTaskTypeHaveAccessToBusinessUnitCase001);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...mockTaskTypeHaveAccessToBusinessUnitCase001,
        isDeleted: true,
      } as TaskTypeHaveAccessToBusinessUnit);

      const ztrackingSpy = jest
        .spyOn(
          ztrackingService,
          'createZtrackingForTaskTypeHaveAccessToBusinessUnit',
        )
        .mockResolvedValue(true);

      const result = await service.deleteTaskTypeHaveAccessToBusinessUnit(
        mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceId,
      );

      expect(result.isDeleted).toBe(true);
      expect(repository.save).toHaveBeenCalled();
      expect(ztrackingSpy).toHaveBeenCalledWith(result, mockTraceId);
    });

    it('should throw BadRequestException if ID or updatedBy is missing', async () => {
      await expect(
        service.deleteTaskTypeHaveAccessToBusinessUnit(
          {
            businessUnitId: '',
            taskTypeId: '',
            updatedBy: '',
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if the task-type-have-access-to-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.deleteTaskTypeHaveAccessToBusinessUnit(
          mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOneTaskTypeHaveAccessToBusinessUnit', () => {
    it('should return the task-type-have-access-to-business-unit', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockTaskTypeHaveAccessToBusinessUnitCase001);

      const result = await service.getOneTaskTypeHaveAccessToBusinessUnit(
        mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceId,
      );

      expect(result).toEqual(mockTaskTypeHaveAccessToBusinessUnitCase001);
    });

    it('should throw NotFoundException if the task-type-have-access-to-business-unit is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(
        service.getOneTaskTypeHaveAccessToBusinessUnit(
          mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if ID is missing', async () => {
      await expect(
        service.getOneTaskTypeHaveAccessToBusinessUnit(
          {
            businessUnitId: '',
            taskTypeId: '',
            isDeleted: true,
          },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
