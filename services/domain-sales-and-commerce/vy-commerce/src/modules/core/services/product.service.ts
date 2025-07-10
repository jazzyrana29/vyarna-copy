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
    const { productId, name, active, limit: dtoLimit } = getDto;
    const requestedLimit = dtoLimit ?? this.defaultLimit;
    let stripeProducts: Stripe.Product[] = [];

    if (productId) {
      // Lookup exact ID
      try {
        const prod = await this.stripe.products.retrieve(productId);
        stripeProducts = [prod];
      } catch {
        stripeProducts = [];
      }
    } else if (typeof active === 'boolean' || name) {
      // Search con filtros
      const clauses = [
        typeof active === 'boolean' ? `active:"${active}"` : null,
        name ? `name~"${name}"` : null,
      ]
        .filter(Boolean)
        .join(' AND ');
      // Opción directa con .data
      const searchRes = await this.stripe.products.search({
        query: clauses,
        limit: requestedLimit,
      });
      stripeProducts = searchRes.data;
    } else {
      // Listado sin filtros
      const listRes = await this.stripe.products.list({
        limit: requestedLimit,
      });
      stripeProducts = listRes.data;
    }

    this.logger.info(
      `Retrieved ${stripeProducts.length} products`,
      traceId,
      'getProducts',
      LogStreamLevel.DebugLight,
    );

    return stripeProducts.map((p) => ({
      productId: p.id,
      name: p.name,
      description: p.description ?? undefined,
      url: p.url ?? undefined,
      images: p.images ?? [],
      active: p.active,
      createdAt: new Date((p.created ?? 0) * 1000),
      updatedAt: p.updated ? new Date((p.updated as number) * 1000) : undefined,
    }));
  }
}
