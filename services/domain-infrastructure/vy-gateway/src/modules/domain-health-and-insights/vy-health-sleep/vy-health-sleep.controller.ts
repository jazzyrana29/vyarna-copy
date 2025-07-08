import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { HealthSleepKafkaService } from './microservices/vy-health-sleep-kafka.service';
import {
  CreateSleepSessionDto,
  GetSleepSessionsDto,
  GetZtrackingSleepSessionDto,
  SleepEventDto,
  generateTraceId,
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
  KT_SLEEP_EVENT_LOGGED,
} from 'ez-utils';
import { ValidateCreateSleepSessionDtoPipe } from './pipes/validate-create-sleep-session-dto.pipe';
import { ValidateSleepEventDtoPipe } from './pipes/validate-sleep-event-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-health-sleep')
@Controller('sleep')
export class HealthSleepController {
  private logger = getLoggerConfig(HealthSleepController.name);

  constructor(private readonly kafkaService: HealthSleepKafkaService) {
    this.logger.debug(
      `${HealthSleepController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post('sessions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateSleepSessionDto })
  async createSession(
    @Body(new ValidateCreateSleepSessionDtoPipe())
    createSleepSessionDto: CreateSleepSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSleepSession');
    this.logger.info('traceId generated successfully', traceId, 'createSession', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createSleepSession(createSleepSessionDto, traceId),
      'Sleep session created',
      traceId,
    );
  }

  @Get('sessions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getSessions(@Query('babyId') babyId: string): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSessions');
    this.logger.info('traceId generated successfully', traceId, 'getSessions', LogStreamLevel.ProdStandard);
    const getSleepSessionsDto: GetSleepSessionsDto = { babyId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepSessions(getSleepSessionsDto, traceId),
      'Sleep sessions retrieved',
      traceId,
    );
  }

  @Get('sessions/:sessionId')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getZtrackingSession(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getZtrackingSleepSession');
    this.logger.info('traceId generated successfully', traceId, 'getZtrackingSession', LogStreamLevel.ProdStandard);
    const getZtrackingSleepSessionDto: GetZtrackingSleepSessionDto = {
      sessionId,
    } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getZtrackingSleepSession(
        getZtrackingSleepSessionDto,
        traceId,
      ),
      'Ztracking sleep session retrieved',
      traceId,
    );
  }

  @Post('sessions/:sessionId/events')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepEventDto })
  async logEvent(
    @Param('sessionId') sessionId: string,
    @Body(new ValidateSleepEventDtoPipe()) sleepEventDto: SleepEventDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepEvent');
    this.logger.info('traceId generated successfully', traceId, 'logEvent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logSleepEvent(sessionId, sleepEventDto, traceId),
      'Sleep event logged',
      traceId,
    );
  }
}
