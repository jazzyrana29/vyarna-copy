import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { KafkaModule } from './utils/kafka/kafka.module';
import { CrashModule } from './modules/crash/crash.module';

import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { DartsModule } from './modules/darts/darts.module';
import { DragonTowerModule } from './modules/dragon-tower/dragon-tower.module';
import { FlipModule } from './modules/flip/flip.module';
import { PumpModule } from './modules/pump/pump.module';
import { DiceModule } from './modules/dice/dice.module';
import { LimboModule } from './modules/limbo/limbo.module';
import { MinesModule } from './modules/mines/mines.module';
import { PlinkoModule } from './modules/plinko/plinko.module';
import { SnakesModule } from './modules/snakes/snakes.module';

import { getLoggerConfig } from './utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    KafkaModule,
    CrashModule,
    BlackjackModule,
    DartsModule,
    DragonTowerModule,
    FlipModule,
    DiceModule,
    LimboModule,
    MinesModule,
    PumpModule,
    PlinkoModule,
    SnakesModule,
  ],
  providers: [],
})
export class AppModule {
  private logger = getLoggerConfig(AppModule.name);

  constructor() {
    this.logger.debug(
      `${AppModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
