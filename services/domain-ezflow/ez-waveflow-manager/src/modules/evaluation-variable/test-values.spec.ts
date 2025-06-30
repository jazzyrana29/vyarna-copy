import { EvaluationVariable } from '../../entities/evaluation-variable.entity';
import { ZtrackingEvaluationVariable } from '../../entities/ztracking-evaluation-variable.entity';
import {
  CreateEvaluationVariableDto,
  UpdateEvaluationVariableDto,
  GetOneEvaluationVariableDto,
  GetManyEvaluationVariablesDto,
  DeleteEvaluationVariableDto,
  GetHistoryOfEvaluationVariablesDto,
  ZtrackingEvaluationVariableDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { EvaluationVariableDataType } from '../../entities/evaluation-variable-data-type.entity';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockEvaluationVariable';
export const commonUseCreationDate: Date = new Date();

// Mock identifiers
export const mockEvaluationVariableId001: string =
  'uuidForMockEvaluationVariable001';
export const mockEvaluationVariableName001: string =
  'nameForMockEvaluationVariable001';
export const mockEvaluationVariableName002: string =
  'nameForMockEvaluationVariable002';
export const mockUser001: string = 'userForMockEvaluationVariable001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionEvaluationVariable001';

// Mock DTOs for CR operations
export const mockCreateEvaluationVariableDto: CreateEvaluationVariableDto = {
  name: mockEvaluationVariableName001,
  description: 'Mock description',
  evaluationVariableDataType: { evaluationVariableDataTypeId: 'datatypeId001' },
};

export const mockUpdateEvaluationVariableDto: UpdateEvaluationVariableDto = {
  evaluationVariableId: mockEvaluationVariableId001,
  name: mockEvaluationVariableName002,
  description: 'Updated Mock description',
  evaluationVariableDataType: { evaluationVariableDataTypeId: 'datatypeId002' },
};

// Mock DTOs for the Get operations
export const mockGetOneEvaluationVariableDto: GetOneEvaluationVariableDto = {
  evaluationVariableId: mockEvaluationVariableId001,
  name: '',
};

export const mockGetManyEvaluationVariablesDto: GetManyEvaluationVariablesDto =
  {
    isDeleted: false,
  };

export const mockDeleteEvaluationVariableDto: DeleteEvaluationVariableDto = {
  evaluationVariableId: mockEvaluationVariableId001,
};

export const mockGetHistoryOfEvaluationVariablesDto: GetHistoryOfEvaluationVariablesDto =
  {
    evaluationVariableId: mockEvaluationVariableId001,
  };

// Mocked Entities
export const mockSavedEvaluationVariable001: EvaluationVariable = {
  evaluationVariableId: mockEvaluationVariableId001,
  name: mockEvaluationVariableName001,
  description: 'Mock description',
  evaluationVariableDataType: {
    evaluationVariableDataTypeId: 'datatypeId001',
    name: '',
    description: '',
    evaluationVariables: [],
    evaluationOperators: [],
    isDeleted: false,
    createdAt: undefined,
    updatedAt: undefined,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  },
  isDeleted: false,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  evaluationVariableGroupedThroughEvaluationVariableCollections: [],
};

export const mockSavedEvaluationVariable002: EvaluationVariable = {
  evaluationVariableId: mockEvaluationVariableId001,
  name: mockEvaluationVariableName002,
  description: 'Updated Mock description',
  evaluationVariableDataType: {
    evaluationVariableDataTypeId: 'datatypeId002',
    name: '',
    description: '',
    evaluationVariables: [],
    evaluationOperators: [],
    isDeleted: false,
    createdAt: undefined,
    updatedAt: undefined,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  },
  isDeleted: false,
  createdAt: commonUseCreationDate,
  updatedAt: new Date(),
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<EvaluationVariable> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  evaluationVariableGroupedThroughEvaluationVariableCollections: [],
};

export const mockSavedZtrackingEvaluationVariable001: ZtrackingEvaluationVariable =
  {
    ztrackingVersion: mockZtrackingVersion001,
    evaluationVariableId: mockEvaluationVariableId001,
    name: mockEvaluationVariableName001,
    description: 'Mock description',
    evaluationVariableDataTypeId: 'datatypeId001', // Assuming simple type for this field
    isDeleted: false,
    createdAt: commonUseCreationDate,
    versionDate: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariable> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingEvaluationVariable> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariable> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariable> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingEvaluationVariableDto[] = [
  {
    ztrackingVersion: 'version1',
    evaluationVariableId: mockEvaluationVariableId001,
    name: mockEvaluationVariableName001,
    description: 'Initial Description',
    evaluationVariableDataTypeId: 'datatypeId001',
    isDeleted: false,
    createdAt: new Date('2022-01-01'),
    versionDate: new Date('2022-01-01'),
  },
  {
    ztrackingVersion: 'version2',
    evaluationVariableId: mockEvaluationVariableId001,
    name: mockEvaluationVariableName002,
    description: 'Updated Description',
    evaluationVariableDataTypeId: 'datatypeId002',
    isDeleted: false,
    createdAt: new Date('2022-02-01'),
    versionDate: new Date('2022-02-01'),
  },
];
