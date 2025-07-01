import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiceGame } from '../../entities/dice-game.entity';
import { DiceService } from './services/dice.service';
import { DiceKafkaService } from './services/dice-kafka.service';
import { DiceController } from './dice.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([DiceGame])],
  controllers: [DiceController],
  providers: [DiceService, DiceKafkaService],
})
export class DiceModule {
  private logger = getLoggerConfig(DiceModule.name);

  constructor() {
    this.logger.debug(
      `${DiceModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
