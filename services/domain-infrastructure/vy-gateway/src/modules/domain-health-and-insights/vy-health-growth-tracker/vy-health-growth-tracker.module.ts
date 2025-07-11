import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthGrowthTrackerKafkaService } from './microservices/vy-health-growth-tracker-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [HealthGrowthTrackerKafkaService],
})
export class HealthGrowthTrackerModule {
  private logger = getLoggerConfig(HealthGrowthTrackerModule.name);

  constructor() {
    this.logger.debug(
      `${HealthGrowthTrackerModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
