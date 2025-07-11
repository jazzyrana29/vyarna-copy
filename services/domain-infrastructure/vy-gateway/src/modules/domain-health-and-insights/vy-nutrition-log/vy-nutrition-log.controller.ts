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
import { NutritionLogKafkaService } from './microservices/vy-nutrition-log-kafka.service';
import {
  CreateNutritionSessionDto,
  GetOneNutritionSessionDto,
  KT_START_NUTRITION_SESSION,
  KT_LOG_NUTRITION_EVENT,
  KT_END_NUTRITION_SESSION,
  KT_GET_NUTRITION_SESSION,
} from 'ez-utils';
import { ValidateStartNutritionSessionDtoPipe } from './pipes/validate-start-nutrition-session-dto.pipe';
import { NutritionEventDto } from 'ez-utils';
import { ValidateNutritionEventDtoPipe } from './pipes/validate-nutrition-event-dto.pipe';
import { generateTraceId } from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-nutrition-log')
@Controller('nutrition')
export class NutritionLogController {
  private logger = getLoggerConfig(NutritionLogController.name);

  constructor(private readonly kafkaService: NutritionLogKafkaService) {
    this.logger.debug(
      `${NutritionLogController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_START_NUTRITION_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateNutritionSessionDto })
  async startSession(
    @Body(new ValidateStartNutritionSessionDtoPipe())
    createNutritionSessionDto: CreateNutritionSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('startNutritionSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'startSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.CREATED,
      await this.kafkaService.startSession(createNutritionSessionDto, traceId),
      'Nutrition session started',
      traceId,
    );
  }

  @Post(KT_LOG_NUTRITION_EVENT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: NutritionEventDto })
  async logEvent(
    @Body(new ValidateNutritionEventDtoPipe()) nutritionEventDto: NutritionEventDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('logNutritionEvent');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'logEvent',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.logEvent(nutritionEventDto, traceId),
      'Nutrition event logged',
      traceId,
    );
  }

  @Post(KT_END_NUTRITION_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetOneNutritionSessionDto })
  async endSession(
    @Body() getOneNutritionSessionDto: GetOneNutritionSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('endNutritionSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'endSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.endSession(getOneNutritionSessionDto, traceId),
      'Nutrition session ended',
      traceId,
    );
  }

  @Post(KT_GET_NUTRITION_SESSION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetOneNutritionSessionDto })
  async getSession(
    @Body() getOneNutritionSessionDto: GetOneNutritionSessionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getNutritionSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSession(getOneNutritionSessionDto, traceId),
      'Nutrition session retrieved',
      traceId,
    );
  }
}
