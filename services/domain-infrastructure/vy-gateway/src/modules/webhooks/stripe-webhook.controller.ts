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
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2020-08-27',
  });
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
      case 'charge.refunded':
        this.logger.info(
          `Charge refunded: ${(event.data.object as any).id}`,
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
