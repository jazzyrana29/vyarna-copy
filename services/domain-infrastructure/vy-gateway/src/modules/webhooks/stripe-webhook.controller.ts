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
  PaymentStatusUpdatePayloadDto,
} from 'ez-utils';
import { WebhooksKafkaService } from './microservices/webhooks-kafka.service';
import { FinancePaymentsWebsocket } from '../domain-finance/vy-finance-payments/vy-finance-payments.gateway';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('webhooks')
export class StripeWebhookController {
  private logger = getLoggerConfig(StripeWebhookController.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  private endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  constructor(
    private readonly webhooksKafkaService: WebhooksKafkaService,
    private readonly paymentsWs: FinancePaymentsWebsocket,
  ) {}

  @Post(KT_PROCESS_STRIPE_WEBHOOK)
  @HttpCode(200)
  async handleStripe(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    const traceId = generateTraceId('stripeWebhook');
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
          `Processing intent ${pi.metadata?.localId || ''}: ${JSON.stringify(pi)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        try {
          const responseProcessing =
            await this.webhooksKafkaService.updatePaymentStatus(
              {
                sessionId: pi.metadata?.sessionId,
                paymentIntentId: pi.metadata?.localId || '',
                customerEmail: pi.receipt_email || '',
                status: 'processing',
              } as PaymentStatusUpdatePayloadDto,
              traceId,
            );
          this.logger.debug(
            `Kafka response: ${JSON.stringify(responseProcessing)}`,
            traceId,
            'handleStripe',
            LogStreamLevel.DebugLight,
          );
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-result`, responseProcessing);
        } catch (e: any) {
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-error`, e.message || 'Unknown error');
          this.logger.warn(
            e.message || 'Unknown error',
            traceId,
            'handleStripe',
            LogStreamLevel.ProdStandard,
          );
        }
        break;
      }
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        this.logger.info(
          `Intent succeeded ${pi.metadata?.localId || ''}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        try {
          const responseSucceeded =
            await this.webhooksKafkaService.updatePaymentStatus(
              {
                sessionId: pi.metadata?.sessionId,
                paymentIntentId: pi.metadata?.localId || '',
                customerEmail: pi.receipt_email || '',
                status: 'succeeded',
              } as PaymentStatusUpdatePayloadDto,
              traceId,
            );
          this.logger.debug(
            `Kafka response: ${JSON.stringify(responseSucceeded)}`,
            traceId,
            'handleStripe',
            LogStreamLevel.DebugLight,
          );
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-result`, responseSucceeded);
        } catch (e: any) {
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-error`, e.message || 'Unknown error');
          this.logger.warn(
            e.message || 'Unknown error',
            traceId,
            'handleStripe',
            LogStreamLevel.ProdStandard,
          );
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const lastError = pi.last_payment_error;
        this.logger.warn(
          `Intent failed ${pi.metadata?.localId || ''}: ${JSON.stringify(pi)}`,
          traceId,
          'handleStripe',
          LogStreamLevel.ProdStandard,
        );
        try {
          const responseFailed =
            await this.webhooksKafkaService.updatePaymentStatus(
              {
                sessionId: pi.metadata?.sessionId,
                paymentIntentId: pi.metadata?.localId || '',
                customerEmail: pi.receipt_email || '',
                status: 'failed',
                error: lastError?.message,
              } as PaymentStatusUpdatePayloadDto,
              traceId,
            );
          this.logger.debug(
            `Kafka response: ${JSON.stringify(responseFailed)}`,
            traceId,
            'handleStripe',
            LogStreamLevel.DebugLight,
          );
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-result`, responseFailed);
        } catch (e: any) {
          this.paymentsWs.server
            .to(pi.metadata?.localId || pi.id)
            .emit(`${KT_PAYMENT_STATUS_UPDATE}-error`, e.message || 'Unknown error');
          this.logger.warn(
            e.message || 'Unknown error',
            traceId,
            'handleStripe',
            LogStreamLevel.ProdStandard,
          );
        }
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

    this.logger.debug(
      'Stripe webhook processed',
      traceId,
      'handleStripe',
      LogStreamLevel.DebugLight,
    );
    return { received: true };
  }
}
