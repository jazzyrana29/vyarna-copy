import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentIntentKafkaService } from './payment-intent-kafka.service';
import {
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_PROCESS_STRIPE_WEBHOOK,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('payments')
export class PaymentIntentController {
  private logger = getLoggerConfig(PaymentIntentController.name);

  constructor(private readonly paymentKafkaService: PaymentIntentKafkaService) {
    this.logger.debug(
      `${PaymentIntentController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PAYMENT_INTENT)
  async createPaymentIntent(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PAYMENT_INTENT}`,
      '',
      'createPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.createPaymentIntent(message, key);
  }

  @MessagePattern(KT_GET_PAYMENT_INTENT)
  async getPaymentIntent(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PAYMENT_INTENT}`,
      '',
      'getPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getPaymentIntent(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_PAYMENT_INTENT)
  async getZtrackingPaymentIntent(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_PAYMENT_INTENT}`,
      '',
      'getZtrackingPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getZtrackingPaymentIntent(message, key);
  }

  @MessagePattern(KT_CREATE_REFUND)
  async createRefund(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_REFUND}`,
      '',
      'createRefund',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.createRefund(message, key);
  }

  @MessagePattern(KT_GET_REFUND)
  async getRefund(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_REFUND}`,
      '',
      'getRefund',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getRefund(message, key);
  }

  @MessagePattern(KT_PROCESS_STRIPE_WEBHOOK)
  async processStripeWebhook(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PROCESS_STRIPE_WEBHOOK}`,
      '',
      'processStripeWebhook',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.processStripeWebhook(message, key);
  }
}
