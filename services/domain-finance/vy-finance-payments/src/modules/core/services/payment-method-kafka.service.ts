import { Injectable } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { KafkaMessageResponderService,
  KT_CREATE_PAYMENT_METHOD,
  KT_LIST_PAYMENT_METHODS,
  KT_DELETE_PAYMENT_METHOD,
  CreatePaymentMethodDto,
  GetPaymentMethodsDto,
  DeletePaymentMethodDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class PaymentMethodKafkaService {
  public serviceName = PaymentMethodKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly methodService: PaymentMethodService) {
    this.kafkaResponder = new KafkaMessageResponderService(process.env.KAFKA_BROKER);
    this.logger.debug(
      `${PaymentMethodKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createPaymentMethod(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_PAYMENT_METHOD,
      message,
      key,
      async (value: CreatePaymentMethodDto, traceId: string) =>
        await this.methodService.createPaymentMethod(value, traceId),
    );
  }

  async listPaymentMethods(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_LIST_PAYMENT_METHODS,
      message,
      key,
      async (value: GetPaymentMethodsDto, traceId: string) =>
        await this.methodService.listPaymentMethods(value, traceId),
    );
  }

  async deletePaymentMethod(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_DELETE_PAYMENT_METHOD,
      message,
      key,
      async (value: DeletePaymentMethodDto, traceId: string) =>
        await this.methodService.deletePaymentMethod(value, traceId),
    );
  }
}
