import { Injectable } from '@nestjs/common';
import {
  KafkaMessageResponderService,
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_RESET_CART,
  KT_APPLY_CART_PROMOTION,
  KT_GET_CART,
  CreateCartDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  ResetCartDto,
  ApplyCartPromotionDto,
  GetCartDto,
} from 'ez-utils';
import { CartService } from './cart.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class CartKafkaService {
  public serviceName = CartKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);
  private kafkaResponder: KafkaMessageResponderService;

  constructor(private readonly cartService: CartService) {
    this.kafkaResponder = new KafkaMessageResponderService(
      process.env.KAFKA_BROKER,
    );
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createCart(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_CREATE_CART,
      message,
      key,
      async (value: CreateCartDto, traceId: string) =>
        await this.cartService.createCart(value, traceId),
    );
  }

  async addCartItem(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_ADD_CART_ITEM,
      message,
      key,
      async (value: CreateCartItemDto, traceId: string) =>
        await this.cartService.addCartItem(value, traceId),
    );
  }

  async removeCartItem(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_REMOVE_CART_ITEM,
      message,
      key,
      async (value: DeleteCartItemDto, traceId: string) =>
        await this.cartService.removeCartItem(value, traceId),
    );
  }

  async applyCartPromotion(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_APPLY_CART_PROMOTION,
      message,
      key,
      async (value: ApplyCartPromotionDto, traceId: string) =>
        await this.cartService.applyCartPromotion(value, traceId),
    );
  }

  async getCart(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_GET_CART,
      message,
      key,
      async (value: GetCartDto, traceId: string) =>
        await this.cartService.getCart(value, traceId),
    );
  }

  async resetCart(message: any, key: string): Promise<void> {
    await this.kafkaResponder.produceKafkaResponse(
      this.serviceName,
      KT_RESET_CART,
      message,
      key,
      async (value: ResetCartDto, traceId: string) =>
        await this.cartService.resetCart(value, traceId),
    );
  }
}
