import { Test, TestingModule } from '@nestjs/testing';
import { TaskTypesReceiveInputValueTypeKafkaService } from './task-types-receive-input-value-types-kafka.service';
import { TaskTypesReceiveInputValueTypeService } from './task-types-receive-input-value-types.service';
import { ZtrackingTaskTypesReceiveInputValueTypeService } from './ztracking-task-types-receive-input-value-types.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
  KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES,
  KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('TaskTypesReceiveInputValueTypeKafkaService', () => {
  let service: TaskTypesReceiveInputValueTypeKafkaService;
  let taskInputTypeService: TaskTypesReceiveInputValueTypeService;
  let ztrackingService: ZtrackingTaskTypesReceiveInputValueTypeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypesReceiveInputValueTypeKafkaService,
        {
          provide: TaskTypesReceiveInputValueTypeService,
          useValue: {
            createTaskTypesReceiveInputValueType: jest.fn(),
            updateTaskTypesReceiveInputValueType: jest.fn(),
            deleteTaskTypesReceiveInputValueType: jest.fn(),
            getOneTaskTypesReceiveInputValueType: jest.fn(),
            getManyTaskTypesReceiveInputValueTypes: jest.fn(),
          },
        },
        {
          provide: ZtrackingTaskTypesReceiveInputValueTypeService,
          useValue: {
            findZtrackingTaskTypesReceiveInputValueTypes: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<TaskTypesReceiveInputValueTypeKafkaService>(
      TaskTypesReceiveInputValueTypeKafkaService,
    );
    taskInputTypeService = module.get<TaskTypesReceiveInputValueTypeService>(
      TaskTypesReceiveInputValueTypeService,
    );
    ztrackingService =
      module.get<ZtrackingTaskTypesReceiveInputValueTypeService>(
        ZtrackingTaskTypesReceiveInputValueTypeService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskInputTypeService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createTaskTypesReceiveInputValueTypeWithKafka', () => {
    it('should produce a Kafka response for creating a task input value type', async () => {
      await service.createTaskTypesReceiveInputValueTypeWithKafka({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateTaskTypesReceiveInputValueTypeWithKafka', () => {
    it('should produce a Kafka response for updating a task input value type', async () => {
      await service.updateTaskTypesReceiveInputValueTypeWithKafka({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteTaskTypesReceiveInputValueTypeWithKafka', () => {
    it('should produce a Kafka response for deleting a task input value type', async () => {
      await service.deleteTaskTypesReceiveInputValueTypeWithKafka({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getTaskTypesReceiveInputValueTypeWithKafka', () => {
    it('should produce a Kafka response for retrieving a task input value type', async () => {
      await service.getTaskTypesReceiveInputValueTypeWithKafka({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyTaskTypesReceiveInputValueTypesWithKafka', () => {
    it('should produce a Kafka response for retrieving multiple task input value types', async () => {
      await service.getManyTaskTypesReceiveInputValueTypesWithKafka({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPES,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfTaskTypesReceiveInputValueTypeWithKafka', () => {
    it('should produce a Kafka response for retrieving the history of a task input value type', async () => {
      await service.getHistoryOfTaskTypesReceiveInputValueTypeWithKafka(
        {},
        'key6',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_TASK_TYPES_RECEIVE_INPUT_VALUE_TYPE,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
