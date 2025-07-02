import { Module } from '@nestjs/common';
import { SnakesGateway } from './snakes.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { SnakesKafkaService } from './snakes-kafka.service';
import { SnakesResponseController } from './snakes-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [SnakesResponseController],
  providers: [SnakesGateway, SnakesKafkaService],
})
export class SnakesModule {
  private logger = getLoggerConfig(SnakesModule.name);

  constructor() {
    this.logger.debug(
      `${SnakesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
