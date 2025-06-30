import { EvaluationVariableDataType } from '../../entities/evaluation-variable-data-type.entity';
import { RemoveOptions, SaveOptions } from 'typeorm';
import {
  GetEvaluationVariableDataTypeDto,
  GetManyEvaluationVariableDataTypesDto,
} from 'ez-utils';

export const mockTraceId: string = 'traceIdForMockEvaluationVariable';
export const commonUseCreationDate: Date = new Date();
export const mockEvaluationVariableDataTypeId001: string =
  'uuidForMockEvaluationVariableDataTypeCase001';
export const mockEvaluationVariableDataTypeName001: string =
  'nameForMyEvaluationVariableDataTypeCase001';
export const mockEvaluationVariableDataTypeName002: string =
  'nameForMyEvaluationVariableDataTypeCase002';
export const mockUser001: string = 'userForMyEvaluationVariableDataTypeCase001';

export const mockGetEvaluationVariableDataTypeDtoCase001: GetEvaluationVariableDataTypeDto =
  {
    name: mockEvaluationVariableDataTypeName001,
    evaluationVariableDataTypeId: '',
    isDeleted: false,
  };

export const mockGetManyEvaluationVariableDataTypesDtoCase002: GetManyEvaluationVariableDataTypesDto =
  {
    name: mockEvaluationVariableDataTypeName002,
    evaluationVariableDataTypeId: '',
  };

export const mockSavedEvaluationVariableDataTypeCase001: EvaluationVariableDataType =
  {
    evaluationVariableDataTypeId: mockEvaluationVariableDataTypeId001,
    name: mockEvaluationVariableDataTypeName001,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    description: '',
    evaluationVariables: [],
  };

export const mockSavedEvaluationVariableDataTypeCase002: EvaluationVariableDataType =
  {
    evaluationVariableDataTypeId: mockEvaluationVariableDataTypeId001,
    name: mockEvaluationVariableDataTypeName002,
    isDeleted: false,
    updatedBy: mockUser001,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableDataType> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    description: '',
    evaluationVariables: [],
  };
