import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { GetProductsDto, ProductDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class ProductService {
  private logger = getLoggerConfig(ProductService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  private readonly defaultLimit = 100;

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
    const limit = getDto.limit ?? this.defaultLimit;
    const hasFilters =
      getDto.name !== undefined ||
      getDto.productId !== undefined ||
      typeof getDto.active === 'boolean';

    const products: Stripe.Product[] = [];
    if (hasFilters) {
      const clauses: string[] = [];
      if (typeof getDto.active === 'boolean')
        clauses.push(`active:'${getDto.active}'`);
      if (getDto.productId) clauses.push(`id:'${getDto.productId}'`);
      if (getDto.name) clauses.push(`name:'${getDto.name}*'`);
      const query = clauses.join(' AND ');
      const iterator = this.stripe.products
        .search({ query, limit })
        .autoPagingIterable();
      for await (const p of iterator) {
        products.push(p as Stripe.Product);
      }
    } else {
      const iterator = this.stripe.products
        .list({ limit })
        .autoPagingIterable();
      for await (const p of iterator) {
        products.push(p as Stripe.Product);
      }
    }

    this.logger.info(
      `Retrieved ${products.length} products`,
      traceId,
      'getProducts',
      LogStreamLevel.DebugLight,
    );

    return products.map((p) => ({
      productId: p.id,
      name: p.name,
      description: p.description || undefined,
      active: p.active,
      createdAt: new Date((p.created ?? 0) * 1000),
      updatedAt: p.updated ? new Date((p.updated as number) * 1000) : undefined,
    }));
  }
}
