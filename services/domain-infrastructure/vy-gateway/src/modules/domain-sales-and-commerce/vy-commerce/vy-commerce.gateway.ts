import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesCommerceKafkaService } from './microservices/vy-commerce-kafka.service';
import {
  ApplyCartPromotionDto,
  CreateCartDto,
  CreateCartItemDto,
  CreateOrderDto,
  CreateSubscriptionDto,
  DeleteCartItemDto,
  ResetCartDto,
  DeleteSubscriptionDto,
  generateTraceId,
  GetCategoriesDto,
  GetProductsDto,
  GetProductVariantsDto,
  GetSubscriptionDto,
  GetZtrackingOrderDto,
  GetCartDto,
  JoinRoomDto,
  KT_ADD_CART_ITEM,
  KT_APPLY_CART_PROMOTION,
  KT_CANCEL_SUBSCRIPTION,
  KT_CREATE_CART,
  KT_CREATE_ORDER,
  KT_CREATE_SUBSCRIPTION,
  KT_GET_CATEGORIES,
  KT_GET_PRODUCT_VARIANTS,
  KT_GET_PRODUCTS,
  KT_GET_CART,
  KT_GET_SUBSCRIPTION,
  KT_GET_ZTRACKING_ORDER,
  KT_REMOVE_CART_ITEM,
  KT_RESET_CART,
  KT_UPDATE_ORDER_SHIPPING,
  KT_VALIDATE_PROMOTION_CODE,
  UpdateOrderShippingDto,
  ValidatePromotionCodeDto,
} from 'ez-utils';
import { CORS_ALLOW, getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@WebSocketGateway({ namespace: 'sales-commerce', cors: CORS_ALLOW })
export class SalesCommerceWebsocket implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger = getLoggerConfig(SalesCommerceWebsocket.name);

  constructor(private readonly kafkaService: SalesCommerceKafkaService) {}

  afterInit() {
    this.logger.debug(
      `${SalesCommerceWebsocket.name} initialized`,
      '',
      'afterInit',
      LogStreamLevel.DebugLight,
    );
  }

  handleConnection(socket: Socket) {
    this.logger.debug(
      `Client connected: ${socket.id}`,
      '',
      'handleConnection',
      LogStreamLevel.DebugLight,
    );
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(
      `Client disconnected: ${socket.id}`,
      '',
      'handleDisconnect',
      LogStreamLevel.DebugLight,
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() joinRoomDto: JoinRoomDto,
  ) {
    const { room } = joinRoomDto;
    if (room) {
      socket.join(room);
      this.logger.debug(
        `Socket ${socket.id} joined room ${room}`,
        '',
        'handleJoin',
        LogStreamLevel.DebugLight,
      );
      socket.emit('join-result', { room, success: true });
    } else {
      socket.emit('join-error', { message: 'Room field is required' });
    }
  }

  @SubscribeMessage(KT_GET_PRODUCTS)
  async getProducts(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getProductsDto: GetProductsDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-products');
    try {
      const result = await this.kafkaService.getProducts(
        getProductsDto,
        traceId,
      );
      socket.emit(`${KT_GET_PRODUCTS}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_PRODUCTS}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_PRODUCT_VARIANTS)
  async getProductVariants(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getProductVariantsDto: GetProductVariantsDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-product-variants');
    try {
      const result = await this.kafkaService.getProductVariants(
        getProductVariantsDto,
        traceId,
      );
      socket.emit(`${KT_GET_PRODUCT_VARIANTS}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_PRODUCT_VARIANTS}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_CATEGORIES)
  async getCategories(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getCategoriesDto: GetCategoriesDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-categories');
    try {
      const result = await this.kafkaService.getCategories(
        getCategoriesDto,
        traceId,
      );
      socket.emit(`${KT_GET_CATEGORIES}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_CATEGORIES}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_CART)
  async createCart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createCartDto: CreateCartDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-cart');
    try {
      const result = await this.kafkaService.createCart(createCartDto, traceId);
      socket.emit(`${KT_CREATE_CART}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_CART}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_ADD_CART_ITEM)
  async addCartItem(
    @ConnectedSocket() socket: Socket,
    @MessageBody() addCartItemDto: CreateCartItemDto,
  ) {
    const traceId = generateTraceId('sales-commerce-add-cart-item');
    try {
      const result = await this.kafkaService.addCartItem(
        addCartItemDto,
        traceId,
      );
      socket.emit(`${KT_ADD_CART_ITEM}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_ADD_CART_ITEM}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_REMOVE_CART_ITEM)
  async removeCartItem(
    @ConnectedSocket() socket: Socket,
    @MessageBody() removeCartItemDto: DeleteCartItemDto,
  ) {
    const traceId = generateTraceId('sales-commerce-remove-cart-item');
    try {
      const result = await this.kafkaService.removeCartItem(
        removeCartItemDto,
        traceId,
      );
      socket.emit(`${KT_REMOVE_CART_ITEM}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_REMOVE_CART_ITEM}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_RESET_CART)
  async resetCart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() resetCartDto: ResetCartDto,
  ) {
    const traceId = generateTraceId('sales-commerce-reset-cart');
    try {
      const result = await this.kafkaService.resetCart(resetCartDto, traceId);
      socket.emit(`${KT_RESET_CART}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_RESET_CART}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_APPLY_CART_PROMOTION)
  async applyPromotion(
    @ConnectedSocket() socket: Socket,
    @MessageBody() applyCartPromotionDto: ApplyCartPromotionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-apply-cart-promotion');
    try {
      const result = await this.kafkaService.applyCartPromotion(
        applyCartPromotionDto,
        traceId,
      );
      socket.emit(`${KT_APPLY_CART_PROMOTION}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_APPLY_CART_PROMOTION}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_CART)
  async getCart(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getCartDto: GetCartDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-cart');
    try {
      const result = await this.kafkaService.getCart(getCartDto, traceId);
      socket.emit(`${KT_GET_CART}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_CART}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CREATE_ORDER)
  async createOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createOrderDto: CreateOrderDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-order');
    try {
      const result = await this.kafkaService.createOrder(
        createOrderDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_ORDER}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_CREATE_ORDER}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_GET_ZTRACKING_ORDER)
  async getOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getZtrackingOrderDto: GetZtrackingOrderDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-order');
    try {
      const result = await this.kafkaService.getOrder(
        getZtrackingOrderDto,
        traceId,
      );
      socket.emit(`${KT_GET_ZTRACKING_ORDER}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_GET_ZTRACKING_ORDER}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_UPDATE_ORDER_SHIPPING)
  async updateShipping(
    @ConnectedSocket() socket: Socket,
    @MessageBody() updateOrderShippingDto: UpdateOrderShippingDto,
  ) {
    const traceId = generateTraceId('sales-commerce-update-order-shipping');
    try {
      const result = await this.kafkaService.updateOrderShipping(
        updateOrderShippingDto,
        traceId,
      );
      socket.emit(`${KT_UPDATE_ORDER_SHIPPING}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_UPDATE_ORDER_SHIPPING}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_CREATE_SUBSCRIPTION)
  async createSubscription(
    @ConnectedSocket() socket: Socket,
    @MessageBody() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-subscription');
    try {
      const result = await this.kafkaService.createSubscription(
        createSubscriptionDto,
        traceId,
      );
      socket.emit(`${KT_CREATE_SUBSCRIPTION}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CREATE_SUBSCRIPTION}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_GET_SUBSCRIPTION)
  async getSubscription(
    @ConnectedSocket() socket: Socket,
    @MessageBody() getSubscriptionDto: GetSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-subscription');
    try {
      const result = await this.kafkaService.getSubscription(
        getSubscriptionDto,
        traceId,
      );
      socket.emit(`${KT_GET_SUBSCRIPTION}-result`, result);
    } catch (e: any) {
      socket.emit(`${KT_GET_SUBSCRIPTION}-error`, e.message || 'Unknown error');
    }
  }

  @SubscribeMessage(KT_CANCEL_SUBSCRIPTION)
  async cancelSubscription(
    @ConnectedSocket() socket: Socket,
    @MessageBody() cancelSubscriptionDto: DeleteSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-cancel-subscription');
    try {
      const result = await this.kafkaService.cancelSubscription(
        cancelSubscriptionDto,
        traceId,
      );
      socket.emit(`${KT_CANCEL_SUBSCRIPTION}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_CANCEL_SUBSCRIPTION}-error`,
        e.message || 'Unknown error',
      );
    }
  }

  @SubscribeMessage(KT_VALIDATE_PROMOTION_CODE)
  async validatePromotionCode(
    @ConnectedSocket() socket: Socket,
    @MessageBody() validatePromotionCodeDto: ValidatePromotionCodeDto,
  ) {
    const traceId = generateTraceId('sales-commerce-validate-promo');
    try {
      const result = await this.kafkaService.validatePromotionCode(
        validatePromotionCodeDto,
        traceId,
      );
      socket.emit(`${KT_VALIDATE_PROMOTION_CODE}-result`, result);
    } catch (e: any) {
      socket.emit(
        `${KT_VALIDATE_PROMOTION_CODE}-error`,
        e.message || 'Unknown error',
      );
    }
  }
}
