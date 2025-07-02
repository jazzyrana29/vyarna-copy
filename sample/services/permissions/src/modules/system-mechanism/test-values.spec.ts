import { SystemMechanism } from '../../entities/system-mechanism.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';

export const mockTraceId: string = 'traceIdForMockCreateSystem';
export const mockName: string = 'mockName';
export const commonUseCreationDate: Date = new Date();
export const mockSystemMechanismId001: string =
  'uuidForMockCreateSystemMechanismCase001';
export const mockSystemMechanismName001: string =
  'nameForMySystemMechanismCase001';
export const mockSystemMechanismName002: string =
  'nameForMySystemMechanismCase002';
export const mockUser001: string = 'userForMySystemMechanismCase001';

export const mockCreateSystemMechanism: Partial<SystemMechanism> = {
  name: mockSystemMechanismName001,
};

export const mockUpdateSystemMechanism: Partial<SystemMechanism> = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockSystemMechanismName002,
  isDeleted: false,
  updatedBy: mockUser001,
};

export const mockSavedSystemMechanismCase001: SystemMechanism = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockSystemMechanismName001,
  description: 'Test description for System Mechanism Case 001',
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  mechanismPermits: [],
};

export const mockSavedSystemMechanismCase002: SystemMechanism = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockSystemMechanismName002,
  description: 'Test description for System Mechanism Case 002',
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  mechanismPermits: [],
};

export const mockFindParams = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockName,
  isDeleted: false,
};

export const mockHistoricalParams = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockSystemMechanismName001,
  isDeleted: false,
};

export const mockHistoricalResults = [
  {
    ...mockSavedSystemMechanismCase001,
    updatedAt: new Date(
      mockSavedSystemMechanismCase001.updatedAt.getTime() - 3600 * 1000,
    ), // 1 hour earlier
  },
  {
    ...mockSavedSystemMechanismCase001,
    updatedAt: new Date(
      mockSavedSystemMechanismCase001.updatedAt.getTime() - 7200 * 1000,
    ), // 2 hours earlier
  },
];

export const mockSystemMechanism: SystemMechanism = {
  systemMechanismId: mockSystemMechanismId001,
  name: mockSystemMechanismName001,
  description: 'A sample description for System Mechanism',
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<SystemMechanism> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  mechanismPermits: [],
};
