import { GetManyNodeTypesDto, GetOneNodeTypeDto } from 'ez-utils';
import { NodeType } from '../../entities/node-type.entity';

export const mockTraceIdForNodeType: string = 'traceIdForMockNodeType';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockNodeTypeId: string = 'mockNodeTypeId';

// Mock for first case
export const mockNodeTypeName001: string = 'mockNodeTypeName001';
export const mockNodeTypeDescription001: string = 'mockNodeTypeDescription001';

export const mockNodeTypeCase001: NodeType = {
  nodeTypeId: mockNodeTypeId,
  name: mockNodeTypeName001,
  description: mockNodeTypeDescription001,
  nodes: [], //TODO: will be added after node modules
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<NodeType> {
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
export const mockNodeTypeName002: string = 'mockNodeTypeName002';
export const mockNodeTypeDescription002: string = 'mockNodeTypeDescription002';

export const mockNodeTypeCase002: NodeType = {
  nodeTypeId: mockNodeTypeId,
  name: mockNodeTypeName002,
  description: mockNodeTypeDescription002,
  nodes: [], //TODO: will be added after node modules
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<NodeType> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockGetOneNodeTypeDto: GetOneNodeTypeDto = {
  nodeTypeId: mockNodeTypeId,
  name: mockNodeTypeName001,
};

export const mockGetManyNodeTypesDto: GetManyNodeTypesDto = {};
