import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentIntent } from '../../entities/payment_intent.entity';
import { ZtrackingPaymentIntent } from '../../entities/ztracking_payment_intent.entity';
import { PaymentIntentService } from './services/payment-intent.service';
import { PaymentIntentKafkaService } from './services/payment-intent-kafka.service';
import { ZtrackingPaymentIntentService } from './services/ztracking-payment-intent.service';
import { PaymentController } from './payment.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentIntent, ZtrackingPaymentIntent])],
  controllers: [PaymentController],
  providers: [PaymentIntentService, PaymentIntentKafkaService, ZtrackingPaymentIntentService],
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
