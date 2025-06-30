import {
  CreateManifoldDto,
  DeleteManifoldDto,
  GetOneManifoldDto,
  GetZtrackingManifoldDto,
  UpdateManifoldDto,
} from 'ez-utils';
import { Manifold } from '../../entities/manifold.entity';
import { ZtrackingManifold } from '../../entities/ztracking-manifold.entity';
import {
  mockFilterCase001,
  mockFilterCase002,
} from '../filter/test-values.spec';

export const mockTraceIdForManifold: string = 'traceIdForMockManifold';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockManifoldId: string = 'mockManifoldId';

// Mock for first case
export const mockManifoldName001: string = 'mockManifoldName001';
export const mockManifoldDescription001: string = 'mockManifoldDescription001';
export const mockExecutionStyle001: string = 'mockExecutionStyle001';

export const mockManifoldCase001: Manifold = {
  manifoldId: mockManifoldId,
  name: mockManifoldName001,
  description: mockManifoldDescription001,
  executionStyle: mockExecutionStyle001,
  filters: [mockFilterCase001],
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockManifoldName002: string = 'mockManifoldName002';
export const mockManifoldDescription002: string = 'mockManifoldDescription002';
export const mockExecutionStyle002: string = 'mockExecutionStyle002';

// Mock for first case
export const mockManifoldCase002: Manifold = {
  manifoldId: mockManifoldId,
  name: mockManifoldName002,
  description: mockManifoldDescription002,
  executionStyle: mockExecutionStyle002,
  filters: [mockFilterCase002],
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Manifold> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Manifold> {
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
export const mockZtrackingManifoldCase001: ZtrackingManifold = {
  ztrackingVersion: 'mock-version-uuid',
  manifoldId: mockManifoldId,
  name: mockManifoldName001,
  description: mockManifoldDescription001,
  executionStyle: mockExecutionStyle001,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingManifold> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingManifold> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingManifold> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingManifold> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateManifoldDto: CreateManifoldDto = {
  name: mockManifoldName001,
  description: mockManifoldDescription001,
  executionStyle: mockExecutionStyle001,
  filters: [mockFilterCase001],
  updatedBy: mockUser001,
};

export const mockUpdateManifoldDto: UpdateManifoldDto = {
  manifoldId: mockManifoldId,
  name: mockManifoldName002,
  description: mockManifoldDescription002,
  executionStyle: mockExecutionStyle002,
  filters: [mockFilterCase002],
  updatedBy: mockUser001,
};

export const mockGetOneManifoldDto: GetOneManifoldDto = {
  manifoldId: mockManifoldId,
  name: mockManifoldName001,
  isDeleted: false,
};

export const mockDeleteManifoldDto: DeleteManifoldDto = {
  manifoldId: mockManifoldId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingManifoldDto: GetZtrackingManifoldDto = {
  manifoldId: mockManifoldId,
};
