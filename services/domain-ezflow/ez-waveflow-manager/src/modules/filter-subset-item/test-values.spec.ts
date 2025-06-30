import {
  CreateFilterSubsetItemDto,
  DeleteFilterSubsetItemDto,
  GetOneFilterSubsetItemDto,
  GetZtrackingFilterSubsetItemDto,
  UpdateFilterSubsetItemDto,
} from 'ez-utils';
import { FilterSubsetItem } from '../../entities/filter-subset-item.entity';
import { ZtrackingFilterSubsetItem } from '../../entities/ztracking-filter-subset-item.entity';
import {
  mockFilterSubsetCase001,
  mockFilterSubsetCase002,
  mockFilterSubsetId,
} from '../filter-subset/test-values.spec';
import {
  mockEvaluationOperatorCase001,
  mockEvaluationOperatorCase002,
  mockEvaluationOperatorId,
} from '../evaluation-operator/test-values.spec';
import {
  mockEvaluationVariableId001,
  mockSavedEvaluationVariable001,
  mockSavedEvaluationVariable002,
} from '../evaluation-variable/test-values.spec';

export const mockTraceIdForFilterSubsetItem: string =
  'traceIdForMockFilterSubsetItem';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockFilterSubsetItemId: string = 'mockFilterSubsetItemId';

// Mock for first case
export const mockEvaluationValue001: string = 'mockEvaluationValue001';

export const mockFilterSubsetItemCase001: FilterSubsetItem = {
  filterSubsetItemId: mockFilterSubsetItemId,
  filterSubset: mockFilterSubsetCase001,
  filterSubsetId: mockFilterSubsetId,
  evaluationOperator: mockEvaluationOperatorCase001,
  evaluationOperatorId: mockEvaluationOperatorId,
  evaluationValue: mockEvaluationValue001,
  evaluationVariable: mockSavedEvaluationVariable001,
  evaluationVariableId: mockEvaluationVariableId001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  save(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<FilterSubsetItem> {
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
export const mockEvaluationValue002: string = 'mockEvaluationValue002';

export const mockFilterSubsetItemCase002: FilterSubsetItem = {
  filterSubsetItemId: mockFilterSubsetItemId,
  filterSubset: mockFilterSubsetCase002,
  filterSubsetId: mockFilterSubsetId,
  evaluationOperator: mockEvaluationOperatorCase002,
  evaluationOperatorId: mockEvaluationOperatorId,
  evaluationValue: mockEvaluationValue002,
  evaluationVariable: mockSavedEvaluationVariable002,
  evaluationVariableId: mockEvaluationVariableId001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  save(): Promise<FilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<FilterSubsetItem> {
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
export const mockZtrackingFilterSubsetItemCase001: ZtrackingFilterSubsetItem = {
  ztrackingVersion: 'mock-version-uuid',
  filterSubsetItemId: mockFilterSubsetItemId,
  filterSubsetId: mockFilterSubsetId,
  evaluationOperatorId: mockEvaluationOperatorId,
  evaluationValue: mockEvaluationValue001,
  evaluationVariableId: mockEvaluationVariableId001,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingFilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingFilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingFilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingFilterSubsetItem> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateFilterSubsetItemDto: CreateFilterSubsetItemDto = {
  filterSubset: mockFilterSubsetCase001,
  filterSubsetId: mockFilterSubsetId,
  evaluationOperatorId: mockEvaluationOperatorId,
  evaluationValue: mockEvaluationValue001,
  evaluationVariable: mockSavedEvaluationVariable001,
  evaluationVariableId: mockEvaluationOperatorId,
  evaluationOperator: mockEvaluationOperatorCase001,
  updatedBy: mockUser001,
};

export const mockUpdateFilterSubsetItemDto: UpdateFilterSubsetItemDto = {
  filterSubsetItemId: mockFilterSubsetItemId,
  filterSubset: mockFilterSubsetCase002,
  filterSubsetId: mockFilterSubsetId,
  evaluationOperatorId: mockEvaluationOperatorId,
  evaluationValue: mockEvaluationValue002,
  evaluationVariable: mockSavedEvaluationVariable002,
  evaluationVariableId: mockEvaluationVariableId001,
  evaluationOperator: mockEvaluationOperatorCase002,
  updatedBy: mockUser001,
};

export const mockGetOneFilterSubsetItemDto: GetOneFilterSubsetItemDto = {
  filterSubsetItemId: mockFilterSubsetItemId,
  isDeleted: false,
};

export const mockDeleteFilterSubsetItemDto: DeleteFilterSubsetItemDto = {
  filterSubsetItemId: mockFilterSubsetItemId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingFilterSubsetItemDto: GetZtrackingFilterSubsetItemDto =
  {
    filterSubsetItemId: mockFilterSubsetItemId,
  };
