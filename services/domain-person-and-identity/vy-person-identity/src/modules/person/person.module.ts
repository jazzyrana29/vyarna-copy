import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../entities/person.entity';
import { Email } from '../../entities/email.entity';
import { BusinessUnit } from '../../entities/business-unit.entity';
import { ZtrackingPerson } from '../../entities/ztracking-person.entity';
import { PersonService } from './services/person.service';
import { PersonKafkaService } from './services/person-kafka.service';
import { ZtrackingPersonService } from './services/ztracking-person.service';
import { ActiveCampaignService } from '../../services/active-campaign.service';
import { PersonController } from './person.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { PersonIntegrationService } from './services/person-integration.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Email, BusinessUnit, ZtrackingPerson]),
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    PersonKafkaService,
    PersonIntegrationService,
    ZtrackingPersonService,
    ActiveCampaignService,
    StripeGatewayService,
  ],
})
export class PersonModule {
  private logger = getLoggerConfig(PersonModule.name);

  constructor() {
    this.logger.debug(
      `${PersonModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
