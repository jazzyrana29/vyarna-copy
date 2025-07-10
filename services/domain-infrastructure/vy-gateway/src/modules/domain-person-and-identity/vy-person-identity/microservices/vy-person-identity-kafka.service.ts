import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_CREATE_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
  KT_GET_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
  CreatePersonDto,
  UpdatePersonDto,
  GetOnePersonDto,
  GetHistoryOfPersonDto,
  GetManyPersonsDto,
} from 'ez-utils';

@Injectable()
export class PersonIdentityKafkaService {
  private readonly serviceName = PersonIdentityKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPerson(createPersonDto: CreatePersonDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PERSON_ENTITY,
      createPersonDto,
      traceId,
    );
  }

  async updatePerson(updatePersonDto: UpdatePersonDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_PERSON_ENTITY,
      updatePersonDto,
      traceId,
    );
  }

  async getPerson(getPersonDto: GetOnePersonDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PERSON_ENTITY,
      getPersonDto,
      traceId,
    );
  }

  async getHistory(
    getHistoryOfPersonDto: GetHistoryOfPersonDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_HISTORY_PERSON_ENTITY,
      getHistoryOfPersonDto,
      traceId,
    );
  }

  async getManyPersons(
    getManyPersonsDto: GetManyPersonsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_MANY_PERSONS,
      getManyPersonsDto,
      traceId,
    );
  }

}
