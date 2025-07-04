import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentIntentKafkaService } from './services/payment-intent-kafka.service';
import {
  KT_CREATE_PAYMENT_INTENT,
  KT_GET_PAYMENT_INTENTS,
  KT_GET_ZTRACKING_PAYMENT_INTENT,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('payments')
export class PaymentController {
  private logger = getLoggerConfig(PaymentController.name);

  constructor(private readonly paymentKafkaService: PaymentIntentKafkaService) {
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

  @MessagePattern(KT_GET_PAYMENT_INTENTS)
  async getPaymentIntents(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_PAYMENT_INTENTS}`,
      '',
      'getPaymentIntents',
      LogStreamLevel.DebugLight,
    );
    await this.paymentKafkaService.getPaymentIntents(message, key);
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
}
