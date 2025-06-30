import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskStatusesService } from './task-status.service';
import { TaskStatus } from '../../../entities/task-status.entity';
import { GetTaskStatusDto, GetManyTaskStatusesDto } from 'ez-utils';
import {
  mockSavedTaskStatusCase001,
  mockSavedTaskStatusCase002,
  mockGetTaskStatusDtoCase001,
  mockGetManyTaskStatusesDtoCase002,
  mockTraceId,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

const mockTaskStatusRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
};

describe('TaskStatusesService', () => {
  let service: TaskStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStatusesService,
        {
          provide: getRepositoryToken(TaskStatus),
          useValue: mockTaskStatusRepository,
        },
      ],
    }).compile();

    service = module.get<TaskStatusesService>(TaskStatusesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findTaskStatus', () => {
    it('should find a task status by name', async () => {
      const mockDto: GetTaskStatusDto = mockGetTaskStatusDtoCase001;
      mockTaskStatusRepository.findOne.mockResolvedValueOnce(
        mockSavedTaskStatusCase001,
      );

      const result = await service.findTaskStatus(mockDto, mockTraceId);
      expect(result).toEqual(mockSavedTaskStatusCase001);
      expect(mockTaskStatusRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no task status is found', async () => {
      const mockDto: GetTaskStatusDto = mockGetTaskStatusDtoCase001;
      mockTaskStatusRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.findTaskStatus(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getManyTaskStatus', () => {
    it('should find multiple task status by name', async () => {
      const mockDto: GetManyTaskStatusesDto = mockGetManyTaskStatusesDtoCase002;
      mockTaskStatusRepository.find.mockResolvedValueOnce([
        mockSavedTaskStatusCase001,
        mockSavedTaskStatusCase002,
      ]);

      const result = await service.getManyTaskStatus(mockDto, mockTraceId);
      expect(result).toEqual([
        mockSavedTaskStatusCase001,
        mockSavedTaskStatusCase002,
      ]);
      expect(mockTaskStatusRepository.find).toHaveBeenCalledWith({
        where: { name: mockDto.name, isDeleted: false },
      });
    });

    it('should throw NotFoundException if no task status are found', async () => {
      const mockDto: GetManyTaskStatusesDto = mockGetManyTaskStatusesDtoCase002;
      mockTaskStatusRepository.find.mockResolvedValueOnce([]);

      await expect(
        service.getManyTaskStatus(mockDto, mockTraceId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
