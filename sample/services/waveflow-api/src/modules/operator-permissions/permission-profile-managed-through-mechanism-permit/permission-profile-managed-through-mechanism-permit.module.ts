import { Module } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { KafkaModule } from '../../../utils/kafka/kafka.module';

import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './microservices/permission-profile-managed-through-mechanism-permit-kafka.service';

import { PermissionProfileManagedThroughMechanismPermitController } from './permission-profile-managed-through-mechanism-permit.controller';
import { PermissionProfileManagedThroughMechanismPermitResponseController } from './permission-profile-managed-through-mechanism-permit-response.controller';

@Module({
  imports: [KafkaModule],
  controllers: [
    PermissionProfileManagedThroughMechanismPermitController,
    PermissionProfileManagedThroughMechanismPermitResponseController,
  ],
  providers: [PermissionProfileManagedThroughMechanismPermitKafkaService],
})
export class PermissionProfileManagedThroughMechanismPermitModule {
  private logger = getLoggerConfig(
    PermissionProfileManagedThroughMechanismPermitModule.name,
  );

  constructor() {
    this.logger.debug(
      `${PermissionProfileManagedThroughMechanismPermitModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
