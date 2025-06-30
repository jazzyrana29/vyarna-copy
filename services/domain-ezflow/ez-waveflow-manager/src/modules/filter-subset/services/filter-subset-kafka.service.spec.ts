import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_FILTER_SUBSET,
  KT_DELETE_FILTER_SUBSET,
  KT_GET_ONE_FILTER_SUBSET,
  KT_GET_ZTRACKING_FILTER_SUBSET,
  KT_UPDATE_FILTER_SUBSET,
} from 'ez-utils';
import {
  mockCreateFilterSubsetDto,
  mockDeleteFilterSubsetDto,
  mockGetOneFilterSubsetDto,
  mockGetZtrackingFilterSubsetDto,
  mockTraceIdForFilterSubset,
  mockUpdateFilterSubsetDto,
} from '../test-values.spec';
import { FilterSubsetKafkaService } from './filter-subset-kafka.service';
import { FilterSubsetService } from './filter-subset.service';
import { ZtrackingFilterSubsetService } from './ztracking-filter-subset.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('FilterSubsetKafkaService', () => {
  let kafkaService: FilterSubsetKafkaService;
  let filterSubsetService: FilterSubsetService;
  let ztrackingService: ZtrackingFilterSubsetService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterSubsetKafkaService,
        {
          provide: FilterSubsetService,
          useValue: {
            createFilterSubset: jest.fn(),
            updateFilterSubset: jest.fn(),
            deleteFilterSubset: jest.fn(),
            getOneFilterSubset: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterSubsetService,
          useValue: {
            getZtrackingForFilterSubset: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<FilterSubsetKafkaService>(
      FilterSubsetKafkaService,
    );
    filterSubsetService = module.get<FilterSubsetService>(FilterSubsetService);
    ztrackingService = module.get<ZtrackingFilterSubsetService>(
      ZtrackingFilterSubsetService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(filterSubsetService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createFilterSubset', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createFilterSubset(
        mockCreateFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_FILTER_SUBSET,
        mockCreateFilterSubsetDto,
        mockTraceIdForFilterSubset,
        expect.any(Function),
      );
    });
  });

  describe('updateFilterSubset', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateFilterSubset(
        mockUpdateFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_FILTER_SUBSET, // now using the constant
        mockUpdateFilterSubsetDto,
        mockTraceIdForFilterSubset,
        expect.any(Function),
      );
    });
  });

  describe('deleteFilterSubset', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteFilterSubset(
        mockDeleteFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_FILTER_SUBSET,
        mockDeleteFilterSubsetDto,
        mockTraceIdForFilterSubset,
        expect.any(Function),
      );
    });
  });

  describe('getOneFilterSubset', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneFilterSubset(
        mockGetOneFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_FILTER_SUBSET,
        mockGetOneFilterSubsetDto,
        mockTraceIdForFilterSubset,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingFilterSubset', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingFilterSubset(
        mockGetZtrackingFilterSubsetDto,
        mockTraceIdForFilterSubset,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_FILTER_SUBSET,
        mockGetZtrackingFilterSubsetDto,
        mockTraceIdForFilterSubset,
        expect.any(Function),
      );
    });
  });
});
