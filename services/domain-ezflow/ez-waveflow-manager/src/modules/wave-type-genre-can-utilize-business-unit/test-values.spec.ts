import {
  CreateWaveTypeGenreCanUtilizeBusinessUnitDto,
  DeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
  GetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
  GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
  UpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
} from 'ez-utils';
import { WaveTypeGenreCanUtilizeBusinessUnit } from '../../entities/wave-type-genre-can-utilize-business-unit.entity';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnit } from '../../entities/ztracking-wave-type-genre-can-utilize-business-unit.entity';
import {
  mockWaveTypeGenreCase001,
  mockWaveTypeGenreId,
} from '../wave-type-genre/test-values.spec';

export const mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit: string =
  'traceIdForMockWaveTypeGenreCanUtilizeBusinessUnit';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';

// Mock for first case
export const mockBusinessUnitId001: string = 'mockBusinessUnitId001';

export const mockWaveTypeGenreCanUtilizeBusinessUnitCase001: WaveTypeGenreCanUtilizeBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId001,
    waveTypeGenreId: mockWaveTypeGenreId,
    waveTypeGenre: mockWaveTypeGenreCase001,
    isActive: true,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
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

export const mockWaveTypeGenreCanUtilizeBusinessUnitCase002: WaveTypeGenreCanUtilizeBusinessUnit =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeGenreId: mockWaveTypeGenreId,
    waveTypeGenre: mockWaveTypeGenreCase001,
    isActive: true,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    recover(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<WaveTypeGenreCanUtilizeBusinessUnit> {
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
export const mockZtrackingWaveTypeGenreCanUtilizeBusinessUnitCase001: ZtrackingWaveTypeGenreCanUtilizeBusinessUnit =
  {
    ztrackingVersion: 'mock-version-uuid',
    businessUnitId: mockBusinessUnitId001,
    waveTypeGenreId: mockWaveTypeGenreId,
    isActive: true,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonCreationDate,
    updatedAt: commonCreationDate,
    versionDate: commonCreationDate,

    // Mock the BaseEntity methods
    recover(): Promise<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    remove(): Promise<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    save(): Promise<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    softRemove(): Promise<ZtrackingWaveTypeGenreCanUtilizeBusinessUnit> {
      return Promise.resolve(undefined);
    },
    hasId(): boolean {
      return false;
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

export const mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto: CreateWaveTypeGenreCanUtilizeBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId001,
    waveTypeGenreId: mockWaveTypeGenreId,
    isActive: true,
    updatedBy: mockUser001,
  };

export const mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto: UpdateWaveTypeGenreCanUtilizeBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeGenreId: mockWaveTypeGenreId,
    isActive: true,
    updatedBy: mockUser001,
  };

export const mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto: GetOneWaveTypeGenreCanUtilizeBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeGenreId: mockWaveTypeGenreId,
    isDeleted: false,
  };

export const mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto: DeleteWaveTypeGenreCanUtilizeBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeGenreId: mockWaveTypeGenreId,
    updatedBy: mockUser001,
  };

export const mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto: GetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto =
  {
    businessUnitId: mockBusinessUnitId002,
    waveTypeGenreId: mockWaveTypeGenreId,
  };
