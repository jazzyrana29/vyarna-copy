import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_MANIFOLD,
  KT_DELETE_MANIFOLD,
  KT_GET_ONE_MANIFOLD,
  KT_GET_ZTRACKING_MANIFOLD,
  KT_UPDATE_MANIFOLD,
} from 'ez-utils';
import {
  mockCreateManifoldDto,
  mockDeleteManifoldDto,
  mockGetOneManifoldDto,
  mockGetZtrackingManifoldDto,
  mockTraceIdForManifold,
  mockUpdateManifoldDto,
} from '../test-values.spec';
import { ManifoldKafkaService } from './manifold-kafka.service';
import { ManifoldService } from './manifold.service';
import { ZtrackingManifoldService } from './ztracking-manifold.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('ManifoldKafkaService', () => {
  let kafkaService: ManifoldKafkaService;
  let manifoldService: ManifoldService;
  let ztrackingService: ZtrackingManifoldService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManifoldKafkaService,
        {
          provide: ManifoldService,
          useValue: {
            createManifold: jest.fn(),
            updateManifold: jest.fn(),
            deleteManifold: jest.fn(),
            getOneManifold: jest.fn(),
          },
        },
        {
          provide: ZtrackingManifoldService,
          useValue: {
            getZtrackingForManifold: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<ManifoldKafkaService>(ManifoldKafkaService);
    manifoldService = module.get<ManifoldService>(ManifoldService);
    ztrackingService = module.get<ZtrackingManifoldService>(
      ZtrackingManifoldService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(manifoldService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createManifold', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createManifold(
        mockCreateManifoldDto,
        mockTraceIdForManifold,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_MANIFOLD,
        mockCreateManifoldDto,
        mockTraceIdForManifold,
        expect.any(Function),
      );
    });
  });

  describe('updateManifold', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateManifold(
        mockUpdateManifoldDto,
        mockTraceIdForManifold,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_MANIFOLD, // now using the constant
        mockUpdateManifoldDto,
        mockTraceIdForManifold,
        expect.any(Function),
      );
    });
  });

  describe('deleteManifold', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteManifold(
        mockDeleteManifoldDto,
        mockTraceIdForManifold,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_MANIFOLD,
        mockDeleteManifoldDto,
        mockTraceIdForManifold,
        expect.any(Function),
      );
    });
  });

  describe('getOneManifold', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneManifold(
        mockGetOneManifoldDto,
        mockTraceIdForManifold,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_MANIFOLD,
        mockGetOneManifoldDto,
        mockTraceIdForManifold,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingManifold', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingManifold(
        mockGetZtrackingManifoldDto,
        mockTraceIdForManifold,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_MANIFOLD,
        mockGetZtrackingManifoldDto,
        mockTraceIdForManifold,
        expect.any(Function),
      );
    });
  });
});
