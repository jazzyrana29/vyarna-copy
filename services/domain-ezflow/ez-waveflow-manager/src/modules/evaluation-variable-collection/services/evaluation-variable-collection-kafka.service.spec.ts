import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableCollectionKafkaService } from './evaluation-variable-collection-kafka.service';
import { EvaluationVariableCollectionService } from './evaluation-variable-collection.service';
import { ZtrackingEvaluationVariableCollectionService } from './ztracking-evaluation-variable-collection.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS,
  KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariableCollectionKafkaService', () => {
  let service: EvaluationVariableCollectionKafkaService;
  let evaluationVariableCollectionService: EvaluationVariableCollectionService;
  let ztrackingEvaluationVariableCollectionService: ZtrackingEvaluationVariableCollectionService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionKafkaService,
        {
          provide: EvaluationVariableCollectionService,
          useValue: {
            createEvaluationVariableCollection: jest.fn(),
            updateEvaluationVariableCollection: jest.fn(),
            deleteEvaluationVariableCollection: jest.fn(),
            getOneEvaluationVariableCollection: jest.fn(),
            getManyEvaluationVariableCollections: jest.fn(),
          },
        },
        {
          provide: ZtrackingEvaluationVariableCollectionService,
          useValue: {
            findZtrackingEvaluationVariableCollectionEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableCollectionKafkaService>(
      EvaluationVariableCollectionKafkaService,
    );
    evaluationVariableCollectionService =
      module.get<EvaluationVariableCollectionService>(
        EvaluationVariableCollectionService,
      );
    ztrackingEvaluationVariableCollectionService =
      module.get<ZtrackingEvaluationVariableCollectionService>(
        ZtrackingEvaluationVariableCollectionService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evaluationVariableCollectionService).toBeDefined();
    expect(ztrackingEvaluationVariableCollectionService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariableCollectionEntity', () => {
    it('should produce a kafka response for creating an evaluation variable collection', async () => {
      await service.createEvaluationVariableCollectionEntity({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariableCollectionEntity', () => {
    it('should produce a kafka response for updating an evaluation variable collection', async () => {
      await service.updateEvaluationVariableCollectionEntity({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariableCollectionEntity', () => {
    it('should produce a kafka response for deleting an evaluation variable collection', async () => {
      await service.deleteEvaluationVariableCollectionEntity({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_EVALUATION_VARIABLE_COLLECTION_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getEvaluationVariableCollectionEntity', () => {
    it('should produce a kafka response for getting an evaluation variable collection', async () => {
      await service.getEvaluationVariableCollectionEntity({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_EVALUATION_VARIABLE_COLLECTION_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationVariableCollections', () => {
    it('should produce a kafka response for getting many evaluation variable collections', async () => {
      await service.getManyEvaluationVariableCollections({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_EVALUATION_VARIABLE_COLLECTIONS,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfEvaluationVariableCollectionEntity', () => {
    it('should produce a kafka response for getting the history of an evaluation variable collection', async () => {
      await service.getHistoryOfEvaluationVariableCollectionEntity({}, 'key6');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_EVALUATION_VARIABLE_COLLECTION_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
