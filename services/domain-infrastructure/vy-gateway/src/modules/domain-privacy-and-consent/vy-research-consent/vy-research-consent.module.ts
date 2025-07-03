import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { ResearchConsentWebsocket } from './vy-research-consent.gateway';
import { ResearchConsentKafkaService } from './microservices/vy-research-consent-kafka.service';
import { ResearchConsentResponseController } from './vy-research-consent-response.controller';
import { ResearchConsentController } from './vy-research-consent.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [ResearchConsentResponseController, ResearchConsentController],
  providers: [ResearchConsentWebsocket, ResearchConsentKafkaService],
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
