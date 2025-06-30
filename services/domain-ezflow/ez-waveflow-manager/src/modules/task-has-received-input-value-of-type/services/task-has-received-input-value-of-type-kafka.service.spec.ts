import { Test, TestingModule } from '@nestjs/testing';
import { TaskHasReceiveInputValueOfTypeKafkaService } from './task-has-received-input-value-of-type-kafka.service';
import { TaskHasReceiveInputValueOfTypeService } from './task-has-received-input-value-of-type.service';
import { ZtrackingTaskHasReceiveInputValueOfTypeService } from './ztracking-task-has-received-input-value-of-type.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
  KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES,
  KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('TaskHasReceiveInputValueOfTypeKafkaService', () => {
  let service: TaskHasReceiveInputValueOfTypeKafkaService;
  let taskInputValueTypeService: TaskHasReceiveInputValueOfTypeService;
  let ztrackingService: ZtrackingTaskHasReceiveInputValueOfTypeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskHasReceiveInputValueOfTypeKafkaService,
        {
          provide: TaskHasReceiveInputValueOfTypeService,
          useValue: {
            createTaskHasReceiveInputValueOfType: jest.fn(),
            updateTaskHasReceiveInputValueOfType: jest.fn(),
            deleteTaskHasReceiveInputValueOfType: jest.fn(),
            getOneTaskHasReceiveInputValueOfType: jest.fn(),
            getManyTaskHasReceiveInputValueOfTypeEntities: jest.fn(),
          },
        },
        {
          provide: ZtrackingTaskHasReceiveInputValueOfTypeService,
          useValue: {
            findZtrackingTaskHasReceiveInputValueOfTypeServiceEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<TaskHasReceiveInputValueOfTypeKafkaService>(
      TaskHasReceiveInputValueOfTypeKafkaService,
    );
    taskInputValueTypeService =
      module.get<TaskHasReceiveInputValueOfTypeService>(
        TaskHasReceiveInputValueOfTypeService,
      );
    ztrackingService =
      module.get<ZtrackingTaskHasReceiveInputValueOfTypeService>(
        ZtrackingTaskHasReceiveInputValueOfTypeService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskInputValueTypeService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createTaskHasReceiveInputValueOfTypeWithKafka', () => {
    it('should produce a Kafka response for creating a task input value type', async () => {
      await service.createTaskHasReceiveInputValueOfTypeWithKafka({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateTaskHasReceiveInputValueOfTypeWithKafka', () => {
    it('should produce a Kafka response for updating a task input value type', async () => {
      await service.updateTaskHasReceiveInputValueOfTypeWithKafka({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteTaskHasReceiveInputValueOfTypeWithKafka', () => {
    it('should produce a Kafka response for deleting a task input value type', async () => {
      await service.deleteTaskHasReceiveInputValueOfTypeWithKafka({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getTaskHasReceiveInputValueOfTypeWithKafka', () => {
    it('should produce a Kafka response for retrieving a task input value type', async () => {
      await service.getTaskHasReceiveInputValueOfTypeWithKafka({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka', () => {
    it('should produce a Kafka response for retrieving multiple task input value types', async () => {
      await service.getManyTaskHasReceiveInputValueOfTypeEntitiesWithKafka(
        {},
        'key5',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPES,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka', () => {
    it('should produce a Kafka response for retrieving the history of a task input value type', async () => {
      await service.getHistoryOfTaskHasReceiveInputValueOfTypeWithKafka(
        {},
        'key6',
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_TASK_HAS_RECEIVE_INPUT_VALUE_OF_TYPE,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
