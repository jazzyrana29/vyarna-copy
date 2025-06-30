import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariablesAreAvailableForWaveTypesKafkaService } from './evaluation-variables-are-available-for-wave-types-kafka.service';
import { EvaluationVariablesAreAvailableForWaveTypesService } from './evaluation-variables-are-available-for-wave-types.service';
import { ZtrackingEvaluationVariablesAreAvailableForWaveTypesService } from './ztracking-evaluation-variables-are-available-for-wave-types.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES,
  KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariablesAreAvailableForWaveTypesKafkaService', () => {
  let service: EvaluationVariablesAreAvailableForWaveTypesKafkaService;
  let evaluationVariablesService: EvaluationVariablesAreAvailableForWaveTypesService;
  let ztrackingService: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariablesAreAvailableForWaveTypesKafkaService,
        {
          provide: EvaluationVariablesAreAvailableForWaveTypesService,
          useValue: {
            createEvaluationVariablesAreAvailableForWaveTypesEntity: jest.fn(),
            updateEvaluationVariablesAreAvailableForWaveTypesEntity: jest.fn(),
            deleteEvaluationVariablesAreAvailableForWaveTypesEntity: jest.fn(),
            getOneEvaluationVariablesAreAvailableForWaveTypesEntity: jest.fn(),
            getManyEvaluationVariablesAreAvailableForWaveTypesEntities:
              jest.fn(),
          },
        },
        {
          provide: ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
          useValue: {
            findZtrackingEntities: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service =
      module.get<EvaluationVariablesAreAvailableForWaveTypesKafkaService>(
        EvaluationVariablesAreAvailableForWaveTypesKafkaService,
      );
    evaluationVariablesService =
      module.get<EvaluationVariablesAreAvailableForWaveTypesService>(
        EvaluationVariablesAreAvailableForWaveTypesService,
      );
    ztrackingService =
      module.get<ZtrackingEvaluationVariablesAreAvailableForWaveTypesService>(
        ZtrackingEvaluationVariablesAreAvailableForWaveTypesService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evaluationVariablesService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should produce a Kafka response for creating an entity', async () => {
      await service.createEvaluationVariablesAreAvailableForWaveTypesEntity(
        {},
        'key1',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should produce a Kafka response for updating an entity', async () => {
      await service.updateEvaluationVariablesAreAvailableForWaveTypesEntity(
        {},
        'key2',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should produce a Kafka response for deleting an entity', async () => {
      await service.deleteEvaluationVariablesAreAvailableForWaveTypesEntity(
        {},
        'key3',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should produce a Kafka response for retrieving an entity', async () => {
      await service.getEvaluationVariablesAreAvailableForWaveTypesEntity(
        {},
        'key4',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationVariablesAreAvailableForWaveTypes', () => {
    it('should produce a Kafka response for retrieving multiple entities', async () => {
      await service.getManyEvaluationVariablesAreAvailableForWaveTypes(
        {},
        'key5',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfEvaluationVariablesAreAvailableForWaveTypesEntity', () => {
    it('should produce a Kafka response for retrieving the entity history', async () => {
      await service.getHistoryOfEvaluationVariablesAreAvailableForWaveTypesEntity(
        {},
        'key6',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_EVALUATION_VARIABLES_ARE_AVAILABLE_FOR_WAVE_TYPES_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
