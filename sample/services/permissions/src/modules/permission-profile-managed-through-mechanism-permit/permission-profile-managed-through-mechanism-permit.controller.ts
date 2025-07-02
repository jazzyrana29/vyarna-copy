import { Controller } from '@nestjs/common';
import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './services/permission-profile-managed-through-mechanism-permit-kafka.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import {
  KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
} from 'ez-utils';

@Controller('permission-profile-managed-through-mechanism-permit')
export class PermissionProfileManagedThroughMechanismPermitController {
  private logger = getLoggerConfig(
    PermissionProfileManagedThroughMechanismPermitController.name,
  );

  constructor(
    private readonly permissionProfileManagedThroughMechanismPermitKafkaService: PermissionProfileManagedThroughMechanismPermitKafkaService,
  ) {
    this.logger.debug(
      `${PermissionProfileManagedThroughMechanismPermitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(
    KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  )
  async createPermissionProfileManagedThroughMechanismPermitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY}`,
      '',
      'createPermissionProfileManagedThroughMechanismPermitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileManagedThroughMechanismPermitKafkaService.createPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  )
  async updatePermissionProfileManagedThroughMechanismPermitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY}`,
      '',
      'updatePermissionProfileManagedThroughMechanismPermitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileManagedThroughMechanismPermitKafkaService.updatePermissionProfileManagedThroughMechanismPermitEntityViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  )
  async getPermissionProfileManagedThroughMechanismPermitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY}`,
      '',
      'getPermissionProfileManagedThroughMechanismPermitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileManagedThroughMechanismPermitKafkaService.getPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(
    KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  )
  async getHistoryOfPermissionProfileManagedThroughMechanismPermitWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY}`,
      '',
      'getHistoryOfPermissionProfileManagedThroughMechanismPermitWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileManagedThroughMechanismPermitKafkaService.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
      message,
      key,
    );
  }
}
