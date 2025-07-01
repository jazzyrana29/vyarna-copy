import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { PersonKafkaService } from './services/person-kafka.service';
import {
  KT_CREATE_PERSON_ENTITY,
  KT_GET_HISTORY_PERSON_ENTITY,
  KT_GET_MANY_PERSONS,
  KT_GET_PERSON_ENTITY,
  KT_UPDATE_PERSON_ENTITY,
} from 'ez-utils';
import { LogStreamLevel } from 'ez-logger';
import { getLoggerConfig } from '../../utils/common';

@Controller('person')
export class PersonController {
  private logger = getLoggerConfig(PersonController.name);

  constructor(private readonly personKafkaService: PersonKafkaService) {
    this.logger.debug(
      `${PersonController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PERSON_ENTITY)
  async createPersonWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PERSON_ENTITY}`,
      '',
      'createPersonWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.personKafkaService.createPersonViaKafka(message, key);
  }

  @MessagePattern(KT_UPDATE_PERSON_ENTITY)
  async updatePersonWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_UPDATE_PERSON_ENTITY}`,
      '',
      'updatePersonWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.personKafkaService.updatePersonViaKafka(message, key);
  }

  @MessagePattern(KT_GET_PERSON_ENTITY)
  async getPersonWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PERSON_ENTITY}`,
      '',
      'getPersonWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.personKafkaService.getPersonEntityViaKafka(message, key);
  }

  @MessagePattern(KT_GET_MANY_PERSONS)
  async getManyPersonsWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_MANY_PERSONS}`,
      '',
      'getManyPersonsWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.personKafkaService.getManyPersonsViaKafka(message, key);
  }

  @MessagePattern(KT_GET_HISTORY_PERSON_ENTITY)
  async getHistoryOfPersonWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_HISTORY_PERSON_ENTITY}`,
      '',
      'getHistoryOfPersonWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.personKafkaService.getHistoryOfPersonEntityViaKafka(
      message,
      key,
    );
  }
}
