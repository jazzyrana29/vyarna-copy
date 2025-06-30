import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';
import {
  KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY,
  KT_GET_OPERATORS_FOR_PERMISSION_PROFILE,
  KT_GET_PERMISSION_PROFILE_FOR_OPERATOR,
  KT_IS_OPERATOR_ALLOWED_TO,
  KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY,
} from 'ez-utils';
import { OperatorPermissionProfileKafkaService } from './services/operator-permission-profile-kafka.service';

@Controller('operator-permission-profile')
export class OperatorPermissionProfileController {
  private logger = getLoggerConfig(OperatorPermissionProfileController.name);

  constructor(
    private readonly operatorPermissionProfileKafkaService: OperatorPermissionProfileKafkaService,
  ) {
    this.logger.debug(
      `${OperatorPermissionProfileController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_OPERATORS_FOR_PERMISSION_PROFILE)
  async getOperatorsForAPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_OPERATORS_FOR_PERMISSION_PROFILE}`,
      '',
      'getOperatorsForAPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.operatorPermissionProfileKafkaService.getOperatorsForPermissionProfileViaKafka(
      message,
      key,
    );
  }

  @MessagePattern(KT_GET_PERMISSION_PROFILE_FOR_OPERATOR)
  async getPermissionProfileForAnOperator(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PERMISSION_PROFILE_FOR_OPERATOR}`,
      '',
      'getPermissionProfileForAnOperator',
      LogStreamLevel.DebugLight,
    );
    await this.operatorPermissionProfileKafkaService.getPermissionProfileForAnOperator(
      message,
      key,
    );
  }

  @MessagePattern(KT_IS_OPERATOR_ALLOWED_TO)
  async isOperatorAllowedTo(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_IS_OPERATOR_ALLOWED_TO}`,
      '',
      'isOperatorAllowedTo',
      LogStreamLevel.DebugLight,
    );
    await this.operatorPermissionProfileKafkaService.isOperatorAllowedTo(
      message,
      key,
    );
  }

  @MessagePattern(KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY)
  async createOperatorPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY}`,
      '',
      'createOperatorPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.operatorPermissionProfileKafkaService.createOperatorPermissionProfile(
      message,
      key,
    );
  }

  @MessagePattern(KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY)
  async removeOperatorPermissionProfile(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY}`,
      '',
      'removeOperatorPermissionProfile',
      LogStreamLevel.DebugLight,
    );
    await this.operatorPermissionProfileKafkaService.removeOperatorPermissionProfile(
      message,
      key,
    );
  }
}
