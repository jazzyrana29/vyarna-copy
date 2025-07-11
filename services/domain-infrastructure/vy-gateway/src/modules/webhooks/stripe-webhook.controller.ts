import { Controller, Post, Headers, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { generateTraceId, StripeWebhookDto, KT_PROCESS_STRIPE_WEBHOOK } from 'ez-utils';
import { KafkaResponderService } from '../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('webhooks')
export class StripeWebhookController {
  private logger = getLoggerConfig(StripeWebhookController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {}

  @Post(KT_PROCESS_STRIPE_WEBHOOK)
  @HttpCode(200)
  async handleStripe(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const traceId = generateTraceId('stripeWebhook');
    const payload = (req as any).rawBody || req.body;

    // Log incoming payload for debugging and auditing
    this.logger.info(
      `Stripe webhook received: ${payload}`,
      traceId,
      'handleStripe',
      LogStreamLevel.ProdStandard,
    );

    // Logic for forwarding payload to Kafka would normally go here
    // await this.kafkaResponder.sendMessageAndWaitForResponse(
    //   StripeWebhookController.name,
    //   KT_PROCESS_STRIPE_WEBHOOK,
    //   { payload: payload.toString(), signature: sig } as StripeWebhookDto,
    //   traceId,
    // );

    this.logger.debug('Stripe webhook processed', traceId, 'handleStripe', LogStreamLevel.DebugLight);
    return { received: true };
  }
}
