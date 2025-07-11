import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonContactWebsocket } from './vy-person-contact.gateway';
import { PersonContactKafkaService } from './microservices/vy-person-contact-kafka.service';
import { PersonContactResponseController } from './vy-person-contact-response.controller';
import { PersonContactController } from './vy-person-contact.controller';
import { PersonContactEventsController } from './vy-person-contact-events.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [
    PersonContactResponseController,
    PersonContactController,
    PersonContactEventsController,
  ],
  providers: [PersonContactWebsocket, PersonContactKafkaService],
})
export class PersonContactModule {
  private logger = getLoggerConfig(PersonContactModule.name);
  constructor() {
    this.logger.debug(
      `${PersonContactModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
