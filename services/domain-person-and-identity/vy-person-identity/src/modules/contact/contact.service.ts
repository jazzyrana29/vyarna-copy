import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { ActiveCampaignService } from '../person/services/active-campaign.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { CreateContactDto } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ContactService {
  private logger = getLoggerConfig(ContactService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
    private readonly activeCampaign: ActiveCampaignService,
    private readonly stripeGateway: StripeGatewayService,
  ) {
    this.logger.debug(
      `${ContactService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async findByEmail(email: string): Promise<Person | null> {
    return this.personRepo.findOne({ where: { email } });
  }

  async createContact(
    createContactDto: CreateContactDto,
    traceId: string,
  ): Promise<Person> {
    let existing = await this.personRepo.findOne({
      where: { email: createContactDto.email },
    });
    if (existing) {
      this.logger.info(
        'Contact already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
      return existing;
    }

    const entity = this.personRepo.create({
      firstName: createContactDto.firstName,
      lastName: createContactDto.lastName,
      email: createContactDto.email,
    });
    await this.personRepo.save(entity);
    this.logger.info(
      'Contact created',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );

    let stripeCustomer = await this.stripeGateway.findCustomerByEmail(
      createContactDto.email,
    );
    if (stripeCustomer) {
      this.logger.info(
        'Stripe customer already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    } else {
      stripeCustomer = await this.stripeGateway.createContact({
        name: `${createContactDto.firstName} ${createContactDto.lastName}`.trim(),
        email: createContactDto.email,
      });
      this.logger.info(
        'Stripe customer created',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    }
    entity.stripeCustomerId = stripeCustomer.id;
    await this.personRepo.save(entity);

    const acRes = await this.activeCampaign.createContact(createContactDto);
    this.logger.info(
      'ActiveCampaign contact created',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );
    entity.activeCampaignId = acRes.contact.id;
    await this.personRepo.save(entity);

    // The current implementation of CREATED broadcasts to all connected
    // sockets which is inefficient and insecure as it exposes user
    // information to all sockets. Disable producing KT_CONTACT_CREATED
    // until proper support structure is implemented.
    this.logger.warn(
      'Skipping KT_CONTACT_CREATED production: insecure broadcast',
      traceId,
      'createContact',
      LogStreamLevel.DebugLight,
    );
    // await new EzKafkaProducer().produce(
    //   process.env.KAFKA_BROKER as string,
    //   KT_CONTACT_CREATED,
    //   encodeKafkaMessage(ContactService.name, {
    //     contactId: entity.contactId,
    //     traceId,
    //   }),
    // );

    return entity;
  }
}
