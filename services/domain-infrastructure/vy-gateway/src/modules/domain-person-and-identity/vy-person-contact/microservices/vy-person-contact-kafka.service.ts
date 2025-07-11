import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { KT_CREATE_CONTACT, CreateContactDto } from 'ez-utils';

@Injectable()
export class PersonContactKafkaService {
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

  async createContact(createContactDto: CreateContactDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_CONTACT,
      createContactDto,
      traceId,
    );
  }
}
