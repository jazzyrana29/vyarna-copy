import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthLogWebsocket } from './vy-health-log.gateway';
import { HealthLogKafkaService } from './microservices/vy-health-log-kafka.service';
import { HealthLogResponseController } from './vy-health-log-response.controller';
import { HealthLogController } from './vy-health-log.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [HealthLogResponseController, HealthLogController],
  providers: [HealthLogWebsocket, HealthLogKafkaService],
})
export class HealthLogModule {
  private logger = getLoggerConfig(HealthLogModule.name);

  constructor() {
    this.logger.debug(
      `${HealthLogModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
