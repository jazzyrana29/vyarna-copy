import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonConsumerKafkaService } from './microservices/vy-person-consumer-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonConsumerKafkaService],
})
export class PersonConsumerModule {
  private logger = getLoggerConfig(PersonConsumerModule.name);

  constructor() {
    this.logger.debug(
      `${PersonConsumerModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
