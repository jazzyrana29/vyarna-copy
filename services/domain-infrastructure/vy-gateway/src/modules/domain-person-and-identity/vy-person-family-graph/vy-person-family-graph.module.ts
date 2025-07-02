import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonFamilyGraphWebsocket } from './vy-person-family-graph.gateway';
import { PersonFamilyGraphKafkaService } from './microservices/vy-person-family-graph-kafka.service';
import { PersonFamilyGraphResponseController } from './vy-person-family-graph-response.controller';
import { PersonFamilyGraphController } from './vy-person-family-graph.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonFamilyGraphResponseController, PersonFamilyGraphController],
  providers: [PersonFamilyGraphWebsocket, PersonFamilyGraphKafkaService],
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
