import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';

import {
  CreatePermissionProfileForAnOperatorDto,
  generateTraceId,
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

import { OperatorPermissionProfileKafkaService } from './microservices/operator-permission-profile-kafka.service';

import { ValidateAddOperatorsForAPermissionProfileDtoPipe } from './pipes/validate-add-operators-for-a-permission-profile-dto.pipe';
import { ValidateGetOperatorsForPermissionProfileDtoPipe } from './pipes/validate-get-operators-for-permission-profile-dto.pipe';
import { ValidateGetPermissionProfileForOperatorDtoPipe } from './pipes/validate-get-permission-profile-for-operator-dto.pipe';
import { ValidateIsOperatorAllowedToDtoPipe } from './pipes/validate-is-operator-allowed-to-dto.pipe';
import { ValidateRemoveOperatorsForAPermissionProfileDtoPipe } from './pipes/validate-remove-operators-for-a-permission-profile-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('operator-permission-profile')
@Controller('operator-permission-profile')
export class OperatorPermissionProfileController {
  private logger = getLoggerConfig(OperatorPermissionProfileController.name);

  constructor(
    private readonly operatorKakfaService: OperatorPermissionProfileKafkaService,
  ) {
    this.logger.debug(
      `${OperatorPermissionProfileController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_GET_OPERATORS_FOR_PERMISSION_PROFILE)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorPermissionProfileDto[]> })
  @ApiBody({ type: GetOperatorsForPermissionProfileDto })
  async getOperatorsForPermissionProfile(
    @Body(new ValidateGetOperatorsForPermissionProfileDtoPipe())
    getOperatorsForPermissionProfileDto: GetOperatorsForPermissionProfileDto,
  ): Promise<ResponseDTO<OperatorPermissionProfileDto[]>> {
    const traceId = generateTraceId('getOperatorsForPermissionProfile');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'getOperatorsForPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.getOperatorsForPermissionProfile(
        getOperatorsForPermissionProfileDto,
        traceId,
      ),
      'Operator for permissionProfile Id has been successfully extracted',
      traceId,
    );
  }

  @Post(KT_GET_PERMISSION_PROFILE_FOR_OPERATOR)
  @ApiCreatedResponse({ type: ResponseDTO<PermissionProfileDto> })
  @ApiBody({ type: GetPermissionProfileForAnOperatorDto })
  async getPermissionProfileForOperator(
    @Body(new ValidateGetPermissionProfileForOperatorDtoPipe())
    getPermissionProfilesForAnOperatorDto: GetPermissionProfileForAnOperatorDto,
  ): Promise<ResponseDTO<PermissionProfileDto>> {
    const traceId = generateTraceId('getPermissionProfilesForAnOperatorDto');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'getPermissionProfilesForAnOperatorDto',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.getPermissionProfileForOperator(
        getPermissionProfilesForAnOperatorDto,
        traceId,
      ),
      'PermissionProfile for operatorId has been successfully extracted',
      traceId,
    );
  }

  @Post(KT_IS_OPERATOR_ALLOWED_TO)
  @ApiCreatedResponse({ type: ResponseDTO<Boolean> })
  @ApiBody({ type: IsOperatorAllowedToDto })
  async isOperatorAllowedTo(
    @Body(new ValidateIsOperatorAllowedToDtoPipe())
    isOperatorAllowedToDto: IsOperatorAllowedToDto,
  ): Promise<ResponseDTO<boolean>> {
    const traceId = generateTraceId('isOperatorAllowedTo');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'isOperatorAllowedTo',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.isOperatorAllowedTo(
        isOperatorAllowedToDto,
        traceId,
      ),
      'Verified isOperatorAllowedTo successfully ',
      traceId,
    );
  }

  @Post(KT_CREATE_OPERATOR_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorPermissionProfileDto> })
  @ApiBody({ type: CreatePermissionProfileForAnOperatorDto })
  async createOperatorPermissionProfileForAnOperator(
    @Body(new ValidateAddOperatorsForAPermissionProfileDtoPipe())
    createPermissionProfileDto: CreatePermissionProfileForAnOperatorDto,
  ): Promise<ResponseDTO<OperatorPermissionProfileDto>> {
    const traceId = generateTraceId(
      'createOperatorPermissionProfileForAnOperator',
    );
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'createOperatorPermissionProfileForAnOperator',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.createOperatorPermissionProfile(
        createPermissionProfileDto,
        traceId,
      ),
      'created  Operator Permission Profile successfully ',
      traceId,
    );
  }

  @Put(KT_REMOVE_OPERATOR_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorPermissionProfileDto> })
  @ApiBody({ type: RemovePermissionProfileForAnOperatorDto })
  async removeOperatorForAPermissionProfile(
    @Body(new ValidateRemoveOperatorsForAPermissionProfileDtoPipe())
    removePermissionProfileForAnOperatorDto: RemovePermissionProfileForAnOperatorDto,
  ): Promise<ResponseDTO<OperatorPermissionProfileDto>> {
    const traceId = generateTraceId('removeOperatorForAPermissionProfile');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'removeOperatorForAPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.removeOperatorPermissionProfile(
        removePermissionProfileForAnOperatorDto,
        traceId,
      ),
      'removed  Operator Permission Profile successfully ',
      traceId,
    );
  }
}
