import { WaveType } from '../../entities/wave-type.entity';
import { EvaluationVariablesAreAvailableForWaveTypes } from '../../entities/evaluation-variables-are-available-for-wave-types.entity';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypes } from '../../entities/ztracking-evaluation-variables-are-available-for-wave-types.entity';
import {
  CreateEvaluationVariablesAreAvailableForWaveTypesDto,
  UpdateEvaluationVariablesAreAvailableForWaveTypesDto,
  DeleteEvaluationVariablesAreAvailableForWaveTypesDto,
  GetOneEvaluationVariablesAreAvailableForWaveTypesDto,
  GetManyEvaluationVariablesAreAvailableForWaveTypesDto,
  GetHistoryEvaluationVariablesAreAvailableForWaveTypesDto,
  ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { EnvironmentalVariable } from '../../entities/environmental-variable.entity';

// Mock trace ID and common date usage
export const mockTraceId: string =
  'traceIdForMockEvaluationVariablesAreAvailableForWaveTypes';
export const commonUseCreationDate: Date = new Date();

// Mock identifiers
export const mockWaveTypeId001: string = 'uuidForMockWaveType001';
export const mockEnvVariableId001: string = 'uuidForMockEnvVar001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingEvaluationVariablesAreAvailableForWaveTypesVersion001';

// Mock DTOs for CR operations
export const mockCreateEvaluationVariablesAreAvailableForWaveTypesDto: CreateEvaluationVariablesAreAvailableForWaveTypesDto =
  {
    waveTypeId: mockWaveTypeId001,
    environmentalVariableId: mockEnvVariableId001,
    isAvailable: true,
    updatedBy: 'user-1234',
  };

export const mockUpdateEvaluationVariablesAreAvailableForWaveTypesDto: UpdateEvaluationVariablesAreAvailableForWaveTypesDto =
  {
    waveTypeId: mockWaveTypeId001,
    environmentalVariableId: mockEnvVariableId001,
    isAvailable: false,
    updatedBy: 'user-5678',
  };

// Mock DTOs for the Get operations
export const mockGetOneEvaluationVariablesAreAvailableForWaveTypesDto: GetOneEvaluationVariablesAreAvailableForWaveTypesDto =
  {
    waveTypeId: mockWaveTypeId001,
    environmentalVariableId: mockEnvVariableId001,
    isAvailable: true,
  };

export const mockGetManyEvaluationVariablesAreAvailableForWaveTypesDto: GetManyEvaluationVariablesAreAvailableForWaveTypesDto =
  {
    isDeleted: false,
    isAvailable: true,
  };

export const mockDeleteEvaluationVariablesAreAvailableForWaveTypesDto: DeleteEvaluationVariablesAreAvailableForWaveTypesDto =
  {
    waveTypeId: mockWaveTypeId001,
    environmentalVariableId: mockEnvVariableId001,
  };

// Mocked Entities
export const mockSavedEvaluationVariablesAreAvailableForWaveTypes001: EvaluationVariablesAreAvailableForWaveTypes =
  {
    waveTypeId: mockWaveTypeId001,
    environmentalVariableId: mockEnvVariableId001,
    isAvailable: true,
    isDeleted: false,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariablesAreAvailableForWaveTypes> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariablesAreAvailableForWaveTypes> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariablesAreAvailableForWaveTypes> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariablesAreAvailableForWaveTypes> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
    waveType: new WaveType(),
    environmentalVariable: new EnvironmentalVariable(),
  };

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingEvaluationVariablesAreAvailableForWaveTypesDto[] =
  [
    {
      ztrackingVersion: 'version1',
      waveTypeId: mockWaveTypeId001,
      environmentalVariableId: mockEnvVariableId001,
      isAvailable: true,
      isDeleted: false,
      createdAt: new Date('2022-01-01'),
      versionDate: new Date('2022-01-01'),
    },
    {
      ztrackingVersion: 'version2',
      waveTypeId: mockWaveTypeId001,
      environmentalVariableId: mockEnvVariableId001,
      isAvailable: false,
      isDeleted: false,
      createdAt: new Date('2022-02-01'),
      versionDate: new Date('2022-02-01'),
    },
  ];
