import { Test, TestingModule } from '@nestjs/testing';
import { WaveKafkaService } from './wave-kafka.service';
import { WaveService } from './wave.service';
import { ZtrackingWaveService } from './ztracking-wave.service';
import { KafkaMessageResponderService } from 'ez-utils';
import {
  KT_CREATE_WAVE_ENTITY,
  KT_UPDATE_WAVE_ENTITY,
  KT_DELETE_WAVE_ENTITY,
  KT_GET_WAVE_ENTITY,
  KT_GET_MANY_WAVES,
  KT_GET_HISTORY_WAVE_ENTITY,
} from 'ez-utils';

jest.mock('ez-utils', () => ({
  ...jest.requireActual('ez-utils'),
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('WaveKafkaService', () => {
  let service: WaveKafkaService;
  let waveService: WaveService;
  let ztrackingWaveService: ZtrackingWaveService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveKafkaService,
        {
          provide: WaveService,
          useValue: {
            createWave: jest.fn(),
            updateWave: jest.fn(),
            deleteWave: jest.fn(),
            getOneWave: jest.fn(),
            getManyWaves: jest.fn(),
          },
        },
        {
          provide: ZtrackingWaveService,
          useValue: {
            findZtrackingWaveEntity: jest.fn(),
          },
        },
        {
          provide: KafkaMessageResponderService,
          useClass: KafkaMessageResponderService,
        },
      ],
    }).compile();

    service = module.get<WaveKafkaService>(WaveKafkaService);
    waveService = module.get<WaveService>(WaveService);
    ztrackingWaveService =
      module.get<ZtrackingWaveService>(ZtrackingWaveService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(waveService).toBeDefined();
    expect(ztrackingWaveService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('createWaveEntity', () => {
    it('should produce a Kafka response for creating a wave', async () => {
      await service.createWaveEntity({}, 'key1');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_CREATE_WAVE_ENTITY,
        {},
        'key1',
        expect.any(Function),
      );
    });
  });

  describe('updateWaveEntity', () => {
    it('should produce a Kafka response for updating a wave', async () => {
      await service.updateWaveEntity({}, 'key2');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_UPDATE_WAVE_ENTITY,
        {},
        'key2',
        expect.any(Function),
      );
    });
  });

  describe('deleteWaveEntity', () => {
    it('should produce a Kafka response for deleting a wave', async () => {
      await service.deleteWaveEntity({}, 'key3');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_DELETE_WAVE_ENTITY,
        {},
        'key3',
        expect.any(Function),
      );
    });
  });

  describe('getWaveEntity', () => {
    it('should produce a Kafka response for retrieving a wave', async () => {
      await service.getWaveEntity({}, 'key4');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_WAVE_ENTITY,
        {},
        'key4',
        expect.any(Function),
      );
    });
  });

  describe('getManyWaves', () => {
    it('should produce a Kafka response for retrieving multiple waves', async () => {
      await service.getManyWaves({}, 'key5');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_MANY_WAVES,
        {},
        'key5',
        expect.any(Function),
      );
    });
  });

  describe('getHistoryOfWave', () => {
    it('should produce a Kafka response for retrieving the history of a wave', async () => {
      await service.getHistoryOfWave({}, 'key6');
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        service.serviceName,
        KT_GET_HISTORY_WAVE_ENTITY,
        {},
        'key6',
        expect.any(Function),
      );
    });
  });
});
