import { Module } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

import { OperatorPermissionProfileKafkaService } from './microservices/operator-permission-profile-kafka.service';

import { OperatorPermissionProfileController } from './operator-permission-profile.controller';
import { OperatorPermissionProfileResponseController } from './operator-permisssion-profile-response.controller';

@Module({
  imports: [KafkaModule],
  controllers: [
    OperatorPermissionProfileController,
    OperatorPermissionProfileResponseController,
  ],
  providers: [OperatorPermissionProfileKafkaService],
})
export class OperatorPermissionProfileModule {
  private logger = getLoggerConfig(OperatorPermissionProfileModule.name);

  constructor() {
    this.logger.debug(
      `${OperatorPermissionProfileModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
