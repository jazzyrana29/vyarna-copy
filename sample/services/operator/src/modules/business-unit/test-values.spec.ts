import { BusinessUnit } from '../../entities/business-unit.entity';

import { RemoveOptions, SaveOptions } from 'typeorm';

import { ZtrackingBusinessUnit } from '../../entities/ztracking-business-unit.entity';
import { CreateBusinessUnitDto, UpdateBusinessUnitDto } from 'ez-utils';

export const mockTraceId: string = 'traceIdForMockCreateBusiness';
export const commonUseCreationDate: Date = new Date();
export const mockBusinessUnitId001: string =
  'uuidForMockCreateBusinessUnitDtoCase001';
export const mockBusinessUnitName001: string = 'nameForMyBusinessUnitCase001';
export const mockBusinessUnitName002: string = 'nameForMyBusinessUnitCase002';
export const mockUser001: string = 'userForMyBusinessUnitCase001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCase001';

export const mockCreateBusinessUnitDtoCase001: CreateBusinessUnitDto = {
  name: mockBusinessUnitName001,
};
export const mockUpdateBusinessUnitDtoCase002: UpdateBusinessUnitDto = {
  businessUnitId: mockBusinessUnitId001,
  name: mockBusinessUnitName002,
  parentBusinessUnitId: null,
  children: null,
  isDeleted: false,
  updatedBy: mockUser001,
};

export const mockSavedBusinessUnitCase001: BusinessUnit = {
  businessUnitId: mockBusinessUnitId001,
  name: mockBusinessUnitName001,
  parentBusinessUnitId: null,
  children: null,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  parentBusinessUnit: new BusinessUnit(),
};

export const mockSavedZtrackingBusinessUnitCase001: ZtrackingBusinessUnit = {
  ztrackingVersion: mockZtrackingVersion001,
  businessUnitId: mockBusinessUnitId001,
  name: mockBusinessUnitName001,
  parentBusinessUnitId: null,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  versionDate: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<ZtrackingBusinessUnit> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<ZtrackingBusinessUnit> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<ZtrackingBusinessUnit> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<ZtrackingBusinessUnit> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockSavedBusinessUnitCase002: BusinessUnit = {
  businessUnitId: mockBusinessUnitId001,
  name: mockBusinessUnitName002,
  parentBusinessUnitId: null,
  children: null,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<BusinessUnit> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  parentBusinessUnit: new BusinessUnit(),
};
