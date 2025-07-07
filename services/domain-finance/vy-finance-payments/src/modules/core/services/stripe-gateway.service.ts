import { Injectable } from '@nestjs/common';
import Stripe from '@stripe/stripe-node';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class StripeGatewayService {
  private logger = getLoggerConfig(StripeGatewayService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
  });

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
}
