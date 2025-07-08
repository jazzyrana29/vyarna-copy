import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleepSession } from '../../entities/sleep_session.entity';
import { ZtrackingSleepSession } from '../../entities/ztracking_sleep_session.entity';
import { SleepEvent } from '../../entities/sleep_event.entity';
import { ZtrackingSleepEvent } from '../../entities/ztracking_sleep_event.entity';
import { SleepInterruptionReason } from '../../entities/sleep_interruption_reason.entity';
import { ZtrackingSleepInterruptionReason } from '../../entities/ztracking_sleep_interruption_reason.entity';
import { SleepEnvironment } from '../../entities/sleep_environment.entity';
import { ZtrackingSleepEnvironment } from '../../entities/ztracking_sleep_environment.entity';
import { SleepRating } from '../../entities/sleep_rating.entity';
import { ZtrackingSleepRating } from '../../entities/ztracking_sleep_rating.entity';
import { SleepSchedule } from '../../entities/sleep_schedule.entity';
import { ZtrackingSleepSchedule } from '../../entities/ztracking_sleep_schedule.entity';
import { SleepNotification } from '../../entities/sleep_notification.entity';
import { ZtrackingSleepNotification } from '../../entities/ztracking_sleep_notification.entity';
import { SleepSummary } from '../../entities/sleep_summary.entity';
import { ZtrackingSleepSummary } from '../../entities/ztracking_sleep_summary.entity';
import { SleepPatternSummary } from '../../entities/sleep_pattern_summary.entity';
import { ZtrackingSleepPatternSummary } from '../../entities/ztracking_sleep_pattern_summary.entity';
import { SleepSessionService } from './services/sleep-session.service';
import { SleepSessionKafkaService } from './services/sleep-session-kafka.service';
import { ZtrackingSleepSessionService } from './services/ztracking-sleep-session.service';
import { SleepController } from './sleep.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SleepSession,
      ZtrackingSleepSession,
      SleepEvent,
      ZtrackingSleepEvent,
      SleepInterruptionReason,
      ZtrackingSleepInterruptionReason,
      SleepEnvironment,
      ZtrackingSleepEnvironment,
      SleepRating,
      ZtrackingSleepRating,
      SleepSchedule,
      ZtrackingSleepSchedule,
      SleepNotification,
      ZtrackingSleepNotification,
      SleepSummary,
      ZtrackingSleepSummary,
      SleepPatternSummary,
      ZtrackingSleepPatternSummary,
    ]),
  ],
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
