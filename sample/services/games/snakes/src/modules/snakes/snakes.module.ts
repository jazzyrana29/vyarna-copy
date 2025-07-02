import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakesRound } from '../../entities/snakes-round.entity';
import { SnakesService } from './services/snakes.service';
import { SnakesController } from './snakes.controller';
import { SnakesKafkaService } from './services/snakes-kafka.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([SnakesRound])],
  providers: [SnakesService, SnakesKafkaService],
  controllers: [SnakesController],
})
export class SnakesModule {
  private logger = getLoggerConfig(SnakesModule.name);

  constructor() {
    this.logger.debug(
      `${SnakesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
