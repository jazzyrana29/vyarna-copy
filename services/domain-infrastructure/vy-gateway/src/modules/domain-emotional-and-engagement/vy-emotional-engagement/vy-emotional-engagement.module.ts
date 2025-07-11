import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { EmotionalEngagementKafkaService } from './microservices/vy-emotional-engagement-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [EmotionalEngagementKafkaService],
})
export class EmotionalEngagementModule {
  private logger = getLoggerConfig(EmotionalEngagementModule.name);

  constructor() {
    this.logger.debug(
      `${EmotionalEngagementModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
