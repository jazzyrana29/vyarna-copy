import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonParentWebsocket } from './vy-person-parent.gateway';
import { PersonParentKafkaService } from './microservices/vy-person-parent-kafka.service';
import { PersonParentResponseController } from './vy-person-parent-response.controller';
import { PersonParentController } from './vy-person-parent.controller';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [PersonParentResponseController, PersonParentController],
  providers: [PersonParentWebsocket, PersonParentKafkaService],
})
export class PersonParentModule {
  private logger = getLoggerConfig(PersonParentModule.name);

  constructor() {
    this.logger.debug(
      `${PersonParentModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
