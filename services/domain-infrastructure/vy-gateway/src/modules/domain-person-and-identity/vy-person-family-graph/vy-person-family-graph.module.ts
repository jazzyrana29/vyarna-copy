import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonFamilyGraphKafkaService } from './microservices/vy-person-family-graph-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonFamilyGraphKafkaService],
})
export class PersonFamilyGraphModule {
  private logger = getLoggerConfig(PersonFamilyGraphModule.name);

  constructor() {
    this.logger.debug(
      `${PersonFamilyGraphModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
