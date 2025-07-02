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
  CreatePermissionProfileManagedThroughMechanismPermitDto,
  DeletePermissionProfileManagedThroughMechanismPermitDto,
  generateTraceId,
  GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  GetPermissionProfileManagedThroughMechanismPermitDto,
  KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  PermissionProfileManagedThroughMechanismPermitDto,
  UpdatePermissionProfileManagedThroughMechanismPermitDto,
  ZtrackingPermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

import { PermissionProfileManagedThroughMechanismPermitKafkaService } from './microservices/permission-profile-managed-through-mechanism-permit-kafka.service';

import { ValidateCreatePermissionProfileManagedThroughMechanismPermitDtoPipe } from './pipes/validate-create-permission-profile-managed-through-mechanism-permit-dto.pipe';
import { ValidateGetPermissionProfileManagedThroughMechanismPermitDtoPipe } from './pipes/validate-get-permission-profile-managed-through-mechanism-permit-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('permission-profile-managed-through-mechanism-permit')
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

  @Post(KT_CREATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>,
  })
  @ApiBody({
    type: CreatePermissionProfileManagedThroughMechanismPermitDto,
  })
  async createPermissionProfileManagedThroughMechanismPermitEntity(
    @Body(
      new ValidateCreatePermissionProfileManagedThroughMechanismPermitDtoPipe(),
    )
    createPermissionProfileManagedThroughMechanismPermitDto: PermissionProfileManagedThroughMechanismPermitDto,
  ): Promise<ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>> {
    const traceId = generateTraceId(
      'createPermissionProfileManagedThroughMechanismPermitEntity',
    );
    this.logger.info(
      `traceId generated successfully for body ${JSON.stringify(createPermissionProfileManagedThroughMechanismPermitDto)}`,
      traceId,
      'createPermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileManagedThroughMechanismPermitKafkaService.createPermissionProfileManagedThroughMechanismPermitEntity(
        createPermissionProfileManagedThroughMechanismPermitDto,
        traceId,
      ),
      'A Permission Profile Managed Through Mechanism Permit entity has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>,
  })
  @ApiBody({
    type: UpdatePermissionProfileManagedThroughMechanismPermitDto,
  })
  async updatePermissionProfileManagedThroughMechanismPermitEntity(
    @Body()
    updatePermissionProfileManagedThroughMechanismPermitDto: PermissionProfileManagedThroughMechanismPermitDto,
  ): Promise<ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>> {
    const traceId = generateTraceId(
      'updatePermissionProfileManagedThroughMechanismPermitEntity',
    );
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updatePermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileManagedThroughMechanismPermitKafkaService.updatePermissionProfileManagedThroughMechanismPermitEntity(
        updatePermissionProfileManagedThroughMechanismPermitDto,
        traceId,
      ),
      'The Permission Profile Managed Through Mechanism Permit Entity has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>,
  })
  @ApiBody({
    type: GetPermissionProfileManagedThroughMechanismPermitDto,
  })
  async getPermissionProfileManagedThroughMechanismPermitEntity(
    @Body(
      new ValidateGetPermissionProfileManagedThroughMechanismPermitDtoPipe(),
    )
    getPermissionProfileManagedThroughMechanismPermitDto: PermissionProfileManagedThroughMechanismPermitDto,
  ): Promise<ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>> {
    const traceId = generateTraceId(
      'getPermissionProfileManagedThroughMechanismPermitEntity',
    );
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getPermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileManagedThroughMechanismPermitKafkaService.getPermissionProfileManagedThroughMechanismPermitEntity(
        getPermissionProfileManagedThroughMechanismPermitDto,
        traceId,
      ),
      'Permission Profile Managed Through Mechanism Permit Entity Found',
      traceId,
    );
  }

  @Post(
    KT_GET_HISTORY_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY,
  )
  @ApiCreatedResponse({
    type: ResponseDTO<
      [ZtrackingPermissionProfileManagedThroughMechanismPermitDto]
    >,
    isArray: true,
  })
  @ApiBody({
    type: GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  })
  async getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity(
    @Body()
    getHistoryOfPermissionProfileManagedThroughMechanismPermitDto: GetHistoryOfPermissionProfileManageThroughMechanismPermitDto,
  ): Promise<
    ResponseDTO<ZtrackingPermissionProfileManagedThroughMechanismPermitDto[]>
  > {
    const traceId = generateTraceId(
      'getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity',
    );
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileManagedThroughMechanismPermitKafkaService.getHistoryOfPermissionProfileManagedThroughMechanismPermitEntity(
        getHistoryOfPermissionProfileManagedThroughMechanismPermitDto,
        traceId,
      ),
      'History of Mechanism Permit Id has been extracted',
      traceId,
    );
  }

  @Post(KT_DELETE_PERMISSION_PROFILE_MANAGED_THROUGH_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<PermissionProfileManagedThroughMechanismPermitController>,
  })
  @ApiBody({
    type: DeletePermissionProfileManagedThroughMechanismPermitDto,
  })
  async deletePermissionProfileManagedThroughMechanismPermitEntity(
    @Body()
    deletePermissionProfileManagedThroughMechanismPermitDto: DeletePermissionProfileManagedThroughMechanismPermitDto,
  ): Promise<ResponseDTO<PermissionProfileManagedThroughMechanismPermitDto>> {
    const traceId = generateTraceId(
      'deletePermissionProfileManagedThroughMechanismPermitEntity',
    );
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'deletePermissionProfileManagedThroughMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileManagedThroughMechanismPermitKafkaService.deletePermissionProfileManagedThroughMechanismPermitEntity(
        deletePermissionProfileManagedThroughMechanismPermitDto,
        traceId,
      ),
      'The Permission Profile Managed Through Mechanism Permit Entity has been successfully deleted',
      traceId,
    );
  }
}
