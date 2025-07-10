import { Injectable } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import {
  KafkaMessageResponderService,
  KT_CREATE_ORDER,
  KT_GET_PRODUCTS,
  KT_GET_ORDERS,
  KT_GET_ZTRACKING_ORDER,
  CreateOrderDto,
  GetProductsDto,
  GetOrdersDto,
  GetZtrackingOrderDto,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class OrderKafkaService {
  public serviceName = OrderKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${OrderKafkaService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOrder(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_ORDER,
      message,
      key,
      async (value: CreateOrderDto, traceId: string) =>
        await this.orderService.createOrder(value, traceId),
    );
  }

  async getProducts(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_PRODUCTS,
      message,
      key,
      async (value: GetProductsDto, traceId: string) =>
        await this.productService.getProducts(value, traceId),
    );
  }

  async getOrders(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ORDERS,
      message,
      key,
      async (value: GetOrdersDto, traceId: string) =>
        await this.orderService.getOrders(value, traceId),
    );
  }

  async getZtrackingOrder(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_ZTRACKING_ORDER,
      message,
      key,
      async (value: GetZtrackingOrderDto, traceId: string) =>
        await this.orderService.getZtrackingOrder(value, traceId),
    );
  }

  async handlePaymentSucceeded(message: any, _key: string): Promise<void> {
    const { traceId, ...event } = message;
    await this.orderService.handlePaymentSucceeded(event, traceId);
  }

  async handlePaymentFailed(message: any, _key: string): Promise<void> {
    const { traceId, ...event } = message;
    await this.orderService.handlePaymentFailed(event, traceId);
  }
}
