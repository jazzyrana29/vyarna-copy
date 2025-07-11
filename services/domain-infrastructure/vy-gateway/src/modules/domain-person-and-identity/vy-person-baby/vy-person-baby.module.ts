import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonBabyKafkaService } from './microservices/vy-person-baby-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonBabyKafkaService],
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
