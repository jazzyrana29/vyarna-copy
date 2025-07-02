import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonCosharerWebsocket } from './vy-person-cosharer.gateway';
import { PersonCosharerKafkaService } from './microservices/vy-person-cosharer-kafka.service';
import { PersonCosharerResponseController } from './vy-person-cosharer-response.controller';
import { PersonCosharerController } from './vy-person-cosharer.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonCosharerResponseController, PersonCosharerController],
  providers: [PersonCosharerWebsocket, PersonCosharerKafkaService],
})
export class PersonCosharerModule {
  private logger = getLoggerConfig(PersonCosharerModule.name);

  constructor() {
    this.logger.debug(
      `${PersonCosharerModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
