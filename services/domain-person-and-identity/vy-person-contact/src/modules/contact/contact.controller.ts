import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ContactKafkaService } from './contact-kafka.service';
import { KT_CREATE_CONTACT } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('contact')
export class ContactController {
  private logger = getLoggerConfig(ContactController.name);

  constructor(private readonly contactKafkaService: ContactKafkaService) {
    this.logger.debug(
      `${ContactController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_CONTACT)
  async createContact(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_CONTACT}`,
      '',
      'createContact',
      LogStreamLevel.DebugLight,
    );
    await this.contactKafkaService.createContact(message, key);
  }
}
