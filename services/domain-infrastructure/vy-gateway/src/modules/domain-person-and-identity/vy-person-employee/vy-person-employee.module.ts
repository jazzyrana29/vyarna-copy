import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonEmployeeKafkaService } from './microservices/vy-person-employee-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonEmployeeKafkaService],
})
export class PersonEmployeeModule {
  private logger = getLoggerConfig(PersonEmployeeModule.name);

  constructor() {
    this.logger.debug(
      `${PersonEmployeeModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
