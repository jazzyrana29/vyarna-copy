import { Injectable } from '@nestjs/common';
import { PermissionProfileService } from './permission-profile.service';
import { LogStreamLevel } from 'ez-logger';
import {
  CreatePermissionProfileDto,
  DeletePermissionProfileEntityDto,
  GetListOfPermissionProfileDto,
  GetPermissionProfileDto,
  GetPermitsForPermissionProfileDto,
  KafkaMessageResponderService,
  KT_CREATE_PERMISSION_PROFILE_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
  KT_GET_LIST_OF_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_ENTITY,
  KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
  KT_UPDATE_PERMISSION_PROFILE_ENTITY,
  KT_POPULATE_PERMISSION_PROFILE_ENTITY,
  PopulatePermissionProfileDto,
  UpdatePermissionProfileDto,
} from 'ez-utils';

import { ZtrackingPermissionProfileService } from './ztracking-permission-profile.service';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class PermissionProfileKafkaService {
  private readonly serviceName = PermissionProfileKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly permissionProfileService: PermissionProfileService,
    private readonly ztrackingPermissionProfileService: ZtrackingPermissionProfileService,
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

  async createPermissionProfileEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: CreatePermissionProfileDto, traceId: string) =>
        await this.permissionProfileService.createPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async updatePermissionProfileEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: UpdatePermissionProfileDto, traceId: string) =>
        await this.permissionProfileService.updatePermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async getPermissionProfileEntity(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: GetPermissionProfileDto, traceId: string) =>
        await this.permissionProfileService.findPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async deletePermissionProfile(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: DeletePermissionProfileEntityDto, traceId: string) =>
        await this.permissionProfileService.deletePermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async getHistoryOfPermissionProfileEntity(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: { permissionProfileId: string }, traceId: string) =>
        await this.ztrackingPermissionProfileService.findZtrackingPermissionProfileEntity(
          value,
          traceId,
        ),
    );
  }

  async getListOfPermissionProfile(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_LIST_OF_PERMISSION_PROFILE,
      message,
      key,
      async (value: GetListOfPermissionProfileDto, traceId: string) =>
        await this.permissionProfileService.getListOfPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async getPermitsForPermissionProfile(
    message: any,
    key: string,
  ): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
      message,
      key,
      async (value: GetPermitsForPermissionProfileDto, traceId: string) =>
        await this.permissionProfileService.getPermitsForPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async populatePermissionProfile(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_POPULATE_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: PopulatePermissionProfileDto, traceId: string) => {
        await this.permissionProfileService.populatePermissionProfile(
          value,
          traceId,
        );
      },
    );
  }
}
