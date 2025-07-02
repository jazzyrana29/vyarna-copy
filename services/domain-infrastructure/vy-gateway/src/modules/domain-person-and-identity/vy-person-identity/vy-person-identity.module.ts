import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonIdentityWebsocket } from './vy-person-identity.websocket';
import { PersonIdentityKafkaService } from './vy-person-identity-kafka.service';
import { PersonIdentityResponseController } from './vy-person-identity-response.controller';
import { PersonIdentityController } from './vy-person-identity.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonIdentityResponseController, PersonIdentityController],
  providers: [PersonIdentityWebsocket, PersonIdentityKafkaService],
})
export class PersonIdentityModule {
  private logger = getLoggerConfig(PersonIdentityModule.name);

  constructor() {
    this.logger.debug(
      `${PersonIdentityModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
