import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { DevelopmentLogController } from './vy-development-log.controller';
import { DevelopmentLogKafkaService } from './microservices/vy-development-log-kafka.service';
import { DevelopmentLogWebsocket } from './vy-development-log.gateway';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [DevelopmentLogController],
  providers: [DevelopmentLogWebsocket, DevelopmentLogKafkaService],
})
export class DevelopmentLogModule {
  private logger = getLoggerConfig(DevelopmentLogModule.name);

  constructor() {
    this.logger.debug(
      `${DevelopmentLogModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
