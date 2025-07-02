import { Test, TestingModule } from '@nestjs/testing';
import { OperatorKafkaService } from './operator-kafka.service';
import { OperatorService } from './operator.service';
import { ZtrackingOperatorService } from './ztracking-operator.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
} from 'ez-utils';
import {
  mockCreateOperatorDtoCase001,
  mockGetHistoryOperatorCase001,
  mockGetManyOperatorCase001,
  mockGetOperatorCase001,
  mockTraceIdForOperator,
  mockUpdateOperatorDtoCase002,
} from '../test-values.spec';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    consumeKafkaMessageAndProduceResponse: jest.fn(),
  })),
}));

describe('OperatorKafkaService', () => {
  let service: OperatorKafkaService;
  let operatorService: OperatorService;
  let ztrackingOperatorService: ZtrackingOperatorService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorKafkaService,
        {
          provide: OperatorService,
          useValue: {
            createOperator: jest.fn(),
            updateOperatorUnit: jest.fn(),
            findOperator: jest.fn(),
            findManyOperators: jest.fn(),
          },
        },
        {
          provide: ZtrackingOperatorService,
          useValue: {
            findZtrackingOperatorEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OperatorKafkaService>(OperatorKafkaService);
    operatorService = module.get<OperatorService>(OperatorService);
    ztrackingOperatorService = module.get<ZtrackingOperatorService>(
      ZtrackingOperatorService,
    );
    kafkaResponder = new KafkaMessageResponderService(
      { config: { groupId: 'test-group' } },
      'test-broker',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle createOperatorViaKafka correctly', async () => {
    kafkaResponder.consumeKafkaMessageAndProduceResponse = jest
      .fn()
      .mockImplementation((serviceName, topic, handler) =>
        handler(mockCreateOperatorDtoCase001, mockTraceIdForOperator),
      );
    await service.createOperatorViaKafka();
    expect(
      kafkaResponder.consumeKafkaMessageAndProduceResponse,
    ).toHaveBeenCalledWith(
      service['serviceName'],
      KT_CREATE_OPERATOR_ENTITY,
      expect.any(Function),
    );
    expect(operatorService.createOperator).toHaveBeenCalledWith(
      mockCreateOperatorDtoCase001,
      mockTraceIdForOperator,
    );
  });

  it('should handle updateOperatorViaKafka correctly', async () => {
    kafkaResponder.consumeKafkaMessageAndProduceResponse = jest
      .fn()
      .mockImplementation((serviceName, topic, handler) =>
        handler(mockUpdateOperatorDtoCase002, mockTraceIdForOperator),
      );
    await service.updateOperatorViaKafka();
    expect(
      kafkaResponder.consumeKafkaMessageAndProduceResponse,
    ).toHaveBeenCalledWith(
      service['serviceName'],
      KT_UPDATE_OPERATOR_ENTITY,
      expect.any(Function),
    );
    expect(operatorService.updateOperatorUnit).toHaveBeenCalledWith(
      mockUpdateOperatorDtoCase002,
      mockTraceIdForOperator,
    );
  });

  it('should handle getOperatorEntityViaKafka correctly', async () => {
    kafkaResponder.consumeKafkaMessageAndProduceResponse = jest
      .fn()
      .mockImplementation((serviceName, topic, handler) =>
        handler(mockGetOperatorCase001, mockTraceIdForOperator),
      );
    await service.getOperatorEntityViaKafka();
    expect(
      kafkaResponder.consumeKafkaMessageAndProduceResponse,
    ).toHaveBeenCalledWith(
      service['serviceName'],
      KT_GET_OPERATOR_ENTITY,
      expect.any(Function),
    );
    expect(operatorService.findOperator).toHaveBeenCalledWith(
      mockGetOperatorCase001,
      mockTraceIdForOperator,
    );
  });

  it('should handle getManyOperatorsViaKafka correctly', async () => {
    kafkaResponder.consumeKafkaMessageAndProduceResponse = jest
      .fn()
      .mockImplementation((serviceName, topic, handler) =>
        handler(mockGetManyOperatorCase001, mockTraceIdForOperator),
      );
    await service.getManyOperatorsViaKafka();
    expect(
      kafkaResponder.consumeKafkaMessageAndProduceResponse,
    ).toHaveBeenCalledWith(
      service['serviceName'],
      KT_GET_MANY_OPERATORS,
      expect.any(Function),
    );
    expect(operatorService.findManyOperators).toHaveBeenCalledWith(
      mockGetManyOperatorCase001,
      mockTraceIdForOperator,
    );
  });

  it('should handle getHistoryOfOperatorEntityViaKafka correctly', async () => {
    kafkaResponder.consumeKafkaMessageAndProduceResponse = jest
      .fn()
      .mockImplementation((serviceName, topic, handler) =>
        handler(mockGetHistoryOperatorCase001, mockTraceIdForOperator),
      );
    await service.getHistoryOfOperatorEntityViaKafka();
    expect(
      kafkaResponder.consumeKafkaMessageAndProduceResponse,
    ).toHaveBeenCalledWith(
      service['serviceName'],
      KT_GET_HISTORY_OPERATOR_ENTITY,
      expect.any(Function),
    );
    expect(
      ztrackingOperatorService.findZtrackingOperatorEntity,
    ).toHaveBeenCalledWith(
      mockGetHistoryOperatorCase001,
      mockTraceIdForOperator,
    );
  });
});
