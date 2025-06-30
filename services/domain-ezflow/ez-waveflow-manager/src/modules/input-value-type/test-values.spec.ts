import { InputValueType } from '../../entities/input-value-type.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { GetInputValueTypeDto, GetManyInputValueTypesDto } from 'ez-utils';
import { TaskTypesReceiveInputValueType } from '../../entities/task-types-receive-input-value-type.entity';

export const mockTraceId: string = 'traceIdForMockInputValueType';
export const commonUseCreationDate: Date = new Date();
export const mockInputValueTypeId001: string =
  'uuidForMockInputValueTypeCase001';
export const mockInputValueTypeName001: string =
  'nameForMyInputValueTypeCase001';
export const mockInputValueTypeName002: string =
  'nameForMyInputValueTypeCase002';
export const mockUser001: string = 'userForMyInputValueTypeCase001';

export const mockGetInputValueTypeDtoCase001: GetInputValueTypeDto = {
  name: mockInputValueTypeName001,
  isDeleted: false,
  inputValueTypeId: '',
};

export const mockGetManyInputValueTypesDtoCase002: GetManyInputValueTypesDto = {
  name: mockInputValueTypeName002,
  inputValueTypeId: '',
};

export const mockSavedInputValueTypeCase001: InputValueType = {
  inputValueTypeId: mockInputValueTypeId001,
  name: mockInputValueTypeName001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  taskTypeReceivesInputValueType: new TaskTypesReceiveInputValueType(),
  taskTypesReceiveInputValueTypes: [],
  taskHasReceiveInputValuesOfType: [],
};

export const mockSavedInputValueTypeCase002: InputValueType = {
  inputValueTypeId: mockInputValueTypeId001,
  name: mockInputValueTypeName002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonUseCreationDate,
  updatedAt: commonUseCreationDate,
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  remove: function (options?: RemoveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  recover: function (options?: SaveOptions): Promise<InputValueType> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  description: '',
  taskTypeReceivesInputValueType: new TaskTypesReceiveInputValueType(),
  taskTypesReceiveInputValueTypes: [],
  taskHasReceiveInputValuesOfType: [],
};
