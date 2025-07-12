import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PaymentIntentKafkaService } from './payment-intent-kafka.service';
import {
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT_STATUS,
  KT_CONFIRM_PAYMENT_INTENT,
  KT_CAPTURE_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_PROCESS_STRIPE_WEBHOOK,
  KT_PAYMENT_STATUS_UPDATE,
  KT_RETRY_PAYMENT_ATTEMPT,
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
  async createPaymentIntent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
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
  async getPaymentIntent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PAYMENT_INTENT}`,
      '',
      'getPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getPaymentIntent(message, key);
  }

  @MessagePattern(KT_GET_PAYMENT_INTENT_STATUS)
  async getPaymentIntentStatus(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PAYMENT_INTENT_STATUS}`,
      '',
      'getPaymentIntentStatus',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getPaymentIntentStatus(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_PAYMENT_INTENT)
  async getZtrackingPaymentIntent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_PAYMENT_INTENT}`,
      '',
      'getZtrackingPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getZtrackingPaymentIntent(message, key);
  }

  @MessagePattern(KT_CONFIRM_PAYMENT_INTENT)
  async confirmPaymentIntent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CONFIRM_PAYMENT_INTENT}`,
      '',
      'confirmPaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.confirmPaymentIntent(message, key);
  }

  @MessagePattern(KT_CAPTURE_PAYMENT_INTENT)
  async capturePaymentIntent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CAPTURE_PAYMENT_INTENT}`,
      '',
      'capturePaymentIntent',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.capturePaymentIntent(message, key);
  }

  @MessagePattern(KT_CREATE_REFUND)
  async createRefund(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
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
  async getRefund(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_REFUND}`,
      '',
      'getRefund',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getRefund(message, key);
  }

  @MessagePattern(KT_PAYMENT_STATUS_UPDATE)
  async handlePaymentStatusUpdate(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PAYMENT_STATUS_UPDATE}`,
      '',
      'handlePaymentStatusUpdate',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.updatePaymentStatus(message, key);
  }

  @MessagePattern(KT_PROCESS_STRIPE_WEBHOOK)
  async processStripeWebhook(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_PROCESS_STRIPE_WEBHOOK}`,
      '',
      'processStripeWebhook',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.processStripeWebhook(message, key);
  }

  @MessagePattern(KT_RETRY_PAYMENT_ATTEMPT)
  async retryPaymentAttempt(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_RETRY_PAYMENT_ATTEMPT}`,
      '',
      'retryPaymentAttempt',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.retryPaymentAttempt(message, key);
  }
}
