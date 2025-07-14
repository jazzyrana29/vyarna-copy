import { Injectable } from '@nestjs/common';
import { GetProductsDto, ProductDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { StripeGatewayService } from '../../../services/stripe-gateway.service';
import Stripe from 'stripe';

@Injectable()
export class ProductService {
  private logger = getLoggerConfig(ProductService.name);
  private readonly defaultLimit = 100;

  constructor(private readonly stripeGateway: StripeGatewayService) {
    this.logger.debug(
      `${ProductService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async getProducts(
    getProductsDto: GetProductsDto,
    traceId: string,
  ): Promise<ProductDto[]> {
    const { productId, name, active, limit: dtoLimit, currency } = getProductsDto;
    const requestedLimit = dtoLimit ?? this.defaultLimit;
    let stripeProducts: Stripe.Product[] = [];

    if (productId) {
      // Lookup exact ID
      try {
        const prod = await this.stripeGateway.retrieveProduct(productId);
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
      const searchRes = await this.stripeGateway.searchProducts({
        query: clauses,
        limit: requestedLimit,
      });
      stripeProducts = searchRes.data;
    } else {
      // Listado sin filtros
      const listRes = await this.stripeGateway.listProducts({
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

    const withPrices = await Promise.all(
      stripeProducts.map(async (p) => {
        const prices = await this.stripeGateway.listPrices({
          product: p.id,
          currency,
          active: true,
          limit: 1,
        });
        const price = prices.data[0];
        return {
          productId: p.id,
          name: p.name,
          description: p.description ?? undefined,
          url: p.url ?? undefined,
          images: p.images ?? [],
          active: p.active,
          priceCents: price?.unit_amount ?? 0,
          currency: price?.currency ?? currency,
          createdAt: new Date((p.created ?? 0) * 1000),
          updatedAt: p.updated ? new Date((p.updated as number) * 1000) : undefined,
        } as ProductDto;
      }),
    );
    return withPrices;
  }
}
