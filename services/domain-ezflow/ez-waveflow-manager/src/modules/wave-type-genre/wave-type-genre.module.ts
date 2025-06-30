import { Module } from '@nestjs/common';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WaveTypeGenre } from '../../entities/wave-type-genre.entity';

import { WaveTypeGenreService } from './services/wave-type-genre.service';
import { WaveTypeGenreKafkaService } from './services/wave-type-genre-kafka.service';

import { WaveTypeGenreController } from './wave-type-genre.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaveTypeGenre])],
  providers: [WaveTypeGenreKafkaService, WaveTypeGenreService],
  controllers: [WaveTypeGenreController],
})
export class WaveTypeGenreModule {
  private logger = getLoggerConfig(WaveTypeGenreModule.name);

  constructor() {
    this.logger.debug(
      `${WaveTypeGenreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
