import { Module } from '@nestjs/common';
import { DartsGateway } from './darts.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { DartsKafkaService } from './darts-kafka.service';
import { DartsResponseController } from './darts-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [DartsResponseController],
  providers: [DartsGateway, DartsKafkaService],
})
export class DartsModule {
  private logger = getLoggerConfig(DartsModule.name);

  constructor() {
    this.logger.debug(
      `${DartsModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
