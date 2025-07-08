import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentMethodKafkaService } from './payment-method-kafka.service';
import { KT_CREATE_PAYMENT_METHOD, KT_LIST_PAYMENT_METHODS, KT_DELETE_PAYMENT_METHOD } from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('payments')
export class PaymentMethodController {
  private logger = getLoggerConfig(PaymentMethodController.name);

  constructor(private readonly paymentMethodKafkaService: PaymentMethodKafkaService) {
    this.logger.debug(
      `${PaymentMethodController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_PAYMENT_METHOD)
  async createPaymentMethod(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
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
  async listPaymentMethods(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
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
  async deletePaymentMethod(@Payload() message: any, @Ctx() context: KafkaContext): Promise<void> {
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
