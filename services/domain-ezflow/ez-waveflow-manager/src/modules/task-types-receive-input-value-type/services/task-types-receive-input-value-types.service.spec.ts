import { Test, TestingModule } from '@nestjs/testing';
import { TaskTypesReceiveInputValueTypeService } from './task-types-receive-input-value-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypesReceiveInputValueType } from '../../../entities/task-types-receive-input-value-type.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockCreateTaskTypesReceiveInputValueTypeDto,
  mockSavedTaskTypesReceiveInputValueType001,
  mockUpdateTaskTypesReceiveInputValueTypeDto,
  mockDeleteTaskTypesReceiveInputValueTypeDto,
  mockGetOneTaskTypesReceiveInputValueTypeDto,
  mockGetManyTaskTypesReceiveInputValueTypeDto,
} from '../test-values.spec';

describe('TaskTypesReceiveInputValueTypeService', () => {
  let service: TaskTypesReceiveInputValueTypeService;
  let repository: Repository<TaskTypesReceiveInputValueType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypesReceiveInputValueTypeService,
        {
          provide: getRepositoryToken(TaskTypesReceiveInputValueType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TaskTypesReceiveInputValueTypeService>(
      TaskTypesReceiveInputValueTypeService,
    );
    repository = module.get<Repository<TaskTypesReceiveInputValueType>>(
      getRepositoryToken(TaskTypesReceiveInputValueType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createTaskTypesReceiveInputValueType', () => {
    it('should successfully create a task type receive input value type', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedTaskTypesReceiveInputValueType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);

      const result = await service.createTaskTypesReceiveInputValueType(
        mockCreateTaskTypesReceiveInputValueTypeDto,
        'traceId1',
      );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateTaskTypesReceiveInputValueTypeDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedTaskTypesReceiveInputValueType001,
      );
      expect(result).toEqual(mockSavedTaskTypesReceiveInputValueType001);
    });
  });

  describe('updateTaskTypesReceiveInputValueType', () => {
    it('should throw NotFoundException if the entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateTaskTypesReceiveInputValueType(
          mockUpdateTaskTypesReceiveInputValueTypeDto,
          'traceId2',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update a task type receive input value', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);

      const result = await service.updateTaskTypesReceiveInputValueType(
        mockUpdateTaskTypesReceiveInputValueTypeDto,
        'traceId2',
      );

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(mockSavedTaskTypesReceiveInputValueType001);
    });
  });

  describe('deleteTaskTypesReceiveInputValueType', () => {
    it('should throw NotFoundException if the entity does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteTaskTypesReceiveInputValueType(
          mockDeleteTaskTypesReceiveInputValueTypeDto,
          'traceId3',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark a task type receive input value type as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);

      await service.deleteTaskTypesReceiveInputValueType(
        mockDeleteTaskTypesReceiveInputValueTypeDto,
        'traceId3',
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneTaskTypesReceiveInputValueType', () => {
    it('should throw NotFoundException if no entity is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneTaskTypesReceiveInputValueType(
          mockGetOneTaskTypesReceiveInputValueTypeDto,
          'traceId4',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found task type receive input value type', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedTaskTypesReceiveInputValueType001);

      const result = await service.getOneTaskTypesReceiveInputValueType(
        mockGetOneTaskTypesReceiveInputValueTypeDto,
        'traceId4',
      );

      expect(result).toEqual(mockSavedTaskTypesReceiveInputValueType001);
    });
  });

  describe('getManyTaskTypesReceiveInputValueTypes', () => {
    it('should throw NotFoundException if no entries match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyTaskTypesReceiveInputValueTypes(
          mockGetManyTaskTypesReceiveInputValueTypeDto,
          'traceId5',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of task type receive input value types', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedTaskTypesReceiveInputValueType001]);

      const result = await service.getManyTaskTypesReceiveInputValueTypes(
        mockGetManyTaskTypesReceiveInputValueTypeDto,
        'traceId5',
      );

      expect(result).toEqual([mockSavedTaskTypesReceiveInputValueType001]);
    });
  });
});
