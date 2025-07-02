import { Injectable } from '@nestjs/common';
import { PermissionProfileManagedThroughMechanismPermitService } from './permission-profile-managed-through-mechanism-permit.service';
import { LogStreamLevel } from 'ez-logger';

import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './ztracking-permission-profile-managed-through-mechanism-permit.service';
import { getLoggerConfig } from '../../../utils/common';
import {
  CreatePermissionProfileManagedThroughMechanismPermitDto,
  GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  GetPermissionProfileManagedThroughMechanismPermitDto,
  KafkaMessageResponderService,
  KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  UpdatePermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

@Injectable()
export class PermissionProfileManagedThroughMechanismPermitKafkaService {
  private readonly serviceName =
    PermissionProfileManagedThroughMechanismPermitKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly permissionProfileManagedThroughMechanismPermitService: PermissionProfileManagedThroughMechanismPermitService,
    private readonly ztrackingPermissionProfileManagedThroughMechanismPermitService: ZtrackingPermissionProfileManagedThroughMechanismPermitService,
  ) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (
        value: CreatePermissionProfileManagedThroughMechanismPermitDto,
        traceId: string,
      ) =>
        await this.permissionProfileManagedThroughMechanismPermitService.createPermissionProfileManagedThroughMechanismPermit(
          value,
          traceId,
        ),
    );
  }

  async updatePermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (
        value: UpdatePermissionProfileManagedThroughMechanismPermitDto,
        traceId: string,
      ) =>
        await this.permissionProfileManagedThroughMechanismPermitService.updatePermissionProfileManagedThroughMechanismPermit(
          value,
          traceId,
        ),
    );
  }

  async getPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (
        value: GetPermissionProfileManagedThroughMechanismPermitDto,
        traceId: string,
      ) =>
        await this.permissionProfileManagedThroughMechanismPermitService.findPermissionProfileManagedThroughMechanismPermit(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfPermissionProfileManagedThroughMechanismPermitEntityViaKafka(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      message,
      key,
      async (
        value: GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
        traceId: string,
      ) =>
        await this.ztrackingPermissionProfileManagedThroughMechanismPermitService.findZtrackingPermissionProfileManagedThroughMechanismPermitEntities(
          value,
          traceId,
        ),
    );
  }
}
