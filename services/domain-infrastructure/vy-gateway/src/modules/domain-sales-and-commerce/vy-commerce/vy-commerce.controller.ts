import { Body, Controller, Post, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from '../../../dto/response.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { SalesCommerceKafkaService } from './microservices/vy-commerce-kafka.service';
import { AddBoosterPackService } from './add-booster-pack.service';
import {
  generateTraceId,
  CreateCartDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  ResetCartDto,
  ApplyCartPromotionDto,
  CreateOrderDto,
  GetZtrackingOrderDto,
  UpdateOrderShippingDto,
  CreateSubscriptionDto,
  GetSubscriptionDto,
  DeleteSubscriptionDto,
  ValidatePromotionCodeDto,
  GetProductsDto,
  GetProductVariantsDto,
  GetCategoriesDto,
  KT_GET_PRODUCTS,
  KT_GET_PRODUCT_VARIANTS,
  KT_GET_CATEGORIES,
  KT_CREATE_CART,
  KT_ADD_CART_ITEM,
  KT_REMOVE_CART_ITEM,
  KT_RESET_CART,
  KT_APPLY_CART_PROMOTION,
  KT_CREATE_ORDER,
  KT_GET_ZTRACKING_ORDER,
  KT_UPDATE_ORDER_SHIPPING,
  KT_CREATE_SUBSCRIPTION,
  KT_GET_SUBSCRIPTION,
  KT_CANCEL_SUBSCRIPTION,
  KT_VALIDATE_PROMOTION_CODE,
  KT_ADD_BOOSTER_PACK_IN_CART,
  AddBoosterPackInCartDto,
} from 'ez-utils';
import { ValidateCreateCartDtoPipe } from './pipes/validate-create-cart-dto.pipe';
import { ValidateAddCartItemDtoPipe } from './pipes/validate-add-cart-item-dto.pipe';
import { ValidateRemoveCartItemDtoPipe } from './pipes/validate-remove-cart-item-dto.pipe';
import { ValidateResetCartDtoPipe } from './pipes/validate-reset-cart-dto.pipe';
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
import { ValidatePromotionCodeDtoPipe } from './pipes/validate-promotion-code-dto.pipe';

@UseInterceptors(SentryInterceptor)
@ApiTags('vy-commerce')
@Controller('vy-commerce')
export class SalesCommerceController {
  private logger = getLoggerConfig(SalesCommerceController.name);

  constructor(
    private readonly commerceKafka: SalesCommerceKafkaService,
    private readonly boosterService: AddBoosterPackService,
  ) {
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
    @Body(new ValidateGetProductsDtoPipe()) getProductsDto: GetProductsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getProducts');
    const data = await this.commerceKafka.getProducts(getProductsDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Products retrieved', traceId);
  }


  @Post(KT_GET_PRODUCT_VARIANTS)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetProductVariantsDto })
  async getProductVariants(
    @Body(new ValidateGetProductVariantsDtoPipe())
    getProductVariantsDto: GetProductVariantsDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getProductVariants');
    const data = await this.commerceKafka.getProductVariants(
      getProductVariantsDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Variants retrieved', traceId);
  }

  @Post(KT_GET_CATEGORIES)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetCategoriesDto })
  async getCategories(
    @Body(new ValidateGetCategoriesDtoPipe()) getCategoriesDto: GetCategoriesDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getCategories');
    const data = await this.commerceKafka.getCategories(
      getCategoriesDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Categories retrieved', traceId);
  }

  @Post(KT_CREATE_CART)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateCartDto })
  async createCart(
    @Body(new ValidateCreateCartDtoPipe()) createCartDto: CreateCartDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createCart');
    const data = await this.commerceKafka.createCart(createCartDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Cart created', traceId);
  }

  @Post(KT_ADD_CART_ITEM)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateCartItemDto })
  async addCartItem(
    @Body(new ValidateAddCartItemDtoPipe()) addCartItemDto: CreateCartItemDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('addCartItem');
    const data = await this.commerceKafka.addCartItem(addCartItemDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Item added', traceId);
  }

  @Post(KT_REMOVE_CART_ITEM)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: DeleteCartItemDto })
  async removeCartItem(
    @Body(new ValidateRemoveCartItemDtoPipe()) deleteCartItemDto: DeleteCartItemDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('removeCartItem');
    const data = await this.commerceKafka.removeCartItem(
      deleteCartItemDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Item removed', traceId);
  }

  @Post(KT_RESET_CART)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ResetCartDto })
  async resetCart(
    @Body(new ValidateResetCartDtoPipe()) resetCartDto: ResetCartDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('resetCart');
    const data = await this.commerceKafka.resetCart(resetCartDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Cart reset', traceId);
  }

  @Post(KT_APPLY_CART_PROMOTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ApplyCartPromotionDto })
  async applyPromotion(
    @Body(new ValidateApplyCartPromotionDtoPipe())
    applyCartPromotionDto: ApplyCartPromotionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('applyPromotion');
    const data = await this.commerceKafka.applyCartPromotion(
      applyCartPromotionDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Promotion applied', traceId);
  }

  @Post(KT_CREATE_ORDER)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(
    @Body(new ValidateCreateOrderDtoPipe()) createOrderDto: CreateOrderDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createOrder');
    const data = await this.commerceKafka.createOrder(createOrderDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Order created', traceId);
  }

  @Post(KT_GET_ZTRACKING_ORDER)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetZtrackingOrderDto })
  async getOrder(
    @Body(new ValidateGetOrderDtoPipe()) getZtrackingOrderDto: GetZtrackingOrderDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getOrder');
    const data = await this.commerceKafka.getOrder(getZtrackingOrderDto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Order retrieved', traceId);
  }

  @Post(KT_UPDATE_ORDER_SHIPPING)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: UpdateOrderShippingDto })
  async updateShipping(
    @Body(new ValidateUpdateOrderShippingDtoPipe())
    updateOrderShippingDto: UpdateOrderShippingDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('updateShipping');
    const data = await this.commerceKafka.updateOrderShipping(
      updateOrderShippingDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Shipping updated', traceId);
  }

  @Post(KT_CREATE_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateSubscriptionDto })
  async createSubscription(
    @Body(new ValidateCreateSubscriptionDtoPipe())
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('createSubscription');
    const data = await this.commerceKafka.createSubscription(
      createSubscriptionDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription created', traceId);
  }

  @Post(KT_GET_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: GetSubscriptionDto })
  async getSubscription(
    @Body(new ValidateGetSubscriptionDtoPipe()) getSubscriptionDto: GetSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('getSubscription');
    const data = await this.commerceKafka.getSubscription(
      getSubscriptionDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription retrieved', traceId);
  }

  @Post(KT_CANCEL_SUBSCRIPTION)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: DeleteSubscriptionDto })
  async cancelSubscription(
    @Body(new ValidateCancelSubscriptionDtoPipe())
    deleteSubscriptionDto: DeleteSubscriptionDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('cancelSubscription');
    const data = await this.commerceKafka.cancelSubscription(
      deleteSubscriptionDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Subscription cancelled', traceId);
  }

  @Post(KT_VALIDATE_PROMOTION_CODE)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: ValidatePromotionCodeDto })
  async validatePromotionCode(
    @Body(new ValidatePromotionCodeDtoPipe())
    validatePromotionCodeDto: ValidatePromotionCodeDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('validatePromotionCode');
    const data = await this.commerceKafka.validatePromotionCode(
      validatePromotionCodeDto,
      traceId,
    );
    return new ResponseDTO(HttpStatus.OK, data, 'Promotion code validation', traceId);
  }

  @Post(KT_ADD_BOOSTER_PACK_IN_CART)
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: AddBoosterPackInCartDto })
  async addBoosterPackInCart(
    @Body() dto: AddBoosterPackInCartDto,
  ): Promise<ResponseDTO<any>> {
    const traceId = generateTraceId('addBoosterPackInCart');
    const data = await this.boosterService.addBoosterPackInCart(dto, traceId);
    return new ResponseDTO(HttpStatus.OK, data, 'Booster added to cart', traceId);
  }
}
