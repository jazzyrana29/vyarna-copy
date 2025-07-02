import { Test, TestingModule } from '@nestjs/testing';
import { TaskHasReceiveInputValueOfTypeService } from './task-has-received-input-value-of-type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskHasReceiveInputValueOfType } from '../../../entities/task-has-received-input-value-of-type.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockCreateTaskHasReceivedInputValueOfTypeDto,
  mockSavedTaskHasReceivedInputValueOfType001,
  mockUpdateTaskHasReceivedInputValueOfTypeDto,
  mockDeleteTaskHasReceivedInputValueOfTypeDto,
  mockGetOneTaskHasReceivedInputValueOfTypeDto,
  mockGetManyTaskHasReceivedInputValueOfTypeDto,
} from '../test-values.spec';

describe('TaskHasReceiveInputValueOfTypeService', () => {
  let service: TaskHasReceiveInputValueOfTypeService;
  let repository: Repository<TaskHasReceiveInputValueOfType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskHasReceiveInputValueOfTypeService,
        {
          provide: getRepositoryToken(TaskHasReceiveInputValueOfType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TaskHasReceiveInputValueOfTypeService>(
      TaskHasReceiveInputValueOfTypeService,
    );
    repository = module.get<Repository<TaskHasReceiveInputValueOfType>>(
      getRepositoryToken(TaskHasReceiveInputValueOfType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createTaskHasReceiveInputValueOfType', () => {
    it('should successfully create a task input value entry', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedTaskHasReceivedInputValueOfType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);

      const result = await service.createTaskHasReceiveInputValueOfType(
        mockCreateTaskHasReceivedInputValueOfTypeDto,
        'traceId1',
      );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateTaskHasReceivedInputValueOfTypeDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedTaskHasReceivedInputValueOfType001,
      );
      expect(result).toEqual(mockSavedTaskHasReceivedInputValueOfType001);
    });
  });

  describe('updateTaskHasReceiveInputValueOfType', () => {
    it('should throw NotFoundException if the entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateTaskHasReceiveInputValueOfType(
          mockUpdateTaskHasReceivedInputValueOfTypeDto,
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update a task input value entry', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);

      const result = await service.updateTaskHasReceiveInputValueOfType(
        mockUpdateTaskHasReceivedInputValueOfTypeDto,
        'traceId2',
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(mockSavedTaskHasReceivedInputValueOfType001);
    });
  });

  describe('deleteTaskHasReceiveInputValueOfType', () => {
    it('should throw NotFoundException if the entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteTaskHasReceiveInputValueOfType(
          mockDeleteTaskHasReceivedInputValueOfTypeDto,
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark a task input value entry as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);

      await service.deleteTaskHasReceiveInputValueOfType(
        mockDeleteTaskHasReceivedInputValueOfTypeDto,
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneTaskHasReceiveInputValueOfType', () => {
    it('should throw NotFoundException if no entity is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneTaskHasReceiveInputValueOfType(
          mockGetOneTaskHasReceivedInputValueOfTypeDto,
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found task input value entry', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskHasReceivedInputValueOfType001);

      const result = await service.getOneTaskHasReceiveInputValueOfType(
        mockGetOneTaskHasReceivedInputValueOfTypeDto,
        'traceId4',
      );

      expect(result).toEqual(mockSavedTaskHasReceivedInputValueOfType001);
    });
  });

  describe('getManyTaskHasReceiveInputValueOfTypeEntities', () => {
    it('should throw NotFoundException if no entries match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyTaskHasReceiveInputValueOfTypeEntities(
          mockGetManyTaskHasReceivedInputValueOfTypeDto,
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of task input value entries', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedTaskHasReceivedInputValueOfType001]);

      const result =
        await service.getManyTaskHasReceiveInputValueOfTypeEntities(
          mockGetManyTaskHasReceivedInputValueOfTypeDto,
          'traceId5',
        );

      expect(result).toEqual([mockSavedTaskHasReceivedInputValueOfType001]);
    });
  });
});
