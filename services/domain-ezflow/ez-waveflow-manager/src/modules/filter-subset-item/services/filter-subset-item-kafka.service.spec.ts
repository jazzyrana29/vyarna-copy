import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_FILTER_SUBSET_ITEM,
  KT_DELETE_FILTER_SUBSET_ITEM,
  KT_GET_ONE_FILTER_SUBSET_ITEM,
  KT_GET_ZTRACKING_FILTER_SUBSET_ITEM,
  KT_UPDATE_FILTER_SUBSET_ITEM,
} from 'ez-utils';
import {
  mockCreateFilterSubsetItemDto,
  mockDeleteFilterSubsetItemDto,
  mockGetOneFilterSubsetItemDto,
  mockGetZtrackingFilterSubsetItemDto,
  mockTraceIdForFilterSubsetItem,
  mockUpdateFilterSubsetItemDto,
} from '../test-values.spec';
import { FilterSubsetItemKafkaService } from './filter-subset-item-kafka.service';
import { FilterSubsetItemService } from './filter-subset-item.service';
import { ZtrackingFilterSubsetItemService } from './ztracking-filter-subset-item.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('FilterSubsetItemKafkaService', () => {
  let kafkaService: FilterSubsetItemKafkaService;
  let filterSubsetItemService: FilterSubsetItemService;
  let ztrackingService: ZtrackingFilterSubsetItemService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterSubsetItemKafkaService,
        {
          provide: FilterSubsetItemService,
          useValue: {
            createFilterSubsetItem: jest.fn(),
            updateFilterSubsetItem: jest.fn(),
            deleteFilterSubsetItem: jest.fn(),
            getOneFilterSubsetItem: jest.fn(),
          },
        },
        {
          provide: ZtrackingFilterSubsetItemService,
          useValue: {
            getZtrackingForFilterSubsetItem: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<FilterSubsetItemKafkaService>(
      FilterSubsetItemKafkaService,
    );
    filterSubsetItemService = module.get<FilterSubsetItemService>(
      FilterSubsetItemService,
    );
    ztrackingService = module.get<ZtrackingFilterSubsetItemService>(
      ZtrackingFilterSubsetItemService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(filterSubsetItemService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createFilterSubsetItem', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createFilterSubsetItem(
        mockCreateFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_FILTER_SUBSET_ITEM,
        mockCreateFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
        expect.any(Function),
      );
    });
  });

  describe('updateFilterSubsetItem', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateFilterSubsetItem(
        mockUpdateFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_FILTER_SUBSET_ITEM, // now using the constant
        mockUpdateFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
        expect.any(Function),
      );
    });
  });

  describe('deleteFilterSubsetItem', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteFilterSubsetItem(
        mockDeleteFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_FILTER_SUBSET_ITEM,
        mockDeleteFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
        expect.any(Function),
      );
    });
  });

  describe('getOneFilterSubsetItem', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneFilterSubsetItem(
        mockGetOneFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_FILTER_SUBSET_ITEM,
        mockGetOneFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingFilterSubsetItem', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingFilterSubsetItem(
        mockGetZtrackingFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_FILTER_SUBSET_ITEM,
        mockGetZtrackingFilterSubsetItemDto,
        mockTraceIdForFilterSubsetItem,
        expect.any(Function),
      );
    });
  });
});
