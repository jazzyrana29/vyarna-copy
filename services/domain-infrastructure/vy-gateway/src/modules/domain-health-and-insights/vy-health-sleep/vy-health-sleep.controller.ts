import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
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
  SleepInterruptionReasonDto,
  SleepEnvironmentDto,
  SleepRatingDto,
  SleepScheduleDto,
  SleepNotificationDto,
  SleepPatternSummaryDto,
  SleepSummaryDto,
  GetSleepEventsDto,
  GetSleepInterruptionReasonsDto,
  GetSleepEnvironmentsDto,
  GetSleepRatingsDto,
  GetSleepSchedulesDto,
  GetSleepNotificationsDto,
  GetSleepPatternSummariesDto,
  GetSleepSummaryDto,
  generateTraceId,
  KT_CREATE_SLEEP_SESSION,
  KT_GET_SLEEP_SESSIONS,
  KT_GET_ZTRACKING_SLEEP_SESSION,
  KT_SLEEP_EVENT_LOGGED,
  KT_SLEEP_INTERRUPTED,
  KT_SLEEP_ENVIRONMENT_RECORDED,
  KT_SLEEP_RATED,
  KT_SLEEP_SESSION_ENDED,
  KT_GET_SLEEP_EVENTS,
  KT_GET_SLEEP_INTERRUPTION_REASONS,
  KT_GET_SLEEP_ENVIRONMENTS,
  KT_GET_SLEEP_RATINGS,
  KT_CREATE_SLEEP_SCHEDULE,
  KT_GET_SLEEP_SCHEDULES,
  KT_CREATE_SLEEP_NOTIFICATION,
  KT_GET_SLEEP_NOTIFICATIONS,
  KT_GET_SLEEP_PATTERN_SUMMARIES,
  KT_GET_SLEEP_SUMMARY,
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
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createSleepSession(
        createSleepSessionDto,
        traceId,
      ),
      'Sleep session created',
      traceId,
    );
  }

  @Get('sessions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getSessions(
    @Query('babyId') babyId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSessions');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getSessions',
      LogStreamLevel.ProdStandard,
    );
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
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getZtrackingSession',
      LogStreamLevel.ProdStandard,
    );
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
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logEvent',
      LogStreamLevel.ProdStandard,
    );
    const dto: SleepEventDto = { ...sleepEventDto, sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logSleepEvent(dto, traceId),
      'Sleep event logged',
      traceId,
    );
  }

  @Post('sessions/:sessionId/interruptions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepInterruptionReasonDto })
  async logInterruption(
    @Param('sessionId') sessionId: string,
    @Body() interruptionDto: SleepInterruptionReasonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepInterruption');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logInterruption',
      LogStreamLevel.ProdStandard,
    );
    const dto: SleepInterruptionReasonDto = {
      ...interruptionDto,
      sessionId,
    } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logSleepInterruption(dto, traceId),
      'Sleep interruption logged',
      traceId,
    );
  }

  @Post('sessions/:sessionId/environment')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepEnvironmentDto })
  async logEnvironment(
    @Param('sessionId') sessionId: string,
    @Body() envDto: SleepEnvironmentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepEnvironment');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logEnvironment',
      LogStreamLevel.ProdStandard,
    );
    const dto: SleepEnvironmentDto = { ...envDto, sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logSleepEnvironment(dto, traceId),
      'Sleep environment recorded',
      traceId,
    );
  }

  @Post('sessions/:sessionId/ratings')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepRatingDto })
  async rateSleep(
    @Param('sessionId') sessionId: string,
    @Body() ratingDto: SleepRatingDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepRating');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'rateSleep',
      LogStreamLevel.ProdStandard,
    );
    const dto: SleepRatingDto = { ...ratingDto, sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logSleepRating(dto, traceId),
      'Sleep rated',
      traceId,
    );
  }

  @Post('sessions/:sessionId/end')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async endSession(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('endSleepSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'endSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.endSleepSession(sessionId, traceId),
      'Sleep session ended',
      traceId,
    );
  }

  @Get('sessions/:sessionId/events')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getEvents(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepEvents');
    const dto: GetSleepEventsDto = { sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepEvents(dto, traceId),
      'Sleep events retrieved',
      traceId,
    );
  }

  @Get('sessions/:sessionId/interruptions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getInterruptions(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepInterruptions');
    const dto: GetSleepInterruptionReasonsDto = { sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepInterruptionReasons(dto, traceId),
      'Sleep interruptions retrieved',
      traceId,
    );
  }

  @Get('sessions/:sessionId/environment')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getEnvironments(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepEnvironments');
    const dto: GetSleepEnvironmentsDto = { sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepEnvironments(dto, traceId),
      'Sleep environments retrieved',
      traceId,
    );
  }

  @Get('sessions/:sessionId/ratings')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getRatings(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepRatings');
    const dto: GetSleepRatingsDto = { sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepRatings(dto, traceId),
      'Sleep ratings retrieved',
      traceId,
    );
  }

  @Get('sessions/:sessionId/summary')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getSummary(
    @Param('sessionId') sessionId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSummary');
    const dto: GetSleepSummaryDto = { sessionId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepSummary(dto, traceId),
      'Sleep summary retrieved',
      traceId,
    );
  }

  @Get('schedules')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getSchedules(
    @Query('babyId') babyId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSchedules');
    const dto: GetSleepSchedulesDto = { babyId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepSchedules(dto, traceId),
      'Sleep schedules retrieved',
      traceId,
    );
  }

  @Post('schedules')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepScheduleDto })
  async createSchedule(
    @Body() dto: SleepScheduleDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSleepSchedule');
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createSleepSchedule(dto, traceId),
      'Sleep schedule created',
      traceId,
    );
  }

  @Get('notifications')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getNotifications(
    @Query('babyId') babyId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepNotifications');
    const dto: GetSleepNotificationsDto = { babyId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepNotifications(dto, traceId),
      'Sleep notifications retrieved',
      traceId,
    );
  }

  @Post('notifications')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepNotificationDto })
  async createNotification(
    @Body() dto: SleepNotificationDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSleepNotification');
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createSleepNotification(dto, traceId),
      'Sleep notification created',
      traceId,
    );
  }

  @Get('patterns')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getPatterns(
    @Query('babyId') babyId: string,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepPatterns');
    const dto: GetSleepPatternSummariesDto = { babyId } as any;
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSleepPatternSummaries(dto, traceId),
      'Sleep patterns retrieved',
      traceId,
    );
  }
}
