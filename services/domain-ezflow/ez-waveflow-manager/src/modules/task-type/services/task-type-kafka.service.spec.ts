import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_GET_MANY_TASK_TYPES,
  KT_GET_ONE_TASK_TYPE,
} from 'ez-utils';
import {
  mockGetManyTaskTypesDto,
  mockGetOneTaskTypeDto,
  mockTraceIdForTaskType,
} from '../test-values.spec';
import { TaskTypeKafkaService } from './task-type-kafka.service';
import { TaskTypeService } from './task-type.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('TaskTypeKafkaService', () => {
  let kafkaService: TaskTypeKafkaService;
  let taskTypeService: TaskTypeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypeKafkaService,
        {
          provide: TaskTypeService,
          useValue: {
            getOneTaskType: jest.fn(),
            getManyTaskTypes: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<TaskTypeKafkaService>(TaskTypeKafkaService);
    taskTypeService = module.get<TaskTypeService>(TaskTypeService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(taskTypeService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('getOneTaskType', () => {
    it('should produce Kafka response and call service getOneTaskType method', async () => {
      await kafkaService.getOneTaskType(
        mockGetOneTaskTypeDto,
        mockTraceIdForTaskType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_TASK_TYPE,
        mockGetOneTaskTypeDto,
        mockTraceIdForTaskType,
        expect.any(Function),
      );
    });
  });

  describe('getManyTaskTypes', () => {
    it('should produce Kafka response and call service getManyTaskTypes method', async () => {
      await kafkaService.getManyTaskTypes(
        mockGetManyTaskTypesDto,
        mockTraceIdForTaskType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_MANY_TASK_TYPES,
        mockGetManyTaskTypesDto,
        mockTraceIdForTaskType,
        expect.any(Function),
      );
    });
  });
});
