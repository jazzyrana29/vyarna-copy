import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_FILTER,
  KT_DELETE_FILTER,
  KT_GET_ONE_FILTER,
  KT_GET_ZTRACKING_FILTER,
  KT_UPDATE_FILTER,
} from 'ez-utils';
import {
  mockCreateFilterDto,
  mockDeleteFilterDto,
  mockGetOneFilterDto,
  mockGetZtrackingFilterDto,
  mockTraceIdForFilter,
  mockUpdateFilterDto,
} from '../test-values.spec';
import { FilterKafkaService } from './filter-kafka.service';
import { FilterService } from './filter.service';
import { ZtrackingFilterService } from './ztracking-filter.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('FilterKafkaService', () => {
  let kafkaService: FilterKafkaService;
  let filterService: FilterService;
  let ztrackingService: ZtrackingFilterService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterKafkaService,
        {
          provide: FilterService,
          useValue: {
            createFilter: jest.fn(),
            updateFilter: jest.fn(),
            deleteFilter: jest.fn(),
            getOneFilter: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterService,
          useValue: {
            getZtrackingForFilter: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<FilterKafkaService>(FilterKafkaService);
    filterService = module.get<FilterService>(FilterService);
    ztrackingService = module.get<ZtrackingFilterService>(
      ZtrackingFilterService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(filterService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createFilter', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createFilter(
        mockCreateFilterDto,
        mockTraceIdForFilter,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_FILTER,
        mockCreateFilterDto,
        mockTraceIdForFilter,
        expect.any(Function),
      );
    });
  });

  describe('updateFilter', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateFilter(
        mockUpdateFilterDto,
        mockTraceIdForFilter,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_FILTER, // now using the constant
        mockUpdateFilterDto,
        mockTraceIdForFilter,
        expect.any(Function),
      );
    });
  });

  describe('deleteFilter', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteFilter(
        mockDeleteFilterDto,
        mockTraceIdForFilter,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_FILTER,
        mockDeleteFilterDto,
        mockTraceIdForFilter,
        expect.any(Function),
      );
    });
  });

  describe('getOneFilter', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneFilter(
        mockGetOneFilterDto,
        mockTraceIdForFilter,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_FILTER,
        mockGetOneFilterDto,
        mockTraceIdForFilter,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingFilter', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingFilter(
        mockGetZtrackingFilterDto,
        mockTraceIdForFilter,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_FILTER,
        mockGetZtrackingFilterDto,
        mockTraceIdForFilter,
        expect.any(Function),
      );
    });
  });
});
