import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthCryAnalyzerWebsocket } from './vy-health-cry-analyzer.gateway';
import { HealthCryAnalyzerKafkaService } from './microservices/vy-health-cry-analyzer-kafka.service';
import { HealthCryAnalyzerResponseController } from './vy-health-cry-analyzer-response.controller';
import { HealthCryAnalyzerController } from './vy-health-cry-analyzer.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [HealthCryAnalyzerResponseController, HealthCryAnalyzerController],
  providers: [HealthCryAnalyzerWebsocket, HealthCryAnalyzerKafkaService],
})
export class HealthCryAnalyzerModule {
  private logger = getLoggerConfig(HealthCryAnalyzerModule.name);

  constructor() {
    this.logger.debug(
      `${HealthCryAnalyzerModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
