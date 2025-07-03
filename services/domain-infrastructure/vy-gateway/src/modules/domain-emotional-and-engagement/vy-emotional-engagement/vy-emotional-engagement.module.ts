import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { EmotionalEngagementWebsocket } from './vy-emotional-engagement.gateway';
import { EmotionalEngagementKafkaService } from './microservices/vy-emotional-engagement-kafka.service';
import { EmotionalEngagementResponseController } from './vy-emotional-engagement-response.controller';
import { EmotionalEngagementController } from './vy-emotional-engagement.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [EmotionalEngagementResponseController, EmotionalEngagementController],
  providers: [EmotionalEngagementWebsocket, EmotionalEngagementKafkaService],
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
