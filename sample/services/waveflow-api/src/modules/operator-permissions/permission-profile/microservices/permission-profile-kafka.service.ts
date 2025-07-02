import { Injectable } from '@nestjs/common';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import {
  CreatePermissionProfileDto,
  DeletePermissionProfileEntityDto,
  GetHistoryOfPermissionProfileDto,
  GetListOfPermissionProfileDto,
  GetPermissionProfileDto,
  GetPermitsForPermissionProfileDto,
  KT_CREATE_PERMISSION_PROFILE_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
  KT_GET_LIST_OF_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_ENTITY,
  KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
  KT_POPULATE_PERMISSION_PROFILE_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_ENTITY,
  MechanismPermitDto,
  PermissionProfileDto,
  PopulatePermissionProfileDto,
  UpdatePermissionProfileDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class PermissionProfileKafkaService {
  private readonly serviceName = PermissionProfileKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPermissionProfileEntity(
    createPermissionProfileDto: CreatePermissionProfileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PERMISSION_PROFILE_ENTITY,
      createPermissionProfileDto,
      traceId,
    );
  }

  async updatePermissionProfileEntity(
    updatePermissionProfileDto: UpdatePermissionProfileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_PERMISSION_PROFILE_ENTITY,
      updatePermissionProfileDto,
      traceId,
    );
  }

  async getPermissionProfileEntity(
    getPermissionProfileDto: GetPermissionProfileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_ENTITY,
      getPermissionProfileDto,
      traceId,
    );
  }

  async getHistoryOfPermissionProfileEntity(
    getHistoryOfPermissionProfileDto: GetHistoryOfPermissionProfileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
      getHistoryOfPermissionProfileDto,
      traceId,
    );
  }

  async deletePermissionProfileEntity(
    deletePermissionProfileEntityDto: DeletePermissionProfileEntityDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DELETE_PERMISSION_PROFILE_ENTITY,
      deletePermissionProfileEntityDto,
      traceId,
    );
  }

  async getListOfPermissionProfile(
    getListOfPermissionProfileDto: GetListOfPermissionProfileDto,
    traceId: string,
  ): Promise<PermissionProfileDto[]> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_LIST_OF_PERMISSION_PROFILE,
      getListOfPermissionProfileDto,
      traceId,
    );
  }

  async getPermitsForPermissionProfile(
    getPermitsForPermissionProfileDto: GetPermitsForPermissionProfileDto,
    traceId: string,
  ): Promise<MechanismPermitDto[]> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
      getPermitsForPermissionProfileDto,
      traceId,
    );
  }

  async populatePermissionProfileEntity(
    populatePermissionProfileDto: PopulatePermissionProfileDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_POPULATE_PERMISSION_PROFILE_ENTITY,
      populatePermissionProfileDto,
      traceId,
    );
  }
}
