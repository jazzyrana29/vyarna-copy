import { TaskHasReceiveInputValueOfType } from '../../entities/task-has-received-input-value-of-type.entity';
import { ZtrackingTaskHasReceiveInputValueOfType } from '../../entities/ztracking-task-has-received-input-value-of-type.entity';
import {
  CreateTaskHasReceivedInputValueOfTypeDto,
  UpdateTaskHasReceivedInputValueOfTypeDto,
  GetOneTaskHasReceivedInputValueOfTypeDto,
  GetManyTaskHasReceivedInputValueOfTypeDto,
  DeleteTaskHasReceivedInputValueOfTypeDto,
  GetHistoryTaskHasReceivedInputValueOfTypeDto,
  ZtrackingTaskHasReceivedInputValueOfTypeDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockTaskInputValues';
export const commonUseCreationDate: Date = new Date();
export const commonUseUpdateDate: Date = new Date();

// Mock identifiers
export const mockInputValueTypeId001: string = 'uuidForMockInputValueType001';
export const mockTaskId001: string = 'uuidForMockTask001';
export const mockUser001: string = 'userForMockTaskInputValue001';
export const mockZtrackingVersion001: string = 'uuidForMockZtrackingVersion001';

// Mock DTOs for CR operations
export const mockCreateTaskHasReceivedInputValueOfTypeDto: CreateTaskHasReceivedInputValueOfTypeDto =
  {
    taskId: mockTaskId001,
    inputValueTypeId: mockInputValueTypeId001,
    updatedBy: mockUser001,
  };

export const mockUpdateTaskHasReceivedInputValueOfTypeDto: UpdateTaskHasReceivedInputValueOfTypeDto =
  {
    taskId: mockTaskId001,
    inputValueTypeId: mockInputValueTypeId001,
    updatedBy: mockUser001,
  };

// Mock DTOs for Get operations
export const mockGetOneTaskHasReceivedInputValueOfTypeDto: GetOneTaskHasReceivedInputValueOfTypeDto =
  {
    taskId: mockTaskId001,
    inputValueTypeId: mockInputValueTypeId001,
  };

export const mockGetManyTaskHasReceivedInputValueOfTypeDto: GetManyTaskHasReceivedInputValueOfTypeDto =
  {
    isDeleted: false,
  };

export const mockDeleteTaskHasReceivedInputValueOfTypeDto: DeleteTaskHasReceivedInputValueOfTypeDto =
  {
    taskId: mockTaskId001,
    inputValueTypeId: mockInputValueTypeId001,
  };

export const mockGetHistoryTaskHasReceivedInputValueOfTypeDto: GetHistoryTaskHasReceivedInputValueOfTypeDto =
  {
    taskId: mockTaskId001,
    inputValueTypeId: mockInputValueTypeId001,
  };

// Mocked Entities
export const mockSavedTaskHasReceivedInputValueOfType001: TaskHasReceiveInputValueOfType =
  {
    inputValueTypeId: mockInputValueTypeId001,
    taskId: mockTaskId001,
    task: null, // Would be a mock of Task entity
    inputValueType: null, // Would be a mock of InputValueType entity
    taskInputValue: 'Sample Input Value',
    isDeleted: false,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseUpdateDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<TaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<TaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<TaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<TaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
  };

// Mocked Ztracking Entities
export const mockSavedZtrackingTaskHasReceivedInputValue001: ZtrackingTaskHasReceiveInputValueOfType =
  {
    ztrackingVersion: mockZtrackingVersion001,
    inputValueTypeId: mockInputValueTypeId001,
    taskId: mockTaskId001,
    taskInputValue: 'Sample Input Value',
    isDeleted: false,
    createdAt: commonUseCreationDate,
    versionDate: commonUseUpdateDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingTaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingTaskHasReceiveInputValueOfType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: 'user-33',
  };

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingTaskHasReceivedInputValueOfTypeDto[] =
  [
    {
      ztrackingVersion: 'version1',
      inputValueTypeId: mockInputValueTypeId001,
      taskId: mockTaskId001,
      taskInputValue: 'Initial Input Value',
      isDeleted: false,
      createdAt: new Date('2022-01-01'),
      versionDate: new Date('2022-01-01'),
    },
    {
      ztrackingVersion: 'version2',
      inputValueTypeId: mockInputValueTypeId001,
      taskId: mockTaskId001,
      taskInputValue: 'Updated Input Value',
      isDeleted: false,
      createdAt: new Date('2022-02-01'),
      versionDate: new Date('2022-02-01'),
    },
  ];
