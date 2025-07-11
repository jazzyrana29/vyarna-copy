import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../entities/contact.entity';
import { ActiveCampaignService } from '../person/services/active-campaign.service';
import { StripeGatewayService } from './stripe-gateway.service';
import { CreateContactDto, encodeKafkaMessage, KT_CONTACT_CREATED } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { EzKafkaProducer } from 'ez-kafka-producer';

@Injectable()
export class ContactService {
  private logger = getLoggerConfig(ContactService.name);

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
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

  async findByEmail(email: string): Promise<Contact | null> {
    return this.contactRepo.findOne({ where: { email } });
  }

  async createContact(dto: CreateContactDto, traceId: string): Promise<Contact> {
    let existing = await this.contactRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      this.logger.info('Contact already exists', traceId, 'createContact', LogStreamLevel.ProdStandard);
      return existing;
    }

    const entity = this.contactRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });
    await this.contactRepo.save(entity);
    this.logger.info('Contact created', traceId, 'createContact', LogStreamLevel.ProdStandard);

    let stripeCustomer = await this.stripeGateway.findCustomerByEmail(dto.email);
    if (stripeCustomer) {
      this.logger.info('Stripe customer already exists', traceId, 'createContact', LogStreamLevel.ProdStandard);
    } else {
      stripeCustomer = await this.stripeGateway.createContact({
        name: `${dto.firstName} ${dto.lastName}`.trim(),
        email: dto.email,
      });
      this.logger.info('Stripe customer created', traceId, 'createContact', LogStreamLevel.ProdStandard);
    }
    entity.stripeCustomerId = stripeCustomer.id;
    await this.contactRepo.save(entity);

    const acRes = await this.activeCampaign.createContact(dto);
    this.logger.info('ActiveCampaign contact created', traceId, 'createContact', LogStreamLevel.ProdStandard);
    entity.activeCampaignId = acRes.contact.id;
    await this.contactRepo.save(entity);

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
