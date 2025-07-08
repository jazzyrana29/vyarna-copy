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
import { SleepEventService } from './services/sleep-event.service';
import { ZtrackingSleepEventService } from './services/ztracking-sleep-event.service';
import { SleepInterruptionService } from './services/sleep-interruption.service';
import { ZtrackingSleepInterruptionReasonService } from './services/ztracking-sleep-interruption-reason.service';
import { SleepEnvironmentService } from './services/sleep-environment.service';
import { ZtrackingSleepEnvironmentService } from './services/ztracking-sleep-environment.service';
import { SleepRatingService } from './services/sleep-rating.service';
import { ZtrackingSleepRatingService } from './services/ztracking-sleep-rating.service';
import { SleepScheduleService } from './services/sleep-schedule.service';
import { ZtrackingSleepScheduleService } from './services/ztracking-sleep-schedule.service';
import { SleepNotificationService } from './services/sleep-notification.service';
import { ZtrackingSleepNotificationService } from './services/ztracking-sleep-notification.service';
import { SleepSummaryService } from './services/sleep-summary.service';
import { ZtrackingSleepSummaryService } from './services/ztracking-sleep-summary.service';
import { SleepPatternSummaryService } from './services/sleep-pattern-summary.service';
import { ZtrackingSleepPatternSummaryService } from './services/ztracking-sleep-pattern-summary.service';
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
    SleepEventService,
    ZtrackingSleepEventService,
    SleepInterruptionService,
    ZtrackingSleepInterruptionReasonService,
    SleepEnvironmentService,
    ZtrackingSleepEnvironmentService,
    SleepRatingService,
    ZtrackingSleepRatingService,
    SleepScheduleService,
    ZtrackingSleepScheduleService,
    SleepNotificationService,
    ZtrackingSleepNotificationService,
    SleepSummaryService,
    ZtrackingSleepSummaryService,
    SleepPatternSummaryService,
    ZtrackingSleepPatternSummaryService,
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
