import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionProfile } from '../../entities/permission-profile.entity';
import { PermissionProfileService } from './services/permission-profile.service';
import { ZtrackingPermissionProfileService } from './services/ztracking-permission-profile.service';
import { PermissionProfileController } from './permission-profile.controller';
import { PermissionProfileKafkaService } from './services/permission-profile-kafka.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { ZtrackingPermissionProfile } from '../../entities/ztracking-permission-profile.entity';
import { SystemMechanism } from '../../entities/system-mechanism.entity';
import { PermissionProfileManagedThroughMechanismPermit } from '../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { OperatorPermissionProfile } from '../../entities/operator-permission-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionProfile,
      ZtrackingPermissionProfile,
      SystemMechanism,
      OperatorPermissionProfile,
      PermissionProfileManagedThroughMechanismPermit,
    ]),
  ],
  controllers: [PermissionProfileController],
  providers: [
    PermissionProfileService,
    ZtrackingPermissionProfileService,
    PermissionProfileKafkaService,
  ],
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
