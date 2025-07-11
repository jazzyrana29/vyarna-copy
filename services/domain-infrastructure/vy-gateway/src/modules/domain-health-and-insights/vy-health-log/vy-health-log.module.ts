import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { HealthLogKafkaService } from './microservices/vy-health-log-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [HealthLogKafkaService],
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
