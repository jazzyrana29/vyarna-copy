import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_DELETE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_GET_ONE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_GET_ZTRACKING_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
  KT_UPDATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
} from 'ez-utils';
import {
  mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
  mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
  mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
} from '../test-values.spec';
import { WaveTypeIsAllowedToAccessBusinessUnitKafkaService } from './wave-type-is-allowed-to-access-business-unit-kafka.service';
import { WaveTypeIsAllowedToAccessBusinessUnitService } from './wave-type-is-allowed-to-access-business-unit.service';
import { ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService } from './ztracking-wave-type-is-allowed-to-access-business-unit.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('WaveTypeIsAllowedToAccessBusinessUnitKafkaService', () => {
  let kafkaService: WaveTypeIsAllowedToAccessBusinessUnitKafkaService;
  let waveTypeIsAllowedToAccessBusinessUnitService: WaveTypeIsAllowedToAccessBusinessUnitService;
  let ztrackingService: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeIsAllowedToAccessBusinessUnitKafkaService,
        {
          provide: WaveTypeIsAllowedToAccessBusinessUnitService,
          useValue: {
            createWaveTypeIsAllowedToAccessBusinessUnit: jest.fn(),
            updateWaveTypeIsAllowedToAccessBusinessUnit: jest.fn(),
            deleteWaveTypeIsAllowedToAccessBusinessUnit: jest.fn(),
            getOneWaveTypeIsAllowedToAccessBusinessUnit: jest.fn(),
          },
        },
        {
          provide: ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
          useValue: {
            getZtrackingForWaveTypeIsAllowedToAccessBusinessUnit: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService =
      module.get<WaveTypeIsAllowedToAccessBusinessUnitKafkaService>(
        WaveTypeIsAllowedToAccessBusinessUnitKafkaService,
      );
    waveTypeIsAllowedToAccessBusinessUnitService =
      module.get<WaveTypeIsAllowedToAccessBusinessUnitService>(
        WaveTypeIsAllowedToAccessBusinessUnitService,
      );
    ztrackingService =
      module.get<ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService>(
        ZtrackingWaveTypeIsAllowedToAccessBusinessUnitService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(waveTypeIsAllowedToAccessBusinessUnitService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createWaveTypeIsAllowedToAccessBusinessUnit(
        mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
        mockCreateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('updateWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateWaveTypeIsAllowedToAccessBusinessUnit(
        mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
        mockUpdateWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('deleteWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteWaveTypeIsAllowedToAccessBusinessUnit(
        mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
        mockDeleteWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getOneWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneWaveTypeIsAllowedToAccessBusinessUnit(
        mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
        mockGetOneWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingWaveTypeIsAllowedToAccessBusinessUnit', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingWaveTypeIsAllowedToAccessBusinessUnit(
        mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_WAVE_TYPE_IS_ALLOWED_TO_ACCESS_BUSINESS_UNIT,
        mockGetZtrackingWaveTypeIsAllowedToAccessBusinessUnitDto,
        mockTraceIdForWaveTypeIsAllowedToAccessBusinessUnit,
        expect.any(Function),
      );
    });
  });
});
