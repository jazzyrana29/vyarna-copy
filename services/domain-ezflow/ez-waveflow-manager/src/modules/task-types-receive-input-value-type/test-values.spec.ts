import { TaskTypesReceiveInputValueType } from '../../entities/task-types-receive-input-value-type.entity';
import { ZtrackingTaskTypesReceiveInputValueType } from '../../entities/ztracking-task-type-receives-input-value-type.entity';
import {
  CreateTaskTypesReceiveInputValueTypeDto,
  UpdateTaskTypesReceiveInputValueTypeDto,
  GetOneTaskTypesReceiveInputValueTypeDto,
  GetManyTaskTypesReceiveInputValueTypeDto,
  DeleteTaskTypesReceiveInputValueTypeDto,
  GetHistoryTaskTypesReceiveInputValueTypeDto,
  ZtrackingTaskTypeReceivesInputValueTypeDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockTaskInputTypes';
export const commonUseCreationDate: Date = new Date();
export const commonUseUpdateDate: Date = new Date();

// Mock identifiers
export const mockTaskTypeId001: string = 'uuidForMockTaskType001';
export const mockInputValueTypeId001: string = 'uuidForMockInputValueType001';
export const mockUser001: string = 'userForMockTaskInputType001';
export const mockZtrackingVersion001: string = 'uuidForMockZtrackingVersion001';

// Mock DTOs for CR operations
export const mockCreateTaskTypesReceiveInputValueTypeDto: CreateTaskTypesReceiveInputValueTypeDto =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
    isAvailable: true,
    updatedBy: mockUser001,
  };

export const mockUpdateTaskTypesReceiveInputValueTypeDto: UpdateTaskTypesReceiveInputValueTypeDto =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
    isAvailable: false,
    updatedBy: mockUser001,
  };

// Mock DTOs for Get operations
export const mockGetOneTaskTypesReceiveInputValueTypeDto: GetOneTaskTypesReceiveInputValueTypeDto =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
    isAvailable: true,
  };

export const mockGetManyTaskTypesReceiveInputValueTypeDto: GetManyTaskTypesReceiveInputValueTypeDto =
  {
    isDeleted: false,
    isAvailable: true,
  };

export const mockDeleteTaskTypesReceiveInputValueTypeDto: DeleteTaskTypesReceiveInputValueTypeDto =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
  };

export const mockGetHistoryTaskTypesReceiveInputValueTypeDto: GetHistoryTaskTypesReceiveInputValueTypeDto =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
  };

// Mocked Entities
export const mockSavedTaskTypesReceiveInputValueType001: TaskTypesReceiveInputValueType =
  {
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
    taskType: null, // Would be a reference to a mock TaskType entity
    inputValueType: null, // Would be a reference to a mock InputValueType entity
    isAvailable: true,
    isDeleted: false,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseUpdateDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<TaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<TaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<TaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<TaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
  };

// Mocked Ztracking Entities
export const mockSavedZtrackingTaskTypeReceivesInputValue001: ZtrackingTaskTypesReceiveInputValueType =
  {
    ztrackingVersion: mockZtrackingVersion001,
    taskTypeId: mockTaskTypeId001,
    inputValueTypeId: mockInputValueTypeId001,
    isAvailable: true,
    isDeleted: false,
    createdAt: commonUseCreationDate,
    versionDate: commonUseUpdateDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingTaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskTypesReceiveInputValueType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: 'user-34324',
  };

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingTaskTypeReceivesInputValueTypeDto[] =
  [
    {
      ztrackingVersion: 'version1',
      taskTypeId: mockTaskTypeId001,
      inputValueTypeId: mockInputValueTypeId001,
      isAvailable: true,
      isDeleted: false,
      createdAt: new Date('2022-01-01'),
      versionDate: new Date('2022-01-01'),
    },
    {
      ztrackingVersion: 'version2',
      taskTypeId: mockTaskTypeId001,
      inputValueTypeId: mockInputValueTypeId001,
      isAvailable: false,
      isDeleted: false,
      createdAt: new Date('2022-02-01'),
      versionDate: new Date('2022-02-01'),
    },
  ];
