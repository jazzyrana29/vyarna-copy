import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from '../../entities/payment_method.entity';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodKafkaService } from './payment-method-kafka.service';
import { StripeGatewayService } from '../stripe-gateway.service';
import { PaymentMethodController } from './payment-method.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodKafkaService, StripeGatewayService],
  exports: [PaymentMethodService, PaymentMethodKafkaService],
})
export class PaymentMethodModule {
  private logger = getLoggerConfig(PaymentMethodModule.name);
  constructor() {
    this.logger.debug(
      `${PaymentMethodModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
