import { Wave } from '../../entities/wave.entity';
import { ZtrackingWave } from '../../entities/ztracking-wave.entity';
import {
  CreateWaveDto,
  UpdateWaveDto,
  GetWaveDto,
  GetManyWaveDto,
  DeleteWaveDto,
  GetHistoryWaveDto,
  ZtrackingWaveDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockWave';
export const commonUseCreationDate: Date = new Date();
export const commonUseUpdateDate: Date = new Date();

// Mock identifiers
export const mockWaveId001: string = 'uuidForMockWave001';
export const mockExecutionFlowId001: string = 'uuidForMockExecutionFlow001';
export const mockUser001: string = 'userForMockWave001';
export const mockZtrackingVersion001: string = 'uuidForMockZtrackingVersion001';

// Mock DTOs for CR operations
export const mockCreateWaveDto: CreateWaveDto = {
  waveTypeId: mockWaveId001,
  executionFlowId: mockExecutionFlowId001,
  executionStartDate: commonUseCreationDate,
  executionEndDate: commonUseUpdateDate,
  waveStatus: 'InExecution',
  updatedBy: mockUser001,
};

export const mockUpdateWaveDto: UpdateWaveDto = {
  waveId: mockWaveId001,
  waveTypeId: mockWaveId001,
  executionFlowId: mockExecutionFlowId001,
  executionStartDate: commonUseCreationDate,
  executionEndDate: commonUseUpdateDate,
  waveStatus: 'Completed',
  updatedBy: mockUser001,
};

// Mock DTOs for Get operations
export const mockGetWaveDto: GetWaveDto = {
  waveId: mockWaveId001,
};

export const mockGetManyWaveDto: GetManyWaveDto = {
  isDeleted: false,
  waveStatus: 'Completed',
  createdAt: commonUseCreationDate,
};

export const mockDeleteWaveDto: DeleteWaveDto = {
  waveId: mockWaveId001,
};

export const mockGetHistoryWaveDto: GetHistoryWaveDto = {
  waveId: mockWaveId001,
};

// Mocked Entities
export const mockSavedWave001: Wave = {
  waveId: mockWaveId001,
  waveType: null, // Would be a mock WaveType entity
  tasks: [], // List of mocked Task entities
  executionFlow: null, // Would be a mock Flow entity
  executionFlowId: mockExecutionFlowId001,
  executionStartDate: commonUseCreationDate,
  executionEndDate: commonUseUpdateDate,
  waveStatus: 'InExecution',
  isDeleted: false,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseUpdateDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<Wave> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<Wave> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<Wave> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<Wave> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatedBy: undefined,
};

export const mockSavedZtrackingWave001: ZtrackingWave = {
  ztrackingVersion: mockZtrackingVersion001,
  waveId: mockWaveId001,
  executionFlowId: mockExecutionFlowId001,
  executionStartDate: commonUseCreationDate,
  executionEndDate: commonUseUpdateDate,
  waveStatus: 'InExecution',
  isDeleted: false,
  createdAt: commonUseCreationDate,
  versionDate: commonUseUpdateDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<ZtrackingWave> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<ZtrackingWave> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<ZtrackingWave> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<ZtrackingWave> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatedBy: 'user-343434',
};

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingWaveDto[] = [
  {
    ztrackingVersion: 'version1',
    waveId: mockWaveId001,
    executionFlowId: mockExecutionFlowId001,
    executionStartDate: new Date('2022-01-01T10:00:00Z'),
    executionEndDate: new Date('2022-01-01T12:00:00Z'),
    waveStatus: 'InExecution',
    isDeleted: false,
    createdAt: new Date('2022-01-01T09:00:00Z'),
    versionDate: new Date('2022-01-01T11:00:00Z'),
  },
  {
    ztrackingVersion: 'version2',
    waveId: mockWaveId001,
    executionFlowId: mockExecutionFlowId001,
    executionStartDate: new Date('2022-02-01T10:00:00Z'),
    executionEndDate: new Date('2022-02-01T12:00:00Z'),
    waveStatus: 'Completed',
    isDeleted: false,
    createdAt: new Date('2022-02-01T09:00:00Z'),
    versionDate: new Date('2022-02-01T11:00:00Z'),
  },
];
