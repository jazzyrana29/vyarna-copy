import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { ZtrackingOrder } from '../../entities/ztracking_order.entity';
import { OrderService } from './services/order.service';
import { OrderKafkaService } from './services/order-kafka.service';
import { ZtrackingOrderService } from './services/ztracking-order.service';
import { OrderController } from './order.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ZtrackingOrder])],
  controllers: [OrderController],
  providers: [OrderService, OrderKafkaService, ZtrackingOrderService],
})
export class CoreModule {
  private logger = getLoggerConfig(CoreModule.name);
  constructor() {
    this.logger.debug(
      `${CoreModule.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }
}
