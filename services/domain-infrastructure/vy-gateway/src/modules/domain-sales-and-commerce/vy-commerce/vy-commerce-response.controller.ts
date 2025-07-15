import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { KafkaResponderService } from '../../../utils/kafka/kafka-responder.service';
import {
  KT_GET_PRODUCTS,
  KT_GET_PRODUCT_VARIANTS,
  KT_GET_CATEGORIES,
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_APPLY_CART_PROMOTION,
  KT_GET_CART,
  KT_CREATE_ORDER,
  KT_GET_ORDERS,
  KT_GET_ZTRACKING_ORDER,
  KT_UPDATE_ORDER_SHIPPING,
  KT_CREATE_SUBSCRIPTION,
  KT_GET_SUBSCRIPTION,
  KT_CANCEL_SUBSCRIPTION,
  KT_VALIDATE_PROMOTION_CODE,
} from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Controller()
export class SalesCommerceResponseController {
  private logger = getLoggerConfig(SalesCommerceResponseController.name);

  constructor(private readonly kafkaResponder: KafkaResponderService) {
    this.logger.debug(
      `${SalesCommerceResponseController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @MessagePattern(KT_GET_PRODUCTS + '-response')
  handleGetProducts(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PRODUCTS} | key: ${key}`,
      '',
      'handleGetProducts',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_PRODUCT_VARIANTS + '-response')
  handleGetProductVariants(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_PRODUCT_VARIANTS} | key: ${key}`,
      '',
      'handleGetProductVariants',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_CATEGORIES + '-response')
  handleGetCategories(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_CATEGORIES} | key: ${key}`,
      '',
      'handleGetCategories',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_CART + '-response')
  handleCreateCart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_CART} | key: ${key}`,
      '',
      'handleCreateCart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_ADD_CART_ITEM + '-response')
  handleAddCartItem(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_ADD_CART_ITEM} | key: ${key}`,
      '',
      'handleAddCartItem',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_REMOVE_CART_ITEM + '-response')
  handleRemoveCartItem(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_REMOVE_CART_ITEM} | key: ${key}`,
      '',
      'handleRemoveCartItem',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_APPLY_CART_PROMOTION + '-response')
  handleApplyPromotion(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_APPLY_CART_PROMOTION} | key: ${key}`,
      '',
      'handleApplyPromotion',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_CART + '-response')
  handleGetCart(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_CART} | key: ${key}`,
      '',
      'handleGetCart',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_ORDER + '-response')
  handleCreateOrder(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_ORDER} | key: ${key}`,
      '',
      'handleCreateOrder',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_ORDERS + '-response')
  handleGetOrders(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_ORDERS} | key: ${key}`,
      '',
      'handleGetOrders',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_ZTRACKING_ORDER + '-response')
  handleGetOrder(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_ZTRACKING_ORDER} | key: ${key}`,
      '',
      'handleGetOrder',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_UPDATE_ORDER_SHIPPING + '-response')
  handleUpdateShipping(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_UPDATE_ORDER_SHIPPING} | key: ${key}`,
      '',
      'handleUpdateShipping',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CREATE_SUBSCRIPTION + '-response')
  handleCreateSubscription(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CREATE_SUBSCRIPTION} | key: ${key}`,
      '',
      'handleCreateSubscription',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_GET_SUBSCRIPTION + '-response')
  handleGetSubscription(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_GET_SUBSCRIPTION} | key: ${key}`,
      '',
      'handleGetSubscription',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_CANCEL_SUBSCRIPTION + '-response')
  handleCancelSubscription(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_CANCEL_SUBSCRIPTION} | key: ${key}`,
      '',
      'handleCancelSubscription',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }

  @MessagePattern(KT_VALIDATE_PROMOTION_CODE + '-response')
  handleValidatePromotionCode(@Payload() message: any, @Ctx() context: KafkaContext) {
    const key = context.getMessage().key.toString();
    this.logger.debug(
      `Kafka response for ${KT_VALIDATE_PROMOTION_CODE} | key: ${key}`,
      '',
      'handleValidatePromotionCode',
      LogStreamLevel.DebugLight,
    );
    this.kafkaResponder.handleIncomingMessage(message);
  }
}
