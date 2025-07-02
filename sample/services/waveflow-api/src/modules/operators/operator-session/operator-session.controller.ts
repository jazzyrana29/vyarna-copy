import {
  Body,
  Controller,
  Get,
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
  CreateOperatorSessionDto,
  generateTraceId,
  GetHistoryOfOperatorSessionDto,
  GetOperatorSessionDto,
  KT_CREATE_OPERATOR_SESSION_ENTITY,
  KT_GET_HISTORY_OPERATOR_SESSION_ENTITY,
  KT_GET_OPERATOR_SESSION_ENTITY,
  KT_LOGIN_OPERATOR_SESSION_ENTITY,
  KT_LOGOUT_OPERATOR_SESSION_ENTITY,
  KT_SEARCH_OPERATOR_SESSIONS,
  KT_UPDATE_OPERATOR_SESSION_ENTITY,
  LoginOperatorSessionDto,
  LogoutOperatorSessionDto,
  OperatorSessionDto,
  SearchOperatorSessionsDto,
  UpdateOperatorSessionDto,
  ZtrackingOperatorSessionDto,
} from 'ez-utils';

import { OperatorSessionKafkaService } from './microservices/operator-session-kafka.service';

import { GetOperatorSessionValidation } from './pipes/validate-get-operator-session-dto.pipe';
import { ValidateLoginOperatorSessionDtoPipe } from './pipes/validate-login-operator-session-dto.pipe';
import { ValidateLogoutOperatorSessionDtoPipe } from './pipes/validate-logout-operator-session-dto.pipe';
import { ValidateSearchOperatorSessionsDtoPipe } from './pipes/validate-search-operator-sessions-dto.pipe';
import { ValidateCreateOperatorSessionDtoPipe } from './pipes/validate-create-operator-session-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('operator-session')
@Controller('operator-session')
export class OperatorSessionController {
  private logger = getLoggerConfig(OperatorSessionController.name);

  constructor(
    private readonly operatorSessionKafkaService: OperatorSessionKafkaService,
  ) {
    this.logger.debug(
      `${OperatorSessionController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorSessionDto> })
  @ApiBody({ type: CreateOperatorSessionDto })
  async createOperatorSessionEntity(
    @Body(new ValidateCreateOperatorSessionDtoPipe())
    createOperatorSessionDto: CreateOperatorSessionDto,
  ): Promise<ResponseDTO<OperatorSessionDto>> {
    const traceId = generateTraceId('createOperatorSessionEntity');
    this.logger.info(
      `traceId generated successfully for body ${JSON.stringify(createOperatorSessionDto)}`,
      traceId,
      'createOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.createOperatorSessionEntity(
        createOperatorSessionDto,
        traceId,
      ),
      'An operator-session has been successfully created',
      traceId,
    );
  }

  @Put(KT_UPDATE_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorSessionDto> })
  @ApiBody({ type: UpdateOperatorSessionDto })
  async updateOperatorSessionEntity(
    @Body() updateOperatorSessionDto: UpdateOperatorSessionDto,
  ): Promise<ResponseDTO<OperatorSessionDto>> {
    const traceId = generateTraceId('updateOperatorSessionEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updateOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.updateOperatorSessionEntity(
        updateOperatorSessionDto,
        traceId,
      ),
      'An operator-session has been successfully updated',
      traceId,
    );
  }

  @Post(KT_GET_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorSessionDto> })
  @ApiBody({ type: GetOperatorSessionDto })
  async getOperatorSessionEntity(
    @Body(new GetOperatorSessionValidation())
    getOperatorSessionDto: GetOperatorSessionDto,
  ): Promise<ResponseDTO<OperatorSessionDto>> {
    const traceId = generateTraceId('getOperatorSessionEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.getOperatorSessionEntity(
        getOperatorSessionDto,
        traceId,
      ),
      'An operator-session has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<ZtrackingOperatorSessionDto[]> })
  @ApiBody({ type: GetHistoryOfOperatorSessionDto })
  async getHistoryOperatorSessionEntity(
    @Body() getHistoryOfOperatorSessionDto: GetHistoryOfOperatorSessionDto,
  ): Promise<ResponseDTO<ZtrackingOperatorSessionDto[]>> {
    const traceId = generateTraceId('getHistoryOperatorSessionEntity');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryOperatorSessionEntity',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.getHistoryOperatorSessionEntity(
        getHistoryOfOperatorSessionDto,
        traceId,
      ),
      'Operator-session history has been successfully retrieved',
      traceId,
    );
  }

  @Post(KT_LOGIN_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({
    type: ResponseDTO<{
      barerToken: string;
      operatorSession: OperatorSessionDto;
    }>,
  })
  @ApiBody({ type: LoginOperatorSessionDto })
  async loginOperatorSession(
    @Body(new ValidateLoginOperatorSessionDtoPipe())
    loginDto: LoginOperatorSessionDto,
  ): Promise<
    ResponseDTO<{ barerToken: string; operatorSession: OperatorSessionDto }>
  > {
    const traceId = generateTraceId('loginOperatorSession');
    this.logger.info(
      `traceId generated successfully for login body ${JSON.stringify(loginDto)}`,
      traceId,
      'loginOperatorSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.loginOperatorSession(
        loginDto,
        traceId,
      ),
      'Operator has been successfully logged in',
      traceId,
    );
  }

  @Post(KT_LOGOUT_OPERATOR_SESSION_ENTITY)
  @ApiCreatedResponse({ type: OperatorSessionDto })
  @ApiBody({ type: LogoutOperatorSessionDto })
  async logoutOperatorSession(
    @Body(new ValidateLogoutOperatorSessionDtoPipe())
    logoutDto: LogoutOperatorSessionDto,
  ): Promise<ResponseDTO<OperatorSessionDto>> {
    const traceId = generateTraceId('logoutOperatorSession');
    this.logger.info(
      `traceId generated successfully for logout body ${JSON.stringify(logoutDto)}`,
      traceId,
      'logoutOperatorSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.logoutOperatorSession(
        logoutDto,
        traceId,
      ),
      'Operator has been successfully logged out',
      traceId,
    );
  }

  @Post(KT_SEARCH_OPERATOR_SESSIONS)
  @ApiCreatedResponse({ type: ResponseDTO<OperatorSessionDto[]> })
  @ApiBody({ type: SearchOperatorSessionsDto })
  async searchOperatorSessions(
    @Body(new ValidateSearchOperatorSessionsDtoPipe())
    searchDto: SearchOperatorSessionsDto,
  ): Promise<ResponseDTO<OperatorSessionDto[]>> {
    const traceId = generateTraceId('searchOperatorSessions');
    this.logger.info(
      `traceId generated successfully for search body ${JSON.stringify(searchDto)}`,
      traceId,
      'searchOperatorSessions',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.operatorSessionKafkaService.searchOperatorSessions(
        searchDto,
        traceId,
      ),
      'Operator sessions have been successfully searched',
      traceId,
    );
  }
}
