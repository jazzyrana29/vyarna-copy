import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import { OperatorPermissionProfile } from '../../entities/operator-permission-profile.entity';
import { ZtrackingOperatorPermissionProfile } from '../../entities/ztracking-operator-permission-profile.entity';
import { PermissionProfileManagedThroughMechanismPermit } from '../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { OperatorPermissionProfileController } from './operator-permission-profile.controller';
import { OperatorPermissionProfileService } from './services/operator-permission-profile.service';
import { ZtrackingOperatorPermissionProfileService } from './services/ztracking-operator-permission-profile.service';
import { OperatorPermissionProfileKafkaService } from './services/operator-permission-profile-kafka.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OperatorPermissionProfile,
      ZtrackingOperatorPermissionProfile,
      PermissionProfileManagedThroughMechanismPermit,
    ]),
  ],
  controllers: [OperatorPermissionProfileController],
  providers: [
    OperatorPermissionProfileService,
    ZtrackingOperatorPermissionProfileService,
    OperatorPermissionProfileKafkaService,
  ],
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
