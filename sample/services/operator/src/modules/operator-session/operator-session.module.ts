import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Operator } from '../../entities/operator.entity';
import { OperatorSession } from '../../entities/operator-session.entity';
import { ZtrackingOperatorSession } from '../../entities/ztracking-operator-session.entity';

import { OperatorSessionController } from './operator-session.controller';
import { OperatorSessionService } from './services/operator-session.service';
import { OperatorSessionKafkaService } from './services/operator-session-kafka.service';
import { ZtrackingOperatorSessionService } from './services/ztracking-operator-session.service';

import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operator,
      OperatorSession,
      ZtrackingOperatorSession,
    ]),
  ],
  controllers: [OperatorSessionController],
  providers: [
    OperatorSessionService,
    OperatorSessionKafkaService,
    ZtrackingOperatorSessionService,
  ],
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
