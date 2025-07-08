import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonEmailWebsocket } from './vy-person-email.gateway';
import { PersonEmailKafkaService } from './microservices/vy-person-email-kafka.service';
import { PersonEmailResponseController } from './vy-person-email-response.controller';
import { PersonEmailController } from './vy-person-email.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonEmailResponseController, PersonEmailController],
  providers: [PersonEmailWebsocket, PersonEmailKafkaService],
})
export class PersonEmailModule {
  private logger = getLoggerConfig(PersonEmailModule.name);
  constructor() {
    this.logger.debug(
      `${PersonEmailModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
