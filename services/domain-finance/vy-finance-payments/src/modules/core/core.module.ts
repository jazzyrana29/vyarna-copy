import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { PaymentRefund } from '../../entities/payment_refund.entity';
import { PaymentAttempt } from '../../entities/payment_attempt.entity';
import { PaymentMethod } from '../../entities/payment_method.entity';
import { ZtrackingPaymentIntent } from '../../entities/ztracking_payment_intent.entity';
import { WebhookEvent } from '../../entities/webhook_event.entity';
import { PaymentIntentService } from './services/payment-intent.service';
import { PaymentIntentKafkaService } from './services/payment-intent-kafka.service';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodKafkaService } from './services/payment-method-kafka.service';
import { ZtrackingPaymentIntentService } from './services/ztracking-payment-intent.service';
import { StripeGatewayService } from './services/stripe-gateway.service';
import { PaymentController } from './payment.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentIntent,
      PaymentRefund,
      PaymentAttempt,
      ZtrackingPaymentIntent,
      PaymentMethod,
      WebhookEvent,
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentIntentService,
    PaymentIntentKafkaService,
    ZtrackingPaymentIntentService,
    StripeGatewayService,
    PaymentMethodService,
    PaymentMethodKafkaService,
  ],
})
export class CoreModule {
  private logger = getLoggerConfig(CoreModule.name);
  constructor() {
    this.logger.debug(
      `${CoreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
