import { Body, Controller, Get, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { DevelopmentLogKafkaService } from './microservices/vy-development-log-kafka.service';
import {
  CreateGrowthMeasurementDto,
  GetGrowthMeasurementsDto,
  CreateMilestoneDto,
  GetMilestonesDto,
  CreateTeethingEventDto,
  GetTeethingEventsDto,
  CreateDevelopmentMomentDto,
  GetDevelopmentMomentsDto,
} from 'ez-utils';
import { ValidateCreateGrowthMeasurementDtoPipe } from './pipes/validate-create-growth-measurement-dto.pipe';
import { ValidateCreateMilestoneDtoPipe } from './pipes/validate-create-milestone-dto.pipe';
import { ValidateCreateTeethingEventDtoPipe } from './pipes/validate-create-teething-event-dto.pipe';
import { ValidateCreateDevelopmentMomentDtoPipe } from './pipes/validate-create-development-moment-dto.pipe';
import { generateTraceId } from 'ez-utils';

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

  @Post('growth')
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

  @Get('growth')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getGrowth(@Query() query: GetGrowthMeasurementsDto): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getGrowth');
    this.logger.info('traceId generated successfully', traceId, 'getGrowth', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getGrowth(query, traceId),
      'Growth measurements retrieved',
      traceId,
    );
  }

  @Post('milestones')
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

  @Get('milestones')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getMilestones(@Query() query: GetMilestonesDto): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getMilestones');
    this.logger.info('traceId generated successfully', traceId, 'getMilestones', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getMilestones(query, traceId),
      'Milestones retrieved',
      traceId,
    );
  }

  @Post('teething')
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

  @Get('teething')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getTeethingEvents(@Query() query: GetTeethingEventsDto): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getTeethingEvents');
    this.logger.info('traceId generated successfully', traceId, 'getTeethingEvents', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getTeethingEvents(query, traceId),
      'Teething events retrieved',
      traceId,
    );
  }

  @Post('moments')
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

  @Get('moments')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getMoments(@Query() query: GetDevelopmentMomentsDto): Promise<ResponseDTO<any>> {
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
