import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowthMeasurement } from '../../entities/growth_measurement.entity';
import { ZtrackingGrowthMeasurement } from '../../entities/ztracking_growth_measurement.entity';
import { Milestone } from '../../entities/milestone.entity';
import { ZtrackingMilestone } from '../../entities/ztracking_milestone.entity';
import { TeethingEvent } from '../../entities/teething_event.entity';
import { ZtrackingTeethingEvent } from '../../entities/ztracking_teething_event.entity';
import { DevelopmentMoment } from '../../entities/development_moment.entity';
import { ZtrackingDevelopmentMoment } from '../../entities/ztracking_development_moment.entity';
import { DevelopmentMomentPhoto } from '../../entities/development_moment_photo.entity';
import { ZtrackingDevelopmentMomentPhoto } from '../../entities/ztracking_development_moment_photo.entity';
import { GrowthMeasurementService } from './services/growth-measurement.service';
import { GrowthMeasurementKafkaService } from './services/growth-measurement-kafka.service';
import { ZtrackingGrowthMeasurementService } from './services/ztracking-growth-measurement.service';
import { MilestoneService } from './services/milestone.service';
import { MilestoneKafkaService } from './services/milestone-kafka.service';
import { ZtrackingMilestoneService } from './services/ztracking-milestone.service';
import { TeethingEventService } from './services/teething-event.service';
import { TeethingEventKafkaService } from './services/teething-event-kafka.service';
import { ZtrackingTeethingEventService } from './services/ztracking-teething-event.service';
import { DevelopmentMomentService } from './services/development-moment.service';
import { DevelopmentMomentKafkaService } from './services/development-moment-kafka.service';
import { ZtrackingDevelopmentMomentService } from './services/ztracking-development-moment.service';
import { DevelopmentController } from './development.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrowthMeasurement,
      ZtrackingGrowthMeasurement,
      Milestone,
      ZtrackingMilestone,
      TeethingEvent,
      ZtrackingTeethingEvent,
      DevelopmentMoment,
      ZtrackingDevelopmentMoment,
      DevelopmentMomentPhoto,
      ZtrackingDevelopmentMomentPhoto,
    ]),
  ],
  controllers: [DevelopmentController],
  providers: [
    GrowthMeasurementService,
    GrowthMeasurementKafkaService,
    ZtrackingGrowthMeasurementService,
    MilestoneService,
    MilestoneKafkaService,
    ZtrackingMilestoneService,
    TeethingEventService,
    TeethingEventKafkaService,
    ZtrackingTeethingEventService,
    DevelopmentMomentService,
    DevelopmentMomentKafkaService,
    ZtrackingDevelopmentMomentService,
  ],
})
export class DevelopmentModule {
  private logger = getLoggerConfig(DevelopmentModule.name);
  constructor() {
    this.logger.debug(
      `${DevelopmentModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
