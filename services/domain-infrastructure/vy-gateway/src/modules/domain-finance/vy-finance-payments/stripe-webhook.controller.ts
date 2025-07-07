import { Controller, Post, Headers, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { FinancePaymentsKafkaService } from './microservices/vy-finance-payments-kafka.service';
import { generateTraceId, StripeWebhookDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('vy-finance-payments/webhooks')
export class StripeWebhookController {
  private logger = getLoggerConfig(StripeWebhookController.name);

  constructor(private readonly paymentsKafka: FinancePaymentsKafkaService) {}

  @Post('stripe')
  @HttpCode(200)
  async handleStripe(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const traceId = generateTraceId('stripeWebhook');
    const payload = (req as any).rawBody || req.body;
    await this.paymentsKafka.processStripeWebhook({ payload: payload.toString(), signature: sig } as StripeWebhookDto, traceId);
    this.logger.debug('Stripe webhook forwarded', traceId, 'handleStripe', LogStreamLevel.DebugLight);
    return { received: true };
  }
}
