import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
  KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
} from 'ez-utils';
import {
  mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
  mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
  mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
} from '../test-values.spec';
import { FlowIsActiveForWaveTypeAndBusinessUnitKafkaService } from './flow-is-active-for-wave-type-and-business-unit-kafka.service';
import { FlowIsActiveForWaveTypeAndBusinessUnitService } from './flow-is-active-for-wave-type-and-business-unit.service';
import { ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService } from './ztracking-flow-is-active-for-wave-type-and-business-unit.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('FlowIsActiveForWaveTypeAndBusinessUnitKafkaService', () => {
  let kafkaService: FlowIsActiveForWaveTypeAndBusinessUnitKafkaService;
  let flowIsActiveForWaveTypeAndBusinessUnitService: FlowIsActiveForWaveTypeAndBusinessUnitService;
  let ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowIsActiveForWaveTypeAndBusinessUnitKafkaService,
        {
          provide: FlowIsActiveForWaveTypeAndBusinessUnitService,
          useValue: {
            createFlowIsActiveForWaveTypeAndBusinessUnit: jest.fn(),
            updateFlowIsActiveForWaveTypeAndBusinessUnit: jest.fn(),
            deleteFlowIsActiveForWaveTypeAndBusinessUnit: jest.fn(),
            getOneFlowIsActiveForWaveTypeAndBusinessUnit: jest.fn(),
          },
        },
        {
          provide: ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
          useValue: {
            getZtrackingForFlowIsActiveForWaveTypeAndBusinessUnit: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService =
      module.get<FlowIsActiveForWaveTypeAndBusinessUnitKafkaService>(
        FlowIsActiveForWaveTypeAndBusinessUnitKafkaService,
      );
    flowIsActiveForWaveTypeAndBusinessUnitService =
      module.get<FlowIsActiveForWaveTypeAndBusinessUnitService>(
        FlowIsActiveForWaveTypeAndBusinessUnitService,
      );
    ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService =
      module.get<ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService>(
        ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(flowIsActiveForWaveTypeAndBusinessUnitService).toBeDefined();
    expect(
      ztrackingFlowIsActiveForWaveTypeAndBusinessUnitService,
    ).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createFlowIsActiveForWaveTypeAndBusinessUnit(
        mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
        mockCreateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('updateFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateFlowIsActiveForWaveTypeAndBusinessUnit(
        mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
        mockUpdateFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('deleteFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteFlowIsActiveForWaveTypeAndBusinessUnit(
        mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
        mockDeleteFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getOneFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneFlowIsActiveForWaveTypeAndBusinessUnit(
        mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
        mockGetOneFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingFlowIsActiveForWaveTypeAndBusinessUnit(
        mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_FLOW_IS_ACTIVE_FOR_WAVE_TYPE_AND_BUSINESS_UNIT,
        mockGetZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto,
        mockTraceIdForFlowIsActiveForWaveTypeAndBusinessUnit,
        expect.any(Function),
      );
    });
  });
});
