import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { OrderKafkaService } from './services/order-kafka.service';
import {
  KT_CREATE_ORDER,
  KT_GET_ORDERS,
  KT_GET_ZTRACKING_ORDER,
} from 'ez-utils';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('commerce')
export class OrderController {
  private logger = getLoggerConfig(OrderController.name);

  constructor(private readonly orderKafkaService: OrderKafkaService) {
    this.logger.debug(
      `${OrderController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_ORDER)
  async createOrderWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_ORDER}`,
      '',
      'createOrderWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.orderKafkaService.createOrder(message, key);
  }

  @MessagePattern(KT_GET_ORDERS)
  async getOrdersWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ORDERS}`,
      '',
      'getOrdersWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.orderKafkaService.getOrders(message, key);
  }

  @MessagePattern(KT_GET_ZTRACKING_ORDER)
  async getZtrackingOrderWithKafka(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_ZTRACKING_ORDER}`,
      '',
      'getZtrackingOrderWithKafka',
      LogStreamLevel.DebugLight,
    );
    await this.orderKafkaService.getZtrackingOrder(message, key);
  }
}
