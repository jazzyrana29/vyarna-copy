import { Body, Controller, Post, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
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
  CheckCouponEligibilityPayloadDto,
  GetProductsDto,
  GetProductVariantsDto,
  GetCategoriesDto,
  KT_GET_PRODUCTS,
  KT_GET_PRODUCT_VARIANTS,
  KT_GET_CATEGORIES,
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_APPLY_CART_PROMOTION,
  KT_CREATE_ORDER,
  KT_GET_ZTRACKING_ORDER,
  KT_UPDATE_ORDER_SHIPPING,
  KT_CREATE_SUBSCRIPTION,
  KT_GET_SUBSCRIPTION,
  KT_CANCEL_SUBSCRIPTION,
  KT_CHECK_COUPON_ELIGIBILITY,
} from 'ez-utils';
import { ValidateCreateCartDtoPipe } from './pipes/validate-create-cart-dto.pipe';
import { ValidateAddCartItemDtoPipe } from './pipes/validate-add-cart-item-dto.pipe';
import { ValidateRemoveCartItemDtoPipe } from './pipes/validate-remove-cart-item-dto.pipe';
import { ValidateApplyCartPromotionDtoPipe } from './pipes/validate-apply-cart-promotion-dto.pipe';
import { ValidateCreateOrderDtoPipe } from './pipes/validate-create-order-dto.pipe';
import { ValidateGetOrderDtoPipe } from './pipes/validate-get-order-dto.pipe';
import { ValidateUpdateOrderShippingDtoPipe } from './pipes/validate-update-order-shipping-dto.pipe';
import { ValidateCreateSubscriptionDtoPipe } from './pipes/validate-create-subscription-dto.pipe';
import { ValidateGetSubscriptionDtoPipe } from './pipes/validate-get-subscription-dto.pipe';
import { ValidateCancelSubscriptionDtoPipe } from './pipes/validate-cancel-subscription-dto.pipe';
import { ValidateGetProductsDtoPipe } from './pipes/validate-get-products-dto.pipe';
import { ValidateGetProductVariantsDtoPipe } from './pipes/validate-get-product-variants-dto.pipe';
import { ValidateGetCategoriesDtoPipe } from './pipes/validate-get-categories-dto.pipe';
import { ValidateCheckCouponEligibilityDtoPipe } from './pipes/validate-check-coupon-eligibility-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-sales-commerce')
@Controller('vy-sales-commerce')
export class SalesCommerceController {
  private logger = getLoggerConfig(SalesCommerceController.name);

  constructor(private readonly commerceKafka: SalesCommerceKafkaService) {
    this.logger.debug(
      `${SalesCommerceController.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  @Post(KT_GET_PRODUCTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetProductsDto })
  async getProducts(
    @Body(new ValidateGetProductsDtoPipe()) getDto: GetProductsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getProducts');
    const data = await this.commerceKafka.getProducts(getDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Products retrieved', traceId);
  }

  @Post(KT_GET_PRODUCT_VARIANTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetProductVariantsDto })
  async getProductVariants(
    @Body(new ValidateGetProductVariantsDtoPipe()) getDto: GetProductVariantsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getProductVariants');
    const data = await this.commerceKafka.getProductVariants(getDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Variants retrieved', traceId);
  }

  @Post(KT_GET_CATEGORIES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetCategoriesDto })
  async getCategories(
    @Body(new ValidateGetCategoriesDtoPipe()) getDto: GetCategoriesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getCategories');
    const data = await this.commerceKafka.getCategories(getDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Categories retrieved', traceId);
  }

  @Post(KT_CREATE_CART)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateCartDto })
  async createCart(
    @Body(new ValidateCreateCartDtoPipe()) createDto: CreateCartDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createCart');
    const data = await this.commerceKafka.createCart(createDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Cart created', traceId);
  }

  @Post(KT_ADD_CART_ITEM)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: AddCartItemDto })
  async addCartItem(
    @Body(new ValidateAddCartItemDtoPipe()) addDto: AddCartItemDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('addCartItem');
    const data = await this.commerceKafka.addCartItem(addDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Item added', traceId);
  }

  @Post(KT_REMOVE_CART_ITEM)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: RemoveCartItemDto })
  async removeCartItem(
    @Body(new ValidateRemoveCartItemDtoPipe()) removeDto: RemoveCartItemDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('removeCartItem');
    const data = await this.commerceKafka.removeCartItem(removeDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Item removed', traceId);
  }

  @Post(KT_APPLY_CART_PROMOTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ApplyCartPromotionDto })
  async applyPromotion(
    @Body(new ValidateApplyCartPromotionDtoPipe()) applyDto: ApplyCartPromotionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('applyPromotion');
    const data = await this.commerceKafka.applyCartPromotion(applyDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Promotion applied', traceId);
  }

  @Post(KT_CREATE_ORDER)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(
    @Body(new ValidateCreateOrderDtoPipe()) createDto: CreateOrderDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createOrder');
    const data = await this.commerceKafka.createOrder(createDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Order created', traceId);
  }

  @Post(KT_GET_ZTRACKING_ORDER)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingOrderDto })
  async getOrder(
    @Body(new ValidateGetOrderDtoPipe()) getDto: GetZtrackingOrderDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getOrder');
    const data = await this.commerceKafka.getOrder(getDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Order retrieved', traceId);
  }

  @Post(KT_UPDATE_ORDER_SHIPPING)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdateOrderShippingDto })
  async updateShipping(
    @Body(new ValidateUpdateOrderShippingDtoPipe()) updateDto: UpdateOrderShippingDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updateShipping');
    const data = await this.commerceKafka.updateOrderShipping(updateDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Shipping updated', traceId);
  }

  @Post(KT_CREATE_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateSubscriptionDto })
  async createSubscription(
    @Body(new ValidateCreateSubscriptionDtoPipe()) createDto: CreateSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSubscription');
    const data = await this.commerceKafka.createSubscription(createDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription created', traceId);
  }

  @Post(KT_GET_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSubscriptionDto })
  async getSubscription(
    @Body(new ValidateGetSubscriptionDtoPipe()) getDto: GetSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSubscription');
    const data = await this.commerceKafka.getSubscription(getDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription retrieved', traceId);
  }

  @Post(KT_CANCEL_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CancelSubscriptionDto })
  async cancelSubscription(
    @Body(new ValidateCancelSubscriptionDtoPipe()) cancelDto: CancelSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('cancelSubscription');
    const data = await this.commerceKafka.cancelSubscription(cancelDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription cancelled', traceId);
  }

  @Post(KT_CHECK_COUPON_ELIGIBILITY)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CheckCouponEligibilityPayloadDto })
  async checkCouponEligibility(
    @Body(new ValidateCheckCouponEligibilityDtoPipe()) payload: CheckCouponEligibilityPayloadDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('checkCouponEligibility');
    const data = await this.commerceKafka.checkCouponEligibility(payload, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Coupon eligibility', traceId);
  }
}
