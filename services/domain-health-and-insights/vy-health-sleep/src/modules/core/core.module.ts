import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleepSession } from '../../entities/sleep_session.entity';
import { ZtrackingSleepSession } from '../../entities/ztracking_sleep_session.entity';
import { SleepSessionService } from './services/sleep-session.service';
import { SleepSessionKafkaService } from './services/sleep-session-kafka.service';
import { ZtrackingSleepSessionService } from './services/ztracking-sleep-session.service';
import { SleepController } from './sleep.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([SleepSession, ZtrackingSleepSession])],
  controllers: [SleepController],
  providers: [
    SleepSessionService,
    SleepSessionKafkaService,
    ZtrackingSleepSessionService,
  ],
})
export class CoreModule {
  private logger = getLoggerConfig(CoreModule.name);
  constructor() {
    this.logger.debug(
      `${CoreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
