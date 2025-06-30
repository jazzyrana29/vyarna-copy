import { GetManyWaveTypeGenresDto, GetOneWaveTypeGenreDto } from 'ez-utils';
import { WaveTypeGenre } from '../../entities/wave-type-genre.entity';
import {
  mockWaveTypeCase001,
  mockWaveTypeId,
} from '../wave-type/test-values.spec';
import {
  mockWaveTypeGenreCanUtilizeBusinessUnitCase001,
  mockWaveTypeGenreCanUtilizeBusinessUnitCase002,
} from '../wave-type-genre-can-utilize-business-unit/test-values.spec';

export const mockTraceIdForWaveTypeGenre: string =
  'traceIdForMockWaveTypeGenre';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockWaveTypeGenreId: string = 'mockWaveTypeGenreId';

// Mock for first case
export const mockWaveTypeGenreName001: string = 'mockWaveTypeGenreName001';
export const mockWaveTypeGenreDescription001: string =
  'mockWaveTypeGenreDescription001';

export const mockWaveTypeGenreCase001: WaveTypeGenre = {
  utilizedBusinessUnits: [mockWaveTypeGenreCanUtilizeBusinessUnitCase001],
  waveTypeGenreId: mockWaveTypeGenreId,
  name: mockWaveTypeGenreName001,
  description: mockWaveTypeGenreDescription001,
  waveTypes: [mockWaveTypeCase001],
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  save(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<WaveTypeGenre> {
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
export const mockWaveTypeGenreName002: string = 'mockWaveTypeGenreName002';
export const mockWaveTypeGenreDescription002: string =
  'mockWaveTypeGenreDescription002';

export const mockWaveTypeGenreCase002: WaveTypeGenre = {
  utilizedBusinessUnits: [mockWaveTypeGenreCanUtilizeBusinessUnitCase002],
  waveTypeGenreId: mockWaveTypeGenreId,
  name: mockWaveTypeGenreName002,
  description: mockWaveTypeGenreDescription002,
  waveTypes: [mockWaveTypeCase001],
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  save(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<WaveTypeGenre> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockGetOneWaveTypeGenreDto: GetOneWaveTypeGenreDto = {
  waveTypeGenreId: mockWaveTypeGenreId,
  name: mockWaveTypeGenreName001,
};

export const mockGetManyWaveTypeGenresDto: GetManyWaveTypeGenresDto = {
  waveTypeId: mockWaveTypeId,
};
