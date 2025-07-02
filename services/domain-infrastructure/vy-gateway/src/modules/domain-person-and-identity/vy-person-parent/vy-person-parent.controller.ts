// src/contact/contact.controller.ts
import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { PersonParentKafkaService } from './microservices/vy-person-parent-kafka.service';
import { ValidateCreatePersonDtoPipe } from './pipes/validate-create-person-dto.pipe';
import { ValidateUpdatePersonDtoPipe } from './pipes/validate-update-person-dto.pipe';
import { ValidateGetPersonDtoPipe } from './pipes/validate-get-person-dto.pipe';
import { ValidateGetHistoryPersonDtoPipe } from './pipes/validate-get-history-person-dto.pipe';
import { ValidateGetManyPersonsDtoPipe } from './pipes/validate-get-many-persons-dto.pipe';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
  KT_CREATE_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  KT_GET_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
} from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-person-parent')
@Controller('vy-person-parent')
export class PersonParentController {
  private logger = getLoggerConfig(PersonParentController.name);

  constructor(
    private readonly personBabyKafkaService: PersonParentKafkaService,
  ) {
    this.logger.debug(
      `${PersonParentController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePersonDto })
  async createPerson(
    @Body(new ValidateCreatePersonDtoPipe()) createPersonDto: CreatePersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personBabyKafkaService.createPerson(createPersonDto, traceId),
      'Person created',
      traceId,
    );
  }

  @Post(KT_UPDATE_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdatePersonDto })
  async updatePerson(
    @Body(new ValidateUpdatePersonDtoPipe()) updatePersonDto: UpdatePersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updatePerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updatePerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personBabyKafkaService.updatePerson(updatePersonDto, traceId),
      'Person updated',
      traceId,
    );
  }

  @Post(KT_GET_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetPersonDto })
  async getPerson(
    @Body(new ValidateGetPersonDtoPipe()) getPersonDto: GetPersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personBabyKafkaService.getPerson(getPersonDto, traceId),
      'Person retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetHistoryOfPersonDto })
  async getHistory(
    @Body(new ValidateGetHistoryPersonDtoPipe())
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getHistoryPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personBabyKafkaService.getHistory(
        getHistoryOfPersonDto,
        traceId,
      ),
      'Person history retrieved',
      traceId,
    );
  }

  @Post(KT_GET_MANY_PERSONS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetManyPersonsDto })
  async getManyPersons(
    @Body(new ValidateGetManyPersonsDtoPipe()) getManyPersonsDto: GetManyPersonsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getManyPersons');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getManyPersons',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personBabyKafkaService.getManyPersons(getManyPersonsDto, traceId),
      'Persons retrieved',
      traceId,
    );
  }
}
