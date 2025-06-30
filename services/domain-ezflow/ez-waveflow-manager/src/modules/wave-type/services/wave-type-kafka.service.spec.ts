import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_GET_MANY_WAVE_TYPES,
  KT_GET_ONE_WAVE_TYPE,
} from 'ez-utils';
import {
  mockGetManyWaveTypesDto,
  mockGetOneWaveTypeDto,
  mockTraceIdForWaveType,
} from '../test-values.spec';
import { WaveTypeKafkaService } from './wave-type-kafka.service';
import { WaveTypeService } from './wave-type.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('WaveTypeKafkaService', () => {
  let kafkaService: WaveTypeKafkaService;
  let waveTypeService: WaveTypeService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeKafkaService,
        {
          provide: WaveTypeService,
          useValue: {
            getOneWaveType: jest.fn(),
            getManyWaveTypes: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<WaveTypeKafkaService>(WaveTypeKafkaService);
    waveTypeService = module.get<WaveTypeService>(WaveTypeService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(waveTypeService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('getOneWaveType', () => {
    it('should produce Kafka response and call service getOneWaveType method', async () => {
      await kafkaService.getOneWaveType(
        mockGetOneWaveTypeDto,
        mockTraceIdForWaveType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_WAVE_TYPE,
        mockGetOneWaveTypeDto,
        mockTraceIdForWaveType,
        expect.any(Function),
      );
    });
  });

  describe('getManyWaveTypes', () => {
    it('should produce Kafka response and call service getManyWaveTypes method', async () => {
      await kafkaService.getManyWaveTypes(
        mockGetManyWaveTypesDto,
        mockTraceIdForWaveType,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_MANY_WAVE_TYPES,
        mockGetManyWaveTypesDto,
        mockTraceIdForWaveType,
        expect.any(Function),
      );
    });
  });
});
