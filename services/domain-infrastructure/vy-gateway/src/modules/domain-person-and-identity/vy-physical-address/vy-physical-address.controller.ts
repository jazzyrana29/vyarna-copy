import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { PersonPhysicalAddressKafkaService } from './microservices/vy-physical-address-kafka.service';
import {
  generateTraceId,
  CreatePhysicalAddressDto,
  UpdatePhysicalAddressDto,
  GetOnePersonDto,
  KT_CREATE_PHYSICAL_ADDRESS,
  KT_UPDATE_PHYSICAL_ADDRESS,
  KT_GET_PHYSICAL_ADDRESS,
} from 'ez-utils';
import { ValidateCreateAddressDtoPipe } from './pipes/validate-create-address-dto.pipe';
import { ValidateUpdateAddressDtoPipe } from './pipes/validate-update-address-dto.pipe';
import { ValidateGetAddressDtoPipe } from './pipes/validate-get-address-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-physical-address')
@Controller('vy-physical-address')
export class PersonPhysicalAddressController {
  private logger = getLoggerConfig(PersonPhysicalAddressController.name);

  constructor(
    private readonly addressKafkaService: PersonPhysicalAddressKafkaService,
  ) {
    this.logger.debug(
      `${PersonPhysicalAddressController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_PHYSICAL_ADDRESS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePhysicalAddressDto })
  async createAddress(
    @Body(new ValidateCreateAddressDtoPipe()) dto: CreatePhysicalAddressDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createAddress');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createAddress',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.addressKafkaService.createAddress(dto, traceId),
      'Address created',
      traceId,
    );
  }

  @Post(KT_UPDATE_PHYSICAL_ADDRESS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdatePhysicalAddressDto })
  async updateAddress(
    @Body(new ValidateUpdateAddressDtoPipe()) dto: UpdatePhysicalAddressDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updateAddress');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updateAddress',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.addressKafkaService.updateAddress(dto, traceId),
      'Address updated',
      traceId,
    );
  }

  @Post(KT_GET_PHYSICAL_ADDRESS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetOnePersonDto })
  async getAddress(
    @Body(new ValidateGetAddressDtoPipe()) dto: GetOnePersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getAddress');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getAddress',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.addressKafkaService.getAddress(dto, traceId),
      'Address retrieved',
      traceId,
    );
  }
}
