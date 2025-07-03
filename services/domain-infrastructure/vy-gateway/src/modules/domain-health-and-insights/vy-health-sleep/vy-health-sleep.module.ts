import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthSleepWebsocket } from './vy-health-sleep.gateway';
import { HealthSleepKafkaService } from './microservices/vy-health-sleep-kafka.service';
import { HealthSleepResponseController } from './vy-health-sleep-response.controller';
import { HealthSleepController } from './vy-health-sleep.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [HealthSleepResponseController, HealthSleepController],
  providers: [HealthSleepWebsocket, HealthSleepKafkaService],
})
export class HealthSleepModule {
  private logger = getLoggerConfig(HealthSleepModule.name);

  constructor() {
    this.logger.debug(
      `${HealthSleepModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
