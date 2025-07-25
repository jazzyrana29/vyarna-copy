import { Injectable } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import {
  KafkaMessageResponderService,
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
  CreatePaymentIntentPayloadDto,
  GetPaymentIntentDto,
  GetPaymentIntentStatusDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  CapturePaymentIntentDto,
  ConfirmPaymentIntentDto,
  RetryPaymentAttemptDto,
  PaymentStatusUpdateDto,
  StripeWebhookDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PaymentIntentKafkaService {
  public serviceName = PaymentIntentKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly paymentIntentService: PaymentIntentService,
    private readonly ztrackingPaymentIntentService: ZtrackingPaymentIntentService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(
      `${PaymentIntentKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentIntent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PAYMENT_INTENT,
      message,
      key,
      async (value: CreatePaymentIntentPayloadDto, traceId: string) =>
        await this.paymentIntentService.createPaymentIntent(value, traceId),
    );
  }

  async getPaymentIntent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENT,
      message,
      key,
      async (value: GetPaymentIntentDto, traceId: string) =>
        await this.paymentIntentService.getPaymentIntent(value, traceId),
    );
  }

  async getPaymentIntentStatus(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENT_STATUS,
      message,
      key,
      async (value: GetPaymentIntentStatusDto, traceId: string) =>
        await this.paymentIntentService.getPaymentIntentStatus(value, traceId),
    );
  }

  async getZtrackingPaymentIntent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_PAYMENT_INTENT,
      message,
      key,
      async (value: GetZtrackingPaymentIntentDto, traceId: string) =>
        await this.ztrackingPaymentIntentService.getZtrackingForPaymentIntent(value, traceId),
    );
  }

  async confirmPaymentIntent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CONFIRM_PAYMENT_INTENT,
      message,
      key,
      async (value: ConfirmPaymentIntentDto, traceId: string) =>
        await this.paymentIntentService.confirmPaymentIntent(value, traceId),
    );
  }

  async capturePaymentIntent(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CAPTURE_PAYMENT_INTENT,
      message,
      key,
      async (value: CapturePaymentIntentDto, traceId: string) =>
        await this.paymentIntentService.capturePaymentIntent(value, traceId),
    );
  }

  async createRefund(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_REFUND,
      message,
      key,
      async (value: CreateRefundDto, traceId: string) =>
        await this.paymentIntentService.createRefund(value, traceId),
    );
  }

  async getRefund(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_REFUND,
      message,
      key,
      async (value: GetPaymentRefundDto, traceId: string) =>
        await this.paymentIntentService.getRefund(value, traceId),
    );
  }

  async updatePaymentStatus(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PAYMENT_STATUS_UPDATE,
      message,
      key,
      async (value: PaymentStatusUpdateDto, traceId: string) =>
        await this.paymentIntentService.updatePaymentStatus(value, traceId),
    );
  }

  async processStripeWebhook(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_PROCESS_STRIPE_WEBHOOK,
      message,
      key,
      async (value: StripeWebhookDto, traceId: string) =>
        await this.paymentIntentService.handleStripeWebhook(value, traceId),
    );
  }

  async retryPaymentAttempt(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RETRY_PAYMENT_ATTEMPT,
      message,
      key,
      async (value: RetryPaymentAttemptDto, traceId: string) =>
        await this.paymentIntentService.retryPaymentAttempt(value, traceId),
    );
  }
}
