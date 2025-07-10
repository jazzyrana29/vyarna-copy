import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getLoggerConfig } from '../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class StripeGatewayService {
  private logger = getLoggerConfig(StripeGatewayService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-04-30',
  });

  constructor() {
    this.logger.debug(
      `${StripeGatewayService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams,
    options?: Stripe.RequestOptions,
  ) {
    this.logger.debug(
      `Creating Stripe PaymentIntent`,
      '',
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentIntents.create(params, options);
  }

  async retrievePaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
    this.logger.debug(
      `Retrieving Stripe PaymentIntent ${id}`,
      '',
      'retrievePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentIntents.retrieve(id);
  }

  async capturePaymentIntent(paymentIntentId: string) {
    this.logger.debug(
      `Capturing Stripe PaymentIntent ${paymentIntentId}`,
      '',
      'capturePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentIntents.capture(paymentIntentId);
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    this.logger.debug(
      `Confirming Stripe PaymentIntent ${paymentIntentId}`,
      '',
      'confirmPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentIntents.confirm(paymentIntentId);
  }

  async createRefund(params: Stripe.RefundCreateParams) {
    this.logger.debug(
      `Creating Stripe Refund`,
      '',
      'createRefund',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.refunds.create(params);
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

  async createCustomer(
    params: Stripe.CustomerCreateParams,
  ): Promise<Stripe.Customer> {
    this.logger.debug(
      'Creating Stripe customer',
      '',
      'createCustomer',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.customers.create(params);
  }

  async retrievePrice(id: string): Promise<Stripe.Price> {
    this.logger.debug(
      `Retrieving Stripe Price ${id}`,
      '',
      'retrievePrice',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.prices.retrieve(id);
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

  async attachPaymentMethod(
    paymentMethodId: string,
    customerId: string,
    traceId?: string,
  ): Promise<Stripe.PaymentMethod> {
    this.logger.debug(
      `Attaching payment method ${paymentMethodId} to customer ${customerId}`,
      traceId || '',
      'attachPaymentMethod',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }

  constructWebhookEvent(
    payload: Buffer | string,
    signature: string,
    secret: string,
  ): Stripe.Event {
    this.logger.debug(
      `Constructing Stripe webhook event`,
      '',
      'constructWebhookEvent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }
}
