import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatusKafkaService } from './task-status-kafka.service';
import { TaskStatusesService } from './task-status.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  mockTraceId,
  mockGetTaskStatusDtoCase001,
  mockGetManyTaskStatusesDtoCase002,
  mockSavedTaskStatusCase001,
  mockSavedTaskStatusCase002,
} from '../test-values.spec';
import { KT_GET_TASK_STATUS, KT_GET_MANY_TASK_STATUSES } from 'ez-utils';

jest.mock('ez-utils');

describe('TaskStatusKafkaService', () => {
  let taskStatusKafkaService: TaskStatusKafkaService;
  let taskStatusesService: TaskStatusesService;
  let kafkaMessageResponderService: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStatusKafkaService,
        {
          provide: TaskStatusesService,
          useValue: {
            findTaskStatus: jest.fn(),
            getManyTaskStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    taskStatusKafkaService = module.get<TaskStatusKafkaService>(
      TaskStatusKafkaService,
    );
    taskStatusesService = module.get<TaskStatusesService>(TaskStatusesService);
    kafkaMessageResponderService = new KafkaMessageResponderService(
      { config: { groupId: 'test-group' } },
      'test-broker',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTaskStatus', () => {
    it('should produce Kafka response for a single task status', async () => {
      const message = { value: mockGetTaskStatusDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(taskStatusesService, 'findTaskStatus')
        .mockResolvedValue(mockSavedTaskStatusCase001);

      await taskStatusKafkaService.getTaskStatus(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_TASK_STATUS,
        message,
        key,
        expect.any(Function),
      );
      expect(taskStatusesService.findTaskStatus).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });

    it('should handle errors during retrieval of a single task status', async () => {
      const message = { value: mockGetTaskStatusDtoCase001 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(taskStatusesService, 'findTaskStatus')
        .mockRejectedValue(new Error('failure'));

      try {
        await taskStatusKafkaService.getTaskStatus(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(taskStatusesService.findTaskStatus).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });
  });

  describe('getManyTaskStatuses', () => {
    it('should produce Kafka response for multiple task status', async () => {
      const message = { value: mockGetManyTaskStatusesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            return await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(taskStatusesService, 'getManyTaskStatus')
        .mockResolvedValue([
          mockSavedTaskStatusCase001,
          mockSavedTaskStatusCase002,
        ]);

      await taskStatusKafkaService.getManyTaskStatuses(message, key);

      expect(
        kafkaMessageResponderService.produceKafkaResponse,
      ).toHaveBeenCalledWith(
        expect.any(String),
        KT_GET_MANY_TASK_STATUSES,
        message,
        key,
        expect.any(Function),
      );
      expect(taskStatusesService.getManyTaskStatus).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });

    it('should handle errors during retrieval of multiple task status', async () => {
      const message = { value: mockGetManyTaskStatusesDtoCase002 };
      const key = 'someKey';
      jest
        .spyOn(kafkaMessageResponderService, 'produceKafkaResponse')
        .mockImplementation(
          async (serviceName, event, msg, partitionKey, callback) => {
            await callback(msg.value, mockTraceId);
          },
        );
      jest
        .spyOn(taskStatusesService, 'getManyTaskStatus')
        .mockRejectedValue(new Error('failure'));

      try {
        await taskStatusKafkaService.getManyTaskStatuses(message, key);
      } catch (e) {
        // Handle the error if necessary
      }

      expect(taskStatusesService.getManyTaskStatus).toHaveBeenCalledWith(
        message.value,
        mockTraceId,
      );
    });
  });
});
