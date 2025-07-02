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

import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';

import {
  GetHistoryOfMechanismPermitDto,
  GetMechanismPermitDto,
  GetMechanismPermitForSystemMechanismDto,
  KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY,
  KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM,
  KT_GET_MECHANISM_PERMIT_ENTITY,
  MechanismPermitDto,
  generateTraceId,
} from 'ez-utils';

import { MechanismPermitKafkaService } from './microservices/mechanism-permit-kafka.service';

import { ValidateGetMechanismPermitDtoPipe } from './pipes/validate-get-mechanism-permit-dto.pipe';
import { ValidateGetMechanismPermitForSystemMechanismDtoPipe } from './pipes/validate-get-mechanism-permit-for-system-mechanism-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('mechanism-permit')
@Controller('mechanism-permit')
export class MechanismPermitController {
  private logger = getLoggerConfig(MechanismPermitController.name);

  constructor(
    private readonly mechanismPermitsKafkaService: MechanismPermitKafkaService,
  ) {
    this.logger.debug(
      `${MechanismPermitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_GET_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<MechanismPermitDto[]> })
  @ApiBody({ type: GetMechanismPermitDto })
  async getMechanismPermitEntity(
    @Body(new ValidateGetMechanismPermitDtoPipe())
    getMechanismPermitDto: GetMechanismPermitDto,
  ): Promise<ResponseDTO<MechanismPermitDto[]>> {
    const traceId = generateTraceId('getMechanismPermitEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.mechanismPermitsKafkaService.getMechanismPermitEntity(
        getMechanismPermitDto,
        traceId,
      ),
      'A mechanism-permit entity has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_MECHANISM_PERMIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<MechanismPermitDto[]> })
  @ApiBody({ type: GetHistoryOfMechanismPermitDto })
  async getHistoryMechanismPermitEntity(
    // TODO: add body validator here
    @Body() getHistoryOfMechanismPermitDto: GetHistoryOfMechanismPermitDto,
  ): Promise<ResponseDTO<MechanismPermitDto[]>> {
    const traceId = generateTraceId('getHistoryMechanismPermitEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryMechanismPermitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.mechanismPermitsKafkaService.getHistoryMechanismPermitEntity(
        getHistoryOfMechanismPermitDto,
        traceId,
      ),
      'A mechanism-permit entity history has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_MECHANISM_PERMITS_FOR_SYSTEM_MECHANISM)
  @ApiCreatedResponse({ type: ResponseDTO<MechanismPermitDto[]> })
  @ApiBody({ type: GetMechanismPermitForSystemMechanismDto })
  async getMechanismPermitsForSystem(
    @Body(new ValidateGetMechanismPermitForSystemMechanismDtoPipe())
    getMechanismPermitForSystemMechanismDto: GetMechanismPermitForSystemMechanismDto,
  ): Promise<ResponseDTO<MechanismPermitDto[]>> {
    const traceId = generateTraceId('getMechanismPermitsForSystem');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getMechanismPermitsForSystem',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.mechanismPermitsKafkaService.getMechanismPermitsForOneSystemMechanism(
        getMechanismPermitForSystemMechanismDto,
        traceId,
      ),
      'Mechanism permits have been successfully retrieved',
      traceId,
    );
  }
}
