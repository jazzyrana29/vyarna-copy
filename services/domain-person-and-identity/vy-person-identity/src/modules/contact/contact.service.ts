import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { ActiveCampaignService } from '../person/services/active-campaign.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { CreatePersonDto } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { Email } from '../../entities/email.entity';

@Injectable()
export class ContactService {
  private logger = getLoggerConfig(ContactService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
    @InjectRepository(Email)
    private readonly emailRepo: Repository<Email>,
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

  async createContact(
    createContactDto: CreatePersonDto,
    traceId: string,
  ): Promise<Person> {
    const emailToProcess = createContactDto.email;
    const existing = await this.emailRepo.findOne({
      where: { email: emailToProcess },
      relations: ['person'],
    });
    if (existing) {
      this.logger.info(
        'Contact already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
      return existing.person;
    }

    const { email, ...rest } = createContactDto;
    const entity = this.personRepo.create({
      ...rest,
    });
    await this.personRepo.save(entity);

    await this.emailRepo.save(
      this.emailRepo.create({
        personId: entity.personId,
        email: emailToProcess,
        isPrimary: true,
      }),
    );
    this.logger.info(
      'Contact created',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );

    let stripeCustomer =
      await this.stripeGateway.findCustomerByEmail(emailToProcess);
    if (stripeCustomer) {
      this.logger.info(
        'Stripe customer already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    } else {
      stripeCustomer = await this.stripeGateway.createContact({
        name: `${createContactDto.nameFirst} ${createContactDto.nameMiddle || ''} ${createContactDto.nameLastFirst} ${createContactDto.nameLastSecond || ''}`.trim(),
        email: emailToProcess,
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

    const acRes = await this.activeCampaign.createContact({
      firstName: createContactDto.nameFirst,
      lastName: createContactDto.nameLastFirst,
      email: emailToProcess,
    });
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
