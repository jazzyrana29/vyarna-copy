import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  GetManyWaveTypeGenresDto,
  GetOneWaveTypeGenreDto,
  KafkaMessageResponderService,
  KT_GET_MANY_WAVE_TYPE_GENRES,
  KT_GET_ONE_WAVE_TYPE_GENRE,
  KT_FUZZY_SEARCH_WAVE_TYPE_GENRES,
  FuzzySearchWaveTypeGenresDto,
} from 'ez-utils';

import { WaveTypeGenreService } from './wave-type-genre.service';

@Injectable()
export class WaveTypeGenreKafkaService {
  public serviceName = WaveTypeGenreKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly waveTypeGenreService: WaveTypeGenreService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${WaveTypeGenreKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOneWaveTypeGenre(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ONE_WAVE_TYPE_GENRE,
      message,
      key,
      async (value: GetOneWaveTypeGenreDto, traceId: string) =>
        await this.waveTypeGenreService.getOneWaveTypeGenre(value, traceId),
    );
  }

  async getManyWaveTypeGenres(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_WAVE_TYPE_GENRES,
      message,
      key,
      async (value: GetManyWaveTypeGenresDto, traceId: string) =>
        await this.waveTypeGenreService.getManyWaveTypeGenres(value, traceId),
    );
  }

  async fuzzySearchWaveTypeGenres(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_FUZZY_SEARCH_WAVE_TYPE_GENRES,
      message,
      key,
      async (value: FuzzySearchWaveTypeGenresDto, traceId: string) =>
        await this.waveTypeGenreService.fuzzySearchWaveTypeGenres(
          value,
          traceId,
        ),
    );
  }
}
