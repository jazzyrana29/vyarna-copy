import { Module } from '@nestjs/common';
import { DiceGateway } from './dice.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { DiceKafkaService } from './dice-kafka.service';
import { DiceResponseController } from './dice-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [DiceResponseController],
  providers: [DiceGateway, DiceKafkaService],
})
export class DiceModule {
  private logger = getLoggerConfig(DiceModule.name);

  constructor() {
    this.logger.debug(
      `${DiceModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
