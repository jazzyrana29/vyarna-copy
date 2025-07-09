import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SalesCommerceKafkaService } from './microservices/vy-sales-commerce-kafka.service';
import {
  generateTraceId,
  CreateCartDto,
  AddCartItemDto,
  RemoveCartItemDto,
  ApplyCartPromotionDto,
  CreateOrderDto,
  GetZtrackingOrderDto,
  UpdateOrderShippingDto,
  CreateSubscriptionDto,
  GetSubscriptionDto,
  CancelSubscriptionDto,
  GetProductsDto,
  GetProductVariantsDto,
  GetCategoriesDto,
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

  @SubscribeMessage('sales-commerce-get-products')
  async getProducts(
    @ConnectedSocket() socket: Socket,
    getProductsDto: GetProductsDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-products');
    try {
      const result = await this.kafkaService.getProducts(
        getProductsDto,
        traceId,
      );
      socket.emit('sales-commerce-get-products-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-get-products-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-get-product-variants')
  async getProductVariants(
    @ConnectedSocket() socket: Socket,
    getProductVariantsDto: GetProductVariantsDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-product-variants');
    try {
      const result = await this.kafkaService.getProductVariants(
        getProductVariantsDto,
        traceId,
      );
      socket.emit('sales-commerce-get-product-variants-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-get-product-variants-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-get-categories')
  async getCategories(
    @ConnectedSocket() socket: Socket,
    getCategoriesDto: GetCategoriesDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-categories');
    try {
      const result = await this.kafkaService.getCategories(
        getCategoriesDto,
        traceId,
      );
      socket.emit('sales-commerce-get-categories-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-get-categories-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-create-cart')
  async createCart(
    @ConnectedSocket() socket: Socket,
    createCartDto: CreateCartDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-cart');
    try {
      const result = await this.kafkaService.createCart(
        createCartDto,
        traceId,
      );
      socket.emit('sales-commerce-create-cart-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-create-cart-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-add-cart-item')
  async addCartItem(
    @ConnectedSocket() socket: Socket,
    addCartItemDto: AddCartItemDto,
  ) {
    const traceId = generateTraceId('sales-commerce-add-cart-item');
    try {
      const result = await this.kafkaService.addCartItem(
        addCartItemDto,
        traceId,
      );
      socket.emit('sales-commerce-add-cart-item-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-add-cart-item-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-remove-cart-item')
  async removeCartItem(
    @ConnectedSocket() socket: Socket,
    removeCartItemDto: RemoveCartItemDto,
  ) {
    const traceId = generateTraceId('sales-commerce-remove-cart-item');
    try {
      const result = await this.kafkaService.removeCartItem(
        removeCartItemDto,
        traceId,
      );
      socket.emit('sales-commerce-remove-cart-item-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-remove-cart-item-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-apply-cart-promotion')
  async applyPromotion(
    @ConnectedSocket() socket: Socket,
    applyCartPromotionDto: ApplyCartPromotionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-apply-cart-promotion');
    try {
      const result = await this.kafkaService.applyCartPromotion(
        applyCartPromotionDto,
        traceId,
      );
      socket.emit('sales-commerce-apply-cart-promotion-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-apply-cart-promotion-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-create-order')
  async createOrder(
    @ConnectedSocket() socket: Socket,
    createOrderDto: CreateOrderDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-order');
    try {
      const result = await this.kafkaService.createOrder(
        createOrderDto,
        traceId,
      );
      socket.emit('sales-commerce-create-order-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-create-order-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-get-order')
  async getOrder(
    @ConnectedSocket() socket: Socket,
    getZtrackingOrderDto: GetZtrackingOrderDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-order');
    try {
      const result = await this.kafkaService.getOrder(
        getZtrackingOrderDto,
        traceId,
      );
      socket.emit('sales-commerce-get-order-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-get-order-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-update-order-shipping')
  async updateShipping(
    @ConnectedSocket() socket: Socket,
    updateOrderShippingDto: UpdateOrderShippingDto,
  ) {
    const traceId = generateTraceId('sales-commerce-update-order-shipping');
    try {
      const result = await this.kafkaService.updateOrderShipping(
        updateOrderShippingDto,
        traceId,
      );
      socket.emit('sales-commerce-update-order-shipping-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-update-order-shipping-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-create-subscription')
  async createSubscription(
    @ConnectedSocket() socket: Socket,
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-create-subscription');
    try {
      const result = await this.kafkaService.createSubscription(
        createSubscriptionDto,
        traceId,
      );
      socket.emit('sales-commerce-create-subscription-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-create-subscription-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-get-subscription')
  async getSubscription(
    @ConnectedSocket() socket: Socket,
    getSubscriptionDto: GetSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-get-subscription');
    try {
      const result = await this.kafkaService.getSubscription(
        getSubscriptionDto,
        traceId,
      );
      socket.emit('sales-commerce-get-subscription-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-get-subscription-error', e.message || 'Unknown error');
    }
  }

  @SubscribeMessage('sales-commerce-cancel-subscription')
  async cancelSubscription(
    @ConnectedSocket() socket: Socket,
    cancelSubscriptionDto: CancelSubscriptionDto,
  ) {
    const traceId = generateTraceId('sales-commerce-cancel-subscription');
    try {
      const result = await this.kafkaService.cancelSubscription(
        cancelSubscriptionDto,
        traceId,
      );
      socket.emit('sales-commerce-cancel-subscription-result', result);
    } catch (e: any) {
      socket.emit('sales-commerce-cancel-subscription-error', e.message || 'Unknown error');
    }
  }
}
