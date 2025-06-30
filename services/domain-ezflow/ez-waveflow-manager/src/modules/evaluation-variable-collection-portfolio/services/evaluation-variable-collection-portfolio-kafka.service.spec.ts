import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableCollectionPortfolioKafkaService } from './evaluation-variable-collection-portfolio-kafka.service';
import { EvaluationVariableCollectionPortfolioService } from './evaluation-variable-collection-portfolio.service';
import { ZtrackingEvaluationVariableCollectionPortfolioService } from './ztracking-evaluation-variable-collection-portfolio.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariableCollectionPortfolioKafkaService', () => {
  let service: EvaluationVariableCollectionPortfolioKafkaService;
  let evaluationVariableCollectionPortfolioService: jest.Mocked<EvaluationVariableCollectionPortfolioService>;
  let ztrackingEvaluationVariableCollectionPortfolioService: jest.Mocked<ZtrackingEvaluationVariableCollectionPortfolioService>;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionPortfolioKafkaService,
        {
          provide: EvaluationVariableCollectionPortfolioService,
          useValue: {
            createEvaluationVariableCollectionPortfolio: jest.fn(),
            updateEvaluationVariableCollectionPortfolio: jest.fn(),
            deleteEvaluationVariableCollectionPortfolio: jest.fn(),
            getOneEvaluationVariableCollectionPortfolio: jest.fn(),
            getManyEvaluationVariableCollectionPortfolios: jest.fn(),
          },
        },
        {
          provide: ZtrackingEvaluationVariableCollectionPortfolioService,
          useValue: {
            findZtrackingEvaluationVariableCollectionPortfolioEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService, // This will use the mock implementation above
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableCollectionPortfolioKafkaService>(
      EvaluationVariableCollectionPortfolioKafkaService,
    );
    evaluationVariableCollectionPortfolioService = module.get(
      EvaluationVariableCollectionPortfolioService,
    );
    ztrackingEvaluationVariableCollectionPortfolioService = module.get(
      ZtrackingEvaluationVariableCollectionPortfolioService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evaluationVariableCollectionPortfolioService).toBeDefined();
    expect(ztrackingEvaluationVariableCollectionPortfolioService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariableCollectionPortfolioEntity', () => {
    it('should produce a Kafka response for creating an evaluation variable collection portfolio', async () => {
      await service.createEvaluationVariableCollectionPortfolioEntity(
        {},
        'key1',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_CREATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariableCollectionPortfolioEntity', () => {
    it('should produce a Kafka response for updating an evaluation variable collection portfolio', async () => {
      await service.updateEvaluationVariableCollectionPortfolioEntity(
        {},
        'key2',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariableCollectionPortfolioEntity', () => {
    it('should produce a Kafka response for deleting an evaluation variable collection portfolio', async () => {
      await service.deleteEvaluationVariableCollectionPortfolioEntity(
        {},
        'key3',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_DELETE_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getEvaluationVariableCollectionPortfolioEntity', () => {
    it('should produce a Kafka response for getting an evaluation variable collection portfolio', async () => {
      await service.getEvaluationVariableCollectionPortfolioEntity({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_GET_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationVariableCollectionPortfolios', () => {
    it('should produce a Kafka response for getting many evaluation variable collection portfolios', async () => {
      await service.getManyEvaluationVariableCollectionPortfolios({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_GET_MANY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIOS,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfEvaluationVariableCollectionPortfolioEntity', () => {
    it('should produce a Kafka response for getting the history of an evaluation variable collection portfolio', async () => {
      await service.getHistoryOfEvaluationVariableCollectionPortfolioEntity(
        {},
        'key6',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service['serviceName'],
        KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_PORTFOLIO_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
