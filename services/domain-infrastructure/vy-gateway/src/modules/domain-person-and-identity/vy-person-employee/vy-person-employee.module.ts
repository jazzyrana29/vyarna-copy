import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonEmployeeWebsocket } from './vy-person-employee.gateway';
import { PersonEmployeeKafkaService } from './microservices/vy-person-employee-kafka.service';
import { PersonEmployeeResponseController } from './vy-person-employee-response.controller';
import { PersonEmployeeController } from './vy-person-employee.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonEmployeeResponseController, PersonEmployeeController],
  providers: [PersonEmployeeWebsocket, PersonEmployeeKafkaService],
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
