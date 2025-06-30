// Import necessary entities and types
import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../entities/evaluation-variable-collections-are-presented-through-portfolios.entity';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios } from '../../entities/ztracking-evaluation-variable-collections-are-presented-through-portfolios.entity';
import { EvaluationVariableCollectionPortfolio } from '../../entities/evaluation-variable-collection-portfolio.entity';
import { EvaluationVariableCollection } from '../../entities/evaluation-variable-collection.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001 } from '../evaluation-variable-is-grouped-through-evaluation-variable-collection/test-values.spec';

// Mock identifiers
const mockEvaluationVariableCollectionsThroughPortfoliosId001 =
  'uuidForMockEVCTP001';
const mockEvaluationVariableCollectionPortfolioId001 =
  'uuidForMockPortfolio001';
const mockEvaluationVariableCollectionId001 = 'uuidForMockCollection001';
export const mockZtrackingVersion001 = 'uuidForMockZtracking001';

// Mocked Entities
export const mockEvaluationVariableCollectionPortfolio001: EvaluationVariableCollectionPortfolio =
  {
    evaluationVariableCollectionPortfolioId:
      '68c352de-548d-4fa2-afa2-e8e372f89635',
    businessUnitId: '68c352de-548d-4fa2-afa2-e8e372f89635',
    name: '',
    description: '',
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    isDeleted: false,
    createdAt: undefined,
    updatedAt: undefined,
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

export const mockEvaluationVariableCollection001: EvaluationVariableCollection =
  {
    evaluationVariableCollectionId: '68c352de-548d-4fa2-afa2-e8e372f89635',
    name: '',
    description: '',
    evaluationVariableCollectionsArePresentedThroughPortfolios: [],
    evaluationVariableIsGroupedThroughEvaluationVariableCollections: [
      mockEvaluationVariableIsGroupedThroughEvaluationVariableCollectionCase001,
    ],
    createdAt: undefined,
    updatedAt: undefined,
    isDeleted: false,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollection> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    updatedBy: '',
  };

export const mockSavedEvaluationVariableCollectionsArePresentedThroughPortfolios001: EvaluationVariableCollectionsArePresentedThroughPortfolios =
  {
    evaluationVariableCollectionsArePresentedThroughPortfoliosId:
      mockEvaluationVariableCollectionsThroughPortfoliosId001,
    evaluationVariableCollectionPortfolio:
      mockEvaluationVariableCollectionPortfolio001,
    evaluationVariableCollection: mockEvaluationVariableCollection001,
    isDeleted: false,
    updatedBy: 'userIdForUpdate',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<EvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

export const mockZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios001: ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios =
  {
    ztrackingVersion: mockZtrackingVersion001,
    evaluationVariableCollectionsArePresentedThroughPortfoliosId:
      mockEvaluationVariableCollectionsThroughPortfoliosId001,
    versionDate: new Date('2023-01-01'),
    evaluationVariableCollectionPortfolioId:
      mockEvaluationVariableCollectionPortfolioId001,
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    isDeleted: false,
    updatedBy: 'userIdForUpdate',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    remove: function (
      options?: RemoveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    recover: function (
      options?: SaveOptions,
    ): Promise<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

// Mock Ztracking History
export const mockZtrackingHistoryForCollectionsThroughPortfolios = [
  {
    ztrackingVersion: 'version1',
    evaluationVariableCollectionsArePresentedThroughPortfoliosId:
      mockEvaluationVariableCollectionsThroughPortfoliosId001,
    evaluationVariableCollectionPortfolioId:
      mockEvaluationVariableCollectionPortfolioId001,
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    isDeleted: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    versionDate: new Date('2023-01-01'),
    updatedBy: 'userHistoryUpdate001',
  },
  {
    ztrackingVersion: 'version2',
    evaluationVariableCollectionsArePresentedThroughPortfoliosId:
      mockEvaluationVariableCollectionsThroughPortfoliosId001,
    evaluationVariableCollectionPortfolioId:
      mockEvaluationVariableCollectionPortfolioId001,
    evaluationVariableCollectionId: mockEvaluationVariableCollectionId001,
    isDeleted: true,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
    versionDate: new Date('2023-02-01'),
    updatedBy: 'userHistoryUpdate002',
  },
];
