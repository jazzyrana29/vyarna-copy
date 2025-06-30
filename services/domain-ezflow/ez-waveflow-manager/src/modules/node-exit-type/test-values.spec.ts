import { NodeExitType } from '../../entities/node-exit-type.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { GetNodeExitTypeDto, GetManyNodeExitTypesDto } from 'ez-utils';

export const mockTraceId: string = 'traceIdForMockNodeExitType';
export const commonUseCreationDate: Date = new Date();
export const mockNodeExitTypeId001: string = 'uuidForMockNodeExitTypeCase001';
export const mockNodeExitTypeName001: string = 'nameForMyNodeExitTypeCase001';
export const mockNodeExitTypeName002: string = 'nameForMyNodeExitTypeCase002';
export const mockUser001: string = 'userForMyNodeExitTypeCase001';

export const mockGetNodeExitTypeDtoCase001: GetNodeExitTypeDto = {
  name: mockNodeExitTypeName001,
  isDeleted: false,
  nodeExitTypeId: '',
};

export const mockGetManyNodeExitTypesDtoCase002: GetManyNodeExitTypesDto = {
  name: mockNodeExitTypeName002,
  nodeExitTypeId: '',
};

export const mockSavedNodeExitTypeCase001: NodeExitType = {
  nodeExitTypeId: mockNodeExitTypeId001,
  name: mockNodeExitTypeName001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  nodeExits: [],
};

export const mockSavedNodeExitTypeCase002: NodeExitType = {
  nodeExitTypeId: mockNodeExitTypeId001,
  name: mockNodeExitTypeName002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<NodeExitType> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  nodeExits: [],
};
