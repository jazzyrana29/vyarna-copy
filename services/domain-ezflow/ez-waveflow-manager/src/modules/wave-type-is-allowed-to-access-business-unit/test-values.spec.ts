import {
  CreateWaveTypeIsAllowedToAccessBusinessUnitDto,
  DeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
  GetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
  GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
  UpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
} from 'ez-utils';
import { WaveTypeIsAllowedToAccessBusinessUnit } from '../../entities/wave-type-is-allowed-to-access-business-unit.entity';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnit } from '../../entities/ztracking-wave-type-is-allowed-to-access-business-unit.entity';
import {
  mockWaveTypeCase001,
  mockWaveTypeId,
} from '../wave-type/test-values.spec';

export const mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit: string =
  'traceIdForMockWaveTypeIsAllowedToAccessBusinessUnit';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';

// Mock for first case
export const mockBusinessUnitId001: string = 'mockBusinessUnitId001';

export const mockWaveTypeIsAllowedToAccessBusinessUnitCase001: WaveTypeIsAllowedToAccessBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId001,
    waveTypeId: mockWaveTypeId,
    waveType: mockWaveTypeCase001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
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
export const mockBusinessUnitId002: string = 'mockBusinessUnitId002';

export const mockWaveTypeIsAllowedToAccessBusinessUnitCase002: WaveTypeIsAllowedToAccessBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeId: mockWaveTypeId,
    waveType: mockWaveTypeCase001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<WaveTypeIsAllowedToAccessBusinessUnit> {
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
export const mockZtrackingWaveTypeIsAllowedToAccessBusinessUnitCase001: ZtrackingWaveTypeIsAllowedToAccessBusinessUnit =
  {
    ztrackingVersion: 'mock-version-uuid',
    businessUnitId: mockBusinessUnitId001,
    waveTypeId: mockWaveTypeId,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    versionDate: commonCreationDate,

    // Mock the BaseEntity methods
    recover(): Promise<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<ZtrackingWaveTypeIsAllowedToAccessBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto: CreateWaveTypeIsAllowedToAccessBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId001,
    waveTypeId: mockWaveTypeId,
    updatedBy: mockUser001,
  };

export const mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto: UpdateWaveTypeIsAllowedToAccessBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeId: mockWaveTypeId,
    updatedBy: mockUser001,
  };

export const mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto: GetOneWaveTypeIsAllowedToAccessBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeId: mockWaveTypeId,
    isDeleted: false,
  };

export const mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto: DeleteWaveTypeIsAllowedToAccessBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeId: mockWaveTypeId,
    updatedBy: mockUser001,
  };

export const mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto: GetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeId: mockWaveTypeId,
  };
