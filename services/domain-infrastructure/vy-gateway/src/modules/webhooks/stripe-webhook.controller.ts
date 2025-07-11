import {
  Controller,
  Post,
  Headers,
  Req,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
import { generateTraceId, StripeWebhookDto, KT_PROCESS_STRIPE_WEBHOOK } from 'ez-utils';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('webhooks')
export class StripeWebhookController {
  private logger = getLoggerConfig(StripeWebhookController.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  private endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  constructor(private readonly kafkaResponder: KafkaResponderService) {}

  @Post(KT_PROCESS_STRIPE_WEBHOOK)
  @HttpCode(200)
  async handleStripe(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const traceId = generateTraceId('stripeWebhook');
    const rawBody = (req as any).rawBody;
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, sig, this.endpointSecret);
    } catch (err: any) {
      this.logger.error(
        `Invalid webhook signature: ${err.message}`,
        traceId,
        'handleStripe',
        LogStreamLevel.ProdStandard,
      );
      throw new BadRequestException(`Invalid signature: ${err.message}`);
    }

    this.logger.info(
      `Stripe webhook received: ${event.id} ${event.type}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );

switch (event.type) {
  case 'payment_intent.succeeded':
    this.logger.info(
      `Payment intent succeeded: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'payment_intent.payment_failed':
    this.logger.warn(
      `Payment intent failed: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'payment_intent.canceled':
    this.logger.info(
      `Payment intent canceled: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'payment_intent.processing':
    this.logger.debug(
      `Payment intent processing: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.DebugLight,
    );
    break;
  case 'charge.succeeded':
    this.logger.info(
      `Charge succeeded: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'charge.failed':
    this.logger.warn(
      `Charge failed: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'charge.refunded':
    this.logger.info(
      `Charge refunded: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'checkout.session.completed':
    this.logger.info(
      `Checkout session completed: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'invoice.paid':
    this.logger.info(
      `Invoice paid: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'invoice.payment_failed':
    this.logger.warn(
      `Invoice payment failed: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'customer.subscription.created':
    this.logger.info(
      `Subscription created: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'customer.subscription.updated':
    this.logger.info(
      `Subscription updated: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'customer.subscription.deleted':
    this.logger.info(
      `Subscription deleted: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'payout.paid':
    this.logger.info(
      `Payout paid: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  case 'payout.failed':
    this.logger.error(
      `Payout failed: ${(event.data.object as any).id}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );
    break;
  default:
    this.logger.debug(
      `Unhandled Stripe event type: ${event.type}`,
      traceId,
      'handleStripe',
      LogStreamLevel.DebugLight,
    );
}


    // Logic for forwarding payload to Kafka would normally go here
    // await this.kafkaResponder.sendMessageAndWaitForResponse(
    //   StripeWebhookController.name,
    //   KT_PROCESS_STRIPE_WEBHOOK,
    //   { payload: rawBody.toString(), signature: sig } as StripeWebhookDto,
    //   traceId,
    // );

    this.logger.debug('Stripe webhook processed', traceId, 'handleStripe', LogStreamLevel.DebugLight);
    return { received: true };
  }
}
