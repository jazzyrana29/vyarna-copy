import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_NODE,
  KT_DELETE_NODE,
  KT_GET_ONE_NODE,
  KT_GET_ZTRACKING_NODE,
  KT_UPDATE_NODE,
} from 'ez-utils';
import {
  mockCreateNodeDto,
  mockDeleteNodeDto,
  mockGetOneNodeDto,
  mockGetZtrackingNodeDto,
  mockTraceIdForNode,
  mockUpdateNodeDto,
} from '../test-values.spec';
import { NodeKafkaService } from './node-kafka.service';
import { NodeService } from './node.service';
import { ZtrackingNodeService } from './ztracking-node.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('NodeKafkaService', () => {
  let kafkaService: NodeKafkaService;
  let nodeService: NodeService;
  let ztrackingNodeService: ZtrackingNodeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeKafkaService,
        {
          provide: NodeService,
          useValue: {
            createNode: jest.fn(),
            updateNode: jest.fn(),
            deleteNode: jest.fn(),
            getOneNode: jest.fn(),
          },
        },
        {
          provide: ZtrackingNodeService,
          useValue: {
            getZtrackingForNode: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<NodeKafkaService>(NodeKafkaService);
    nodeService = module.get<NodeService>(NodeService);
    ztrackingNodeService =
      module.get<ZtrackingNodeService>(ZtrackingNodeService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(nodeService).toBeDefined();
    expect(ztrackingNodeService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createNode', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createNode(mockCreateNodeDto, mockTraceIdForNode);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_NODE,
        mockCreateNodeDto,
        mockTraceIdForNode,
        expect.any(Function),
      );
    });
  });

  describe('updateNode', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateNode(mockUpdateNodeDto, mockTraceIdForNode);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_NODE, // now using the constant
        mockUpdateNodeDto,
        mockTraceIdForNode,
        expect.any(Function),
      );
    });
  });

  describe('deleteNode', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteNode(mockDeleteNodeDto, mockTraceIdForNode);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_NODE,
        mockDeleteNodeDto,
        mockTraceIdForNode,
        expect.any(Function),
      );
    });
  });

  describe('getOneNode', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneNode(mockGetOneNodeDto, mockTraceIdForNode);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_NODE,
        mockGetOneNodeDto,
        mockTraceIdForNode,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingNode', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingNode(
        mockGetZtrackingNodeDto,
        mockTraceIdForNode,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_NODE,
        mockGetZtrackingNodeDto,
        mockTraceIdForNode,
        expect.any(Function),
      );
    });
  });
});
