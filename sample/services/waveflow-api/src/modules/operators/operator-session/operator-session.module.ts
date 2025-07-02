import { Module } from '@nestjs/common';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { OperatorSessionController } from './operator-session.controller';
import { OperatorSessionKafkaService } from './microservices/operator-session-kafka.service';
import { OperatorSessionResponseController } from './operator-session-response.controller';

import { AuthService } from '../../../services/auth.service';
import { KafkaModule } from '../../../utils/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OperatorSessionController, OperatorSessionResponseController],
  providers: [OperatorSessionKafkaService, AuthService],
})
export class OperatorSessionModule {
  private logger = getLoggerConfig(OperatorSessionModule.name);

  constructor() {
    this.logger.debug(
      `${OperatorSessionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
