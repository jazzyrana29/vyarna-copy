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
    let entity = await this.findByEmail(dto.email);

    if (entity) {
      this.logger.info(
        'Contact already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );

      let updated = false;

      if (!entity.activeCampaignId) {
        const acRes = await this.activeCampaign.createContact(dto);
        entity.activeCampaignId = acRes.contact.id;
        updated = true;
      }

      if (!entity.stripeCustomerId) {
        const stripeCustomer =
          (await this.stripeGateway.findCustomerByEmail(dto.email)) ||
          (await this.stripeGateway.createContact({
            name: `${dto.firstName} ${dto.lastName}`.trim(),
            email: dto.email,
          }));
        entity.stripeCustomerId = stripeCustomer.id;
        updated = true;
      }

      if (updated) {
        await this.contactRepo.save(entity);
      }

      return entity;
    }

    const acRes = await this.activeCampaign.createContact(dto);
    const stripeCustomer =
      (await this.stripeGateway.findCustomerByEmail(dto.email)) ||
      (await this.stripeGateway.createContact({
        name: `${dto.firstName} ${dto.lastName}`.trim(),
        email: dto.email,
      }));

    entity = this.contactRepo.create({
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
