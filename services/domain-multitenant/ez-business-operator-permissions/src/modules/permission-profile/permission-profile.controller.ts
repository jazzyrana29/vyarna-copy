import { Controller } from '@nestjs/common';
import { PermissionProfileKafkaService } from './services/permission-profile-kafka.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import {
  KT_CREATE_PERMISSION_PROFILE_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY,
  KT_GET_LIST_OF_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_ENTITY,
  KT_GET_PERMITS_FOR_PERMISSION_PROFILE,
  KT_UPDATE_PERMISSION_PROFILE_ENTITY,
  KT_POPULATE_PERMISSION_PROFILE_ENTITY,
} from 'ez-utils';

@Controller('permission-profile')
export class PermissionProfileController {
  private logger = getLoggerConfig(PermissionProfileController.name);

  constructor(
    private readonly permissionProfileKafkaService: PermissionProfileKafkaService,
  ) {
    this.logger.debug(
      `${PermissionProfileController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PERMISSION_PROFILE_ENTITY)
  async createPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PERMISSION_PROFILE_ENTITY}`,
      '',
      'createPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.createPermissionProfileEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_UPDATE_PERMISSION_PROFILE_ENTITY)
  async updatePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_PERMISSION_PROFILE_ENTITY}`,
      '',
      'updatePermissionProfileEntityViaKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.updatePermissionProfileEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_PERMISSION_PROFILE_ENTITY)
  async getPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PERMISSION_PROFILE_ENTITY}`,
      '',
      'getPermissionProfileEntityViaKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.getPermissionProfileEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY)
  async getHistoryOfPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY}`,
      '',
      'getHistoryOfPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.getHistoryOfPermissionProfileEntity(
      message,
      key,
    );
  }

  @MessagePattern(KT_DELETE_PERMISSION_PROFILE_ENTITY)
  async deletePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_PERMISSION_PROFILE_ENTITY}`,
      '',
      'deletePermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.deletePermissionProfile(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_LIST_OF_PERMISSION_PROFILE)
  async getListOfPermissionProfileViaKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_LIST_OF_PERMISSION_PROFILE}`,
      '',
      'getListOfPermissionProfileViaKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.getListOfPermissionProfile(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_PERMITS_FOR_PERMISSION_PROFILE)
  async getPermitsForPermissionProfileViaKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PERMITS_FOR_PERMISSION_PROFILE}`,
      '',
      'getPermitsForPermissionProfileViaKafka',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.getPermitsForPermissionProfile(
      message,
      key,
    );
  }

  @MessagePattern(KT_POPULATE_PERMISSION_PROFILE_ENTITY)
  async populatePermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_POPULATE_PERMISSION_PROFILE_ENTITY}`,
      '',
      'populatePermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.permissionProfileKafkaService.populatePermissionProfile(
      message,
      key,
    );
  }
}
