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
import { PersonContactKafkaService } from './microservices/vy-person-contact-kafka.service';
import { ValidateCreateContactDtoPipe } from './pipes/validate-create-contact-dto.pipe';
import { generateTraceId, CreateContactDto, KT_CREATE_CONTACT } from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-person-contact')
@Controller('vy-person-contact')
export class PersonContactController {
  private logger = getLoggerConfig(PersonContactController.name);

  constructor(private readonly contactKafkaService: PersonContactKafkaService) {
    this.logger.debug(
      `${PersonContactController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_CONTACT)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateContactDto })
  async createContact(
    @Body(new ValidateCreateContactDtoPipe())
    createContactDto: CreateContactDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createContact');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.contactKafkaService.createContact(createContactDto, traceId),
      'Contact created',
      traceId,
    );
  }
}
