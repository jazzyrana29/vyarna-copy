import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { OperatorController } from './operator.controller';
import { OperatorKafkaService } from './microservices/operator-kakfa.service';
import { OperatorResponseController } from './operator-response.controller';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OperatorController, OperatorResponseController],
  providers: [
    OperatorKafkaService,

    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class OperatorModule {
  private logger = getLoggerConfig(OperatorModule.name);

  constructor() {
    this.logger.debug(
      `${OperatorModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
