import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { DeviceSessionController } from './device-session.controller';
import { DeviceSessionKafkaService } from './microservices/device-session-kafka.service';
import { DeviceSessionResponseController } from './device-session-response.controller';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [DeviceSessionController, DeviceSessionResponseController],
  providers: [
    DeviceSessionKafkaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class DeviceSessionModule {
  private logger = getLoggerConfig(DeviceSessionModule.name);

  constructor() {
    this.logger.debug(
      `${DeviceSessionModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
