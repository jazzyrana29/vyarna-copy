import { Injectable } from '@nestjs/common';
import { PersonService } from './person.service';

import { LogStreamLevel } from 'ez-logger';

import {
  CreatePersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
  GetPersonDto,
  KafkaMessageResponderService,
  KT_CREATE_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
  KT_GET_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  UpdatePersonDto,
} from 'ez-utils';
import { ZtrackingPersonService } from './ztracking-person.service';
import { getLoggerConfig } from '../../../utils/common';

@Injectable()
export class PersonKafkaService {
  private logger = getLoggerConfig(PersonKafkaService.name);
  private readonly kafkaResponder: KafkaMessageResponderService;
  private readonly serviceName = PersonKafkaService.name;

  constructor(
    private readonly personService: PersonService,
    private readonly ztrackingPersonService: ZtrackingPersonService,
  ) {
    this.logger.debug(
      `${PersonKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
  }

  async createPersonViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PERSON_ENTITY,
      message,
      key,
      async (value: CreatePersonDto, traceId: string) =>
        await this.personService.createPerson(value, traceId),
    );
  }

  async updatePersonViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_UPDATE_PERSON_ENTITY,
      message,
      key,
      async (value: UpdatePersonDto, traceId: string) =>
        await this.personService.updatePersonUnit(value, traceId),
    );
  }

  async getPersonEntityViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PERSON_ENTITY,
      message,
      key,
      async (value: GetPersonDto, traceId: string) =>
        await this.personService.findPerson(value, traceId),
    );
  }

  async getManyPersonsViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_MANY_PERSONS,
      message,
      key,
      async (value: GetManyPersonsDto, traceId: string) =>
        await this.personService.getManyPersons(value, traceId),
    );
  }

  async getHistoryOfPersonEntityViaKafka(message: any, key: string) {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_HISTORY_PERSON_ENTITY,
      message,
      key,
      async (value: GetHistoryOfPersonDto, traceId: string) =>
        await this.ztrackingPersonService.findZtrackingPersonEntity(
          value,
          traceId,
        ),
    );
  }
}
