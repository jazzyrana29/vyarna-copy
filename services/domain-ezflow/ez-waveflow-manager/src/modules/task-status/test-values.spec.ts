import { TaskStatus } from '../../entities/task-status.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { GetTaskStatusDto, GetManyTaskStatusesDto } from 'ez-utils';
import { WaveExecutesTaskIntoStatus } from '../../entities/wave-executes-task-into-status.entity';

export const mockTraceId: string = 'traceIdForMockTaskStatus';
export const commonUseCreationDate: Date = new Date();
export const mockTaskStatusId001: string = 'uuidForMockTaskStatusCase001';
export const mockTaskStatusName001: string = 'nameForMyTaskStatusCase001';
export const mockTaskStatusName002: string = 'nameForMyTaskStatusCase002';
export const mockUser001: string = 'userForMyTaskStatusCase001';

export const mockGetTaskStatusDtoCase001: GetTaskStatusDto = {
  name: mockTaskStatusName001,
  isDeleted: false,
  taskStatusId: '',
};

export const mockGetManyTaskStatusesDtoCase002: GetManyTaskStatusesDto = {
  name: mockTaskStatusName002,
  taskStatusId: '',
};

export const mockSavedTaskStatusCase001: TaskStatus = {
  taskStatusId: mockTaskStatusId001,
  name: mockTaskStatusName001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  wavesExecutesTasksIntoStatuses: [],
  waveExecutesOneTasksIntoOneStatus: new WaveExecutesTaskIntoStatus(),
};

export const mockSavedTaskStatusCase002: TaskStatus = {
  taskStatusId: mockTaskStatusId001,
  name: mockTaskStatusName002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<TaskStatus> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  wavesExecutesTasksIntoStatuses: [],
  waveExecutesOneTasksIntoOneStatus: new WaveExecutesTaskIntoStatus(),
};
