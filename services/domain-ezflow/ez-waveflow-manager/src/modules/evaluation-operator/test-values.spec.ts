import {
  GetManyEvaluationOperatorsDto,
  GetOneEvaluationOperatorDto,
} from 'ez-utils';
import { EvaluationOperator } from '../../entities/evaluation-operator.entity';
import {
  mockSavedEvaluationVariableDataTypeCase001,
  mockSavedEvaluationVariableDataTypeCase002,
} from '../evaluation-variable-data-type/test-values.spec';

export const mockTraceIdForEvaluationOperator: string =
  'traceIdForMockEvaluationOperator';

export const commonCreationDate: Date = new Date();
export const mockUser001: string = 'mockUser001';
export const mockEvaluationOperatorId: string = 'mockEvaluationOperatorId';

// Mock for first case
export const mockEvaluationOperatorName001: string =
  'mockEvaluationOperatorName001';
export const mockEvaluationOperatorDescription001: string =
  'mockEvaluationOperatorDescription001';
export const mockChoiceType001: string = 'mockChoiceType001';
export const mockSymbol001: string = 'mockSymbol001';

export const mockEvaluationOperatorCase001: EvaluationOperator = {
  evaluationOperatorId: mockEvaluationOperatorId,
  name: mockEvaluationOperatorName001,
  description: mockEvaluationOperatorDescription001,
  choiceType: mockChoiceType001,
  evaluationVariableDataTypes: [mockSavedEvaluationVariableDataTypeCase001],
  symbol: mockSymbol001,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  save(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<EvaluationOperator> {
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
export const mockEvaluationOperatorName002: string =
  'mockEvaluationOperatorName002';
export const mockEvaluationOperatorDescription002: string =
  'mockEvaluationOperatorDescription002';
export const mockChoiceType002: string = 'mockChoiceType002';
export const mockSymbol002: string = 'mockSymbol002';

export const mockEvaluationOperatorCase002: EvaluationOperator = {
  evaluationOperatorId: mockEvaluationOperatorId,
  name: mockEvaluationOperatorName002,
  description: mockEvaluationOperatorDescription002,
  choiceType: mockChoiceType002,
  evaluationVariableDataTypes: [mockSavedEvaluationVariableDataTypeCase002],
  symbol: mockSymbol002,
  isDeleted: false,
  updatedBy: mockUser001,
  createdAt: commonCreationDate,
  updatedAt: commonCreationDate,
  recover(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  remove(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  save(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  softRemove(): Promise<EvaluationOperator> {
    return Promise.resolve(undefined);
  },
  hasId(): boolean {
    return false;
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export const mockGetOneEvaluationOperatorDto: GetOneEvaluationOperatorDto = {
  evaluationOperatorId: mockEvaluationOperatorId,
  name: mockEvaluationOperatorName001,
  isDeleted: false,
};

export const mockGetManyEvaluationOperatorsDto: GetManyEvaluationOperatorsDto =
  {};
