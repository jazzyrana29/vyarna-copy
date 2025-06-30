import { Test, TestingModule } from '@nestjs/testing';
import {
  KafkaMessageResponderService,
  KT_GET_MANY_WAVE_TYPE_GENRES,
  KT_GET_ONE_WAVE_TYPE_GENRE,
} from 'ez-utils';
import {
  mockGetManyWaveTypeGenresDto,
  mockGetOneWaveTypeGenreDto,
  mockTraceIdForWaveTypeGenre,
} from '../test-values.spec';
import { WaveTypeGenreKafkaService } from './wave-type-genre-kafka.service';
import { WaveTypeGenreService } from './wave-type-genre.service';

jest.mock('ez-utils', () => ({
  KafkaMessageResponderService: jest.fn().mockImplementation(() => ({
    produceKafkaResponse: jest.fn(),
  })),
}));

describe('WaveTypeGenreKafkaService', () => {
  let kafkaService: WaveTypeGenreKafkaService;
  let waveTypeGenreService: WaveTypeGenreService;
  let kafkaResponder: KafkaMessageResponderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaveTypeGenreKafkaService,
        {
          provide: WaveTypeGenreService,
          useValue: {
            getOneWaveTypeGenre: jest.fn(),
            getManyWaveTypeGenres: jest.fn(),
          },
        },
        KafkaMessageResponderService,
      ],
    }).compile();

    kafkaService = module.get<WaveTypeGenreKafkaService>(
      WaveTypeGenreKafkaService,
    );
    waveTypeGenreService =
      module.get<WaveTypeGenreService>(WaveTypeGenreService);
    kafkaResponder = module.get<KafkaMessageResponderService>(
      KafkaMessageResponderService,
    );
  });

  it('should be defined', () => {
    expect(kafkaService).toBeDefined();
    expect(waveTypeGenreService).toBeDefined();
    expect(kafkaResponder).toBeDefined();
  });

  describe('getOneWaveTypeGenre', () => {
    it('should produce Kafka response and call service getOneWaveTypeGenre method', async () => {
      await kafkaService.getOneWaveTypeGenre(
        mockGetOneWaveTypeGenreDto,
        mockTraceIdForWaveTypeGenre,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_ONE_WAVE_TYPE_GENRE,
        mockGetOneWaveTypeGenreDto,
        mockTraceIdForWaveTypeGenre,
        expect.any(Function),
      );
    });
  });

  describe('getManyWaveTypeGenres', () => {
    it('should produce Kafka response and call service getManyWaveTypeGenres method', async () => {
      await kafkaService.getManyWaveTypeGenres(
        mockGetManyWaveTypeGenresDto,
        mockTraceIdForWaveTypeGenre,
      );
      expect(kafkaResponder.produceKafkaResponse).toHaveBeenCalledWith(
        kafkaService.serviceName,
        KT_GET_MANY_WAVE_TYPE_GENRES,
        mockGetManyWaveTypeGenresDto,
        mockTraceIdForWaveTypeGenre,
        expect.any(Function),
      );
    });
  });
});
