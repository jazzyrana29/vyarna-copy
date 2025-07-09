import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { CareLogController } from './vy-care-log.controller';
import { CareLogKafkaService } from './microservices/vy-care-log-kafka.service';
import { CareLogWebsocket } from './vy-care-log.gateway';
import { CareLogResponseController } from './vy-care-log-response.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [CareLogResponseController, CareLogController],
  providers: [CareLogWebsocket, CareLogKafkaService],
})
export class CareLogModule {
  private logger = getLoggerConfig(CareLogModule.name);

  constructor() {
    this.logger.debug(
      `${CareLogModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
