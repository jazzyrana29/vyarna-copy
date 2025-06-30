import { Test, TestingModule } from '@nestjs/testing';
import { TaskKafkaService } from './task-kafka.service';
import { TaskService } from './task.service';
import { ZtrackingTaskService } from './ztracking-task.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_TASK_ENTITY,
  KT_UPDATE_TASK_ENTITY,
  KT_DELETE_TASK_ENTITY,
  KT_GET_TASK_ENTITY,
  KT_GET_MANY_TASKS,
  KT_GET_HISTORY_TASK_ENTITY,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('TaskKafkaService', () => {
  let service: TaskKafkaService;
  let taskService: TaskService;
  let ztrackingTaskService: ZtrackingTaskService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskKafkaService,
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
            getOneTask: jest.fn(),
            getManyTasks: jest.fn(),
          },
        },
        {
          provide: ZtrackingTaskService,
          useValue: {
            findZtrackingTaskEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<TaskKafkaService>(TaskKafkaService);
    taskService = module.get<TaskService>(TaskService);
    ztrackingTaskService =
      module.get<ZtrackingTaskService>(ZtrackingTaskService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskService).toBeDefined();
    expect(ztrackingTaskService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createTaskEntity', () => {
    it('should produce a Kafka response for creating a task', async () => {
      await service.createTaskEntity({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_TASK_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateTaskEntity', () => {
    it('should produce a Kafka response for updating a task', async () => {
      await service.updateTaskEntity({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_TASK_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteTaskEntity', () => {
    it('should produce a Kafka response for deleting a task', async () => {
      await service.deleteTaskEntity({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_TASK_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getTaskEntity', () => {
    it('should produce a Kafka response for retrieving a task', async () => {
      await service.getTaskEntity({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_TASK_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyTasks', () => {
    it('should produce a Kafka response for retrieving multiple tasks', async () => {
      await service.getManyTasks({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_TASKS,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfTaskEntity', () => {
    it('should produce a Kafka response for retrieving the task history', async () => {
      await service.getHistoryOfTaskEntity({}, 'key6');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_TASK_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
