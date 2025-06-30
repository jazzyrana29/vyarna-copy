import { Test, TestingModule } from '@nestjs/testing';
import { NodeExitTypeKafkaService } from './node-exit-type-kafka.service';
import { NodeExitTypeService } from './node-exit-type.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  mockTraceId,
  mockGetNodeExitTypeDtoCase001,
  mockGetManyNodeExitTypesDtoCase002,
  mockSavedNodeExitTypeCase001,
  mockSavedNodeExitTypeCase002,
} from '../test-values.spec';
import { KT_GET_NODE_EXIT_TYPE, KT_GET_MANY_NODE_EXIT_TYPES } from 'ez-utils';

jest.mock('ez-utils');

describe('NodeExitTypeKafkaService', () => {
  let nodeExitTypeKafkaService: NodeExitTypeKafkaService;
  let nodeExitTypeService: NodeExitTypeService;
  let kafkaMessageResponderService: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeExitTypeKafkaService,
        {
          provide: NodeExitTypeService,
          useValue: {
            findNodeExitType: jest.fn(),
            getManyNodeExitType: jest.fn(),
          },
        },
      ],
    }).compile();

    nodeExitTypeKafkaService = module.get<NodeExitTypeKafkaService>(
      NodeExitTypeKafkaService,
    );
    nodeExitTypeService = module.get<NodeExitTypeService>(NodeExitTypeService);
    kafkaMessageResponderService = new KafkaMessageResponderService(
      { config: { groupId: 'test-group' } },
      'test-broker',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getNodeExitType', () => {
    it('should produce Kafka response for a single node exit type', async () => {
      const message = { value: mockGetNodeExitTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(nodeExitTypeService, 'findNodeExitType')
        .mockResolvedValue(mockSavedNodeExitTypeCase001);

      await nodeExitTypeKafkaService.getNodeExitType(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_NODE_EXIT_TYPE,
        message,
        key,
        expect.any(Function),
      );
      expect(nodeExitTypeService.findNodeExitType).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });

    it('should handle errors during retrieval of a single node exit type', async () => {
      const message = { value: mockGetNodeExitTypeDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(nodeExitTypeService, 'findNodeExitType')
        .mockRejectedValue(new Error('failure'));

      try {
        await nodeExitTypeKafkaService.getNodeExitType(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(nodeExitTypeService.findNodeExitType).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });
  });

  describe('getManyNodeExitTypes', () => {
    it('should produce Kafka response for multiple node exit type', async () => {
      const message = { value: mockGetManyNodeExitTypesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(nodeExitTypeService, 'getManyNodeExitType')
        .mockResolvedValue([
          mockSavedNodeExitTypeCase001,
          mockSavedNodeExitTypeCase002,
        ]);

      await nodeExitTypeKafkaService.getManyNodeExitTypes(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_MANY_NODE_EXIT_TYPES,
        message,
        key,
        expect.any(Function),
      );
      expect(nodeExitTypeService.getManyNodeExitType).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });

    it('should handle errors during retrieval of multiple node exit type', async () => {
      const message = { value: mockGetManyNodeExitTypesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(nodeExitTypeService, 'getManyNodeExitType')
        .mockRejectedValue(new Error('failure'));

      try {
        await nodeExitTypeKafkaService.getManyNodeExitTypes(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(nodeExitTypeService.getManyNodeExitType).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });
  });
});
