import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { ZtrackingOrder } from '../../entities/ztracking_order.entity';
import { OrderService } from './services/order.service';
import { OrderKafkaService } from './services/order-kafka.service';
import { ProductService } from './services/product.service';
import { ZtrackingOrderService } from './services/ztracking-order.service';
import { PromotionCodesService } from './services/promotion-codes.service';
import { PromotionCodesKafkaService } from './services/promotion-codes-kafka.service';
import { StripeGatewayService } from './services/stripe-gateway.service';
import { OrderController } from './order.controller';
import { PromotionCodesController } from './promotion-codes.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ZtrackingOrder])],
  controllers: [OrderController, PromotionCodesController],
  providers: [
    OrderService,
    OrderKafkaService,
    ZtrackingOrderService,
    ProductService,
    PromotionCodesService,
    PromotionCodesKafkaService,
    StripeGatewayService,
  ],
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
