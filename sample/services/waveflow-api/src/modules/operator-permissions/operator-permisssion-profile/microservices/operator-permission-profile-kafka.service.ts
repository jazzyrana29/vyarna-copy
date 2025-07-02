import { Injectable } from '@nestjs/common';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../../utils/common';

import {
  CreatePermissionProfileForAnOperatorDto,
  GetOperatorsForPermissionProfileDto,
  GetPermissionProfileForAnOperatorDto,
  IsOperatorAllowedToDto,
  KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
  KT_IS_OPERATOR_ALLOWED_TO,
  KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  OperatorPermissionProfileDto,
  PermissionProfileDto,
  RemovePermissionProfileForAnOperatorDto,
} from 'ez-utils';

import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';

@Injectable()
export class OperatorPermissionProfileKafkaService {
  private readonly serviceName = OperatorPermissionProfileKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getOperatorsForPermissionProfile(
    getOperatorsForPermissionProfileDto: GetOperatorsForPermissionProfileDto,
    traceId: string,
  ): Promise<OperatorPermissionProfileDto[]> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
      getOperatorsForPermissionProfileDto,
      traceId,
    );
  }

  async getPermissionProfileForOperator(
    getOperatorsForPermissionProfileDto: GetPermissionProfileForAnOperatorDto,
    traceId: string,
  ): Promise<PermissionProfileDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
      getOperatorsForPermissionProfileDto,
      traceId,
    );
  }

  async isOperatorAllowedTo(
    isOperatorAllowedToDto: IsOperatorAllowedToDto,
    traceId: string,
  ): Promise<boolean> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_IS_OPERATOR_ALLOWED_TO,
      isOperatorAllowedToDto,
      traceId,
    );
  }

  async createOperatorPermissionProfile(
    createPermissionProfileForAnOperatorDto: CreatePermissionProfileForAnOperatorDto,
    traceId: string,
  ): Promise<OperatorPermissionProfileDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
      createPermissionProfileForAnOperatorDto,
      traceId,
    );
  }

  async removeOperatorPermissionProfile(
    removePermissionProfileForAnOperatorDto: RemovePermissionProfileForAnOperatorDto,
    traceId: string,
  ): Promise<OperatorPermissionProfileDto> {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
      removePermissionProfileForAnOperatorDto,
      traceId,
    );
  }
}
