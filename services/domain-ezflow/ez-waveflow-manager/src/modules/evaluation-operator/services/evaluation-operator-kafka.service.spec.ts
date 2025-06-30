import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_GET_MANY_EVALUATION_OPERATORS,
  KT_GET_ONE_EVALUATION_OPERATOR,
} from 'ez-utils';
import {
  mockGetManyEvaluationOperatorsDto,
  mockGetOneEvaluationOperatorDto,
  mockTraceIdForEvaluationOperator,
} from '../test-values.spec';
import { EvaluationOperatorKafkaService } from './evaluation-operator-kafka.service';
import { EvaluationOperatorService } from './evaluation-operator.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('EvaluationOperatorKafkaService', () => {
  let kafkaService: EvaluationOperatorKafkaService;
  let evaluationOperatorService: EvaluationOperatorService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationOperatorKafkaService,
        {
          provide: EvaluationOperatorService,
          useValue: {
            getOneEvaluationOperator: jest.fn(),
            getManyEvaluationOperators: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<EvaluationOperatorKafkaService>(
      EvaluationOperatorKafkaService,
    );
    evaluationOperatorService = module.get<EvaluationOperatorService>(
      EvaluationOperatorService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(evaluationOperatorService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('getOneEvaluationOperator', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneEvaluationOperator(
        mockGetOneEvaluationOperatorDto,
        mockTraceIdForEvaluationOperator,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_EVALUATION_OPERATOR,
        mockGetOneEvaluationOperatorDto,
        mockTraceIdForEvaluationOperator,
        expect.any(Function),
      );
    });
  });

  describe('getManyEvaluationOperators', () => {
    it('should produce Kafka response and call service getManyEvaluationOperators method', async () => {
      await kafkaService.getManyEvaluationOperators(
        mockGetManyEvaluationOperatorsDto,
        mockTraceIdForEvaluationOperator,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_MANY_EVALUATION_OPERATORS,
        mockGetManyEvaluationOperatorsDto,
        mockTraceIdForEvaluationOperator,
        expect.any(Function),
      );
    });
  });
});
