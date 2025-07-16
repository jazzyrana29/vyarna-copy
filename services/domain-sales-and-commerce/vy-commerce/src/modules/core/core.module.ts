import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { ZtrackingOrder } from '../../entities/ztracking_order.entity';
import { Cart } from '../../entities/cart.entity';
import { CartItem } from '../../entities/cart_item.entity';
import { ProductVariant } from '../../entities/product_variant.entity';
import { Session } from '../../entities/session.entity';
import { OrderService } from './services/order.service';
import { OrderKafkaService } from './services/order-kafka.service';
import { ProductService } from './services/product.service';
import { ZtrackingOrderService } from './services/ztracking-order.service';
import { PromotionCodesService } from './services/promotion-codes.service';
import { PromotionCodesKafkaService } from './services/promotion-codes-kafka.service';
import { CartService } from './services/cart.service';
import { CartKafkaService } from './services/cart-kafka.service';
import { StripeGatewayService } from '../../services/stripe-gateway.service';
import { OrderController } from './order.controller';
import { PromotionCodesController } from './promotion-codes.controller';
import { CartController } from './cart.controller';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      ZtrackingOrder,
      Cart,
      CartItem,
      ProductVariant,
      Session,
    ]),
  ],
  controllers: [OrderController, PromotionCodesController, CartController],
  providers: [
    OrderService,
    OrderKafkaService,
    ZtrackingOrderService,
    ProductService,
    CartService,
    CartKafkaService,
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
