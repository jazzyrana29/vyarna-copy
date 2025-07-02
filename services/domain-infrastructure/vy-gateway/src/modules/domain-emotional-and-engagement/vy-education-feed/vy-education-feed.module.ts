import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { EducationFeedWebsocket } from './vy-education-feed.gateway';
import { EducationFeedKafkaService } from './microservices/vy-education-feed-kafka.service';
import { EducationFeedResponseController } from './vy-education-feed-response.controller';
import { EducationFeedController } from './vy-education-feed.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [EducationFeedResponseController, EducationFeedController],
  providers: [EducationFeedWebsocket, EducationFeedKafkaService],
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
