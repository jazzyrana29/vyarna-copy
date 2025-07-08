import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { PersonEmailKafkaService } from './microservices/vy-person-email-kafka.service';
import {
  generateTraceId,
  CreateEmailDto,
  UpdateEmailDto,
  GetEmailDto,
  GetZtrackingEmailDto,
  KT_CREATE_EMAIL,
  KT_UPDATE_EMAIL,
  KT_GET_EMAIL,
  KT_GET_ZTRACKING_EMAIL,
} from 'ez-utils';
import { ValidateCreateEmailDtoPipe } from './pipes/validate-create-email-dto.pipe';
import { ValidateUpdateEmailDtoPipe } from './pipes/validate-update-email-dto.pipe';
import { ValidateGetEmailDtoPipe } from './pipes/validate-get-email-dto.pipe';
import { ValidateGetZtrackingEmailDtoPipe } from './pipes/validate-get-ztracking-email-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-person-email')
@Controller('vy-person-email')
export class PersonEmailController {
  private logger = getLoggerConfig(PersonEmailController.name);

  constructor(private readonly emailKafkaService: PersonEmailKafkaService) {
    this.logger.debug(
      `${PersonEmailController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_EMAIL)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateEmailDto })
  async createEmail(
    @Body(new ValidateCreateEmailDtoPipe()) createEmailDto: CreateEmailDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createEmail');
    this.logger.info('traceId generated successfully', traceId, 'createEmail', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.emailKafkaService.createEmail(createEmailDto, traceId),
      'Email created',
      traceId,
    );
  }

  @Post(KT_UPDATE_EMAIL)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdateEmailDto })
  async updateEmail(
    @Body(new ValidateUpdateEmailDtoPipe()) updateEmailDto: UpdateEmailDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updateEmail');
    this.logger.info('traceId generated successfully', traceId, 'updateEmail', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.emailKafkaService.updateEmail(updateEmailDto, traceId),
      'Email updated',
      traceId,
    );
  }

  @Post(KT_GET_EMAIL)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetEmailDto })
  async getEmail(
    @Body(new ValidateGetEmailDtoPipe()) getEmailDto: GetEmailDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getEmail');
    this.logger.info('traceId generated successfully', traceId, 'getEmail', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.emailKafkaService.getEmail(getEmailDto, traceId),
      'Email retrieved',
      traceId,
    );
  }

  @Post(KT_GET_ZTRACKING_EMAIL)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingEmailDto })
  async getHistory(
    @Body(new ValidateGetZtrackingEmailDtoPipe()) getDto: GetZtrackingEmailDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getZtrackingEmail');
    this.logger.info('traceId generated successfully', traceId, 'getZtrackingEmail', LogStreamLevel.ProdStandard);
    return new ResponseDTO(
      HttpStatus.OK,
      await this.emailKafkaService.getHistory(getDto, traceId),
      'Email history retrieved',
      traceId,
    );
  }
}
