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
  KT_CHECK_COUPON_ELIGIBILITY,
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
  CheckCouponEligibilityPayloadDto,
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

  async getProducts(getDto: GetProductsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PRODUCTS,
      getDto,
      traceId,
    );
  }

  async getProductVariants(getDto: GetProductVariantsDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_PRODUCT_VARIANTS,
      getDto,
      traceId,
    );
  }

  async getCategories(getDto: GetCategoriesDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_CATEGORIES,
      getDto,
      traceId,
    );
  }

  async createCart(createDto: CreateCartDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_CART,
      createDto,
      traceId,
    );
  }

  async addCartItem(addDto: CreateCartItemDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_ADD_CART_ITEM,
      addDto,
      traceId,
    );
  }

  async removeCartItem(removeDto: DeleteCartItemDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_REMOVE_CART_ITEM,
      removeDto,
      traceId,
    );
  }

  async applyCartPromotion(applyDto: ApplyCartPromotionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_APPLY_CART_PROMOTION,
      applyDto,
      traceId,
    );
  }

  async createOrder(createDto: CreateOrderDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_ORDER,
      createDto,
      traceId,
    );
  }

  async getOrders(getDto: GetOrdersDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ORDERS,
      getDto,
      traceId,
    );
  }

  async getOrder(getDto: GetZtrackingOrderDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_ZTRACKING_ORDER,
      getDto,
      traceId,
    );
  }

  async updateOrderShipping(updateDto: UpdateOrderShippingDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_UPDATE_ORDER_SHIPPING,
      updateDto,
      traceId,
    );
  }

  async createSubscription(createDto: CreateSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CREATE_SUBSCRIPTION,
      createDto,
      traceId,
    );
  }

  async getSubscription(getDto: GetSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_GET_SUBSCRIPTION,
      getDto,
      traceId,
    );
  }

  async cancelSubscription(cancelDto: DeleteSubscriptionDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CANCEL_SUBSCRIPTION,
      cancelDto,
      traceId,
    );
  }

  async checkCouponEligibility(payload: CheckCouponEligibilityPayloadDto, traceId: string) {
    return await this.kafkaResponder.sendMessageAndWaitForResponse(
      this.serviceName,
      KT_CHECK_COUPON_ELIGIBILITY,
      payload,
      traceId,
    );
  }
}
