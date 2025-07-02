import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { ResponseDTO } from '../../../dto/response.dto';

import {
  BusinessUnitDto,
  CreateBusinessUnitDto,
  generateTraceId,
  GetBusinessUnitDto,
  GetHistoryOfBusinessUnitsDto,
  GetManyBusinessUnitsDto,
  KT_CREATE_BUSINESS_UNIT_ENTITY,
  KT_GET_BUSINESS_UNIT_ENTITY,
  KT_GET_HISTORY_BUSINESS_UNIT_ENTITY,
  KT_GET_MANY_BUSINESS_UNITS,
  KT_UPDATE_BUSINESS_UNIT_ENTITY,
  UpdateBusinessUnitDto,
  ZtrackingBusinessUnitDto,
} from 'ez-utils';

import { BusinessUnitKafkaService } from './microservices/business-unit-kafka.service';

import { ValidateCreateBusinessUnitDtoPipe } from './pipes/validate-create-business-unit-dto.pipe';
import { ValidateGetBusinessUnitDtoPipe } from './pipes/validate-get-business-unit-dto.pipe';
import { ValidateGetManyBusinessUnitsDtoPipe } from './pipes/validate-get-many-business-units-dto.pipe';
import { ValidateUpdateBusinessUnitDtoPipe } from './pipes/validate-update-business-unit-dto.pipe';
import { ValidateGetBusinessUnitHistoryDtoPipe } from './pipes/validate-get-business-unit-history-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('business-unit')
@Controller('business-unit')
export class BusinessUnitController {
  private logger = getLoggerConfig(BusinessUnitController.name);

  constructor(
    private readonly businessUnitKakfaService: BusinessUnitKafkaService,
  ) {
    this.logger.debug(
      `${BusinessUnitController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_BUSINESS_UNIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<BusinessUnitDto> })
  @ApiBody({ type: CreateBusinessUnitDto })
  async createBusinessUnitEntity(
    @Body(new ValidateCreateBusinessUnitDtoPipe())
    createBusinessUnitDto: CreateBusinessUnitDto,
  ): Promise<ResponseDTO<BusinessUnitDto>> {
    const traceId = generateTraceId('createBusinessUnitEntity');
    this.logger.info(
      `traceId generated successfully for body ${JSON.stringify(createBusinessUnitDto)}`,
      traceId,
      'createBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.businessUnitKakfaService.createBusinessUnitEntity(
        createBusinessUnitDto,
        traceId,
      ),
      'A business-unit has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_BUSINESS_UNIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<BusinessUnitDto> })
  @ApiBody({ type: UpdateBusinessUnitDto })
  async updateBusinessUnitEntity(
    @Body(new ValidateUpdateBusinessUnitDtoPipe())
    updateBusinessUnitDto: UpdateBusinessUnitDto,
  ): Promise<ResponseDTO<BusinessUnitDto>> {
    const traceId = generateTraceId('updateBusinessUnitEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updateBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.businessUnitKakfaService.updateBusinessUnitEntity(
        updateBusinessUnitDto,
        traceId,
      ),
      'A business-unit has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_BUSINESS_UNIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<BusinessUnitDto> })
  @ApiBody({ type: GetBusinessUnitDto })
  async getBusinessUnitEntity(
    @Body(new ValidateGetBusinessUnitDtoPipe())
    getBusinessUnitDto: GetBusinessUnitDto,
  ): Promise<ResponseDTO<BusinessUnitDto>> {
    const traceId = generateTraceId('getBusinessUnitEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.businessUnitKakfaService.getBusinessUnitEntity(
        getBusinessUnitDto,
        traceId,
      ),
      'A business-unit has been successfully fetched',
      traceId,
    );
  }

  @Post(KT_GET_MANY_BUSINESS_UNITS)
  @ApiCreatedResponse({ type: ResponseDTO<BusinessUnitDto[]> })
  @ApiBody({ type: GetManyBusinessUnitsDto })
  async getManyBusinessUnits(
    @Body(new ValidateGetManyBusinessUnitsDtoPipe())
    getManyBusinessUnitsDto: GetManyBusinessUnitsDto,
  ): Promise<ResponseDTO<BusinessUnitDto[]>> {
    const traceId = generateTraceId('getManyBusinessUnits');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getManyBusinessUnits',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.businessUnitKakfaService.getManyBusinessUnits(
        getManyBusinessUnitsDto,
        traceId,
      ),
      'Business units has been fetch successfully',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_BUSINESS_UNIT_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<ZtrackingBusinessUnitDto[]> })
  @ApiBody({ type: GetHistoryOfBusinessUnitsDto })
  async getHistoryBusinessUnitEntity(
    @Body(new ValidateGetBusinessUnitHistoryDtoPipe())
    getHistoryOfBusinessUnitDto: GetHistoryOfBusinessUnitsDto,
  ): Promise<ResponseDTO<ZtrackingBusinessUnitDto[]>> {
    const traceId = generateTraceId('getHistoryBusinessUnitEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryBusinessUnitEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.businessUnitKakfaService.getHistoryBusinessUnitEntity(
        getHistoryOfBusinessUnitDto,
        traceId,
      ),
      'Business unit history retrieved successfully',
      traceId,
    );
  }
}
