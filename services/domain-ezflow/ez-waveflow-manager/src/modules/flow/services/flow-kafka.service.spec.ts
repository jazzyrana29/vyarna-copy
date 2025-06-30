import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_FLOW,
  KT_DELETE_FLOW,
  KT_GET_ONE_FLOW,
  KT_GET_ZTRACKING_FLOW,
  KT_UPDATE_FLOW,
} from 'ez-utils';
import {
  mockCreateFlowDto,
  mockDeleteFlowDto,
  mockGetOneFlowDto,
  mockGetZtrackingFlowDto,
  mockTraceIdForFlow,
  mockUpdateFlowDto,
} from '../test-values.spec';
import { FlowKafkaService } from './flow-kafka.service';
import { FlowService } from './flow.service';
import { ZtrackingFlowService } from './ztracking-flow.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('FlowKafkaService', () => {
  let kafkaService: FlowKafkaService;
  let flowService: FlowService;
  let ztrackingFlowService: ZtrackingFlowService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowKafkaService,
        {
          provide: FlowService,
          useValue: {
            createFlow: jest.fn(),
            updateFlow: jest.fn(),
            deleteFlow: jest.fn(),
            getOneFlow: jest.fn(),
          },
        },
        {
          provide: ZtrackingFlowService,
          useValue: {
            getZtrackingForFlow: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<FlowKafkaService>(FlowKafkaService);
    flowService = module.get<FlowService>(FlowService);
    ztrackingFlowService =
      module.get<ZtrackingFlowService>(ZtrackingFlowService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(flowService).toBeDefined();
    expect(ztrackingFlowService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createFlow', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createFlow(mockCreateFlowDto, mockTraceIdForFlow);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_FLOW,
        mockCreateFlowDto,
        mockTraceIdForFlow,
        expect.any(Function),
      );
    });
  });

  describe('updateFlow', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateFlow(mockUpdateFlowDto, mockTraceIdForFlow);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_FLOW, // now using the constant
        mockUpdateFlowDto,
        mockTraceIdForFlow,
        expect.any(Function),
      );
    });
  });

  describe('deleteFlow', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteFlow(mockDeleteFlowDto, mockTraceIdForFlow);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_FLOW,
        mockDeleteFlowDto,
        mockTraceIdForFlow,
        expect.any(Function),
      );
    });
  });

  describe('getOneFlow', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneFlow(mockGetOneFlowDto, mockTraceIdForFlow);
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_FLOW,
        mockGetOneFlowDto,
        mockTraceIdForFlow,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingFlow', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingFlow(
        mockGetZtrackingFlowDto,
        mockTraceIdForFlow,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_FLOW,
        mockGetZtrackingFlowDto,
        mockTraceIdForFlow,
        expect.any(Function),
      );
    });
  });
});
