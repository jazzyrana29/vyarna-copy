import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
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
  CreatePaymentIntentDto,
  GetPaymentIntentDto,
  GetZtrackingPaymentIntentDto,
  CreateRefundDto,
  GetPaymentRefundDto,
  StripeWebhookDto,
  RefundDto,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
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
    createDto: CreatePaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_PAYMENT_INTENT,
      createDto,
      traceId,
    );
  }

  async getPaymentIntent(getDto: GetPaymentIntentDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENT,
      getDto,
      traceId,
    );
  }

  async getZtrackingPaymentIntent(
    getDto: GetZtrackingPaymentIntentDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_PAYMENT_INTENT,
      getDto,
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

  async getRefund(
    getPaymentRefundDto: GetPaymentRefundDto,
    traceId: string,
  ) {
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
}
