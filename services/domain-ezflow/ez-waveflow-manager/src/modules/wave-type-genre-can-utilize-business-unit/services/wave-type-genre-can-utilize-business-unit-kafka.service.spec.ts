import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_CREATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_DELETE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_GET_ONE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_GET_ZTRACKING_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
  KT_UPDATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
} from 'ez-utils';
import {
  mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
  mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
  mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
} from '../test-values.spec';
import { WaveTypeGenreCanUtilizeBusinessUnitKafkaService } from './wave-type-genre-can-utilize-business-unit-kafka.service';
import { WaveTypeGenreCanUtilizeBusinessUnitService } from './wave-type-genre-can-utilize-business-unit.service';
import { ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService } from './ztracking-wave-type-genre-can-utilize-business-unit.service'; // Assuming your mock values are in this file

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('WaveTypeGenreCanUtilizeBusinessUnitKafkaService', () => {
  let kafkaService: WaveTypeGenreCanUtilizeBusinessUnitKafkaService;
  let waveTypeGenreCanUtilizeBusinessUnitService: WaveTypeGenreCanUtilizeBusinessUnitService;
  let ztrackingService: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeGenreCanUtilizeBusinessUnitKafkaService,
        {
          provide: WaveTypeGenreCanUtilizeBusinessUnitService,
          useValue: {
            createWaveTypeGenreCanUtilizeBusinessUnit: jest.fn(),
            updateWaveTypeGenreCanUtilizeBusinessUnit: jest.fn(),
            deleteWaveTypeGenreCanUtilizeBusinessUnit: jest.fn(),
            getOneWaveTypeGenreCanUtilizeBusinessUnit: jest.fn(),
          },
        },
        {
          provide: ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
          useValue: {
            getZtrackingForWaveTypeGenreCanUtilizeBusinessUnit: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<WaveTypeGenreCanUtilizeBusinessUnitKafkaService>(
      WaveTypeGenreCanUtilizeBusinessUnitKafkaService,
    );
    waveTypeGenreCanUtilizeBusinessUnitService =
      module.get<WaveTypeGenreCanUtilizeBusinessUnitService>(
        WaveTypeGenreCanUtilizeBusinessUnitService,
      );
    ztrackingService =
      module.get<ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService>(
        ZtrackingWaveTypeGenreCanUtilizeBusinessUnitService,
      );
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(waveTypeGenreCanUtilizeBusinessUnitService).toBeDefined();
    expect(ztrackingService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should produce Kafka response and call service create method', async () => {
      await kafkaService.createWaveTypeGenreCanUtilizeBusinessUnit(
        mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_CREATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
        mockCreateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('updateWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should produce Kafka response and call service update method', async () => {
      await kafkaService.updateWaveTypeGenreCanUtilizeBusinessUnit(
        mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_UPDATE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
        mockUpdateWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('deleteWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should produce Kafka response and call service delete method', async () => {
      await kafkaService.deleteWaveTypeGenreCanUtilizeBusinessUnit(
        mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_DELETE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
        mockDeleteWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getOneWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should produce Kafka response and call service getOne method', async () => {
      await kafkaService.getOneWaveTypeGenreCanUtilizeBusinessUnit(
        mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
        mockGetOneWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        expect.any(Function),
      );
    });
  });

  describe('getZtrackingWaveTypeGenreCanUtilizeBusinessUnit', () => {
    it('should produce Kafka response and call ztracking service method', async () => {
      await kafkaService.getZtrackingWaveTypeGenreCanUtilizeBusinessUnit(
        mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ZTRACKING_WAVE_TYPE_GENRE_CAN_UTILIZE_BUSINESS_UNIT,
        mockGetZtrackingWaveTypeGenreCanUtilizeBusinessUnitDto,
        mockTraceIdForWaveTypeGenreCanUtilizeBusinessUnit,
        expect.any(Function),
      );
    });
  });
});
