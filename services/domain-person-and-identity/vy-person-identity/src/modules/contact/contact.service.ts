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
      this.logger.info(
        'ActiveCampaign contact already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
      this.logger.info(
        'Stripe customer already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
      return existing;
    }

    const acRes = await this.activeCampaign.createContact(dto);
    this.logger.info(
      'ActiveCampaign contact created',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );

    let stripeCustomer = await this.stripeGateway.findCustomerByEmail(dto.email);
    if (stripeCustomer) {
      this.logger.info(
        'Stripe customer already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    } else {
      stripeCustomer = await this.stripeGateway.createContact({
        name: `${dto.firstName} ${dto.lastName}`.trim(),
        email: dto.email,
      });
      this.logger.info(
        'Stripe customer created',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    }

    const entity = this.contactRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      activeCampaignId: acRes.contact.id,
      stripeCustomerId: stripeCustomer.id,
    });
    await this.contactRepo.save(entity);
    this.logger.info('Contact created', traceId, 'createContact', LogStreamLevel.ProdStandard);

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      KT_CONTACT_CREATED,
      encodeKafkaMessage(ContactService.name, {
        contactId: entity.contactId,
        traceId,
      }),
    );

    return entity;
  }
}
