import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonMilkGiverWebsocket } from './vy-person-milk-giver.gateway';
import { PersonMilkGiverKafkaService } from './microservices/vy-person-milk-giver-kafka.service';
import { PersonMilkGiverResponseController } from './vy-person-milk-giver-response.controller';
import { PersonMilkGiverController } from './vy-person-milk-giver.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonMilkGiverResponseController, PersonMilkGiverController],
  providers: [PersonMilkGiverWebsocket, PersonMilkGiverKafkaService],
})
export class PersonMilkGiverModule {
  private logger = getLoggerConfig(PersonMilkGiverModule.name);

  constructor() {
    this.logger.debug(
      `${PersonMilkGiverModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
