import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_NODE_EXIT,
  KT_DELETE_NODE_EXIT,
  KT_GET_ONE_NODE_EXIT,
  KT_GET_ZTRACKING_NODE_EXIT,
  KT_UPDATE_NODE_EXIT,
} from 'ez-utils';
import {
  mockCreateNodeExitDto,
  mockDeleteNodeExitDto,
  mockGetOneNodeExitDto,
  mockGetZtrackingNodeExitDto,
  mockTraceIdForNodeExit,
  mockUpdateNodeExitDto,
} from '../test-values.spec';
import { NodeExitKafkaService } from './node-exit-kafka.service';
import { NodeExitService } from './node-exit.service';
import { ZtrackingNodeExitService } from './ztracking-node-exit.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('NodeExitKafkaService', () => {
  let kafkaService: NodeExitKafkaService;
  let nodeExitService: NodeExitService;
  let ztrackingNodeExitService: ZtrackingNodeExitService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeExitKafkaService,
        {
          provide: NodeExitService,
          useValue: {
            createNodeExit: jest.fn(),
            updateNodeExit: jest.fn(),
            deleteNodeExit: jest.fn(),
            getOneNodeExit: jest.fn(),
          },
        },
        {
          provide: ZtrackingNodeExitService,
          useValue: {
            getZtrackingForNodeExit: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<NodeExitKafkaService>(NodeExitKafkaService);
    nodeExitService = module.get<NodeExitService>(NodeExitService);
    ztrackingNodeExitService = module.get<ZtrackingNodeExitService>(
      ZtrackingNodeExitService,
    );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(nodeExitService).toBeDefined();
    expect(ztrackingNodeExitService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createNodeExit', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createNodeExit(
        mockCreateNodeExitDto,
        mockTraceIdForNodeExit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_NODE_EXIT,
        mockCreateNodeExitDto,
        mockTraceIdForNodeExit,
        expect.any(Function),
      );
    });
  });

  describe('updateNodeExit', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateNodeExit(
        mockUpdateNodeExitDto,
        mockTraceIdForNodeExit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_NODE_EXIT, // now using the constant
        mockUpdateNodeExitDto,
        mockTraceIdForNodeExit,
        expect.any(Function),
      );
    });
  });

  describe('deleteNodeExit', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteNodeExit(
        mockDeleteNodeExitDto,
        mockTraceIdForNodeExit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_NODE_EXIT,
        mockDeleteNodeExitDto,
        mockTraceIdForNodeExit,
        expect.any(Function),
      );
    });
  });

  describe('getOneNodeExit', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneNodeExit(
        mockGetOneNodeExitDto,
        mockTraceIdForNodeExit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_NODE_EXIT,
        mockGetOneNodeExitDto,
        mockTraceIdForNodeExit,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingNodeExit', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingNodeExit(
        mockGetZtrackingNodeExitDto,
        mockTraceIdForNodeExit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_NODE_EXIT,
        mockGetZtrackingNodeExitDto,
        mockTraceIdForNodeExit,
        expect.any(Function),
      );
    });
  });
});
