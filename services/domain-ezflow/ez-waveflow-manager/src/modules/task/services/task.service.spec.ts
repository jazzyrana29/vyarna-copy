import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../entities/task.entity';
import { Node } from '../../../entities/node.entity';
import { NodeExit } from '../../../entities/node-exit.entity';
import { TaskStatus } from '../../../entities/task-status.entity';
import { ZtrackingTaskService } from './ztracking-task.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import {
  mockCreateTaskDto,
  mockSavedTask001,
  mockUpdateTaskDto,
  mockDeleteTaskDto,
  mockGetOneTaskDto,
  mockGetManyTaskDto,
} from '../test-values.spec';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<Task>;
  let nodeRepository: Repository<Node>;
  let nodeExitRepository: Repository<NodeExit>;
  let taskStatusRepository: Repository<TaskStatus>;
  let ztrackingService: ZtrackingTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Node),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(NodeExit),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TaskStatus),
          useClass: Repository,
        },
        {
          provide: ZtrackingTaskService,
          useValue: {
            createZtrackingTaskEntity: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    nodeRepository = module.get<Repository<Node>>(getRepositoryToken(Node));
    nodeExitRepository = module.get<Repository<NodeExit>>(
      getRepositoryToken(NodeExit),
    );
    taskStatusRepository = module.get<Repository<TaskStatus>>(
      getRepositoryToken(TaskStatus),
    );
    ztrackingService = module.get<ZtrackingTaskService>(ZtrackingTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskRepository).toBeDefined();
    expect(nodeRepository).toBeDefined();
    expect(nodeExitRepository).toBeDefined();
    expect(taskStatusRepository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createTask', () => {
    it('should successfully create a task and track changes', async () => {
      jest.spyOn(nodeRepository, 'findOne').mockResolvedValue({} as Node);
      jest
        .spyOn(nodeExitRepository, 'findOne')
        .mockResolvedValue({} as NodeExit);
      jest
        .spyOn(taskStatusRepository, 'findOne')
        .mockResolvedValue({} as TaskStatus);
      jest.spyOn(taskRepository, 'create').mockReturnValue(mockSavedTask001);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockSavedTask001);

      const result = await service.createTask(mockCreateTaskDto, 'traceId1');

      expect(taskRepository.create).toHaveBeenCalledWith({
        node: {},
        isExecutedFrom: {},
        taskStatus: {},
        dateStart: mockCreateTaskDto.dateStart,
        dateEnd: mockCreateTaskDto.dateEnd,
        updatedBy: mockCreateTaskDto.updatedBy,
      });
      expect(taskRepository.save).toHaveBeenCalledWith(mockSavedTask001);
      expect(ztrackingService.createZtrackingTaskEntity).toHaveBeenCalledWith(
        mockSavedTask001,
        'traceId1',
      );
      expect(result).toEqual(mockSavedTask001);
    });
  });

  describe('updateTask', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateTask(mockUpdateTaskDto, 'traceId2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully update a task and track changes', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockSavedTask001);
      jest
        .spyOn(taskStatusRepository, 'findOne')
        .mockResolvedValue({} as TaskStatus);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockSavedTask001);

      const result = await service.updateTask(mockUpdateTaskDto, 'traceId2');

      expect(taskRepository.save).toHaveBeenCalled();
      expect(ztrackingService.createZtrackingTaskEntity).toHaveBeenCalled();
      expect(result).toEqual(mockSavedTask001);
    });
  });

  describe('deleteTask', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteTask(mockDeleteTaskDto, 'traceId3'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should successfully mark a task as deleted', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockSavedTask001);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockSavedTask001);

      await service.deleteTask(mockDeleteTaskDto, 'traceId3');

      expect(taskRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
    });
  });

  describe('getOneTask', () => {
    it('should throw BadRequestException if taskId is not provided', async () => {
      await expect(
        service.getOneTask({ taskId: '' }, 'traceId4'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no task is found', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneTask(mockGetOneTaskDto, 'traceId4'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found task', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockSavedTask001);

      const result = await service.getOneTask(mockGetOneTaskDto, 'traceId4');

      expect(result).toEqual(mockSavedTask001);
    });
  });

  describe('getManyTasks', () => {
    it('should throw NotFoundException if no tasks match the criteria', async () => {
      jest.spyOn(taskRepository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyTasks(mockGetManyTaskDto, 'traceId5'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of tasks', async () => {
      jest.spyOn(taskRepository, 'find').mockResolvedValue([mockSavedTask001]);

      const result = await service.getManyTasks(mockGetManyTaskDto, 'traceId5');

      expect(result).toEqual([mockSavedTask001]);
    });
  });
});
