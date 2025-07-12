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
import {
  generateTraceId,
  KT_PROCESS_STRIPE_WEBHOOK,
  KT_PAYMENT_STATUS_UPDATE,
  PaymentStatusUpdatePayload,
} from 'ez-utils';
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
  async handleStripe(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    const traceId = generateTraceId('stripeWebhook');
    // const rawBody = (req as any).rawBody;
    const rawBody = req.body;
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        this.endpointSecret,
      );
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
      case 'payment_intent.processing': {
        const pi = event.data.object as Stripe.PaymentIntent;
        this.logger.info(
          `Processing intent ${pi.id}: ${JSON.stringify(pi)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        const responseProcessing =
          await this.kafkaResponder.sendMessageAndWaitForResponse(
            StripeWebhookController.name,
            KT_PAYMENT_STATUS_UPDATE,
            {
              sessionId: pi.metadata?.sessionId,
              paymentIntentId: pi.id,
              customerEmail: pi.customer_details?.email || '',
              status: 'processing',
            } as PaymentStatusUpdatePayload,
            traceId,
          );
        this.logger.debug(
          `Kafka response: ${JSON.stringify(responseProcessing)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.DebugLight,
        );
        break;
      }
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        this.logger.info(
          `Intent succeeded ${pi.id}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        const responseSucceeded =
          await this.kafkaResponder.sendMessageAndWaitForResponse(
            StripeWebhookController.name,
            KT_PAYMENT_STATUS_UPDATE,
            {
              sessionId: pi.metadata?.sessionId,
              paymentIntentId: pi.id,
              customerEmail: pi.customer_details?.email || '',
              status: 'succeeded',
            } as PaymentStatusUpdatePayload,
            traceId,
          );
        this.logger.debug(
          `Kafka response: ${JSON.stringify(responseSucceeded)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.DebugLight,
        );
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const lastError = pi.last_payment_error;
        this.logger.warn(
          `Intent failed ${pi.id}: ${JSON.stringify(pi)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        const responseFailed =
          await this.kafkaResponder.sendMessageAndWaitForResponse(
            StripeWebhookController.name,
            KT_PAYMENT_STATUS_UPDATE,
            {
              sessionId: pi.metadata?.sessionId,
              paymentIntentId: pi.id,
              customerEmail: pi.customer_details?.email || '',
              status: 'failed',
              error: lastError?.message,
            } as PaymentStatusUpdatePayload,
            traceId,
          );
        this.logger.debug(
          `Kafka response: ${JSON.stringify(responseFailed)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.DebugLight,
        );
        break;
      }
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

    this.logger.debug(
      'Stripe webhook processed',
      traceId,
      'handleStripe',
      LogStreamLevel.DebugLight,
    );
    return { received: true };
  }
}
