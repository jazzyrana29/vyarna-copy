import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionProfileManagedThroughMechanismPermit } from '../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { ZtrackingPermissionProfileManagedThroughMechanismPermit } from '../../entities/ztracking-permission-profile-managed-through-mechanism-permit.entity';
import { PermissionProfileManagedThroughMechanismPermitService } from './services/permission-profile-managed-through-mechanism-permit.service';
import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './services/ztracking-permission-profile-managed-through-mechanism-permit.service';
import { PermissionProfileManagedThroughMechanismPermitController } from './permission-profile-managed-through-mechanism-permit.controller';
import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './services/permission-profile-managed-through-mechanism-permit-kafka.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionProfileManagedThroughMechanismPermit,
      ZtrackingPermissionProfileManagedThroughMechanismPermit,
    ]),
  ],
  controllers: [PermissionProfileManagedThroughMechanismPermitController],
  providers: [
    PermissionProfileManagedThroughMechanismPermitService,
    ZtrackingPermissionProfileManagedThroughMechanismPermitService,
    PermissionProfileManagedThroughMechanismPermitKafkaService,
  ],
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
