import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonRolesWebsocket } from './vy-person-roles.gateway';
import { PersonRolesKafkaService } from './microservices/vy-person-roles-kafka.service';
import { PersonRolesResponseController } from './vy-person-roles-response.controller';
import { PersonRolesController } from './vy-person-roles.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonRolesResponseController, PersonRolesController],
  providers: [PersonRolesWebsocket, PersonRolesKafkaService],
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
