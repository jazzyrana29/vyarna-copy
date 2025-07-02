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
  CreateOperatorDto,
  generateTraceId,
  GetHistoryOfOperatorDto,
  GetManyOperatorsDto,
  GetOperatorDto,
  KT_CREATE_OPERATOR_ENTITY,
  KT_GET_HISTORY_OPERATOR_ENTITY,
  KT_GET_MANY_OPERATORS,
  KT_GET_OPERATOR_ENTITY,
  KT_UPDATE_OPERATOR_ENTITY,
  OperatorDto,
  UpdateOperatorDto,
  ZtrackingOperatorDto,
} from 'ez-utils';

import { OperatorKafkaService } from './microservices/operator-kakfa.service';

import { ValidateCreateOperatorDtoPipe } from './pipes/validate-create-operator-dto.pipe';
import { ValidateGetOperatorDtoPipe } from './pipes/validate-get-operator-dto.pipe';
import { ValidateGetManyOperatorsDtoPipe } from './pipes/validate-get-many-operators-dto.pipe';
import { ValidateUpdateOperatorDtoPipe } from './pipes/validate-update-operator-dto.pipe';
import { ValidateGetOperatorHistoryDtoPipe } from './pipes/validate-get-operator-history-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('operator')
@Controller('operator')
export class OperatorController {
  private logger = getLoggerConfig(OperatorController.name);

  constructor(private readonly operatorKakfaService: OperatorKafkaService) {
    this.logger.debug(
      `${OperatorController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_OPERATOR_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorDto> })
  @ApiBody({ type: CreateOperatorDto })
  async createOperatorEntity(
    @Body(new ValidateCreateOperatorDtoPipe())
    createOperatorDto: CreateOperatorDto,
  ): Promise<ResponseDTO<CreateOperatorDto>> {
    const traceId = generateTraceId('createOperatorEntity');
    this.logger.info(
      `traceId generated successfully`,
      traceId,
      'createOperatorEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.createOperatorEntity(
        createOperatorDto,
        traceId,
      ),
      'An Operator entity has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_OPERATOR_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorDto> })
  @ApiBody({ type: UpdateOperatorDto })
  async updateOperatorEntity(
    @Body(new ValidateUpdateOperatorDtoPipe())
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<ResponseDTO<OperatorDto>> {
    const traceId = generateTraceId('updateOperatorEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updateOperatorEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.updateOperatorEntity(
        updateOperatorDto,
        traceId,
      ),
      'The Operator Entity has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_OPERATOR_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorDto> })
  @ApiBody({ type: GetOperatorDto })
  async getOperatorEntity(
    @Body(new ValidateGetOperatorDtoPipe())
    getOperatorDto: GetOperatorDto,
  ): Promise<ResponseDTO<OperatorDto>> {
    const traceId = generateTraceId('getOperatorEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getOperatorEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.getOperatorEntity(
        getOperatorDto,
        traceId,
      ),
      'Operator Entity Found',
      traceId,
    );
  }

  @Post(KT_GET_MANY_OPERATORS)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorDto[]> })
  @ApiBody({ type: GetManyOperatorsDto })
  async getManyOperators(
    @Body(new ValidateGetManyOperatorsDtoPipe())
    getManyOperatorsDto: GetManyOperatorsDto,
  ): Promise<ResponseDTO<[OperatorDto]>> {
    const traceId = generateTraceId('getManyOperators');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getManyOperators',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.getManyOperators(
        getManyOperatorsDto,
        traceId,
      ),
      'Operators Extracted Successfully',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_OPERATOR_ENTITY)
  @ApiCreatedResponse({ type: ZtrackingOperatorDto })
  async getHistoryOfOperatorEntity(
    @Body(new ValidateGetOperatorHistoryDtoPipe())
    getHistoryOfOperatorEntityDto: GetHistoryOfOperatorDto,
  ): Promise<ResponseDTO<OperatorDto[]>> {
    const traceId = generateTraceId('getHistoryOfOperatorEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryOfOperatorEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorKakfaService.getHistoryOfOperatorEntity(
        getHistoryOfOperatorEntityDto,
        traceId,
      ),
      'History of Operator Id has been extracted',
      traceId,
    );
  }
}
