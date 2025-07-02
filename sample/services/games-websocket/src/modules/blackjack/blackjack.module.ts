import { Module } from '@nestjs/common';
import { BlackjackGateway } from './blackjack.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { BlackjackKafkaService } from './blackjack-kafka.service';
import { BlackjackResponseController } from './blackjack-response.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [BlackjackResponseController],
  providers: [BlackjackGateway, BlackjackKafkaService],
})
export class BlackjackModule {
  private logger = getLoggerConfig(BlackjackModule.name);

  constructor() {
    this.logger.debug(
      `${BlackjackModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
