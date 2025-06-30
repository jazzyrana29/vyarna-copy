import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService } from './evaluation-variable-is-grouped-through-evaluation-variable-collection-kafka.service';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import { ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService } from './ztracking-evaluation-variable-is-grouped-through-evaluation-variable-collection.service';
import {
  KafkaMessageResponderService,
  KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
  KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION,
  KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION,
} from 'ez-utils';
import {
  mockAddEvaluationVariableToCollectionDto,
  mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
  mockRemoveEvaluationVariableToCollectionDto,
  mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
  mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
} from '../test-values.spec'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService', () => {
  let kafkaService: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService;
  let evaluationVariableIsGroupedThroughEvaluationVariableCollectionService: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService;
  let ztrackingService: ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService,
        {
          provide:
            EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
          useValue: {
            createEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn(),
            updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn(),
            deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn(),
            getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn(),
          },
        },
        {
          provide:
            ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
          useValue: {
            getZtrackingForEvaluationVariableIsGroupedThroughEvaluationVariableCollection:
              jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService =
      module.get<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService>(
        EvaluationVariableIsGroupedThroughEvaluationVariableCollectionKafkaService,
      );
    evaluationVariableIsGroupedThroughEvaluationVariableCollectionService =
      module.get<EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService>(
        EvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
      );
    ztrackingService =
      module.get<ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService>(
        ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(
      evaluationVariableIsGroupedThroughEvaluationVariableCollectionService,
    ).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION, // now using the constant
        mockCreateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value from test-values
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION, // now using the constant
        mockUpdateEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION, // using constant
        mockDeleteEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });

  describe('addEvaluationVariableToCollection', () => {
    it('should produce Kafka response and call service addEvaluationVariableToCollection method', async () => {
      await kafkaService.addEvaluationVariableToCollection(
        mockAddEvaluationVariableToCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_ADD_EVALUATION_VARIABLE_TO_COLLECTION,
        mockAddEvaluationVariableToCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });

  describe('removeEvaluationVariableToCollection', () => {
    it('should produce Kafka response and call service removeEvaluationVariableToCollection method', async () => {
      await kafkaService.removeEvaluationVariableToCollection(
        mockRemoveEvaluationVariableToCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_REMOVE_EVALUATION_VARIABLE_TO_COLLECTION,
        mockRemoveEvaluationVariableToCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });

  describe('getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION, // using constant
        mockGetOneEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection(
        mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_EVALUATION_VARIABLE_IS_GROUPED_THROUGH_EVALUATION_VARIABLE_COLLECTION, // using constant
        mockGetZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto,
        mockTraceIdForEvaluationVariableIsGroupedThroughEvaluationVariableCollection, // using imported value
        expect.any(Function),
      );
    });
  });
});
