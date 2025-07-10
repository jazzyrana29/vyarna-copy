import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { GetProductsDto, ProductDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ProductService {
  private logger = getLoggerConfig(ProductService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor() {
    this.logger.debug(
      `${ProductService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getProducts(
    getDto: GetProductsDto,
    traceId: string,
  ): Promise<ProductDto[]> {
    const params: Stripe.ProductListParams = {};
    if (typeof getDto.active === 'boolean') params.active = getDto.active;
    const result = await this.stripe.products.list(params);
    this.logger.info(
      `Retrieved ${result.data.length} products`,
      traceId,
      'getProducts',
      LogStreamLevel.DebugLight,
    );
    return result.data.map((p) => ({
      productId: p.id,
      name: p.name,
      description: p.description || undefined,
      active: p.active,
      createdAt: new Date((p.created ?? 0) * 1000),
      updatedAt: p.updated ? new Date((p.updated as number) * 1000) : undefined,
    }));
  }
}
