import { Injectable } from '@nestjs/common';
import { StripeGatewayService } from '../stripe-gateway.service';
import { CreateStripeContactDto } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ContactService {
  private logger = getLoggerConfig(ContactService.name);

  constructor(private readonly stripeGateway: StripeGatewayService) {
    this.logger.debug(
      `${ContactService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createContact(
    dto: CreateStripeContactDto,
    traceId: string,
  ): Promise<{ customerId: string }> {
    const existing = await this.stripeGateway.findCustomerByEmail(dto.email);
    const customer =
      existing ||
      (await this.stripeGateway.createContact({
        name: `${dto.firstName} ${dto.lastName}`.trim(),
        email: dto.email,
      }));
    this.logger.info(
      'Stripe customer created',
      traceId,
      'createContact',
      LogStreamLevel.ProdStandard,
    );
    return { customerId: customer.id };
  }
}
