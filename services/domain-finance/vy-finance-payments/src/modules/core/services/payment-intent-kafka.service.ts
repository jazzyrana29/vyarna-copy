import { Injectable } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { ZtrackingPaymentIntentService } from './ztracking-payment-intent.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENTS,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
  CreatePaymentIntentDto,
  GetPaymentIntentsDto,
  GetZtrackingPaymentIntentDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
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
      async (value: CreatePaymentIntentDto, traceId: string) =>
        await this.paymentIntentService.createPaymentIntent(value, traceId),
    );
  }

  async getPaymentIntents(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PAYMENT_INTENTS,
      message,
      key,
      async (value: GetPaymentIntentsDto, traceId: string) =>
        await this.paymentIntentService.getPaymentIntents(value, traceId),
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
}
