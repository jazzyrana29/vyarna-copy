import { Test, TestingModule } from '@nestjs/testing';
import { InputValueTypeKafkaService } from './input-value-type-kafka.service';
import { InputValueTypeService } from './input-value-type.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  mockTraceId,
  mockGetInputValueTypeDtoCase001,
  mockGetManyInputValueTypesDtoCase002,
  mockSavedInputValueTypeCase001,
  mockSavedInputValueTypeCase002,
} from '../test-values.spec';
import {
  KT_GET_INPUT_VALUE_TYPE,
  KT_GET_MANY_INPUT_VALUE_TYPES,
} from 'ez-utils';

jest.mock('ez-utils');

describe('InputValueTypeKafkaService', () => {
  let inputValueTypeKafkaService: InputValueTypeKafkaService;
  let inputValueTypeService: InputValueTypeService;
  let kafkaMessageResponderService: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InputValueTypeKafkaService,
        {
          provide: InputValueTypeService,
          useValue: {
            findInputValueTypeService: jest.fn(),
            getManyInputValueTypeService: jest.fn(),
          },
        },
      ],
    }).compile();

    inputValueTypeKafkaService = module.get<InputValueTypeKafkaService>(
      InputValueTypeKafkaService,
    );
    inputValueTypeService = module.get<InputValueTypeService>(
      InputValueTypeService,
    );
    kafkaMessageResponderService = new KafkaMessageResponderService(
      { config: { groupId: 'test-group' } },
      'test-broker',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInputValueType', () => {
    it('should produce Kafka response for a single input value type', async () => {
      const message = { value: mockGetInputValueTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(inputValueTypeService, 'findInputValueTypeService')
        .mockResolvedValue(mockSavedInputValueTypeCase001);

      await inputValueTypeKafkaService.getInputValueType(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_INPUT_VALUE_TYPE,
        message,
        key,
        expect.any(Function),
      );
      expect(
        inputValueTypeService.findInputValueTypeService,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });

    it('should handle errors during retrieval of a single input value type', async () => {
      const message = { value: mockGetInputValueTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(inputValueTypeService, 'findInputValueTypeService')
        .mockRejectedValue(new Error('failure'));

      try {
        await inputValueTypeKafkaService.getInputValueType(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(
        inputValueTypeService.findInputValueTypeService,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });
  });

  describe('getManyInputValueTypes', () => {
    it('should produce Kafka response for multiple input value type', async () => {
      const message = { value: mockGetManyInputValueTypesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(inputValueTypeService, 'getManyInputValueTypeService')
        .mockResolvedValue([
          mockSavedInputValueTypeCase001,
          mockSavedInputValueTypeCase002,
        ]);

      await inputValueTypeKafkaService.getManyInputValueTypes(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_MANY_INPUT_VALUE_TYPES,
        message,
        key,
        expect.any(Function),
      );
      expect(
        inputValueTypeService.getManyInputValueTypeService,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });

    it('should handle errors during retrieval of multiple input value type', async () => {
      const message = { value: mockGetManyInputValueTypesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(inputValueTypeService, 'getManyInputValueTypeService')
        .mockRejectedValue(new Error('failure'));

      try {
        await inputValueTypeKafkaService.getManyInputValueTypes(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(
        inputValueTypeService.getManyInputValueTypeService,
      ).toHaveBeenCalledWith(message.value, mockTraceId);
    });
  });
});
