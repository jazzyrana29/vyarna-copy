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

import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { ResponseDTO } from '../../../dto/response.dto';

import {
  CreatePermissionProfileDto,
  DeletePermissionProfileEntityDto,
  generateTraceId,
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

import { PermissionProfileKafkaService } from './microservices/permission-profile-kafka.service';
import { ValidateCreatePermissionProfileDtoPipe } from './pipes/validate-create-permission-profile-dto.pipe';
import { ValidateGetPermissionProfileDtoPipe } from './pipes/validate-get-permission-profile-dto.pipe';
import { ValidateGetPermitsForPermissionProfileDtoPipe } from './pipes/validate-get-permits-for-permission-profile-dto.pipe';
import { ValidateGetListOfPermissionProfileDtoPipe } from './pipes/validate-get-list-of-permission-profile-dto.pipe';
import { ValidateUpdatePermissionProfileDtoPipe } from './pipes/validate-update-permission-profile-dto.pipe';
import { ValidatePopulatePermissionProfileDtoPipe } from './pipes/validate-populate-permission-profile-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('permission-profile')
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

  @Post(KT_CREATE_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<CreatePermissionProfileDto> })
  @ApiBody({ type: CreatePermissionProfileDto })
  async createPermissionProfileEntity(
    @Body(new ValidateCreatePermissionProfileDtoPipe())
    createPermissionProfileDto: CreatePermissionProfileDto,
  ): Promise<ResponseDTO<CreatePermissionProfileDto>> {
    const traceId = generateTraceId('createPermissionProfileEntity');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'createPermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.createPermissionProfileEntity(
        createPermissionProfileDto,
        traceId,
      ),
      'A Permission Profile entity has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PermissionProfileDto> })
  @ApiBody({ type: UpdatePermissionProfileDto })
  async updatePermissionProfileEntity(
    @Body(new ValidateUpdatePermissionProfileDtoPipe())
    updatePermissionProfileDto: UpdatePermissionProfileDto,
  ): Promise<ResponseDTO<PermissionProfileDto>> {
    const traceId = generateTraceId('updatePermissionProfileEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updatePermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.updatePermissionProfileEntity(
        updatePermissionProfileDto,
        traceId,
      ),
      'The Permission Profile Entity has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PermissionProfileDto> })
  @ApiBody({ type: GetPermissionProfileDto })
  async getPermissionProfileEntity(
    @Body(new ValidateGetPermissionProfileDtoPipe())
    getPermissionProfileDto: GetPermissionProfileDto,
  ): Promise<ResponseDTO<PermissionProfileDto>> {
    const traceId = generateTraceId('getPermissionProfileEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getPermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.getPermissionProfileEntity(
        getPermissionProfileDto,
        traceId,
      ),
      'Permission Profile Entity Found',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PermissionProfileDto[]> })
  @ApiBody({ type: GetHistoryOfPermissionProfileDto })
  async getHistoryOfPermissionProfileEntity(
    // TODO: body-validator is missing
    @Body() getHistoryOfPermissionProfileDto: GetHistoryOfPermissionProfileDto,
  ): Promise<ResponseDTO<PermissionProfileDto[]>> {
    const traceId = generateTraceId('getHistoryOfPermissionProfileEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryOfPermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.getHistoryOfPermissionProfileEntity(
        getHistoryOfPermissionProfileDto,
        traceId,
      ),
      'History of Permission Profile Id has been extracted',
      traceId,
    );
  }

  @Put(KT_DELETE_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<void> })
  @ApiBody({ type: GetHistoryOfPermissionProfileDto })
  async deletePermissionProfileEntity(
    // TODO: body-validator is missing
    @Body() deletePermissionProfileEntityDto: DeletePermissionProfileEntityDto,
  ): Promise<ResponseDTO<void>> {
    const traceId = generateTraceId('deletePermissionProfileEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'deletePermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );

    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.deletePermissionProfileEntity(
        deletePermissionProfileEntityDto,
        traceId,
      ),
      'The Permission Profile Entity has been successfully deleted',
      traceId,
    );
  }

  @Post(KT_GET_LIST_OF_PERMISSION_PROFILE)
  @ApiCreatedResponse({ type: ResponseDTO<PermissionProfileDto[]> })
  @ApiBody({ type: GetListOfPermissionProfileDto })
  async getListOfPermissionProfile(
    @Body(new ValidateGetListOfPermissionProfileDtoPipe())
    getListOfPermissionProfileDto: GetListOfPermissionProfileDto,
  ): Promise<ResponseDTO<PermissionProfileDto[]>> {
    const traceId = generateTraceId('getListOfPermissionProfile');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getListOfPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.getListOfPermissionProfile(
        getListOfPermissionProfileDto,
        traceId,
      ),
      'Permission Profile list extracted',
      traceId,
    );
  }

  @Post(KT_GET_PERMITS_FOR_PERMISSION_PROFILE)
  @ApiCreatedResponse({ type: ResponseDTO<MechanismPermitDto[]> })
  @ApiBody({ type: GetPermitsForPermissionProfileDto })
  async getPermitsForPermissionProfile(
    @Body(new ValidateGetPermitsForPermissionProfileDtoPipe())
    getPermitsForPermissionProfileDto: GetPermitsForPermissionProfileDto,
  ): Promise<ResponseDTO<MechanismPermitDto[]>> {
    const traceId = generateTraceId('getPermitsForPermissionProfile');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getPermitsForPermissionProfile',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.getPermitsForPermissionProfile(
        getPermitsForPermissionProfileDto,
        traceId,
      ),
      'Mechanism Permits for Permission Profile extracted',
      traceId,
    );
  }

  @Post(KT_POPULATE_PERMISSION_PROFILE_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<void> })
  @ApiBody({ type: PopulatePermissionProfileDto })
  async populatePermissionProfileEntity(
    @Body(new ValidatePopulatePermissionProfileDtoPipe())
    populatePermissionProfileDto: PopulatePermissionProfileDto,
  ): Promise<ResponseDTO<void>> {
    const traceId = generateTraceId('populatePermissionProfileEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'populatePermissionProfileEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.permissionProfileKafkaService.populatePermissionProfileEntity(
        populatePermissionProfileDto,
        traceId,
      ),
      'Permission profile has been successfully populated',
      traceId,
    );
  }
}
