// @ts-nocheck
import { OperatorSession } from '../../entities/operator-session.entity';
import { ZtrackingOperatorSession } from '../../entities/ztracking-operator-session.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { Operator } from '../../entities/operator.entity';
import { CreateOperatorSessionDto, UpdateOperatorSessionDto } from 'ez-utils';

export const mockTraceId: string = 'traceIdForMockCreateOperatorSession';
export const commonUseCreationDate: Date = new Date();
export const mockOperatorSessionId001: string =
  'uuidForMockCreateOperatorSessionCase001';
export const mockOperatorId001: string =
  'operatorIdForMockCreateOperatorSessionCase001';
export const mockOperatorId002: string =
  'operatorIdForMockCreateOperatorSessionCase002';
export const mockUser001: string = 'userForMyOperatorSessionCase001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCase001';

export const mockCreateOperatorSessionDtoCase001: CreateOperatorSessionDto = {
  operatorId: mockOperatorId001,
  loginTime: commonUseCreationDate,
  updatedBy: mockUser001,
};

export const mockUpdateOperatorSessionDtoCase002: UpdateOperatorSessionDto = {
  operatorSessionId: mockOperatorSessionId001,
  logoutTime: commonUseCreationDate,
  updatedBy: mockUser001,
};

export const mockSavedOperatorSessionCase001: OperatorSession = {
  operatorSessionId: mockOperatorSessionId001,
  operator: {
    operatorId: mockOperatorId001,
  } as Operator,
  deviceSession: null, // assuming no device session for this mock case, adjust as needed
  loginTime: commonUseCreationDate,
  logoutTime: null,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockSavedZtrackingOperatorSessionCase001: ZtrackingOperatorSession =
  {
    ztrackingVersion: mockZtrackingVersion001,
    operatorSessionId: mockOperatorSessionId001,
    operatorId: mockOperatorId001,
    deviceSessionId: 'mockDeviceSessionId', // Add appropriate mock id
    loginTime: commonUseCreationDate,
    logoutTime: null,
    updatedBy: mockUser001,
    createdAt: commonUseCreationDate,
    versionDate: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (options?: SaveOptions): Promise<ZtrackingOperatorSession> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingOperatorSession> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingOperatorSession> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingOperatorSession> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

export const mockSavedOperatorSessionCase002: OperatorSession = {
  operatorSessionId: mockOperatorSessionId001,
  operator: {
    operatorId: mockOperatorId002,
    // other properties of Operator can be mocked here if needed
  } as Operator,
  deviceSession: null, // assuming no device session for this mock case, adjust as needed
  loginTime: commonUseCreationDate,
  logoutTime: commonUseCreationDate, // Adjusted for this mock case
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<OperatorSession> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
