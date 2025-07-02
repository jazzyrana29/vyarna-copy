// src/contact/contact.controller.ts
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ResponseDTO } from '../../dto/response.dto';
import { PersonIdentityKafkaService } from './microservices/vy-person-identity-kafka.service';
import {
  generateTraceId,
  CreatePersonDto,
  UpdatePersonDto,
  GetPersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
} from 'ez-utils';

@Controller('vy-person-identity')
export class PersonIdentityController {
  constructor(
    private readonly personIdentityKafkaService: PersonIdentityKafkaService,
  ) {}

  @Post('create-person')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreatePersonDto })
  async createPerson(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('create-person');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personIdentityKafkaService.createPerson(createPersonDto, traceId),
      'Person created',
    );
  }

  @Post('update-person')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdatePersonDto })
  async updatePerson(
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('update-person');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personIdentityKafkaService.updatePerson(updatePersonDto, traceId),
      'Person updated',
    );
  }

  @Post('get-person')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetPersonDto })
  async getPerson(@Body() getPersonDto: GetPersonDto): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('get-person');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personIdentityKafkaService.getPerson(getPersonDto, traceId),
      'Person retrieved',
    );
  }

  @Post('get-history-person')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetHistoryOfPersonDto })
  async getHistory(
    @Body() getHistoryOfPersonDto: GetHistoryOfPersonDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('get-history-person');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personIdentityKafkaService.getHistory(
        getHistoryOfPersonDto,
        traceId,
      ),
      'Person history retrieved',
    );
  }

  @Post('get-many-persons')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetManyPersonsDto })
  async getManyPersons(
    @Body() getManyPersonsDto: GetManyPersonsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('get-many-persons');
    return new ResponseDTO(
      HttpStatus.OK,
      await this.personIdentityKafkaService.getManyPersons(getManyPersonsDto, traceId),
      'Persons retrieved',
    );
  }
}
