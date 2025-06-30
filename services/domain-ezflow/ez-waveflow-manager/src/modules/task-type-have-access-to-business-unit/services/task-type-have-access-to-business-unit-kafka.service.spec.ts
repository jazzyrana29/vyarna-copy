import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_DELETE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_GET_ONE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_GET_ZTRACKING_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
  KT_UPDATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
} from 'ez-utils';
import {
  mockCreateTaskTypeHaveAccessToBusinessUnitDto,
  mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
  mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
  mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
  mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
  mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
} from '../test-values.spec';
import { TaskTypeHaveAccessToBusinessUnitKafkaService } from './task-type-have-access-to-business-unit-kafka.service';
import { TaskTypeHaveAccessToBusinessUnitService } from './task-type-have-access-to-business-unit.service';
import { ZtrackingTaskTypeHaveAccessToBusinessUnitService } from './ztracking-task-type-have-access-to-business-unit.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('TaskTypeHaveAccessToBusinessUnitKafkaService', () => {
  let kafkaService: TaskTypeHaveAccessToBusinessUnitKafkaService;
  let taskTypeHaveAccessToBusinessUnitService: TaskTypeHaveAccessToBusinessUnitService;
  let ztrackingService: ZtrackingTaskTypeHaveAccessToBusinessUnitService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypeHaveAccessToBusinessUnitKafkaService,
        {
          provide: TaskTypeHaveAccessToBusinessUnitService,
          useValue: {
            createTaskTypeHaveAccessToBusinessUnit: jest.fn(),
            updateTaskTypeHaveAccessToBusinessUnit: jest.fn(),
            deleteTaskTypeHaveAccessToBusinessUnit: jest.fn(),
            getOneTaskTypeHaveAccessToBusinessUnit: jest.fn(),
          },
        },
        {
          provide: ZtrackingTaskTypeHaveAccessToBusinessUnitService,
          useValue: {
            getZtrackingForTaskTypeHaveAccessToBusinessUnit: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<TaskTypeHaveAccessToBusinessUnitKafkaService>(
      TaskTypeHaveAccessToBusinessUnitKafkaService,
    );
    taskTypeHaveAccessToBusinessUnitService =
      module.get<TaskTypeHaveAccessToBusinessUnitService>(
        TaskTypeHaveAccessToBusinessUnitService,
      );
    ztrackingService =
      module.get<ZtrackingTaskTypeHaveAccessToBusinessUnitService>(
        ZtrackingTaskTypeHaveAccessToBusinessUnitService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(taskTypeHaveAccessToBusinessUnitService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createTaskTypeHaveAccessToBusinessUnit', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createTaskTypeHaveAccessToBusinessUnit(
        mockCreateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
        mockCreateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('updateTaskTypeHaveAccessToBusinessUnit', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateTaskTypeHaveAccessToBusinessUnit(
        mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
        mockUpdateTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('deleteTaskTypeHaveAccessToBusinessUnit', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteTaskTypeHaveAccessToBusinessUnit(
        mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
        mockDeleteTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getOneTaskTypeHaveAccessToBusinessUnit', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneTaskTypeHaveAccessToBusinessUnit(
        mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
        mockGetOneTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingTaskTypeHaveAccessToBusinessUnit', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingTaskTypeHaveAccessToBusinessUnit(
        mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_TASK_TYPE_HAVE_ACCESS_TO_BUSINESS_UNIT,
        mockGetZtrackingTaskTypeHaveAccessToBusinessUnitDto,
        mockTraceIdForTaskTypeHaveAccessToBusinessUnit,
        expect.any(Function),
      );
    });
  });
});
