import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveCampaignService } from '../../../services/active-campaign.service';
import { LogStreamLevel } from 'ez-logger';

import { getLoggerConfig } from '../../../utils/common';
import { Person } from '../../../entities/person.entity';

import {
  CreateActiveCampaignContactDto,
  ListsEnum,
  PersonWithoutPasswordDto,
  TagsEnum,
} from 'ez-utils';
import { StripeGatewayService } from '../../../services/stripe-gateway.service';
import Stripe from 'stripe';

@Injectable()
export class PersonIntegrationService {
  private logger = getLoggerConfig(PersonIntegrationService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly activeCampaignService: ActiveCampaignService,
    private readonly stripeGateway: StripeGatewayService,
  ) {
    this.logger.debug(
      `${PersonIntegrationService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createActiveCampaignContactAndSubscribeToTopic(
    createActiveCampaignContactDto: CreateActiveCampaignContactDto,
    traceId: string,
  ): Promise<any> {
    const {
      firstName,
      lastName,
      email,
      formId = TagsEnum.SIGNUP_HOME_BOTTOM,
    } = createActiveCampaignContactDto;

    // Replace console.log with structured logger
    this.logger.info(
      `Creating contact ${firstName} ${lastName}...`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
    const { contact } = await this.activeCampaignService.createContact({
      firstName,
      email,
      lastName,
    });
    this.logger.info(
      `Contact created with id => ${contact?.id}`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );

    this.logger.info(
      'Getting List...',
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
    const { lists } = await this.activeCampaignService.getLists();
    const list = lists.find(
      (list) => list.name === ListsEnum.VyarnaSubscribedFromWebsite,
    );
    if (!list)
      throw new NotFoundException(
        `${ListsEnum.VyarnaSubscribedFromWebsite} not found`,
      );
    this.logger.info(
      `list ${list?.name} found with id => ${list?.id}`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );

    this.logger.info(
      `Subscribe Contact (${contact?.firstName} ${contact?.lastName}) to List (${list?.name})...`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
    await this.activeCampaignService.subscribeContactToList({
      list: list?.id,
      contact: contact?.id,
      status: '1',
    });
    this.logger.info(
      `${contact?.firstName} ${contact?.lastName} (Contact) subscribed to ${list?.name} (List) successfully`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );

    this.logger.info(
      'Getting Tags...',
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
    const { tags } = await this.activeCampaignService.getTags();
    const tag = tags.find((tag) => tag?.tag === formId);
    if (!tag) throw new NotFoundException(`${formId} tag not found`);
    this.logger.info(
      `tag (${tag?.tag}) found with id => ${tag?.id}`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );

    this.logger.info(
      `Add tag (${tag?.tag}) to Contact (${contact?.firstName} ${contact?.lastName})...`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
    await this.activeCampaignService.addTagToContact({
      contact: contact?.id,
      tag: tag?.id,
    });
    this.logger.info(
      `${tag?.tag} (tag) added to ${contact?.firstName} ${contact?.lastName} (contact) successfully`,
      traceId,
      'createActiveCampaignContactAndSubscribeToTopic',
      LogStreamLevel.ProdStandard,
    );
  }

  sanitizePerson(person: Person): PersonWithoutPasswordDto {
    const { password, ...rest } = person;
    return rest as PersonWithoutPasswordDto;
  }

  async addPersonInStripe(
    person: Person,
    email: string,
    traceId: string,
  ): Promise<Stripe.Customer> {
    let stripeCustomer = await this.stripeGateway.findCustomerByEmail(email);
    if (stripeCustomer) {
      this.logger.info(
        'Stripe customer already exists',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    } else {
      stripeCustomer = await this.stripeGateway.createContact({
        name: `${person.nameFirst} ${person.nameMiddle || ''} ${person.nameLastFirst} ${person.nameLastSecond || ''}`.trim(),
        email: email,
      });
      this.logger.info(
        'Stripe customer created',
        traceId,
        'createContact',
        LogStreamLevel.ProdStandard,
      );
    }

    return stripeCustomer;
  }
}
