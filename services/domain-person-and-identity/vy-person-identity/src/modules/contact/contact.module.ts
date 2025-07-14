import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../entities/person.entity';
import { ContactController } from './contact.controller';
import { ContactKafkaService } from './contact-kafka.service';
import { ContactService } from './contact.service';
import { ActiveCampaignService } from '../person/services/active-campaign.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [ContactController],
  providers: [
    ContactService,
    ContactKafkaService,
    ActiveCampaignService,
    StripeGatewayService,
  ],
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
