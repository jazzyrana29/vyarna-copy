import { Module } from '@nestjs/common';
import { FlipGateway } from './flip.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { FlipKafkaService } from './flip-kafka.service';
import { FlipResponseController } from './flip-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [FlipResponseController],
  providers: [FlipGateway, FlipKafkaService],
})
export class FlipModule {
  private logger = getLoggerConfig(FlipModule.name);

  constructor() {
    this.logger.debug(
      `${FlipModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
