import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { ZtrackingPaymentIntent } from '../../entities/ztracking_payment_intent.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentIntentKafkaService } from './payment-intent-kafka.service';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { PaymentIntentController } from './payment-intent.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentIntent,
      PaymentRefund,
      PaymentAttempt,
      ZtrackingPaymentIntent,
      WebhookEvent,
    ]),
  ],
  controllers: [PaymentIntentController],
  providers: [
    PaymentIntentService,
    PaymentIntentKafkaService,
    ZtrackingPaymentIntentService,
    StripeGatewayService,
  ],
  exports: [PaymentIntentService, PaymentIntentKafkaService],
})
export class PaymentIntentModule {
  private logger = getLoggerConfig(PaymentIntentModule.name);
  constructor() {
    this.logger.debug(
      `${PaymentIntentModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
