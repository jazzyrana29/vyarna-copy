import { MechanismPermit } from '../../entities/mechanism-permit.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';

export const mockTraceId: string = 'traceIdForMockMechanismPermit';
export const commonUseCreationDate: Date = new Date();
export const mockMechanismPermitId001: string =
  'uuidForMockMechanismPermitCase001';
export const mockMechanismPermitName001: string =
  'nameForMyMechanismPermitCase001';
export const mockMechanismPermitName002: string =
  'nameForMyMechanismPermitCase002';
export const mockUser001: string = 'userForMyMechanismPermitCase001';

export const mockSavedMechanismPermitCase001: MechanismPermit = {
  mechanismPermitId: mockMechanismPermitId001,
  name: mockMechanismPermitName001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  systemMechanismId: '',
  permissionProfileManagedThroughMechanismPermits: [],
};

export const mockSavedMechanismPermitCase002: MechanismPermit = {
  mechanismPermitId: mockMechanismPermitId001,
  name: mockMechanismPermitName002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<MechanismPermit> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  systemMechanismId: '',
  permissionProfileManagedThroughMechanismPermits: [],
};
