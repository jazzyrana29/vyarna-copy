import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService } from './evaluation-variable-collections-are-presented-through-portfolios-kafka.service';
import {
  KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
  KafkaMessageResponderService,
} from 'ez-utils';
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './evaluation-variable-collections-are-presented-through-portfolios.service';
import { ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService } from './ztracking-evaluation-variable-collections-are-presented-through-portfolios.service';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService', () => {
  let service: EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService;
  let evaluationService;
  let ztrackingService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService,
        {
          provide:
            EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
          useValue: {
            createEvaluationVariableCollectionsArePresentedThroughPortfolios:
              jest.fn(),
            updateEvaluationVariableCollectionsArePresentedThroughPortfolios:
              jest.fn(),
            deleteEvaluationVariableCollectionsArePresentedThroughPortfolios:
              jest.fn(),
            getOneEvaluationVariableCollectionsArePresentedThroughPortfolios:
              jest.fn(),
            getManyEvaluationVariableCollectionsArePresentedThroughPortfolios:
              jest.fn(),
            getHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity:
              jest.fn(),
            addEvaluationVariableCollectionFromPortfolioEntity: jest.fn(),
            removeEvaluationVariableCollectionFromPortfolioEntity: jest.fn(),
          },
        },
        {
          provide:
            ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
          useValue: {
            findZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity:
              jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service =
      module.get<EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService>(
        EvaluationVariableCollectionsArePresentedThroughPortfoliosKafkaService,
      );
    evaluationService =
      module.get<EvaluationVariableCollectionsArePresentedThroughPortfoliosService>(
        EvaluationVariableCollectionsArePresentedThroughPortfoliosService,
      );
    ztrackingService =
      module.get<ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService>(
        ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evaluationService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariableCollectionsPresentedThroughPortfoliosEntity', () => {
    it('should produce a Kafka response for creating an entity', async () => {
      await service.createEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
        {},
        'key1',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariableCollectionsPresentedThroughPortfoliosEntity', () => {
    it('should produce a Kafka response for updating an entity', async () => {
      await service.updateEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
        {},
        'key2',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariableCollectionsPresentedThroughPortfoliosEntity', () => {
    it('should produce a Kafka response for deleting an entity', async () => {
      await service.deleteEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
        {},
        'key3',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getEvaluationVariableCollectionsPresentedThroughPortfoliosEntity', () => {
    it('should produce a Kafka response for getting an entity', async () => {
      await service.getEvaluationVariableCollectionsPresentedThroughPortfoliosEntity(
        {},
        'key4',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationVariableCollectionsArePresentedThroughPortfolios', () => {
    it('should produce a Kafka response for getting many entities', async () => {
      await service.getManyEvaluationVariableCollectionsArePresentedThroughPortfolios(
        {},
        'key5',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity', () => {
    it("should produce a Kafka response for getting an entity's history", async () => {
      await service.getHistoryOfEvaluationVariableCollectionsArePresentedThroughPortfoliosEntity(
        {},
        'key6',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });

  describe('addEvaluationVariableCollectionFromPortfolioEntity', () => {
    it('should produce a Kafka response for adding a collection to a portfolio', async () => {
      const message = { someProp: 'someValue' };
      const key = 'keyAddTest';

      await service.addEvaluationVariableCollectionFromPortfolioEntity(
        message,
        key,
      );

      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_ADD_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        message,
        key,
        expect.any(Function),
      );
    });
  });

  describe('removeEvaluationVariableCollectionFromPortfolioEntity', () => {
    it('should produce a Kafka response for removing a collection from a portfolio', async () => {
      const message = { someProp: 'someValue' };
      const key = 'keyRemoveTest';

      await service.removeEvaluationVariableCollectionFromPortfolioEntity(
        message,
        key,
      );

      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_REMOVE_EVALUATION_VARIABLE_COLLECTIONS_PRESENTED_THROUGH_PORTFOLIOS_ENTITY,
        message,
        key,
        expect.any(Function),
      );
    });
  });
});
