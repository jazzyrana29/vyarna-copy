import { Module } from '@nestjs/common';
import { PersonIdentityGateway } from './dice.gateway';
import { KafkaModule } from '../../utils/kafka/kafka.module';
import { PersonIdentityKafkaService } from './vy-person-identity-kafka.service';
import { PersonIdentityResponseController } from './dice-response.controller';
import { getLoggerConfig } from '../../utils/common';
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
