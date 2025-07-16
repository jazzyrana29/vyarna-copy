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
  DeleteSleepSessionDto,
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
  KT_LOG_SLEEP_EVENT,
  KT_INTERRUPT_SLEEP,
  KT_RECORD_SLEEP_ENVIRONMENT,
  KT_RATE_SLEEP,
  KT_END_SLEEP_SESSION,
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

  constructor(private readonly healthSleepKafkaService: HealthSleepKafkaService) {
    this.logger.debug(
      `${HealthSleepController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_SLEEP_SESSION)
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
      await this.healthSleepKafkaService.createSleepSession(
        createSleepSessionDto,
        traceId,
      ),
      'Sleep session created',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_SESSIONS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepSessionsDto })
  async getSessions(
    @Body() getSleepSessionsDto: GetSleepSessionsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSessions');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getSessions',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepSessions(getSleepSessionsDto, traceId),
      'Sleep sessions retrieved',
      traceId,
    );
  }

  @Post(KT_GET_ZTRACKING_SLEEP_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingSleepSessionDto })
  async getZtrackingSession(
    @Body() getZtrackingSleepSessionDto: GetZtrackingSleepSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getZtrackingSleepSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getZtrackingSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getZtrackingSleepSession(
        getZtrackingSleepSessionDto,
        traceId,
      ),
      'Ztracking sleep session retrieved',
      traceId,
    );
  }

  @Post(KT_LOG_SLEEP_EVENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepEventDto })
  async logEvent(
    @Body(new ValidateSleepEventDtoPipe()) sleepEventDto: SleepEventDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepEvent');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logEvent',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.logSleepEvent(sleepEventDto, traceId),
      'Sleep event logged',
      traceId,
    );
  }

  @Post(KT_INTERRUPT_SLEEP)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepInterruptionReasonDto })
  async logInterruption(
    @Body() sleepInterruptionReasonDto: SleepInterruptionReasonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepInterruption');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logInterruption',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.logSleepInterruption(
        sleepInterruptionReasonDto,
        traceId,
      ),
      'Sleep interruption logged',
      traceId,
    );
  }

  @Post(KT_RECORD_SLEEP_ENVIRONMENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepEnvironmentDto })
  async logEnvironment(
    @Body() sleepEnvironmentDto: SleepEnvironmentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepEnvironment');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logEnvironment',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.logSleepEnvironment(
        sleepEnvironmentDto,
        traceId,
      ),
      'Sleep environment recorded',
      traceId,
    );
  }

  @Post(KT_RATE_SLEEP)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepRatingDto })
  async rateSleep(
    @Body() sleepRatingDto: SleepRatingDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logSleepRating');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'rateSleep',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.logSleepRating(sleepRatingDto, traceId),
      'Sleep rated',
      traceId,
    );
  }

  @Post(KT_END_SLEEP_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: DeleteSleepSessionDto })
  async endSession(
    @Body() deleteSleepSessionDto: DeleteSleepSessionDto,
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
      await this.healthSleepKafkaService.endSleepSession(
        deleteSleepSessionDto.sessionId,
        traceId,
      ),
      'Sleep session ended',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_EVENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepEventsDto })
  async getEvents(
    @Body() getSleepEventsDto: GetSleepEventsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepEvents');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepEvents(getSleepEventsDto, traceId),
      'Sleep events retrieved',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_INTERRUPTION_REASONS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepInterruptionReasonsDto })
  async getInterruptions(
    @Body() getSleepInterruptionReasonsDto: GetSleepInterruptionReasonsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepInterruptions');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepInterruptionReasons(
        getSleepInterruptionReasonsDto,
        traceId,
      ),
      'Sleep interruptions retrieved',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_ENVIRONMENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepEnvironmentsDto })
  async getEnvironments(
    @Body() getSleepEnvironmentsDto: GetSleepEnvironmentsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepEnvironments');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepEnvironments(
        getSleepEnvironmentsDto,
        traceId,
      ),
      'Sleep environments retrieved',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_RATINGS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepRatingsDto })
  async getRatings(
    @Body() getSleepRatingsDto: GetSleepRatingsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepRatings');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepRatings(getSleepRatingsDto, traceId),
      'Sleep ratings retrieved',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_SUMMARY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepSummaryDto })
  async getSummary(
    @Body() getSleepSummaryDto: GetSleepSummaryDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSummary');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepSummary(getSleepSummaryDto, traceId),
      'Sleep summary retrieved',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_SCHEDULES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepSchedulesDto })
  async getSchedules(
    @Body() getSleepSchedulesDto: GetSleepSchedulesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepSchedules');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepSchedules(
        getSleepSchedulesDto,
        traceId,
      ),
      'Sleep schedules retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_SLEEP_SCHEDULE)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepScheduleDto })
  async createSchedule(
    @Body() sleepScheduleDto: SleepScheduleDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSleepSchedule');
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.healthSleepKafkaService.createSleepSchedule(sleepScheduleDto, traceId),
      'Sleep schedule created',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_NOTIFICATIONS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepNotificationsDto })
  async getNotifications(
    @Body() getSleepNotificationsDto: GetSleepNotificationsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepNotifications');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepNotifications(
        getSleepNotificationsDto,
        traceId,
      ),
      'Sleep notifications retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_SLEEP_NOTIFICATION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: SleepNotificationDto })
  async createNotification(
    @Body() sleepNotificationDto: SleepNotificationDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSleepNotification');
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.healthSleepKafkaService.createSleepNotification(
        sleepNotificationDto,
        traceId,
      ),
      'Sleep notification created',
      traceId,
    );
  }

  @Post(KT_GET_SLEEP_PATTERN_SUMMARIES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSleepPatternSummariesDto })
  async getPatterns(
    @Body() getSleepPatternSummariesDto: GetSleepPatternSummariesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSleepPatterns');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthSleepKafkaService.getSleepPatternSummaries(
        getSleepPatternSummariesDto,
        traceId,
      ),
      'Sleep patterns retrieved',
      traceId,
    );
  }
}
