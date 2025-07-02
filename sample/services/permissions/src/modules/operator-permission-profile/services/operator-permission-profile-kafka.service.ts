import { Injectable } from '@nestjs/common';
import { OperatorPermissionProfileService } from './operator-permission-profile.service';

import { LogStreamLevel } from 'ez-logger';

import {
  CreatePermissionProfileForAnOperatorDto,
  GetOperatorsForPermissionProfileDto,
  GetPermissionProfileForAnOperatorDto,
  IsOperatorAllowedToDto,
  KafkaMessageResponderService,
  KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
  KT_IS_OPERATOR_ALLOWED_TO,
  KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  RemovePermissionProfileForAnOperatorDto,
} from 'ez-utils';

import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class OperatorPermissionProfileKafkaService {
  private logger = getLoggerConfig(OperatorPermissionProfileKafkaService.name);
  private readonly serviceName = OperatorPermissionProfileKafkaService.name;
  private readonly kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly operatorPermissionProfileService: OperatorPermissionProfileService,
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

  async getOperatorsForPermissionProfileViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
      message,
      key,
      async (value: GetOperatorsForPermissionProfileDto, traceId: string) =>
        await this.operatorPermissionProfileService.getOperatorsForPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async getPermissionProfileForAnOperator(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
      message,
      key,
      async (value: GetPermissionProfileForAnOperatorDto, traceId: string) =>
        await this.operatorPermissionProfileService.getPermissionProfileForAnOperator(
          value,
          traceId,
        ),
    );
  }

  async isOperatorAllowedTo(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_IS_OPERATOR_ALLOWED_TO,
      message,
      key,
      async (value: IsOperatorAllowedToDto, traceId: string) =>
        await this.operatorPermissionProfileService.isOperatorAllowedTo(
          value,
          traceId,
        ),
    );
  }

  async createOperatorPermissionProfile(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: CreatePermissionProfileForAnOperatorDto, traceId: string) =>
        await this.operatorPermissionProfileService.addOperatorPermissionProfile(
          value,
          traceId,
        ),
    );
  }

  async removeOperatorPermissionProfile(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
      message,
      key,
      async (value: RemovePermissionProfileForAnOperatorDto, traceId: string) =>
        await this.operatorPermissionProfileService.removeOperatorPermissionProfile(
          value,
          traceId,
        ),
    );
  }
}
