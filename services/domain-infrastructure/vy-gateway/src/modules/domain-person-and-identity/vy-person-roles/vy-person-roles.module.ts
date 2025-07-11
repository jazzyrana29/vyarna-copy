import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonRolesKafkaService } from './microservices/vy-person-roles-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonRolesKafkaService],
})
export class PersonRolesModule {
  private logger = getLoggerConfig(PersonRolesModule.name);

  constructor() {
    this.logger.debug(
      `${PersonRolesModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
