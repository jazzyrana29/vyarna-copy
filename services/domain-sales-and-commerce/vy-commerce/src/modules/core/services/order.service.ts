import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EzKafkaProducer } from 'ez-kafka-producer';
import { encodeKafkaMessage } from 'ez-utils';
import { Order } from '../../../entities/order.entity';
import { ZtrackingOrderService } from './ztracking-order.service';
import {
  CreateOrderDto,
  OrderDto,
  GetOrdersDto,
  GetZtrackingOrderDto,
  ZtrackingOrderDto,
  KT_CAPTURE_PAYMENT_INTENT,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class OrderService {
  private logger = getLoggerConfig(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly ztrackingOrderService: ZtrackingOrderService,
  ) {
    this.logger.debug(
      `${OrderService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    traceId: string,
  ): Promise<OrderDto> {
    const entity = this.orderRepo.create(createOrderDto);
    await this.orderRepo.save(entity);
    this.logger.info(
      'Order created',
      traceId,
      'createOrder',
      LogStreamLevel.ProdStandard,
    );

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      'OrderCreated',
      encodeKafkaMessage(OrderService.name, { orderId: entity.orderId, traceId }),
    );

    await new EzKafkaProducer().produce(
      process.env.KAFKA_BROKER as string,
      'PaymentRequested',
      encodeKafkaMessage(OrderService.name, {
        orderId: entity.orderId,
        paymentIntentId: entity.paymentIntentId,
        traceId,
      }),
    );

    await this.ztrackingOrderService.createZtrackingForOrder(entity, traceId);

    return entity;
  }

  async getOrders(
    getOrdersDto: GetOrdersDto,
    traceId: string,
  ): Promise<OrderDto[]> {
    const list = await this.orderRepo.find();
    this.logger.info(
      `Retrieved ${list.length} orders`,
      traceId,
      'getOrders',
      LogStreamLevel.DebugLight,
    );
    return list;
  }

  async getZtrackingOrder(
    getZtrackingOrderDto: GetZtrackingOrderDto,
    traceId: string,
  ): Promise<ZtrackingOrderDto[]> {
    return this.ztrackingOrderService.getZtrackingForOrder(
      getZtrackingOrderDto,
      traceId,
    );
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
    traceId: string,
  ): Promise<void> {
    const order = await this.orderRepo.findOne({ where: { orderId } });
    await this.orderRepo.update({ orderId }, { status });
    this.logger.info(
      `Order ${orderId} status updated to ${status}`,
      traceId,
      'updateOrderStatus',
      LogStreamLevel.ProdStandard,
    );
    if (status === 'READY_TO_SHIP' && order?.paymentIntentId) {
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        KT_CAPTURE_PAYMENT_INTENT,
        encodeKafkaMessage(OrderService.name, {
          paymentIntentId: order.paymentIntentId,
          traceId,
        }),
      );
    }
  }

  async handlePaymentSucceeded(
    event: { orderId?: string; paymentIntentId: string },
    traceId: string,
  ): Promise<void> {
    if (event.orderId) {
      await this.updateOrderStatus(event.orderId, 'PAID', traceId);
      await new EzKafkaProducer().produce(
        process.env.KAFKA_BROKER as string,
        'OrderPaid',
        encodeKafkaMessage(OrderService.name, {
          orderId: event.orderId,
          traceId,
        }),
      );
    }
  }

  async handlePaymentFailed(
    event: { orderId?: string; paymentIntentId: string },
    traceId: string,
  ): Promise<void> {
    if (event.orderId) {
      await this.updateOrderStatus(event.orderId, 'PAYMENT_FAILED', traceId);
    }
  }
}
