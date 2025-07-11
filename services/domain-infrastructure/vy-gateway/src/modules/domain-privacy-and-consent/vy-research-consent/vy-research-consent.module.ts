import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { ResearchConsentKafkaService } from './microservices/vy-research-consent-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [ResearchConsentKafkaService],
})
export class ResearchConsentModule {
  private logger = getLoggerConfig(ResearchConsentModule.name);

  constructor() {
    this.logger.debug(
      `${ResearchConsentModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
