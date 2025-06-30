import { Task } from '../../entities/task.entity';
import { ZtrackingTask } from '../../entities/ztracking-task.entity';
import {
  CreateTaskDto,
  UpdateTaskDto,
  GetOneTaskDto,
  GetManyTaskDto,
  DeleteTaskDto,
  GetHistoryTaskDto,
  ZtrackingTaskDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockTask';
export const commonUseCreationDate: Date = new Date();
export const commonUseUpdateDate: Date = new Date();

// Mock identifiers
export const mockTaskId001: string = 'uuidForMockTask001';
export const mockNodeId001: string = 'uuidForNode001';
export const mockNodeExitId001: string = 'uuidForNodeExit001';
export const mockTaskStatusId001: string = 'uuidForTaskStatus001';
export const mockUser001: string = 'userForMockTask001';
export const mockZtrackingVersion001: string = 'uuidForMockZtrackingVersion001';

// Mock DTOs for CR operations
export const mockCreateTaskDto: CreateTaskDto = {
  nodeId: mockNodeId001,
  isExecutedFromId: mockNodeExitId001,
  taskStatusId: mockTaskStatusId001,
  dateStart: commonUseCreationDate,
  dateEnd: commonUseUpdateDate,
  updatedBy: mockUser001,
};

export const mockUpdateTaskDto: UpdateTaskDto = {
  taskId: mockTaskId001,
  nodeId: mockNodeId001,
  isExecutedFromId: mockNodeExitId001,
  taskStatusId: mockTaskStatusId001,
  dateStart: commonUseCreationDate,
  dateEnd: commonUseUpdateDate,
  updatedBy: mockUser001,
};

// Mock DTOs for the Get operations
export const mockGetOneTaskDto: GetOneTaskDto = {
  taskId: mockTaskId001,
};

export const mockGetManyTaskDto: GetManyTaskDto = {
  isDeleted: false,
  createdAt: commonUseCreationDate,
  taskStatusId: mockTaskStatusId001,
};

export const mockDeleteTaskDto: DeleteTaskDto = {
  taskId: mockTaskId001,
};

export const mockGetHistoryTaskDto: GetHistoryTaskDto = {
  taskId: mockTaskId001,
};

// Mocked Entities
export const mockSavedTask001: Task = {
  taskId: mockTaskId001,
  node: null,
  isExecutedFrom: null,
  taskStatus: null,
  taskTypes: [],
  wave: null,
  haveInputValuesOfType: [],
  exitsThrough: [],
  dateStart: commonUseCreationDate,
  dateEnd: commonUseUpdateDate,
  isDeleted: false,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseUpdateDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<Task> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<Task> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<Task> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<Task> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatedBy: undefined,
};

// Mocked Ztracking Entities
export const mockSavedZtrackingTask001: ZtrackingTask = {
  ztrackingVersion: mockZtrackingVersion001,
  taskId: mockTaskId001,
  dateStart: commonUseCreationDate,
  dateEnd: commonUseUpdateDate,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  versionDate: commonUseUpdateDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<ZtrackingTask> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<ZtrackingTask> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<ZtrackingTask> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<ZtrackingTask> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingTaskDto[] = [
  {
    ztrackingVersion: 'version1',
    taskId: mockTaskId001,
    dateStart: new Date('2023-01-01T10:00:00Z'),
    dateEnd: new Date('2023-01-01T12:00:00Z'),
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: new Date('2023-01-01T09:00:00Z'),
    versionDate: new Date('2023-01-01T11:00:00Z'),
  },
  {
    ztrackingVersion: 'version2',
    taskId: mockTaskId001,
    dateStart: new Date('2023-02-01T10:00:00Z'),
    dateEnd: new Date('2023-02-01T12:00:00Z'),
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: new Date('2023-02-01T09:00:00Z'),
    versionDate: new Date('2023-02-01T11:00:00Z'),
  },
];
