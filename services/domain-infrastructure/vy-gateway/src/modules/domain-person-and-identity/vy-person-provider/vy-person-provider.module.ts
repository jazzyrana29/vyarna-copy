import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonProviderWebsocket } from './vy-person-provider.gateway';
import { PersonProviderKafkaService } from './microservices/vy-person-provider-kafka.service';
import { PersonProviderResponseController } from './vy-person-provider-response.controller';
import { PersonProviderController } from './vy-person-provider.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonProviderResponseController, PersonProviderController],
  providers: [PersonProviderWebsocket, PersonProviderKafkaService],
})
export class PersonProviderModule {
  private logger = getLoggerConfig(PersonProviderModule.name);

  constructor() {
    this.logger.debug(
      `${PersonProviderModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
