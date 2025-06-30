import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableDataTypeKafkaService } from './evaluation-variable-data-type-kafka.service';
import { EvaluationVariableDataTypeService } from './evaluation-variable-data-type.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  mockTraceId,
  mockGetEvaluationVariableDataTypeDtoCase001,
  mockGetManyEvaluationVariableDataTypesDtoCase002,
  mockSavedEvaluationVariableDataTypeCase001,
} from '../test-values.spec';
import {
  KT_GET_EVALUATION_VARIABLE_DATA_TYPE,
  KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES,
} from 'ez-utils';

jest.mock('ez-utils');

describe('EvaluationVariableDataTypeKafkaService', () => {
  let evaluationVariableDataTypeKafkaService: EvaluationVariableDataTypeKafkaService;
  let evaluationVariableDataTypeService: EvaluationVariableDataTypeService;
  let kafkaMessageResponderService: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableDataTypeKafkaService,
        {
          provide: EvaluationVariableDataTypeService,
          useValue: {
            findEvaluationVariableDataType: jest.fn(),
            getManyEvaluationVariableDataType: jest.fn(),
          },
        },
      ],
    }).compile();

    evaluationVariableDataTypeKafkaService =
      module.get<EvaluationVariableDataTypeKafkaService>(
        EvaluationVariableDataTypeKafkaService,
      );
    evaluationVariableDataTypeService =
      module.get<EvaluationVariableDataTypeService>(
        EvaluationVariableDataTypeService,
      );
    kafkaMessageResponderService = new KafkaMessageResponderService(
      { config: { groupId: 'test-group' } },
      'test-broker',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEvaluationVariableDataType', () => {
    it('should produce Kafka response for a single evaluation variable data type', async () => {
      const message = { value: mockGetEvaluationVariableDataTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(
          evaluationVariableDataTypeService,
          'findEvaluationVariableDataType',
        )
        .mockResolvedValue(mockSavedEvaluationVariableDataTypeCase001);

      await evaluationVariableDataTypeKafkaService.getEvaluationVariableDataType(
        message,
        key,
      );

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_EVALUATION_VARIABLE_DATA_TYPE,
        message,
        key,
        expect.any(Function),
      );
      expect(
        evaluationVariableDataTypeService.findEvaluationVariableDataType,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });

    it('should handle errors during retrieval of a single evaluation variable data type', async () => {
      const message = { value: mockGetEvaluationVariableDataTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(
          evaluationVariableDataTypeService,
          'findEvaluationVariableDataType',
        )
        .mockRejectedValue(new Error('failure'));

      try {
        await evaluationVariableDataTypeKafkaService.getEvaluationVariableDataType(
          message,
          key,
        );
      } catch (e) {
        // Handle the error if necessary
      }

      expect(
        evaluationVariableDataTypeService.findEvaluationVariableDataType,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });
  });

  describe('getManyEvaluationVariableDataTypes', () => {
    it('should produce Kafka response for multiple evaluation variable data types', async () => {
      const message = {
        value: mockGetManyEvaluationVariableDataTypesDtoCase002,
      };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(
          evaluationVariableDataTypeService,
          'getManyEvaluationVariableDataType',
        )
        .mockResolvedValue([mockSavedEvaluationVariableDataTypeCase001]);

      await evaluationVariableDataTypeKafkaService.getManyEvaluationVariableDataTypes(
        message,
        key,
      );

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_MANY_EVALUATION_VARIABLE_DATA_TYPES,
        message,
        key,
        expect.any(Function),
      );
      expect(
        evaluationVariableDataTypeService.getManyEvaluationVariableDataType,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });

    it('should handle errors during retrieval of multiple evaluation variable data types', async () => {
      const message = {
        value: mockGetManyEvaluationVariableDataTypesDtoCase002,
      };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(
          evaluationVariableDataTypeService,
          'getManyEvaluationVariableDataType',
        )
        .mockRejectedValue(new Error('failure'));

      try {
        await evaluationVariableDataTypeKafkaService.getManyEvaluationVariableDataTypes(
          message,
          key,
        );
      } catch (e) {
        // Handle the error if necessary
      }

      expect(
        evaluationVariableDataTypeService.getManyEvaluationVariableDataType,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });
  });
});
