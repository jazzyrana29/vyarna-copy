import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactKafkaService } from './contact-kafka.service';
import { StripeGatewayService } from '../stripe-gateway.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactKafkaService, StripeGatewayService],
})
export class ContactModule {
  private logger = getLoggerConfig(ContactModule.name);
  constructor() {
    this.logger.debug(
      `${ContactModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
