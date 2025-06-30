import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_FUZZY_SEARCH_WAVE_TYPE_GENRES,
  KT_GET_MANY_WAVE_TYPE_GENRES,
  KT_GET_ONE_WAVE_TYPE_GENRE,
} from 'ez-utils';

import { WaveTypeGenreKafkaService } from './services/wave-type-genre-kafka.service';

@Controller('wave-type-genre')
export class WaveTypeGenreController {
  private logger = getLoggerConfig(WaveTypeGenreController.name);

  constructor(
    private readonly waveTypeGenreKafkaService: WaveTypeGenreKafkaService,
  ) {
    this.logger.debug(
      `${WaveTypeGenreController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_ONE_WAVE_TYPE_GENRE)
  async getOneWaveTypeGenre(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ONE_WAVE_TYPE_GENRE}`,
      '',
      'getOneWaveTypeGenre',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreKafkaService.getOneWaveTypeGenre(message, key);
  }

  @MessagePattern(KT_GET_MANY_WAVE_TYPE_GENRES)
  async getManyWaveTypeGenres(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_WAVE_TYPE_GENRES}`,
      '',
      'getManyWaveTypeGenres',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreKafkaService.getManyWaveTypeGenres(message, key);
  }

  @MessagePattern(KT_FUZZY_SEARCH_WAVE_TYPE_GENRES)
  async fuzzySearchWaveTypeGenres(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_FUZZY_SEARCH_WAVE_TYPE_GENRES}`,
      '',
      'fuzzySearchWaveTypeGenres',
      LogStreamLevel.DebugLight,
    );
    await this.waveTypeGenreKafkaService.fuzzySearchWaveTypeGenres(
      message,
      key,
    );
  }
}
