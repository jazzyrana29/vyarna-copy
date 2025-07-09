import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { DevelopmentLogKafkaService } from './microservices/vy-development-log-kafka.service';
import {
  generateTraceId,
  CreateGrowthMeasurementDto,
  GetGrowthMeasurementsDto,
  CreateMilestoneDto,
  GetMilestonesDto,
  CreateTeethingEventDto,
  GetTeethingEventsDto,
  CreateDevelopmentMomentDto,
  GetDevelopmentMomentsDto,
  KT_CREATE_GROWTH_MEASUREMENT,
  KT_GET_GROWTH_MEASUREMENTS,
  KT_CREATE_MILESTONE,
  KT_GET_MILESTONES,
  KT_CREATE_TEETHING_EVENT,
  KT_GET_TEETHING_EVENTS,
  KT_CREATE_DEVELOPMENT_MOMENT,
  KT_GET_DEVELOPMENT_MOMENTS,
} from 'ez-utils';
import { ValidateCreateGrowthMeasurementDtoPipe } from './pipes/validate-create-growth-measurement-dto.pipe';
import { ValidateCreateMilestoneDtoPipe } from './pipes/validate-create-milestone-dto.pipe';
import { ValidateCreateTeethingEventDtoPipe } from './pipes/validate-create-teething-event-dto.pipe';
import { ValidateCreateDevelopmentMomentDtoPipe } from './pipes/validate-create-development-moment-dto.pipe';
import { ValidateGetGrowthMeasurementsDtoPipe } from './pipes/validate-get-growth-measurements-dto.pipe';
import { ValidateGetMilestonesDtoPipe } from './pipes/validate-get-milestones-dto.pipe';
import { ValidateGetTeethingEventsDtoPipe } from './pipes/validate-get-teething-events-dto.pipe';
import { ValidateGetDevelopmentMomentsDtoPipe } from './pipes/validate-get-development-moments-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-development-log')
@Controller('development')
export class DevelopmentLogController {
  private logger = getLoggerConfig(DevelopmentLogController.name);

  constructor(private readonly kafkaService: DevelopmentLogKafkaService) {
    this.logger.debug(
      `${DevelopmentLogController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_GROWTH_MEASUREMENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateGrowthMeasurementDto })
  async createGrowth(
    @Body(new ValidateCreateGrowthMeasurementDtoPipe())
    createGrowthMeasurementDto: CreateGrowthMeasurementDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createGrowth');
    this.logger.info('traceId generated successfully', traceId, 'createGrowth', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createGrowth(createGrowthMeasurementDto, traceId),
      'Growth measurement logged',
      traceId,
    );
  }

  @Post(KT_GET_GROWTH_MEASUREMENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetGrowthMeasurementsDto })
  async getGrowth(
    @Body(new ValidateGetGrowthMeasurementsDtoPipe())
    query: GetGrowthMeasurementsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getGrowth');
    this.logger.info('traceId generated successfully', traceId, 'getGrowth', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getGrowth(query, traceId),
      'Growth measurements retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_MILESTONE)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateMilestoneDto })
  async createMilestone(
    @Body(new ValidateCreateMilestoneDtoPipe()) createMilestoneDto: CreateMilestoneDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createMilestone');
    this.logger.info('traceId generated successfully', traceId, 'createMilestone', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createMilestone(createMilestoneDto, traceId),
      'Milestone logged',
      traceId,
    );
  }

  @Post(KT_GET_MILESTONES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetMilestonesDto })
  async getMilestones(
    @Body(new ValidateGetMilestonesDtoPipe()) query: GetMilestonesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getMilestones');
    this.logger.info('traceId generated successfully', traceId, 'getMilestones', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getMilestones(query, traceId),
      'Milestones retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_TEETHING_EVENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateTeethingEventDto })
  async createTeethingEvent(
    @Body(new ValidateCreateTeethingEventDtoPipe())
    createTeethingEventDto: CreateTeethingEventDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createTeethingEvent');
    this.logger.info('traceId generated successfully', traceId, 'createTeethingEvent', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createTeethingEvent(createTeethingEventDto, traceId),
      'Teething event logged',
      traceId,
    );
  }

  @Post(KT_GET_TEETHING_EVENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetTeethingEventsDto })
  async getTeethingEvents(
    @Body(new ValidateGetTeethingEventsDtoPipe()) query: GetTeethingEventsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getTeethingEvents');
    this.logger.info('traceId generated successfully', traceId, 'getTeethingEvents', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getTeethingEvents(query, traceId),
      'Teething events retrieved',
      traceId,
    );
  }

  @Post(KT_CREATE_DEVELOPMENT_MOMENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateDevelopmentMomentDto })
  async createMoment(
    @Body(new ValidateCreateDevelopmentMomentDtoPipe())
    createDevelopmentMomentDto: CreateDevelopmentMomentDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createMoment');
    this.logger.info('traceId generated successfully', traceId, 'createMoment', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.createDevelopmentMoment(createDevelopmentMomentDto, traceId),
      'Development moment logged',
      traceId,
    );
  }

  @Post(KT_GET_DEVELOPMENT_MOMENTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetDevelopmentMomentsDto })
  async getMoments(
    @Body(new ValidateGetDevelopmentMomentsDtoPipe()) query: GetDevelopmentMomentsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getMoments');
    this.logger.info('traceId generated successfully', traceId, 'getMoments', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getDevelopmentMoments(query, traceId),
      'Development moments retrieved',
      traceId,
    );
  }
}
