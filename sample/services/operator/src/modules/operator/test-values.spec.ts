import { RemoveOptions, SaveOptions } from 'typeorm';
import { Operator } from '../../entities/operator.entity';
import {
  CreateOperatorDto,
  GetHistoryOfOperatorDto,
  GetManyOperatorsDto,
  GetOperatorDto,
  UpdateOperatorDto,
} from 'ez-utils';
import { ZtrackingOperator } from '../../entities/ztracking-operator.entity';

export const mockTraceIdForOperator: string = 'traceIdForMockOperator';

export const commonUseCreationDate: Date = new Date();

export const mockOperatorId001: string =
  'operatorIdForMockCreateOperatorCase001';
export const mockOperatorId002: string =
  'operatorIdForMockCreateOperatorCase002';

export const mockUser001: string = 'mockUserForMyOperatorCase001';
export const mockUserName001: string = 'mockUsernameForMyOperatorCase001';
export const mockPassword001: string = 'mockPasswordForMyOperatorCase001';
export const mockFirstName001: string = 'mockFirstNameForMyOperatorCase001';
export const mockMiddleName001: string = 'mockMiddleNameForMyOperatorCase001';
export const mockLastName001: string = 'mockLastNameForMyOperatorCase001';
export const mockEmail001: string = 'mockEmailForMyOperatorCase001';
export const mockBusinessUnitId001: string =
  'mockBusinessUnitIdForMyOperatorCase001';
export const mockRootBusinessUnitId001: string =
  'mockRootBusinessUnitIdForMyOperatorCase001';

export const mockCreateOperatorDtoCase001: CreateOperatorDto = {
  username: mockUserName001,
  password: mockPassword001,
  updatedBy: mockUser001,
  nameFirst: mockFirstName001,
  nameLast: mockLastName001,
  email: mockEmail001,
  nameMiddle: mockMiddleName001,
  businessUnitId: mockBusinessUnitId001,
  rootBusinessUnitId: mockRootBusinessUnitId001,
};

export const mockFirstName002: string = 'mockFirstNameForMyOperatorCase002';
export const mockMiddleName002: string = 'mockMiddleNameForMyOperatorCase002';
export const mockLastName002: string = 'mockLastNameForMyOperatorCase002';

export const mockUpdateOperatorDtoCase002: UpdateOperatorDto = {
  operatorId: mockOperatorId001,
  username: mockUserName001,
  password: mockPassword001,
  updatedBy: mockUser001,
  nameFirst: mockFirstName002,
  nameMiddle: mockMiddleName002,
  nameLast: mockLastName002,
  email: mockEmail001,
  businessUnitId: mockBusinessUnitId001,
  rootBusinessUnitId: mockRootBusinessUnitId001,
  isDeleted: false,
};

export const mockSavedOperatorCase001: Operator = {
  operatorId: mockOperatorId001,
  username: mockUserName001,
  password: mockPassword001,
  updatedBy: mockUser001,
  nameFirst: mockFirstName001,
  nameMiddle: mockMiddleName001,
  nameLast: mockLastName001,
  email: mockEmail001,
  businessUnitId: mockBusinessUnitId001,
  rootBusinessUnitId: mockRootBusinessUnitId001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  isDeleted: false,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCase001';

export const mockSavedZtrackingOperatorCase001: ZtrackingOperator = {
  ztrackingVersion: mockZtrackingVersion001,
  operatorId: mockOperatorId001,
  updatedBy: mockUser001,
  nameFirst: mockFirstName001,
  nameLast: mockLastName001,
  email: mockEmail001,
  nameMiddle: mockMiddleName001,
  businessUnitId: mockBusinessUnitId001,
  createdAt: commonUseCreationDate,
  versionDate: commonUseCreationDate,
  isDeleted: false,
  login: '',
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<ZtrackingOperator> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<ZtrackingOperator> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<ZtrackingOperator> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<ZtrackingOperator> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockSavedOperatorCase002: Operator = {
  operatorId: mockOperatorId001,
  username: mockUserName001,
  password: mockPassword001,
  updatedBy: mockUser001,
  nameFirst: mockFirstName002,
  nameMiddle: mockMiddleName002,
  nameLast: mockLastName002,
  email: mockEmail001,
  businessUnitId: mockBusinessUnitId001,
  rootBusinessUnitId: mockRootBusinessUnitId001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  isDeleted: false,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<Operator> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockGetOperatorCase001: GetOperatorDto = {
  operatorId: mockOperatorId001,
  isDeleted: false,
  nameFirst: mockFirstName001,
};
// incorrect dto for error
export const mockGetOperatorCase002: GetOperatorDto = {} as GetOperatorDto;

export const mockGetManyOperatorCase001: GetManyOperatorsDto = {
  businessUnitId: mockOperatorId001,
  nameFirst: mockFirstName001,
};
// incorrect dto for error
export const mockGetManyOperatorCase002: GetManyOperatorsDto =
  {} as GetManyOperatorsDto;

export const mockGetHistoryOperatorCase001: GetHistoryOfOperatorDto = {
  operatorId: mockOperatorId001,
};
// incorrect dto for error
export const mockGetHistoryOperatorCase002: GetHistoryOfOperatorDto =
  {} as GetHistoryOfOperatorDto;
