import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  CreatePermissionProfileManagedThroughMechanismPermitDto,
  UpdatePermissionProfileManagedThroughMechanismPermitDto,
  GetPermissionProfileManagedThroughMechanismPermitDto,
  ZtrackingPermissionProfileManagedThroughMechanismPermitDto,
  PermissionProfileManagedThroughMechanismPermitDto,
  GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  DeletePermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class PermissionProfileManagedThroughMechanismPermitKafkaService {
  private readonly serviceName =
    PermissionProfileManagedThroughMechanismPermitKafkaService.name;

  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPermissionProfileManagedThroughMechanismPermitEntity(
    createPermissionProfileManagedThroughMechanismPermitDto: CreatePermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      createPermissionProfileManagedThroughMechanismPermitDto,
      traceId,
    );
  }

  async updatePermissionProfileManagedThroughMechanismPermitEntity(
    updatePermissionProfileManagedThroughMechanismPermitDto: UpdatePermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      updatePermissionProfileManagedThroughMechanismPermitDto,
      traceId,
    );
  }

  async getPermissionProfileManagedThroughMechanismPermitEntity(
    getPermissionProfileManagedThroughMechanismPermitDto: GetPermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      getPermissionProfileManagedThroughMechanismPermitDto,
      traceId,
    );
  }

  async getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity(
    getHistoryOfPermissionProfileManagedThroughMechanismPermitDto: GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
    traceId: string,
  ): Promise<ZtrackingPermissionProfileManagedThroughMechanismPermitDto[]> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      getHistoryOfPermissionProfileManagedThroughMechanismPermitDto,
      traceId,
    );
  }

  async deletePermissionProfileManagedThroughMechanismPermitEntity(
    deletePermissionProfileManagedThroughMechanismPermitDto: DeletePermissionProfileManagedThroughMechanismPermitDto,
    traceId: string,
  ): Promise<PermissionProfileManagedThroughMechanismPermitDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
      deletePermissionProfileManagedThroughMechanismPermitDto,
      traceId,
    );
  }
}
