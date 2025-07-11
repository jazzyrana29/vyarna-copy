import { Injectable } from '@nestjs/common';
import { ContactService } from './contact.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_CONTACT,
  CreateContactDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ContactKafkaService {
  public serviceName = ContactKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly contactService: ContactService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${ContactKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createContact(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_CONTACT,
      message,
      key,
      async (value: CreateContactDto, traceId: string) =>
        await this.contactService.createContact(value, traceId),
    );
  }
}
