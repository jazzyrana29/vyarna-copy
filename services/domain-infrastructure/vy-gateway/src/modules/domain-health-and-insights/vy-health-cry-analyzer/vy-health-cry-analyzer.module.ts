import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthCryAnalyzerKafkaService } from './microservices/vy-health-cry-analyzer-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [HealthCryAnalyzerKafkaService],
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
