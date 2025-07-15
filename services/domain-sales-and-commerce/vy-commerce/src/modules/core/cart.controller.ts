import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import {
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_APPLY_CART_PROMOTION,
  KT_GET_CART,
} from 'ez-utils';
import { CartKafkaService } from './services/cart-kafka.service';
import { getLoggerConfig } from '../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller('commerce')
export class CartController {
  private logger = getLoggerConfig(CartController.name);

  constructor(private readonly cartKafkaService: CartKafkaService) {
    this.logger.debug(
      `${CartController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_CREATE_CART)
  async createCart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_CREATE_CART}`,
      '',
      'createCart',
      LogStreamLevel.DebugLight,
    );
    await this.cartKafkaService.createCart(message, key);
  }

  @MessagePattern(KT_ADD_CART_ITEM)
  async addCartItem(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_ADD_CART_ITEM}`,
      '',
      'addCartItem',
      LogStreamLevel.DebugLight,
    );
    await this.cartKafkaService.addCartItem(message, key);
  }

  @MessagePattern(KT_REMOVE_CART_ITEM)
  async removeCartItem(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_REMOVE_CART_ITEM}`,
      '',
      'removeCartItem',
      LogStreamLevel.DebugLight,
    );
    await this.cartKafkaService.removeCartItem(message, key);
  }

  @MessagePattern(KT_APPLY_CART_PROMOTION)
  async applyPromotion(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_APPLY_CART_PROMOTION}`,
      '',
      'applyPromotion',
      LogStreamLevel.DebugLight,
    );
    await this.cartKafkaService.applyCartPromotion(message, key);
  }

  @MessagePattern(KT_GET_CART)
  async getCart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Message Pattern hit for kafka topic : ${KT_GET_CART}`,
      '',
      'getCart',
      LogStreamLevel.DebugLight,
    );
    await this.cartKafkaService.getCart(message, key);
  }
}
