import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { ResponseDTO } from '../../../dto/response.dto';

import {
  generateTraceId,
  DeviceSessionDto,
  CreateDeviceSessionDto,
  UpdateDeviceSessionDto,
  GetDeviceSessionDto,
  GetDeviceSessionHistoryDto,
  StartDeviceSessionDto,
  CloseDeviceSessionDto,
  ZtrackingDeviceSessionDto,
  KT_CREATE_DEVICE_SESSION_ENTITY,
  KT_UPDATE_DEVICE_SESSION_ENTITY,
  KT_GET_DEVICE_SESSION_ENTITY,
  KT_GET_HISTORY_DEVICE_SESSION_ENTITY,
  KT_START_DEVICE_SESSION_ENTITY,
  KT_CLOSE_DEVICE_SESSION_ENTITY,
} from 'ez-utils';

import { DeviceSessionKafkaService } from './microservices/device-session-kafka.service';

import { ValidateCreateDeviceSessionDtoPipe } from './pipes/validate-create-device-session-dto.pipe';
import { GetDeviceSessionValidation } from './pipes/validate-get-device-session-dto.pipe';
import { ValidateGetDeviceSessionHistoryDtoPipe } from './pipes/validate-get-device-session-history-dto.pipe';
import { ValidateStartDeviceSessionDtoPipe } from './pipes/validate-start-device-session-dto.pipe';
import { ValidateCloseDeviceSessionDtoPipe } from './pipes/validate-close-device-session-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('device-session')
@Controller('device-session')
export class DeviceSessionController {
  private logger = getLoggerConfig(DeviceSessionController.name);

  constructor(
    private readonly deviceSessionKafkaService: DeviceSessionKafkaService,
  ) {
    this.logger.debug(
      `${DeviceSessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_DEVICE_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<DeviceSessionDto>,
  })
  @ApiBody({
    type: CreateDeviceSessionDto,
  })
  async createDeviceSessionEntity(
    @Body(new ValidateCreateDeviceSessionDtoPipe())
    createDto: CreateDeviceSessionDto,
  ): Promise<ResponseDTO<DeviceSessionDto>> {
    const traceId = generateTraceId('createDeviceSessionEntity');
    this.logger.info(
      `traceId generated successfully for body ${JSON.stringify(createDto)}`,
      traceId,
      'createDeviceSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.deviceSessionKafkaService.createDeviceSessionEntityViaKafka(
        createDto,
        traceId,
      ),
      'A device-session has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_DEVICE_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<DeviceSessionDto>,
  })
  @ApiBody({
    type: UpdateDeviceSessionDto,
  })
  async updateDeviceSessionEntity(
    @Body() updateDeviceSessionDto: UpdateDeviceSessionDto,
  ): Promise<ResponseDTO<DeviceSessionDto>> {
    const traceId = generateTraceId('updateDeviceSessionEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updateDeviceSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.deviceSessionKafkaService.updateDeviceSessionEntityViaKafka(
        updateDeviceSessionDto,
        traceId,
      ),
      'A device-session has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_DEVICE_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<DeviceSessionDto>,
  })
  @ApiBody({
    type: GetDeviceSessionDto,
  })
  async getDeviceSessionEntity(
    @Body(new GetDeviceSessionValidation())
    getDeviceSessionDto: GetDeviceSessionDto,
  ): Promise<ResponseDTO<DeviceSessionDto>> {
    const traceId = generateTraceId('getDeviceSessionEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getDeviceSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.deviceSessionKafkaService.getDeviceSessionEntityViaKafka(
        getDeviceSessionDto,
        traceId,
      ),
      'A device-session has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_DEVICE_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<ZtrackingDeviceSessionDto[]>,
  })
  @ApiBody({
    type: GetDeviceSessionHistoryDto,
  })
  async getDeviceSessionHistory(
    @Body(new ValidateGetDeviceSessionHistoryDtoPipe())
    getDeviceSessionHistoryDto: GetDeviceSessionHistoryDto,
  ): Promise<ResponseDTO<ZtrackingDeviceSessionDto[]>> {
    const traceId = generateTraceId('getDeviceSessionHistory');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getDeviceSessionHistory',
      LogStreamLevel.ProdStandard,
    );
    const deviceSessionHistory =
      await this.deviceSessionKafkaService.getDeviceSessionHistoryViaKafka(
        getDeviceSessionHistoryDto,
        traceId,
      );

    return new ResponseDTO(
      HttpStatus.OK,
      deviceSessionHistory,
      'Device session history retrieved successfully',
      traceId,
    );
  }

  @Post(KT_START_DEVICE_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<DeviceSessionDto>,
  })
  @ApiBody({
    type: StartDeviceSessionDto,
  })
  async startSession(
    @Body(new ValidateStartDeviceSessionDtoPipe())
    startDeviceSessionDto: StartDeviceSessionDto,
    @Req() req: Request,
  ): Promise<ResponseDTO<{ deviceSessionId: string }>> {
    const traceId = generateTraceId('startSession');

    this.logger.info(
      `Incoming request to start a device session`,
      traceId,
      'startSession',
      LogStreamLevel.ProdStandard,
    );

    const response = await this.deviceSessionKafkaService.startDeviceSession(
      startDeviceSessionDto,
      traceId,
    );

    this.logger.info(
      `Device session started successfully with session ID: ${response.deviceSessionId}`,
      traceId,
      'startSession',
      LogStreamLevel.ProdStandard,
    );

    return new ResponseDTO(
      HttpStatus.OK,
      response,
      'A device-session has been successfully started',
      traceId,
    );
  }

  @Post(KT_CLOSE_DEVICE_SESSION_ENTITY) // New endpoint for closing device session
  @ApiCreatedResponse({
    type: ResponseDTO<DeviceSessionDto>,
  })
  @ApiBody({
    type: CloseDeviceSessionDto,
  })
  async closeDeviceSession(
    @Body(new ValidateCloseDeviceSessionDtoPipe())
    closeDeviceSessionDto: CloseDeviceSessionDto,
    @Req() req: Request,
  ): Promise<ResponseDTO<{ deviceSessionId: string }>> {
    const traceId = generateTraceId('closeDeviceSession');

    this.logger.info(
      `Incoming request to close a device session`,
      traceId,
      'closeDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    const response =
      await this.deviceSessionKafkaService.closeDeviceSessionViaKafka(
        closeDeviceSessionDto,
        traceId,
      );

    this.logger.info(
      `Device session closed successfully with session ID: ${response.deviceSessionId}`,
      traceId,
      'closeDeviceSession',
      LogStreamLevel.ProdStandard,
    );

    return new ResponseDTO(
      HttpStatus.OK,
      response,
      'A device-session has been successfully closed',
      traceId,
    );
  }
}
