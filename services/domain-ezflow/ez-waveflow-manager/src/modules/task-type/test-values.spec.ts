import { GetManyTaskTypesDto, GetOneTaskTypeDto } from 'ez-utils';
import { TaskType } from '../../entities/task-type.entity';
import { mockTaskTypeHaveAccessToBusinessUnitCase001 } from '../task-type-have-access-to-business-unit/test-values.spec';

export const mockTraceIdForTaskType: string = 'traceIdForMockTaskType';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockTaskTypeId: string = 'mockTaskTypeId';

// Mock for first case
export const mockTaskTypeName001: string = 'mockTaskTypeName001';
export const mockTaskTypeDescription001: string = 'mockTaskTypeDescription001';

export const mockTaskTypeCase001: TaskType = {
  accessibleBusinessUnits: [mockTaskTypeHaveAccessToBusinessUnitCase001],
  task: undefined, // TODO: will be added after task
  taskTypesReceiveInputValueTypes: [],
  taskTypeId: mockTaskTypeId,
  name: mockTaskTypeName001,
  description: mockTaskTypeDescription001,
  tasks: [], // TODO: will be added after task
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<TaskType> {
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
export const mockTaskTypeName002: string = 'mockTaskTypeName002';
export const mockTaskTypeDescription002: string = 'mockTaskTypeDescription002';
export const mockChoiceType002: string = 'mockChoiceType002';
export const mockSymbol002: string = 'mockSymbol002';

export const mockTaskTypeCase002: TaskType = {
  accessibleBusinessUnits: [mockTaskTypeHaveAccessToBusinessUnitCase001],
  task: undefined,
  taskTypesReceiveInputValueTypes: [],
  taskTypeId: mockTaskTypeId,
  name: mockTaskTypeName002,
  description: mockTaskTypeDescription002,
  tasks: [], // TODO: will be added after task
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<TaskType> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockGetOneTaskTypeDto: GetOneTaskTypeDto = {
  taskTypeId: mockTaskTypeId,
  name: mockTaskTypeName001,
};

export const mockGetManyTaskTypesDto: GetManyTaskTypesDto = {};
