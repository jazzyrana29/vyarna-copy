import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonConsumerWebsocket } from './vy-person-consumer.gateway';
import { PersonConsumerKafkaService } from './microservices/vy-person-consumer-kafka.service';
import { PersonConsumerResponseController } from './vy-person-consumer-response.controller';
import { PersonConsumerController } from './vy-person-consumer.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonConsumerResponseController, PersonConsumerController],
  providers: [PersonConsumerWebsocket, PersonConsumerKafkaService],
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
