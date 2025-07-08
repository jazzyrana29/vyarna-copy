import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { NutritionLogKafkaService } from './microservices/vy-nutrition-log-kafka.service';
import { StartNutritionSessionDto } from 'ez-utils';
import { ValidateStartNutritionSessionDtoPipe } from './pipes/validate-start-nutrition-session-dto.pipe';
import { NutritionEventDto } from './dto/nutrition-event.dto';
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

  @Post('sessions')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: StartNutritionSessionDto })
  async startSession(
    @Body(new ValidateStartNutritionSessionDtoPipe())
    dto: StartNutritionSessionDto,
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
      await this.kafkaService.startSession(dto, traceId),
      'Nutrition session started',
      traceId,
    );
  }

  @Post('sessions/:sessionId/events')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: NutritionEventDto })
  async logEvent(
    @Param('sessionId') sessionId: string,
    @Body(new ValidateNutritionEventDtoPipe()) dto: NutritionEventDto,
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
      await this.kafkaService.logEvent(sessionId, dto, traceId),
      'Nutrition event logged',
      traceId,
    );
  }

  @Post('sessions/:sessionId/end')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async endSession(
    @Param('sessionId') sessionId: string,
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
      await this.kafkaService.endSession(sessionId, traceId),
      'Nutrition session ended',
      traceId,
    );
  }

  @Get('sessions/:sessionId')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  async getSession(@Param('sessionId') sessionId: string): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getNutritionSession');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getSession',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.kafkaService.getSession(sessionId, traceId),
      'Nutrition session retrieved',
      traceId,
    );
  }
}
