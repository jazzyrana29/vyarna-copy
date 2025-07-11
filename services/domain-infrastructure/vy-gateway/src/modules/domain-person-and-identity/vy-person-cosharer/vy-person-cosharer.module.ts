import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonCosharerKafkaService } from './microservices/vy-person-cosharer-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonCosharerKafkaService],
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
