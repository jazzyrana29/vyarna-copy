import {
  CreateFilterSubsetDto,
  DeleteFilterSubsetDto,
  GetOneFilterSubsetDto,
  GetZtrackingFilterSubsetDto,
  UpdateFilterSubsetDto,
} from 'ez-utils';
import { FilterSubset } from '../../entities/filter-subset.entity';
import { ZtrackingFilterSubset } from '../../entities/ztracking-filter-subset.entity';
import {
  mockFilterCase001,
  mockFilterCase002,
  mockFilterId,
} from '../filter/test-values.spec';
import {
  mockFilterSubsetItemCase001,
  mockFilterSubsetItemCase002,
} from '../filter-subset-item/test-values.spec';

export const mockTraceIdForFilterSubset: string = 'traceIdForMockFilterSubset';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockFilterSubsetId: string = 'mockFilterSubsetId';

// Mock for first case
export const mockFilterOrder001: number = 1;
export const mockFilterSubsetInternalLogicalBinding001: string =
  'mockFilterSubsetInternalLogicalBinding001';

export const mockFilterSubsetCase001: FilterSubset = {
  filterSubsetId: mockFilterSubsetId,
  filter: mockFilterCase001,
  filterId: mockFilterId,
  filterOrder: mockFilterOrder001,
  filterSubsetItems: [mockFilterSubsetItemCase001],
  filterSubsetInternalLogicalBinding: mockFilterSubsetInternalLogicalBinding001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  save(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<FilterSubset> {
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
export const mockFilterOrder002: number = 2;
export const mockFilterSubsetInternalLogicalBinding002: string =
  'mockFilterSubsetInternalLogicalBinding002';

export const mockFilterSubsetCase002: FilterSubset = {
  filterSubsetId: mockFilterSubsetId,
  filter: mockFilterCase002,
  filterId: mockFilterId,
  filterOrder: mockFilterOrder002,
  filterSubsetItems: [mockFilterSubsetItemCase002],
  filterSubsetInternalLogicalBinding: mockFilterSubsetInternalLogicalBinding002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  save(): Promise<FilterSubset> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<FilterSubset> {
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
export const mockZtrackingFilterSubsetCase001: ZtrackingFilterSubset = {
  ztrackingVersion: 'mock-version-uuid',
  filterSubsetId: mockFilterSubsetId,
  filterId: mockFilterId,
  filterOrder: mockFilterOrder001,
  filterSubsetInternalLogicalBinding: mockFilterSubsetInternalLogicalBinding001,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingFilterSubset> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingFilterSubset> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingFilterSubset> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingFilterSubset> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateFilterSubsetDto: CreateFilterSubsetDto = {
  filterId: mockFilterId,
  filterOrder: mockFilterOrder001,
  filterSubsetItems: [mockFilterSubsetItemCase001],
  filterSubsetInternalLogicalBinding: mockFilterSubsetInternalLogicalBinding001,
  filter: mockFilterCase001,
  updatedBy: mockUser001,
};

export const mockUpdateFilterSubsetDto: UpdateFilterSubsetDto = {
  filterSubsetId: mockFilterSubsetId,
  filterId: mockFilterId,
  filterOrder: mockFilterOrder002,
  filterSubsetItems: [mockFilterSubsetItemCase002],
  filterSubsetInternalLogicalBinding: mockFilterSubsetInternalLogicalBinding002,
  filter: mockFilterCase002,
  updatedBy: mockUser001,
};

export const mockGetOneFilterSubsetDto: GetOneFilterSubsetDto = {
  filterSubsetId: mockFilterSubsetId,
  isDeleted: false,
};

export const mockDeleteFilterSubsetDto: DeleteFilterSubsetDto = {
  filterSubsetId: mockFilterSubsetId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingFilterSubsetDto: GetZtrackingFilterSubsetDto = {
  filterSubsetId: mockFilterSubsetId,
};
