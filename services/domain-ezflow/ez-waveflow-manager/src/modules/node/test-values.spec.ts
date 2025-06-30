import {
  CreateNodeDto,
  DeleteNodeDto,
  GetOneNodeDto,
  GetZtrackingNodeDto,
  UpdateNodeDto,
} from 'ez-utils';
import { Node } from '../../entities/node.entity';
import { ZtrackingNode } from '../../entities/ztracking-node.entity';
import {
  mockNodeTypeCase001,
  mockNodeTypeId,
} from '../node-type/test-values.spec';
import {
  mockNodeExitCase001,
  mockNodeExitId,
} from '../node-exit/test-values.spec';
import { mockFlowCase001, mockFlowId } from '../flow/test-values.spec';

export const mockTraceIdForNode: string = 'traceIdForMockNode';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockNodeId: string = 'mockNodeId';

// Mock for first case
export const mockNodeName001: string = 'mockNodeName001';
export const mockNodeDescription001: string = 'mockNodeDescription001';
export const mockPositionX001: number = 1;
export const mockPositionY001: number = 1;

export const mockNodeCase001: Node = {
  nodeId: mockNodeId,
  name: mockNodeName001,
  nodeType: mockNodeTypeCase001,
  nodeExits: [mockNodeExitCase001],
  nodeTypeId: mockNodeTypeId,
  flow: mockFlowCase001,
  flowId: mockFlowId,
  positionX: mockPositionX001,
  positionY: mockPositionY001,
  previousNodeExit: mockNodeExitCase001,
  previousNodeExitId: mockNodeExitId,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockNodeName002: string = 'mockNodeName002';
export const mockNodeDescription002: string = 'mockNodeDescription002';
export const mockPositionX002: number = 2;
export const mockPositionY002: number = 2;
// Mock for second case
export const mockNodeCase002: Node = {
  nodeId: mockNodeId,
  name: mockNodeName002,
  nodeType: mockNodeTypeCase001,
  nodeExits: [mockNodeExitCase001],
  nodeTypeId: mockNodeTypeId,
  flow: mockFlowCase001,
  flowId: mockFlowId,
  positionX: mockPositionX002,
  positionY: mockPositionY002,
  previousNodeExit: mockNodeExitCase001,
  previousNodeExitId: mockNodeExitId,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  save(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<Node> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

// Mock for ztracking node
export const mockZtrackingNodeCase001: ZtrackingNode = {
  ztrackingVersion: 'mock-version-uuid',
  nodeId: mockNodeId,
  name: mockNodeName001,
  nodeTypeId: mockNodeTypeId,
  flowId: mockFlowId,
  positionX: mockPositionX001,
  positionY: mockPositionY001,
  previousNodeExitId: mockNodeExitId,
  isDeleted: false,
  updatedBy: mockUser001,
  versionDate: commonCreationDate,

  // Mock the BaseEntity methods
  recover(): Promise<ZtrackingNode> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<ZtrackingNode> {
    return Promise.resolve(undefined);
  },
  save(): Promise<ZtrackingNode> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<ZtrackingNode> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockCreateNodeDto: CreateNodeDto = {
  name: mockNodeName001,
  nodeType: mockNodeTypeCase001,
  nodeExits: [mockNodeExitCase001],
  nodeTypeId: mockNodeTypeId,
  flow: mockFlowCase001,
  flowId: mockFlowId,
  positionX: mockPositionX001,
  positionY: mockPositionY001,
  previousNodeExitId: mockNodeExitId,
  previousNodeExit: mockNodeExitCase001,
  updatedBy: mockUser001,
};

export const mockUpdateNodeDto: UpdateNodeDto = {
  nodeId: mockNodeId,
  name: mockNodeName002,
  nodeType: mockNodeTypeCase001,
  nodeExits: [mockNodeExitCase001],
  nodeTypeId: mockNodeTypeId,
  flow: mockFlowCase001,
  flowId: mockFlowId,
  positionX: mockPositionX001,
  positionY: mockPositionY001,
  previousNodeExitId: mockNodeExitId,
  previousNodeExit: mockNodeExitCase001,
  updatedBy: mockUser001,
};

export const mockGetOneNodeDto: GetOneNodeDto = {
  nodeId: mockNodeId,
  name: mockNodeName001,
  isDeleted: false,
};

export const mockDeleteNodeDto: DeleteNodeDto = {
  nodeId: mockNodeId,
  updatedBy: mockUser001,
};

export const mockGetZtrackingNodeDto: GetZtrackingNodeDto = {
  nodeId: mockNodeId,
};
