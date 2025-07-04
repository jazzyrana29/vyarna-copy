import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './services/order.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('commerce')
export class OrderController {
  private logger = getLoggerConfig(OrderController.name);

  constructor(private readonly orderService: OrderService) {
    this.logger.debug(
      `${OrderController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern('order.create')
  async create(@Payload() data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.orderService.create(data, key);
  }

  @MessagePattern('order.list')
  async list(@Payload() _data: any, @Ctx() context: KafkaContext): Promise<void> {
    const key = context.getMessage().key.toString();
    await this.orderService.findAll(key);
  }
}
