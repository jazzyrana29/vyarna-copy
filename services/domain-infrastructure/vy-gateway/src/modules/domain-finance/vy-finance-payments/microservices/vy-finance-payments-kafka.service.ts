import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
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
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
  CreatePaymentIntentPayloadDto,
  GetPaymentIntentDto,
  GetPaymentIntentStatusDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  CapturePaymentIntentDto,
  ConfirmPaymentIntentDto,
  StripeWebhookDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
  KT_RETRY_PAYMENT_ATTEMPT,
  RetryPaymentAttemptDto,
} from 'ez-utils';

@Injectable()
export class FinancePaymentsKafkaService {
  private readonly serviceName = FinancePaymentsKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentIntent(
    createPaymentIntentPayloadDto: CreatePaymentIntentPayloadDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PAYMENT_INTENT,
      createPaymentIntentPayloadDto,
      traceId,
    );
  }

  async getPaymentIntent(
    getPaymentIntentDto: GetPaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENT,
      getPaymentIntentDto,
      traceId,
    );
  }

  async getPaymentIntentStatus(
    getPaymentIntentStatusDto: GetPaymentIntentStatusDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENT_STATUS,
      getPaymentIntentStatusDto,
      traceId,
    );
  }

  async getZtrackingPaymentIntent(
    getZtrackingPaymentIntentDto: GetZtrackingPaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_PAYMENT_INTENT,
      getZtrackingPaymentIntentDto,
      traceId,
    );
  }

  async confirmPaymentIntent(
    confirmPaymentIntentDto: ConfirmPaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CONFIRM_PAYMENT_INTENT,
      confirmPaymentIntentDto,
      traceId,
    );
  }

  async capturePaymentIntent(
    capturePaymentIntentDto: CapturePaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CAPTURE_PAYMENT_INTENT,
      capturePaymentIntentDto,
      traceId,
    );
  }

  async createRefund(createRefundDto: CreateRefundDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_REFUND,
      createRefundDto,
      traceId,
    );
  }

  async getRefund(getPaymentRefundDto: GetPaymentRefundDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_REFUND,
      getPaymentRefundDto,
      traceId,
    );
  }

  async processStripeWebhook(
    stripeWebhookDto: StripeWebhookDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_PROCESS_STRIPE_WEBHOOK,
      stripeWebhookDto,
      traceId,
    );
  }

  async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PAYMENT_METHOD,
      createPaymentMethodDto,
      traceId,
    );
  }

  async listPaymentMethods(
    getPaymentMethodsDto: GetPaymentMethodsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_LIST_PAYMENT_METHODS,
      getPaymentMethodsDto,
      traceId,
    );
  }

  async deletePaymentMethod(
    deletePaymentMethodDto: DeletePaymentMethodDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_DELETE_PAYMENT_METHOD,
      deletePaymentMethodDto,
      traceId,
    );
  }


  async retryPaymentAttempt(
    retryPaymentAttemptDto: RetryPaymentAttemptDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_RETRY_PAYMENT_ATTEMPT,
      retryPaymentAttemptDto,
      traceId,
    );
  }
}
