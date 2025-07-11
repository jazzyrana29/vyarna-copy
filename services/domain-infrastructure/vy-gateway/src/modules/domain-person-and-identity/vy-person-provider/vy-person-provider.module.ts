import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonProviderKafkaService } from './microservices/vy-person-provider-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonProviderKafkaService],
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
