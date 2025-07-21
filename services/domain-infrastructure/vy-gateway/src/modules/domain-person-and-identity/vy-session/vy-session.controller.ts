import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { PersonSessionKafkaService } from './microservices/vy-session-kafka.service';
import {
  generateTraceId,
  KT_CREATE_SESSION,
  KT_UPDATE_SESSION,
  KT_GET_SESSION,
  KT_DELETE_SESSION,
  KT_LOGIN_SESSION,
  CreateSessionDto,
  UpdateSessionDto,
  GetOneSessionDto,
  DeleteSessionDto,
  LoginSessionDto,
  LoginSessionResponseDto,
} from 'ez-utils';
import { ValidateCreateSessionDtoPipe } from './pipes/validate-create-session-dto.pipe';
import { ValidateUpdateSessionDtoPipe } from './pipes/validate-update-session-dto.pipe';
import { ValidateGetSessionDtoPipe } from './pipes/validate-get-session-dto.pipe';
import { ValidateDeleteSessionDtoPipe } from './pipes/validate-delete-session-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-session')
@Controller('vy-session')
export class PersonSessionController {
  private logger = getLoggerConfig(PersonSessionController.name);

  constructor(private readonly sessionKafkaService: PersonSessionKafkaService) {
    this.logger.debug(
      `${PersonSessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateSessionDto })
  async createSession(
    @Body(new ValidateCreateSessionDtoPipe()) dto: CreateSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSession');
    this.logger.info('traceId generated successfully', traceId, 'createSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.sessionKafkaService.createSession(dto, traceId),
      'Session created',
      traceId,
    );
  }

  @Post(KT_UPDATE_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdateSessionDto })
  async updateSession(
    @Body(new ValidateUpdateSessionDtoPipe()) dto: UpdateSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updateSession');
    this.logger.info('traceId generated successfully', traceId, 'updateSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.sessionKafkaService.updateSession(dto, traceId),
      'Session updated',
      traceId,
    );
  }

  @Post(KT_GET_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetOneSessionDto })
  async getSession(
    @Body(new ValidateGetSessionDtoPipe()) dto: GetOneSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSession');
    this.logger.info('traceId generated successfully', traceId, 'getSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.sessionKafkaService.getSession(dto, traceId),
      'Session retrieved',
      traceId,
    );
  }

  @Post(KT_DELETE_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: DeleteSessionDto })
  async deleteSession(
    @Body(new ValidateDeleteSessionDtoPipe()) dto: DeleteSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('deleteSession');
    this.logger.info('traceId generated successfully', traceId, 'deleteSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.sessionKafkaService.deleteSession(dto, traceId),
      'Session deleted',
      traceId,
    );
  }

  @Post(KT_LOGIN_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<LoginSessionResponseDto> })
  @ApiBody({ type: LoginSessionDto })
  async loginSession(
    @Body() dto: LoginSessionDto,
  ): Promise<ResponseDTO<LoginSessionResponseDto>> {
    const traceId = generateTraceId('loginSession');
    this.logger.info('traceId generated successfully', traceId, 'loginSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.sessionKafkaService.loginSession(dto, traceId),
      'Session login',
      traceId,
    );
  }
}
