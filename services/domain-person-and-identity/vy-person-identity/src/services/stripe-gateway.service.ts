import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getLoggerConfig } from '../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class StripeGatewayService {
  private logger = getLoggerConfig(StripeGatewayService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor() {
    this.logger.debug(
      `${StripeGatewayService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }


  async findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
    if (typeof this.stripe.customers.search === 'function') {
      const res = await this.stripe.customers.search({
        query: `email:'${email.replace("'", "\\'")}'`,
        limit: 1,
      });
      return res.data[0] ?? null;
    }
    const list = await this.stripe.customers.list({ email, limit: 1 });
    return list.data[0] ?? null;
  }

  async createContact(
    params: Stripe.CustomerCreateParams,
  ): Promise<Stripe.Customer> {
    this.logger.debug(
      `Creating Stripe customer`,
      '',
      'createContact',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.customers.create(params);
  }


}
