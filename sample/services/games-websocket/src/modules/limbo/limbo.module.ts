import { Module } from '@nestjs/common';
import { LimboGateway } from './limbo.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { LimboKafkaService } from './limbo-kafka.service';
import { LimboResponseController } from './limbo-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [LimboResponseController],
  providers: [LimboGateway, LimboKafkaService],
})
export class LimboModule {
  private logger = getLoggerConfig(LimboModule.name);

  constructor() {
    this.logger.debug(
      `${LimboModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
