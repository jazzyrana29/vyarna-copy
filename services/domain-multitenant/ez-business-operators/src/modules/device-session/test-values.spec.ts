// @ts-nocheck
import { DeviceSession } from '../../entities/device-session.entity';

import { ZtrackingDeviceSession } from '../../entities/ztracking-device-session.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import {
  CloseDeviceSessionDto,
  CreateDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  StartDeviceSessionDto,
  UpdateDeviceSessionDto,
} from 'ez-utils';

// Mock values
export const mockTraceId: string = 'traceIdForMockDeviceSession';
export const commonUseCreationDate: Date = new Date();
export const mockDeviceSessionId001: string = 'uuidForMockDeviceSessionCase001';
export const mockDeviceSessionName001: string =
  'nameForMockDeviceSessionCase001';
export const mockDeviceSessionName002: string =
  'nameForMockDeviceSessionCase002';
export const mockUser001: string = 'userForMockDeviceSessionCase001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCase001';

export const mockCreateDeviceSessionDtoCase001: CreateDeviceSessionDto = {
  name: mockDeviceSessionName001,
  // Add other properties relevant to CreateDeviceSessionDto as needed
};

export const mockUpdateDeviceSessionDtoCase002: UpdateDeviceSessionDto = {
  deviceSessionId: mockDeviceSessionId001,
  name: mockDeviceSessionName002,
  isDeleted: false,
  updatedBy: mockUser001,
  // Add other properties relevant to UpdateDeviceSessionDto as needed
};

export const mockSavedDeviceSessionCase001: DeviceSession = {
  deviceSessionId: mockDeviceSessionId001,
  startTime: commonUseCreationDate,
  endTime: null,
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  lastUpdated: commonUseCreationDate,
  operatorSessions: [], // Assuming empty array, add mock operator sessions if needed
  name: mockDeviceSessionName001,
  deviceId: 'deviceIdMock001',
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
};

export const mockSavedDeviceSessionCase002: DeviceSession = {
  deviceSessionId: mockDeviceSessionId001,
  startTime: commonUseCreationDate,
  endTime: null,
  ipAddress: '192.168.1.2',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  lastUpdated: commonUseCreationDate,
  operatorSessions: [], // Assuming empty array, add mock operator sessions if needed
  name: mockDeviceSessionName002,
  deviceId: 'deviceIdMock002',
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
};

export const mockSavedZtrackingDeviceSessionCase001: ZtrackingDeviceSession = {
  ztrackingVersion: mockZtrackingVersion001,
  deviceSessionId: mockDeviceSessionId001,
  name: mockDeviceSessionName001,
  deviceId: 'deviceIdMock001',
  isDeleted: false,
  createdAt: commonUseCreationDate,
  updatedBy: mockUser001,
  versionDate: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<ZtrackingDeviceSession> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<ZtrackingDeviceSession> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (
    options?: SaveOptions,
  ): Promise<ZtrackingDeviceSession> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<ZtrackingDeviceSession> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockStartDeviceSessionDtoCase001: StartDeviceSessionDto = {
  name: mockDeviceSessionName001,
  deviceId: 'deviceIdMock001',
};

export const mockCloseDeviceSessionDtoCase001: CloseDeviceSessionDto = {
  deviceSessionId: mockDeviceSessionId001,
  endTime: new Date(),
  updatedBy: mockUser001,
  // Add other properties relevant to CloseDeviceSessionDto as needed
};

export const mockGetDeviceSessionHistoryDtoCase001: GetDeviceSessionHistoryDto =
  {
    startTime: new Date('2023-01-01T00:00:00.000Z'), // Example start date
    endTime: new Date('2023-12-31T23:59:59.999Z'),
    name: 'Test',
  };
