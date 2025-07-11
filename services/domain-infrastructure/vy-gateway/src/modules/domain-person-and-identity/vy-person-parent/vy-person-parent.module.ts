import { Module } from '@nestjs/common';
import { KafkaModule } from '../../../utils/kafka/kafka.module';
import { PersonParentKafkaService } from './microservices/vy-person-parent-kafka.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [PersonParentKafkaService],
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
