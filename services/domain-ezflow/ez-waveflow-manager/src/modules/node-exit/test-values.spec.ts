import {
  CreateNodeExitDto,
  DeleteNodeExitDto,
  GetOneNodeExitDto,
  GetZtrackingNodeExitDto,
  UpdateNodeExitDto,
} from 'ez-utils';
import { NodeExit } from '../../entities/node-exit.entity';
import { ZtrackingNodeExit } from '../../entities/ztracking-node-exit.entity';
import { mockFilterCase001, mockFilterId } from '../filter/test-values.spec';
import {
  mockNodeExitTypeId001,
  mockSavedNodeExitTypeCase001,
} from '../node-exit-type/test-values.spec';
import { mockNodeCase001, mockNodeId } from '../node/test-values.spec';

export const mockTraceIdForNodeExit: string = 'traceIdForMockNodeExit';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockNodeExitId: string = 'mockNodeExitId';

// Mock for first case
export const mockNodeExitName001: string = 'mockNodeExitName001';
export const mockNodeExitDescription001: string = 'mockNodeExitDescription001';
export const mockExecutionStyle001: string = 'mockExecutionStyle001';

export const mockNodeExitCase001: NodeExit = {
  nodeExitId: mockNodeExitId,
  nodeExitTypeId: mockNodeExitTypeId001,
  nodeId: mockNodeId,
  nodeExitType: mockSavedNodeExitTypeCase001,
  node: mockNodeCase001,
  filter: mockFilterCase001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  save(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockNodeExitName002: string = 'mockNodeExitName002';
export const mockNodeExitDescription002: string = 'mockNodeExitDescription002';
export const mockExecutionStyle002: string = 'mockExecutionStyle002';

// Mock for second case
export const mockNodeExitCase002: NodeExit = {
  nodeExitId: mockNodeExitId,
  nodeExitTypeId: mockNodeExitTypeId001,
  nodeId: mockNodeId,
  nodeExitType: mockSavedNodeExitTypeCase001,
  node: mockNodeCase001,
  filter: mockFilterCase001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  save(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<NodeExit> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

// Mock for ztracking node-exit
export const mockZtrackingNodeExitCase001: ZtrackingNodeExit = {
  ztrackingVersion: 'mock-version-uuid',
  nodeExitId: mockNodeExitId,
  nodeExitTypeId: mockNodeExitTypeId001,
  nodeId: mockNodeId,
  filterId: mockFilterId,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingNodeExit> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingNodeExit> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingNodeExit> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingNodeExit> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateNodeExitDto: CreateNodeExitDto = {
  nodeExitTypeId: mockNodeExitTypeId001,
  nodeId: mockNodeId,
  nodeExitType: mockSavedNodeExitTypeCase001,
  node: mockNodeCase001,
  filter: mockFilterCase001,
  updatedBy: mockUser001,
};

export const mockUpdateNodeExitDto: UpdateNodeExitDto = {
  nodeExitId: mockNodeExitId,
  nodeExitTypeId: mockNodeExitTypeId001,
  nodeId: mockNodeId,
  nodeExitType: mockSavedNodeExitTypeCase001,
  node: mockNodeCase001,
  filter: mockFilterCase001,
  updatedBy: mockUser001,
};

export const mockGetOneNodeExitDto: GetOneNodeExitDto = {
  nodeExitId: mockNodeExitId,
  isDeleted: false,
};

export const mockDeleteNodeExitDto: DeleteNodeExitDto = {
  nodeExitId: mockNodeExitId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingNodeExitDto: GetZtrackingNodeExitDto = {
  nodeExitId: mockNodeExitId,
};
