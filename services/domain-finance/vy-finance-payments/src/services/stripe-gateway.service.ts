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
    const intent = await this.stripe.paymentIntents.create(params, options);
    this.logger.info(
      `Stripe createPaymentIntent response: ${JSON.stringify(intent)}`,
      '',
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return intent;
  }

  async retrievePaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
    this.logger.debug(
      `Retrieving Stripe PaymentIntent ${id}`,
      '',
      'retrievePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
    this.logger.info(
      `Stripe retrievePaymentIntent response: ${JSON.stringify(paymentIntent)}`,
      '',
      'retrievePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return paymentIntent;
  }

  async capturePaymentIntent(paymentIntentId: string) {
    this.logger.debug(
      `Capturing Stripe PaymentIntent ${paymentIntentId}`,
      '',
      'capturePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    const captured = await this.stripe.paymentIntents.capture(paymentIntentId);
    this.logger.info(
      `Stripe capturePaymentIntent response: ${JSON.stringify(captured)}`,
      '',
      'capturePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return captured;
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    params?: Stripe.PaymentIntentConfirmParams,
    options?: Stripe.RequestOptions,
  ) {
    this.logger.debug(
      `Confirming Stripe PaymentIntent ${paymentIntentId}`,
      '',
      'confirmPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    const confirmed = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      params,
      options,
    );
    this.logger.info(
      `Stripe confirmPaymentIntent response: ${JSON.stringify(confirmed)}`,
      '',
      'confirmPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return confirmed;
  }

  async createRefund(params: Stripe.RefundCreateParams) {
    this.logger.debug(
      `Creating Stripe Refund`,
      '',
      'createRefund',
      LogStreamLevel.DebugLight,
    );
    const refund = await this.stripe.refunds.create(params);
    this.logger.info(
      `Stripe createRefund response: ${JSON.stringify(refund)}`,
      '',
      'createRefund',
      LogStreamLevel.DebugLight,
    );
    return refund;
  }

  async findCustomerByEmail(
    email?: string,
  ): Promise<Stripe.Customer | null> {
    if (!email) {
      this.logger.debug(
        'No email provided for findCustomerByEmail',
        '',
        'findCustomerByEmail',
        LogStreamLevel.DebugLight,
      );
      return null;
    }

    let customer: Stripe.Customer | null = null;
    if (typeof this.stripe.customers.search === 'function') {
      const res = await this.stripe.customers.search({
        query: `email:'${email.replace("'", "\\'")}'`,
        limit: 1,
      });
      customer = res.data[0] ?? null;
    } else {
      const list = await this.stripe.customers.list({ email, limit: 1 });
      customer = list.data[0] ?? null;
    }
    this.logger.info(
      `Stripe findCustomerByEmail response: ${customer?.id ?? 'none'}`,
      '',
      'findCustomerByEmail',
      LogStreamLevel.DebugLight,
    );
    return customer;
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
    const customer = await this.stripe.customers.create(params);
    this.logger.info(
      `Stripe createCustomer response: ${JSON.stringify(customer)}`,
      '',
      'createCustomer',
      LogStreamLevel.DebugLight,
    );
    return customer;
  }

  async retrievePrice(id: string): Promise<Stripe.Price> {
    this.logger.debug(
      `Retrieving Stripe Price ${id}`,
      '',
      'retrievePrice',
      LogStreamLevel.DebugLight,
    );
    const price = await this.stripe.prices.retrieve(id);
    this.logger.info(
      `Stripe retrievePrice response: ${JSON.stringify(price)}`,
      '',
      'retrievePrice',
      LogStreamLevel.DebugLight,
    );
    return price;
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
    const method = await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    this.logger.info(
      `Stripe attachPaymentMethod response: ${JSON.stringify(method)}`,
      traceId || '',
      'attachPaymentMethod',
      LogStreamLevel.DebugLight,
    );
    return method;
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
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      secret,
    );
    this.logger.info(
      `Stripe constructWebhookEvent response: ${JSON.stringify(event)}`,
      '',
      'constructWebhookEvent',
      LogStreamLevel.DebugLight,
    );
    return event;
  }
}
