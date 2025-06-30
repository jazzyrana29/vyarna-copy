import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableKafkaService } from './evaluation-variable-kafka.service';
import { EvaluationVariableService } from './evaluation-variable.service';
import { ZtrackingEvaluationVariableService } from './ztracking-evaluation-variable.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_EVALUATION_VARIABLE_ENTITY,
  KT_UPDATE_EVALUATION_VARIABLE_ENTITY,
  KT_DELETE_EVALUATION_VARIABLE_ENTITY,
  KT_GET_EVALUATION_VARIABLE_ENTITY,
  KT_GET_MANY_EVALUATION_VARIABLES,
  KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY,
} from 'ez-utils'; // Make sure constants are imported from ez-utils

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationVariableKafkaService', () => {
  let service: EvaluationVariableKafkaService;
  let evaluationVariableService: EvaluationVariableService;
  let ztrackingEvaluationVariableService: ZtrackingEvaluationVariableService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableKafkaService,
        {
          provide: EvaluationVariableService,
          useValue: {
            createEvaluationVariable: jest.fn(),
            updateEvaluationVariable: jest.fn(),
            deleteEvaluationVariable: jest.fn(),
            getOneEvaluationVariable: jest.fn(),
            getManyEvaluationVariables: jest.fn(),
          },
        },
        {
          provide: ZtrackingEvaluationVariableService,
          useValue: {
            findZtrackingEvaluationVariableEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableKafkaService>(
      EvaluationVariableKafkaService,
    );
    evaluationVariableService = module.get<EvaluationVariableService>(
      EvaluationVariableService,
    );
    ztrackingEvaluationVariableService =
      module.get<ZtrackingEvaluationVariableService>(
        ZtrackingEvaluationVariableService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(evaluationVariableService).toBeDefined();
    expect(ztrackingEvaluationVariableService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createEvaluationVariableEntity', () => {
    it('should produce a kafka response for creating an evaluation variable', async () => {
      await service.createEvaluationVariableEntity({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_EVALUATION_VARIABLE_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateEvaluationVariableEntity', () => {
    it('should produce a kafka response for updating an evaluation variable', async () => {
      await service.updateEvaluationVariableEntity({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_EVALUATION_VARIABLE_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteEvaluationVariableEntity', () => {
    it('should produce a kafka response for deleting an evaluation variable', async () => {
      await service.deleteEvaluationVariableEntity({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_EVALUATION_VARIABLE_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getEvaluationVariableEntity', () => {
    it('should produce a kafka response for getting an evaluation variable', async () => {
      await service.getEvaluationVariableEntity({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_EVALUATION_VARIABLE_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationVariables', () => {
    it('should produce a kafka response for getting many evaluation variables', async () => {
      await service.getManyEvaluationVariables({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_EVALUATION_VARIABLES,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfEvaluationVariableEntity', () => {
    it('should produce a kafka response for getting the history of an evaluation variable', async () => {
      await service.getHistoryOfEvaluationVariableEntity({}, 'key6');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_EVALUATION_VARIABLE_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
