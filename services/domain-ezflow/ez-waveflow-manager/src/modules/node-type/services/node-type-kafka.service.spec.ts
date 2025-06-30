import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_GET_MANY_NODE_TYPES,
  KT_GET_ONE_NODE_TYPE,
} from 'ez-utils';
import {
  mockGetManyNodeTypesDto,
  mockGetOneNodeTypeDto,
  mockTraceIdForNodeType,
} from '../test-values.spec';
import { NodeTypeKafkaService } from './node-type-kafka.service';
import { NodeTypeService } from './node-type.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('NodeTypeKafkaService', () => {
  let kafkaService: NodeTypeKafkaService;
  let nodeTypeService: NodeTypeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeTypeKafkaService,
        {
          provide: NodeTypeService,
          useValue: {
            getOneNodeType: jest.fn(),
            getManyNodeTypes: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<NodeTypeKafkaService>(NodeTypeKafkaService);
    nodeTypeService = module.get<NodeTypeService>(NodeTypeService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(nodeTypeService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('getOneNodeType', () => {
    it('should produce Kafka response and call service getOneNodeType method', async () => {
      await kafkaService.getOneNodeType(
        mockGetOneNodeTypeDto,
        mockTraceIdForNodeType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_NODE_TYPE,
        mockGetOneNodeTypeDto,
        mockTraceIdForNodeType,
        expect.any(Function),
      );
    });
  });

  describe('getManyNodeTypes', () => {
    it('should produce Kafka response and call service getManyNodeTypes method', async () => {
      await kafkaService.getManyNodeTypes(
        mockGetManyNodeTypesDto,
        mockTraceIdForNodeType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_MANY_NODE_TYPES,
        mockGetManyNodeTypesDto,
        mockTraceIdForNodeType,
        expect.any(Function),
      );
    });
  });
});
