// src/contact/contact.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ActiveCampaignService } from '../../services/static/active-campaign/active-campaign.service';
import { ListsEnum } from '../../enum/lists.enum';
import { WebsocketGateway } from '../../gateway/websocket.gateway';
import { ClientMessagesMode } from '../../constants/ClientMessagesMode';

@Injectable()
export class ContactService {
  constructor(
    private readonly websocketGateway: WebsocketGateway) {
  }

  async createContact(createBusinessUnitDto: CreateContactDto): Promise<any> {
    const { firstName, lastName, email, formId } = createBusinessUnitDto;
    console.log(`Creating contact ${firstName} ${lastName}...`);
    const { contact } = await ActiveCampaignService.createContact({
      firstName,
      email,
      lastName,
    });
    console.log('Contact created with id => ', contact?.id);
    console.log('Getting List...');
    const { lists } = await ActiveCampaignService.getLists();
    const list = lists.find(
      (list) => list.name === ListsEnum.VyarnaSubscribedFromWebsite,
    );
    if (!list)
      throw new NotFoundException(
        `${ListsEnum.VyarnaSubscribedFromWebsite} not found`,
      );
    console.log(`list ${list?.name} found with id => `, list?.id);
    console.log(
      `Subscribe Contact (${contact?.firstName} ${contact?.lastName}) to List (${list?.name})...`,
    );
    await ActiveCampaignService.subscribeContactToList({
      list: list?.id,
      contact: contact?.id,
      status: '1',
    });
    console.log(
      `${contact?.firstName} ${contact?.lastName} (Contact) subscribed to ${list?.name} (List) successfully`,
    );
    console.log('Getting Tags...');
    const { tags } = await ActiveCampaignService.getTags();
    const tag = tags.find((tag) => tag?.tag === formId);
    if (!tag) throw new NotFoundException(`${formId} tag not found`);
    console.log(`tag (${tag?.tag}) found with id => `, tag?.id);
    console.log(
      `Add tag (${tag?.tag}) to Contact (${contact?.firstName} ${contact?.lastName})...`,
    );
    await ActiveCampaignService.addTagToContact({
      contact: contact?.id,
      tag: tag?.id,
    });
    console.log(
      `${tag?.tag} (tag) added to ${contact?.firstName} ${contact?.lastName} (contact) successfully`,
    );

    this.websocketGateway.sendMessageToClient({
      mode: ClientMessagesMode.NEW_CONTACT_CREATED,
      message: 'A new contact has been added.',
      dateTime: new Date(),
    });
  }
}
