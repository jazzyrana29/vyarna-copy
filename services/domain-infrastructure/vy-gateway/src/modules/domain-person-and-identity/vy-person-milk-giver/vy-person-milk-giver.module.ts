import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonMilkGiverKafkaService } from './microservices/vy-person-milk-giver-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonMilkGiverKafkaService],
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
