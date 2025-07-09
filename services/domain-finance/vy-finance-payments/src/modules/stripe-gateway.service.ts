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

  async createPaymentIntent(params: Stripe.PaymentIntentCreateParams) {
    this.logger.debug(
      `Creating Stripe PaymentIntent`,
      '',
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.paymentIntents.create(params);
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

  async createRefund(params: Stripe.RefundCreateParams) {
    this.logger.debug(
      `Creating Stripe Refund`,
      '',
      'createRefund',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.refunds.create(params);
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
    return this.stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
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
