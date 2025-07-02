import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';

import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { ResponseDTO } from '../../../dto/response.dto';

import {
  generateTraceId,
  GetHistoryOfSystemMechanismDto,
  GetManySystemMechanismDto,
  GetSystemMechanismDto,
  KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY,
  KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY,
  KT_GET_SYSTEM_MECHANISM_ENTITY,
  SystemMechanismDto,
} from 'ez-utils';

import { SystemMechanismKafkaService } from './microservices/system-mechanism-kafka.service';

import { ValidateGetSystemMechanismDtoPipe } from './pipes/validate-get-system-mechanism-dto.pipe';
import { ValidateGetManySystemMechanismsDtoPipe } from './pipes/validate-get-many-system-mechanisms-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('system-mechanism')
@Controller('system-mechanism')
export class SystemMechanismController {
  private logger = getLoggerConfig(SystemMechanismController.name);

  constructor(
    private readonly systemMechanismKafkaService: SystemMechanismKafkaService,
  ) {
    this.logger.debug(
      `${SystemMechanismController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_GET_SYSTEM_MECHANISM_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<SystemMechanismDto> })
  @ApiBody({ type: GetSystemMechanismDto })
  async getSystemMechanismEntity(
    @Body(new ValidateGetSystemMechanismDtoPipe())
    getSystemMechanismDto: GetSystemMechanismDto,
  ): Promise<ResponseDTO<SystemMechanismDto>> {
    const traceId = generateTraceId('getSystemMechanismEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getSystemMechanismEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.systemMechanismKafkaService.getSystemMechanismEntity(
        getSystemMechanismDto,
        traceId,
      ),
      'A system-mechanism has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_SYSTEM_MECHANISM_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<SystemMechanismDto[]> })
  @ApiBody({ type: GetHistoryOfSystemMechanismDto })
  async getHistorySystemMechanismEntity(
    // TODO: body validation is missing
    @Body() getHistoryOfSystemMechanismDto: GetHistoryOfSystemMechanismDto,
  ): Promise<ResponseDTO<SystemMechanismDto[]>> {
    const traceId = generateTraceId('getHistorySystemMechanismEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistorySystemMechanismEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.systemMechanismKafkaService.getHistorySystemMechanismEntity(
        getHistoryOfSystemMechanismDto,
        traceId,
      ),
      'The history of the system-mechanism has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_MANY_SYSTEM_MECHANISMS_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<SystemMechanismDto[]> })
  @ApiBody({ type: GetManySystemMechanismDto })
  async getManySystemMechanisms(
    @Body(new ValidateGetManySystemMechanismsDtoPipe())
    getManySystemMechanismDto: GetManySystemMechanismDto,
  ): Promise<ResponseDTO<SystemMechanismDto[]>> {
    const traceId = generateTraceId('getManySystemMechanisms');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getManySystemMechanisms',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.systemMechanismKafkaService.getManySystemMechanisms(
        getManySystemMechanismDto,
        traceId,
      ),
      'A list of non-deleted system mechanisms has been successfully retrieved',
      traceId,
    );
  }
}
