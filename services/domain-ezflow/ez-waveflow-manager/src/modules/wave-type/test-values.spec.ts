import { GetManyWaveTypesDto, GetOneWaveTypeDto } from 'ez-utils';
import { WaveType } from '../../entities/wave-type.entity';
import { mockWaveTypeGenreCase001 } from '../wave-type-genre/test-values.spec';
import {
  mockWaveTypeIsAllowedToAccessBusinessUnitCase001,
  mockWaveTypeIsAllowedToAccessBusinessUnitCase002,
} from '../wave-type-is-allowed-to-access-business-unit/test-values.spec';

export const mockTraceIdForWaveType: string = 'traceIdForMockWaveType';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockWaveTypeId: string = 'mockWaveTypeId';

// Mock for first case
export const mockWaveTypeName001: string = 'mockWaveTypeName001';
export const mockWaveTypeDescription001: string = 'mockWaveTypeDescription001';

export const mockWaveTypeCase001: WaveType = {
  allowedBusinessUnits: [mockWaveTypeIsAllowedToAccessBusinessUnitCase001],
  evaluationVariablesAreAvailableForWaveTypes: [],
  flowIsActiveForWaveTypeAndBusinessUnits: [],
  flows: [],
  waveTypeId: mockWaveTypeId,
  name: mockWaveTypeName001,
  description: mockWaveTypeDescription001,
  waves: [],
  waveTypeGenre: mockWaveTypeGenreCase001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<WaveType> {
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
export const mockWaveTypeName002: string = 'mockWaveTypeName002';
export const mockWaveTypeDescription002: string = 'mockWaveTypeDescription002';

export const mockWaveTypeCase002: WaveType = {
  allowedBusinessUnits: [mockWaveTypeIsAllowedToAccessBusinessUnitCase002],
  evaluationVariablesAreAvailableForWaveTypes: [],
  flowIsActiveForWaveTypeAndBusinessUnits: [],
  flows: [],
  waveTypeId: mockWaveTypeId,
  name: mockWaveTypeName002,
  description: mockWaveTypeDescription002,
  waves: [],
  waveTypeGenre: mockWaveTypeGenreCase001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  save(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<WaveType> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockGetOneWaveTypeDto: GetOneWaveTypeDto = {
  waveTypeId: mockWaveTypeId,
  name: mockWaveTypeName001,
};

export const mockGetManyWaveTypesDto: GetManyWaveTypesDto = {
  waveTypeGenreId: '',
};
