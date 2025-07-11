import { Injectable } from '@nestjs/common';
import { KafkaResponderService } from '../../../../utils/kafka/kafka-responder.service';
import { getLoggerConfig } from '../../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import {
  KT_GET_PRODUCTS,
  KT_GET_PRODUCT_VARIANTS,
  KT_GET_CATEGORIES,
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_APPLY_CART_PROMOTION,
  KT_CREATE_ORDER,
  KT_GET_ORDERS,
  KT_GET_ZTRACKING_ORDER,
  KT_UPDATE_ORDER_SHIPPING,
  KT_CREATE_SUBSCRIPTION,
  KT_GET_SUBSCRIPTION,
  KT_CANCEL_SUBSCRIPTION,
  KT_VALIDATE_PROMOTION_CODE,
  CreateCartDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  ApplyCartPromotionDto,
  CreateOrderDto,
  GetOrdersDto,
  GetZtrackingOrderDto,
  UpdateOrderShippingDto,
  CreateSubscriptionDto,
  GetSubscriptionDto,
  DeleteSubscriptionDto,
  GetProductsDto,
  GetProductVariantsDto,
  GetCategoriesDto,
  ValidatePromotionCodeDto,
} from 'ez-utils';

@Injectable()
export class SalesCommerceKafkaService {
  private readonly serviceName = SalesCommerceKafkaService.name;
  private logger = getLoggerConfig(this.serviceName);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${this.serviceName} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getProducts(getProductsDto: GetProductsDto, traceId: string) {
    console.log('getDto', getProductsDto);
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PRODUCTS,
      getProductsDto,
      traceId,
    );
  }

  async getProductVariants(
    getProductVariantsDto: GetProductVariantsDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PRODUCT_VARIANTS,
      getProductVariantsDto,
      traceId,
    );
  }

  async getCategories(getCategoriesDto: GetCategoriesDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_CATEGORIES,
      getCategoriesDto,
      traceId,
    );
  }

  async createCart(createCartDto: CreateCartDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_CART,
      createCartDto,
      traceId,
    );
  }

  async addCartItem(createCartItemDto: CreateCartItemDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_ADD_CART_ITEM,
      createCartItemDto,
      traceId,
    );
  }

  async removeCartItem(deleteCartItemDto: DeleteCartItemDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_REMOVE_CART_ITEM,
      deleteCartItemDto,
      traceId,
    );
  }

  async applyCartPromotion(
    applyCartPromotionDto: ApplyCartPromotionDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_APPLY_CART_PROMOTION,
      applyCartPromotionDto,
      traceId,
    );
  }

  async createOrder(createOrderDto: CreateOrderDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_ORDER,
      createOrderDto,
      traceId,
    );
  }

  async getOrders(getOrdersDto: GetOrdersDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ORDERS,
      getOrdersDto,
      traceId,
    );
  }

  async getOrder(getZtrackingOrderDto: GetZtrackingOrderDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_ORDER,
      getZtrackingOrderDto,
      traceId,
    );
  }

  async updateOrderShipping(
    updateOrderShippingDto: UpdateOrderShippingDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_ORDER_SHIPPING,
      updateOrderShippingDto,
      traceId,
    );
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SUBSCRIPTION,
      createSubscriptionDto,
      traceId,
    );
  }

  async getSubscription(getSubscriptionDto: GetSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SUBSCRIPTION,
      getSubscriptionDto,
      traceId,
    );
  }

  async cancelSubscription(deleteSubscriptionDto: DeleteSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CANCEL_SUBSCRIPTION,
      deleteSubscriptionDto,
      traceId,
    );
  }

  async validatePromotionCode(
    validatePromotionCodeDto: ValidatePromotionCodeDto,
    traceId: string,
  ) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_VALIDATE_PROMOTION_CODE,
      validatePromotionCodeDto,
      traceId,
    );
  }
}
