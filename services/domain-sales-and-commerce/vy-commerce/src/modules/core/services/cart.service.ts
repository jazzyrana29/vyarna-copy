import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../../entities/cart.entity';
import { CartItem } from '../../../entities/cart_item.entity';
import { ProductVariant } from '../../../entities/product_variant.entity';
import {
  CartDto,
  CartItemDto,
  CreateCartDto,
  CreateCartItemDto,
  DeleteCartItemDto,
  ResetCartDto,
  ApplyCartPromotionDto,
  GetCartDto,
  ValidatePromotionCodeDto,
} from 'ez-utils';
import { PromotionCodesService } from './promotion-codes.service';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class CartService {
  private logger = getLoggerConfig(CartService.name);

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly itemRepo: Repository<CartItem>,
    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,
    private readonly promoService: PromotionCodesService,
  ) {
    this.logger.debug(
      `${CartService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async createCart(dto: CreateCartDto, traceId: string): Promise<CartDto> {

    const entity = this.cartRepo.create({
      sessionId: dto.sessionId,
      status: 'ACTIVE',
    });
    await this.cartRepo.save(entity);
    this.logger.info('Cart created', traceId, 'createCart', LogStreamLevel.ProdStandard);
    return entity;
  }

  async addCartItem(dto: CreateCartItemDto, traceId: string): Promise<CartItemDto> {
    const existing = await this.itemRepo.findOne({
      where: { cartId: dto.cartId, productId: dto.productId },
    });

    if (existing) {
      existing.quantity += 1;
      await this.itemRepo.save(existing);
      this.logger.info('Cart item quantity updated', traceId, 'addCartItem', LogStreamLevel.DebugLight);
      return existing;
    }

    const variant = await this.variantRepo.findOne({
      where: { productId: dto.productId },
      order: { createdAt: 'ASC' },
    });
    if (!variant) {
      throw new NotFoundException(`Product ${dto.productId} not found`);
    }
    const entity = this.itemRepo.create({
      cartId: dto.cartId,
      productId: dto.productId,
      quantity: 1,
      unitPriceCents: variant.priceCents,
    });
    await this.itemRepo.save(entity);
    this.logger.info('Cart item added', traceId, 'addCartItem', LogStreamLevel.DebugLight);
    return entity;
  }

  async removeCartItem(dto: DeleteCartItemDto, traceId: string): Promise<void> {
    const item = await this.itemRepo.findOne({ where: { cartId: dto.cartId, productId: dto.productId } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
      await this.itemRepo.save(item);
    } else {
      await this.itemRepo.delete({ cartId: dto.cartId, productId: dto.productId });
    }
    this.logger.info('Cart item updated/removed', traceId, 'removeCartItem', LogStreamLevel.DebugLight);
  }

  async resetCart(dto: ResetCartDto, traceId: string): Promise<void> {
    await this.itemRepo.delete({ cartId: dto.cartId });
    this.logger.info('Cart reset', traceId, 'resetCart', LogStreamLevel.DebugLight);
  }

  async applyCartPromotion(dto: ApplyCartPromotionDto, traceId: string) {
    const items = await this.itemRepo.find({ where: { cartId: dto.cartId } });
    const cartTotal = items.reduce((sum, it) => sum + it.quantity * it.unitPriceCents, 0);
    const validateDto: ValidatePromotionCodeDto = { code: dto.code, cartTotal };
    return this.promoService.validatePromotionCode(validateDto, traceId);
  }

  async getCart(dto: GetCartDto, traceId: string): Promise<{ cart: CartDto; items: CartItemDto[] }> {
    const cart = await this.cartRepo.findOne({ where: { cartId: dto.cartId } });
    if (!cart) {
      throw new NotFoundException(`Cart ${dto.cartId} not found`);
    }
    const items = await this.itemRepo.find({ where: { cartId: dto.cartId } });
    this.logger.info('Cart retrieved', traceId, 'getCart', LogStreamLevel.DebugLight);
    return { cart, items };
  }
}
