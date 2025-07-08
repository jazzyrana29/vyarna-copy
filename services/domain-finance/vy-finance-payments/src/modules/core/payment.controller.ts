import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentIntentKafkaService } from './services/payment-intent-kafka.service';
import { PaymentMethodKafkaService } from './services/payment-method-kafka.service';
import {
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENT,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  KT_CREATE_REFUND,
  KT_GET_REFUND,
  KT_PROCESS_STRIPE_WEBHOOK,
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('payments')
export class PaymentController {
  private logger = getLoggerConfig(PaymentController.name);

  constructor(
    private readonly paymentKafkaService: PaymentIntentKafkaService,
    private readonly paymentMethodKafkaService: PaymentMethodKafkaService,
  ) {
    this.logger.debug(
      `${PaymentController.name} initialized`,
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

  @MessagePattern(KT_CREATE_PAYMENT_METHOD)
  async createPaymentMethod(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_PAYMENT_METHOD}`,
      '',
      'createPaymentMethod',
      LogStreamLevel.DebugLight,
    );
    await this.paymentMethodKafkaService.createPaymentMethod(message, key);
  }

  @MessagePattern(KT_LIST_PAYMENT_METHODS)
  async listPaymentMethods(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_LIST_PAYMENT_METHODS}`,
      '',
      'listPaymentMethods',
      LogStreamLevel.DebugLight,
    );
    await this.paymentMethodKafkaService.listPaymentMethods(message, key);
  }

  @MessagePattern(KT_DELETE_PAYMENT_METHOD)
  async deletePaymentMethod(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_DELETE_PAYMENT_METHOD}`,
      '',
      'deletePaymentMethod',
      LogStreamLevel.DebugLight,
    );
    await this.paymentMethodKafkaService.deletePaymentMethod(message, key);
  }
}
