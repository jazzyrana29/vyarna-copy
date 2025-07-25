// src/contact/contact.controller.ts
import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../../utils/common';
import { HealthGrowthTrackerKafkaService } from './microservices/vy-health-growth-tracker-kafka.service';
import { ValidateCreatePersonDtoPipe } from './pipes/validate-create-person-dto.pipe';
import { ValidateUpdatePersonDtoPipe } from './pipes/validate-update-person-dto.pipe';
import { ValidateGetOnePersonDtoPipe } from './pipes/validate-get-person-dto.pipe';
import { ValidateGetHistoryPersonDtoPipe } from './pipes/validate-get-history-person-dto.pipe';
import { ValidateGetManyPersonsDtoPipe } from './pipes/validate-get-many-persons-dto.pipe';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetOnePersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
  PersonDto,
  ZtrackingPersonDto,
  PaginatedPersonsResponseDto,
  KT_CREATE_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  KT_GET_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
} from 'ez-utils';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-health-growth-tracker')
@Controller('vy-health-growth-tracker')
export class HealthGrowthTrackerController {
  private logger = getLoggerConfig(HealthGrowthTrackerController.name);

  constructor(
    private readonly healthGrowthTrackerKafkaService: HealthGrowthTrackerKafkaService,
  ) {
    this.logger.debug(
      `${HealthGrowthTrackerController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_CREATE_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PersonDto> })
  @ApiBody({ type: CreatePersonDto })
  async createPerson(
    @Body(new ValidateCreatePersonDtoPipe()) createPersonDto: CreatePersonDto,
  ): Promise<ResponseDTO<PersonDto>> {
    const traceId = generateTraceId('createPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'createPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthGrowthTrackerKafkaService.createPerson(createPersonDto, traceId),
      'Person created',
      traceId,
    );
  }

  @Post(KT_UPDATE_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PersonDto> })
  @ApiBody({ type: UpdatePersonDto })
  async updatePerson(
    @Body(new ValidateUpdatePersonDtoPipe()) updatePersonDto: UpdatePersonDto,
  ): Promise<ResponseDTO<PersonDto>> {
    const traceId = generateTraceId('updatePerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'updatePerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthGrowthTrackerKafkaService.updatePerson(updatePersonDto, traceId),
      'Person updated',
      traceId,
    );
  }

  @Post(KT_GET_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<PersonDto> })
  @ApiBody({ type: GetOnePersonDto })
  async getPerson(
    @Body(new ValidateGetOnePersonDtoPipe()) getPersonDto: GetOnePersonDto,
  ): Promise<ResponseDTO<PersonDto>> {
    const traceId = generateTraceId('getPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthGrowthTrackerKafkaService.getPerson(getPersonDto, traceId),
      'Person retrieved',
      traceId,
    );
  }

  @Post(KT_GET_HISTORY_PERSON_ENTITY)
  @ApiCreatedResponse({ type: ResponseDTO<ZtrackingPersonDto[]> })
  @ApiBody({ type: GetHistoryOfPersonDto })
  async getHistory(
    @Body(new ValidateGetHistoryPersonDtoPipe())
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ): Promise<ResponseDTO<ZtrackingPersonDto[]>> {
    const traceId = generateTraceId('getHistoryPerson');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getHistoryPerson',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthGrowthTrackerKafkaService.getHistory(
        getHistoryOfPersonDto,
        traceId,
      ),
      'Person history retrieved',
      traceId,
    );
  }

  @Post(KT_GET_MANY_PERSONS)
  @ApiCreatedResponse({ type: ResponseDTO<PaginatedPersonsResponseDto> })
  @ApiBody({ type: GetManyPersonsDto })
  async getManyPersons(
    @Body(new ValidateGetManyPersonsDtoPipe()) getManyPersonsDto: GetManyPersonsDto,
  ): Promise<ResponseDTO<PaginatedPersonsResponseDto>> {
    const traceId = generateTraceId('getManyPersons');
    this.logger.info(
      'traceId generated successfully',
      traceId,
      'getManyPersons',
      LogStreamLevel.ProdStandard,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      await this.healthGrowthTrackerKafkaService.getManyPersons(getManyPersonsDto, traceId),
      'Persons retrieved',
      traceId,
    );
  }
}
