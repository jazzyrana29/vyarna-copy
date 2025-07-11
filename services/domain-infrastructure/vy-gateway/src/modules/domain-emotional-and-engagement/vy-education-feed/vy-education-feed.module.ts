import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { EducationFeedKafkaService } from './microservices/vy-education-feed-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [EducationFeedKafkaService],
})
export class EducationFeedModule {
  private logger = getLoggerConfig(EducationFeedModule.name);

  constructor() {
    this.logger.debug(
      `${EducationFeedModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
