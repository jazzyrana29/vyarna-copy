import { EvaluationVariableCollection } from '../../entities/evaluation-variable-collection.entity';
import { ZtrackingEvaluationVariableCollection } from '../../entities/ztracking-evaluation-variable-collection.entity';
import {
  CreateEvaluationVariableCollectionDto,
  UpdateEvaluationVariableCollectionDto,
  GetOneEvaluationVariableCollectionDto,
  GetManyEvaluationVariableCollectionsDto,
  DeleteEvaluationVariableCollectionDto,
  GetHistoryOfEvaluationVariableCollectionsDto,
  ZtrackingEvaluationVariableCollectionDto,
} from 'ez-utils';
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string = 'traceIdForMockEvaluationVariableCollection';
export const commonUseCreationDate: Date = new Date();

// Mock identifiers
export const mockEvaluationVariableCollectionId001: string =
  'uuidForMockEvaluationVariableCollection001';
export const mockEvaluationVariableCollectionName001: string =
  'nameForMockEvaluationVariableCollection001';
export const mockEvaluationVariableCollectionName002: string =
  'nameForMockEvaluationVariableCollection002';
export const mockUser001: string = 'userForMockEvaluationVariableCollection001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionEvaluationVariableCollection001';

// Mock DTOs for CR operations
export const mockCreateEvaluationVariableCollectionDto: CreateEvaluationVariableCollectionDto =
  {
    name: mockEvaluationVariableCollectionName001,
    description: 'Mock description',
  };

export const mockUpdateEvaluationVariableCollectionDto: UpdateEvaluationVariableCollectionDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    name: mockEvaluationVariableCollectionName002,
    description: 'Updated Mock description',
  };

// Mock DTOs for the Get operations
export const mockGetOneEvaluationVariableCollectionDto: GetOneEvaluationVariableCollectionDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    name: '',
  };

export const mockGetManyEvaluationVariableCollectionsDto: GetManyEvaluationVariableCollectionsDto =
  {
    isDeleted: false,
  };

export const mockDeleteEvaluationVariableCollectionDto: DeleteEvaluationVariableCollectionDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
  };

export const mockGetHistoryOfEvaluationVariableCollectionsDto: GetHistoryOfEvaluationVariableCollectionsDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
  };

// Mocked Entities
export const mockSavedEvaluationVariableCollection001: EvaluationVariableCollection =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    name: mockEvaluationVariableCollectionName001,
    description: 'Mock description',
    evaluationVariableIsGroupedThroughEvaluationVariableCollections: [],
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    isDeleted: false,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
  };

export const mockSavedEvaluationVariableCollection002: EvaluationVariableCollection =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    name: mockEvaluationVariableCollectionName002,
    description: 'Updated Mock description',
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    evaluationVariableIsGroupedThroughEvaluationVariableCollections: [],
    isDeleted: false,
    createdAt: commonUseCreationDate,
    updatedAt: new Date(),
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
  };

export const mockSavedZtrackingEvaluationVariableCollection001: ZtrackingEvaluationVariableCollection =
  {
    ztrackingVersion: mockZtrackingVersion001,
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    name: mockEvaluationVariableCollectionName001,
    description: 'Mock description',
    isDeleted: false,
    createdAt: commonUseCreationDate,
    versionDate: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingEvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: undefined,
    updatedAt: undefined,
  };

// Mocked History Outcome
export const mockZtrackingHistory: ZtrackingEvaluationVariableCollectionDto[] =
  [
    {
      ztrackingVersion: 'version1',
      evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
      name: mockEvaluationVariableCollectionName001,
      description: 'Initial Description',
      isDeleted: false,
      createdAt: new Date('2022-01-01'),
      versionDate: new Date('2022-01-01'),
    },
    {
      ztrackingVersion: 'version2',
      evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
      name: mockEvaluationVariableCollectionName002,
      description: 'Updated Description',
      isDeleted: false,
      createdAt: new Date('2022-02-01'),
      versionDate: new Date('2022-02-01'),
    },
  ];
