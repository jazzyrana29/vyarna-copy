import { ContactService } from '../contact.service';
import { ActiveCampaignService } from '../../person/services/active-campaign.service';
import { StripeGatewayService } from '../../../services/stripe-gateway.service';
import { Repository } from 'typeorm';
import { Person } from '../../../entities/person.entity';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { LogStreamLevel } from 'ez-logger';

jest.mock('ez-kafka-producer');

describe('ContactService', () => {
  it('returns existing contact on repeated creation and logs', async () => {
    const contact: Person = {
      personId: 'c1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      activeCampaignId: 'ac1',
      stripeCustomerId: 'st1',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Person;

    const repo = {
      findOne: jest.fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValue(contact),
      create: jest.fn().mockReturnValue(contact),
      save: jest.fn().mockResolvedValue(contact),
    } as unknown as Repository<Person>;

    const ac = {
      createContact: jest.fn().mockResolvedValue({ contact: { id: 'ac1' } }),
    } as unknown as ActiveCampaignService;

    const stripe = {
      findCustomerByEmail: jest.fn().mockResolvedValueOnce(null),
      createContact: jest.fn().mockResolvedValue({ id: 'st1' }),
    } as unknown as StripeGatewayService;

    const service = new ContactService(repo, ac, stripe);
    const logger = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
    };
    (service as any).logger = logger;

    const createContactDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    const first = await service.createContact(createContactDto as any, 't1');
    const second = await service.createContact(createContactDto as any, 't1');

    expect(first).toBe(contact);
    expect(second).toBe(contact);

    expect(repo.save).toHaveBeenCalledTimes(3);
    expect(ac.createContact).toHaveBeenCalledTimes(1);
    expect(stripe.createContact).toHaveBeenCalledTimes(1);

    expect(logger.info).toHaveBeenCalledWith(
      'Contact already exists',
      't1',
      'createContact',
      LogStreamLevel.ProdStandard,
    );
  });
});
