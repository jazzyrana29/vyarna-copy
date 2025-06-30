import {
  mockEvaluationVariableCollectionId001,
  mockSavedEvaluationVariableCollection001,
  mockSavedEvaluationVariableCollection002,
} from '../evaluation-variable-collection/test-values.spec';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../entities/evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import {
  mockEvaluationVariableId001,
  mockSavedEvaluationVariable001,
  mockSavedEvaluationVariable002,
} from '../evaluation-variable/test-values.spec';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection } from '../../entities/ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import {
  AddEvaluationVariableToCollectionDto,
  CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  RemoveEvaluationVariableToCollectionDto,
  UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from 'ez-utils';

export const mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection: string =
  'traceIdForMockEvaluationVariableIsGroupedThroughEvaluationVariableCollection';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string =
  'mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId';

// Mock for first case
export const mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001: EvaluationVariableIsGroupedThroughEvaluationVariableCollection =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    evaluationVariableCollection: mockSavedEvaluationVariableCollection001,
    evaluationVariable: mockSavedEvaluationVariable001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    save(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
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
export const mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase002: EvaluationVariableIsGroupedThroughEvaluationVariableCollection =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    evaluationVariableCollection: mockSavedEvaluationVariableCollection002,
    evaluationVariable: mockSavedEvaluationVariable002,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    save(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<EvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
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
export const mockZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection =
  {
    ztrackingVersion: 'mock-version-uuid',
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001.evaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    evaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001
        .evaluationVariableCollection.evaluationVariableCollectionId,
    evaluationVariableId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001
        .evaluationVariable.evaluationVariableId,
    isDeleted:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001.isDeleted,
    updatedBy:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001.updatedBy,
    versionDate: commonCreationDate,

    // Mock the BaseEntity methods
    recover(): Promise<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    save(): Promise<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: CreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto =
  {
    evaluationVariable: mockSavedEvaluationVariable001,
    evaluationVariableCollection: mockSavedEvaluationVariableCollection001,
    updatedBy: mockUser001,
  };

export const mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: UpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    evaluationVariable: mockSavedEvaluationVariable002,
    evaluationVariableCollection: mockSavedEvaluationVariableCollection002,
    updatedBy: mockUser001,
  };

export const mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: GetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    isDeleted: false,
  };

export const mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: DeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
    updatedBy: mockUser001,
  };

export const mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto: GetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto =
  {
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionId:
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionId,
  };

export const mockAddEvaluationVariableToCollectionDto: AddEvaluationVariableToCollectionDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    evaluationVariableId: mockEvaluationVariableId001,
  };

export const mockRemoveEvaluationVariableToCollectionDto: RemoveEvaluationVariableToCollectionDto =
  {
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    evaluationVariableId: mockEvaluationVariableId001,
  };
