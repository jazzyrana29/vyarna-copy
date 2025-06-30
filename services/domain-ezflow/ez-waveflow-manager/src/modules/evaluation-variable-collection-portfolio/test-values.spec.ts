// Import necessary entities and DTOs
import { EvaluationVariableCollectionPortfolio } from '../../entities/evaluation-variable-collection-portfolio.entity';
import { ZtrackingEvaluationVariableCollectionPortfolio } from '../../entities/ztracking-evaluation-variable-collection-portfolio.entity';
import {
  CreateEvaluationVariableCollectionPortfolioDto,
  UpdateEvaluationVariableCollectionPortfolioDto,
  GetOneEvaluationVariableCollectionPortfolioDto,
  GetManyEvaluationVariableCollectionPortfoliosDto,
  DeleteEvaluationVariableCollectionPortfolioDto,
  GetHistoryOfEvaluationVariableCollectionPortfoliosDto,
  ZtrackingEvaluationVariableCollectionPortfolioDto,
} from 'ez-utils'; // Assuming the existence of these DTOs
import { RemoveOptions, SaveOptions } from 'typeorm';

// Mock trace ID and common date usage
export const mockTraceId: string =
  'traceIdForMockEvaluationVariableCollectionPortfolio';
export const commonUseCreationDate: Date = new Date();

// Mock identifiers
export const mockCollectionPortfolioId001: string =
  'uuidForMockCollectionPortfolio001';
export const mockCollectionPortfolioName001: string =
  'nameForMockCollectionPortfolio001';
export const mockCollectionPortfolioName002: string =
  'nameForMockCollectionPortfolio002';
export const mockBusinessUnitId: string = 'uuidForMockBusinessUnit001';
export const mockZtrackingVersion001: string =
  'uuidForMockZtrackingVersionCollectionPortfolio001';

// Mock DTOs for CR operations
export const mockCreateEvaluationVariableCollectionPortfolioDto: CreateEvaluationVariableCollectionPortfolioDto =
  {
    businessUnitId: mockBusinessUnitId,
    name: mockCollectionPortfolioName001,
    description: 'Mock description',
  };

export const mockUpdateEvaluationVariableCollectionPortfolioDto: UpdateEvaluationVariableCollectionPortfolioDto =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
    name: mockCollectionPortfolioName002,
    description: 'Updated Mock description',
  };

// Mock DTOs for Get operations
export const mockGetOneEvaluationVariableCollectionPortfolioDto: GetOneEvaluationVariableCollectionPortfolioDto =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
    name: '',
  };

export const mockGetManyEvaluationVariableCollectionPortfoliosDto: GetManyEvaluationVariableCollectionPortfoliosDto =
  {
    isDeleted: false,
    businessUnitId: 'ac669c71-81a4-469f-835b-52ee9171d48e',
  };

export const mockDeleteEvaluationVariableCollectionPortfolioDto: DeleteEvaluationVariableCollectionPortfolioDto =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
  };

export const mockGetHistoryOfCollectionPortfoliosDto: GetHistoryOfEvaluationVariableCollectionPortfoliosDto =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
  };

// Mocked Entities
export const mockSavedEvaluationVariableCollectionPortfolio001: EvaluationVariableCollectionPortfolio =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
    businessUnitId: mockBusinessUnitId,
    name: mockCollectionPortfolioName001,
    description: 'Mock description',
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    isDeleted: false,
    updatedBy: undefined,
    createdAt: commonUseCreationDate,
    updatedAt: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

export const mockSavedCollectionPortfolio002: EvaluationVariableCollectionPortfolio =
  {
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
    businessUnitId: mockBusinessUnitId,
    name: mockCollectionPortfolioName002,
    description: 'Updated Mock description',
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    isDeleted: false,
    updatedBy: undefined,
    createdAt: commonUseCreationDate,
    updatedAt: new Date(),
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

export const mockSavedZtrackingEvaluationVariableCollectionPortfolio001: ZtrackingEvaluationVariableCollectionPortfolio =
  {
    ztrackingVersion: mockZtrackingVersion001,
    evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
    businessUnitId: mockBusinessUnitId,
    name: mockCollectionPortfolioName001,
    description: 'Mock description',
    isDeleted: false,
    updatedBy: undefined,
    createdAt: commonUseCreationDate,
    versionDate: commonUseCreationDate,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionPortfolio> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

// Mocked History Outcome
export const mockZtrackingHistoryCollectionPortfolios: ZtrackingEvaluationVariableCollectionPortfolioDto[] =
  [
    {
      ztrackingVersion: 'version1',
      evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
      businessUnitId: mockBusinessUnitId,
      name: mockCollectionPortfolioName001,
      description: 'Initial Description',
      isDeleted: false,
      updatedBy: undefined,
      createdAt: new Date('2022-01-01'),
      versionDate: new Date('2022-01-01'),
    },
    {
      ztrackingVersion: 'version2',
      evaluationVariableCollectionPortfolioId: mockCollectionPortfolioId001,
      businessUnitId: mockBusinessUnitId,
      name: mockCollectionPortfolioName002,
      description: 'Updated Description',
      isDeleted: false,
      updatedBy: undefined,
      createdAt: new Date('2022-02-01'),
      versionDate: new Date('2022-02-01'),
    },
  ];
