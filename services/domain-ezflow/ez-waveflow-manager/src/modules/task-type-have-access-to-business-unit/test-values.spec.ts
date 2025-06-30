import {
  CreateTaskTypeHaveAccessToBusinessUnitDto,
  DeleteTaskTypeHaveAccessToBusinessUnitDto,
  GetOneTaskTypeHaveAccessToBusinessUnitDto,
  GetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
  UpdateTaskTypeHaveAccessToBusinessUnitDto,
} from 'ez-utils';
import { TaskTypeHaveAccessToBusinessUnit } from '../../entities/task-type-have-access-to-business-unit.entity';
import { ZtrackingTaskTypeHaveAccessToBusinessUnit } from '../../entities/ztracking-task-type-have-access-to-business-unit.entity';
import {
  mockTaskTypeCase001,
  mockTaskTypeId,
} from '../task-type/test-values.spec';

export const mockTraceIdForTaskTypeHaveAccessToBusinessUnit: string =
  'traceIdForMockTaskTypeHaveAccessToBusinessUnit';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';

// Mock for first case
export const mockBusinessUnitId001: string = 'mockBusinessUnitId001';

export const mockTaskTypeHaveAccessToBusinessUnitCase001: TaskTypeHaveAccessToBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId001,
    taskTypeId: mockTaskTypeId,
    taskType: mockTaskTypeCase001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

// Mock for second case
export const mockBusinessUnitId002: string = 'mockBusinessUnitId002';

export const mockTaskTypeHaveAccessToBusinessUnitCase002: TaskTypeHaveAccessToBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId002,
    taskTypeId: mockTaskTypeId,
    taskType: mockTaskTypeCase001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<TaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };
// mock ztracking
export const mockZtrackingTaskTypeHaveAccessToBusinessUnitCase001: ZtrackingTaskTypeHaveAccessToBusinessUnit =
  {
    ztrackingVersion: 'mock-version-uuid',
    businessUnitId: mockBusinessUnitId001,
    taskTypeId: mockTaskTypeId,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    versionDate: commonCreationDate,

    // Mock the BaseEntity methods
    recover(): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<ZtrackingTaskTypeHaveAccessToBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockCreateTaskTypeHaveAccessToBusinessUnitDto: CreateTaskTypeHaveAccessToBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId001,
    taskTypeId: mockTaskTypeId,
    updatedBy: mockUser001,
  };

export const mockUpdateTaskTypeHaveAccessToBusinessUnitDto: UpdateTaskTypeHaveAccessToBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    taskTypeId: mockTaskTypeId,
    updatedBy: mockUser001,
  };

export const mockGetOneTaskTypeHaveAccessToBusinessUnitDto: GetOneTaskTypeHaveAccessToBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    taskTypeId: mockTaskTypeId,
    isDeleted: false,
  };

export const mockDeleteTaskTypeHaveAccessToBusinessUnitDto: DeleteTaskTypeHaveAccessToBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    taskTypeId: mockTaskTypeId,
    updatedBy: mockUser001,
  };

export const mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto: GetZtrackingTaskTypeHaveAccessToBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    taskTypeId: mockTaskTypeId,
  };
