import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonBabyWebsocket } from './vy-person-baby.gateway';
import { PersonBabyKafkaService } from './microservices/vy-person-baby-kafka.service';
import { PersonBabyResponseController } from './vy-person-baby-response.controller';
import { PersonBabyController } from './vy-person-baby.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonBabyResponseController, PersonBabyController],
  providers: [PersonBabyWebsocket, PersonBabyKafkaService],
})
export class PersonBabyModule {
  private logger = getLoggerConfig(PersonBabyModule.name);

  constructor() {
    this.logger.debug(
      `${PersonBabyModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
