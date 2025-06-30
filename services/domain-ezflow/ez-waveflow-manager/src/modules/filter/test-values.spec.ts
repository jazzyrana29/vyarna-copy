import {
  CreateFilterDto,
  DeleteFilterDto,
  GetOneFilterDto,
  GetZtrackingFilterDto,
  UpdateFilterDto,
} from 'ez-utils';
import { Filter } from '../../entities/filter.entity';
import { ZtrackingFilter } from '../../entities/ztracking-filter.entity';
import {
  mockFilterSubsetCase001,
  mockFilterSubsetCase002,
} from '../filter-subset/test-values.spec';
import {
  mockManifoldCase001,
  mockManifoldCase002,
  mockManifoldId,
} from '../manifold/test-values.spec';
import { NodeExit } from '../../entities/node-exit.entity';

export const mockTraceIdForFilter: string = 'traceIdForMockFilter';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockFilterId: string = 'mockFilterId';

// Mock for first case
export const mockFilterName001: string = 'mockFilterName001';
export const mockFilterDescription001: string = 'mockFilterDescription001';
export const mockFilterLogicalBinding001: string =
  'mockFilterLogicalBinding001';
export const mockManifoldOrder001: number = 1;

export const mockFilterCase001: Filter = {
  filterId: mockFilterId,
  filterName: mockFilterName001,
  filterDescription: mockFilterDescription001,
  filterLogicalBinding: mockFilterLogicalBinding001,
  filterSubsets: [mockFilterSubsetCase001],
  manifold: mockManifoldCase001,
  manifoldId: mockManifoldId,
  manifoldOrder: mockManifoldOrder001,
  // TODO: add node exit here
  nodeExit: {} as NodeExit,
  nodeExitId: '',
  isActive: true,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Filter> {
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
export const mockFilterName002: string = 'mockFilterName002';
export const mockFilterDescription002: string = 'mockFilterDescription002';
export const mockFilterLogicalBinding002: string =
  'mockFilterLogicalBinding002';
export const mockManifoldOrder002: number = 2;

export const mockFilterCase002: Filter = {
  filterId: mockFilterId,
  filterName: mockFilterName002,
  filterDescription: mockFilterDescription002,
  filterLogicalBinding: mockFilterLogicalBinding002,
  filterSubsets: [mockFilterSubsetCase002],
  manifold: mockManifoldCase002,
  manifoldId: mockManifoldId,
  manifoldOrder: mockManifoldOrder002,
  // TODO: add node exit here
  nodeExit: {} as NodeExit,
  nodeExitId: '',
  isActive: true,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Filter> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Filter> {
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
export const mockZtrackingFilterCase001: ZtrackingFilter = {
  ztrackingVersion: 'mock-version-uuid',
  filterId: mockFilterId,
  filterName: mockFilterName001,
  filterDescription: mockFilterDescription001,
  filterLogicalBinding: mockFilterLogicalBinding001,
  // TODO: add node exit here
  nodeExitId: '',
  manifoldId: mockManifoldId,
  manifoldOrder: mockManifoldOrder001,
  isActive: true,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingFilter> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingFilter> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingFilter> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingFilter> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateFilterDto: CreateFilterDto = {
  filterName: mockFilterName001,
  filterDescription: mockFilterDescription001,
  filterLogicalBinding: mockFilterLogicalBinding001,
  manifoldOrder: mockManifoldOrder001,
  filterSubsets: [mockFilterSubsetCase001],
  manifold: mockManifoldCase001,
  manifoldId: mockManifoldId,
  // TODO: add node exit here
  nodeExit: {} as NodeExit,
  nodeExitId: '',
  isActive: true,
  updatedBy: mockUser001,
};

export const mockUpdateFilterDto: UpdateFilterDto = {
  filterId: mockFilterId,
  filterName: mockFilterName002,
  filterDescription: mockFilterDescription002,
  filterLogicalBinding: mockFilterLogicalBinding002,
  filterSubsets: [mockFilterSubsetCase002],
  manifold: mockManifoldCase002,
  manifoldId: mockManifoldId,
  manifoldOrder: mockManifoldOrder002,
  // TODO: add node exit here
  nodeExit: {} as NodeExit,
  nodeExitId: '',
  isActive: true,
  updatedBy: mockUser001,
};

export const mockGetOneFilterDto: GetOneFilterDto = {
  filterId: mockFilterId,
  filterName: mockFilterName001,
  isDeleted: false,
};

export const mockDeleteFilterDto: DeleteFilterDto = {
  filterId: mockFilterId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingFilterDto: GetZtrackingFilterDto = {
  filterId: mockFilterId,
};
