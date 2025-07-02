import { Module } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

import { PermissionProfileKafkaService } from './microservices/permission-profile-kafka.service';

import { PermissionProfileController } from './permission-profile.controller';
import { PermissionProfileResponseController } from './permission-profile-response.controller';

@Module({
  imports: [KafkaModule],
  controllers: [
    PermissionProfileController,
    PermissionProfileResponseController,
  ],
  providers: [PermissionProfileKafkaService],
})
export class PermissionProfileModule {
  private logger = getLoggerConfig(PermissionProfileModule.name);

  constructor() {
    this.logger.debug(
      `${PermissionProfileModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
