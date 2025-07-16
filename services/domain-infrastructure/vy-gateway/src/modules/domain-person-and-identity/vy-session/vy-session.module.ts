import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonSessionWebsocket } from './vy-session.gateway';
import { PersonSessionKafkaService } from './microservices/vy-session-kafka.service';
import { PersonSessionResponseController } from './vy-session-response.controller';
import { PersonSessionController } from './vy-session.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonSessionResponseController, PersonSessionController],
  providers: [PersonSessionWebsocket, PersonSessionKafkaService],
})
export class PersonSessionModule {
  private logger = getLoggerConfig(PersonSessionModule.name);
  constructor() {
    this.logger.debug(
      `${PersonSessionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
