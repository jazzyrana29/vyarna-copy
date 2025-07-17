import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StripeGatewayService } from '../services/stripe-gateway.service';
import { Product } from '../entities/product.entity';
import { ProductVariant } from '../entities/product_variant.entity';
import { ProductImage } from '../entities/product_image.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly stripeGateway: StripeGatewayService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.AUTO_SEED === 'true') {
      await this.seedFromStripe();
    }
  }

  private async seedFromStripe(): Promise<void> {
    this.logger.log('Seeding products from Stripe');

    const productRepo = this.dataSource.getRepository(Product);
    const variantRepo = this.dataSource.getRepository(ProductVariant);
    const imageRepo = this.dataSource.getRepository(ProductImage);

    const stripeProducts = await this.stripeGateway.listProducts({ limit: 100 });

    for (const sp of stripeProducts.data) {
      let product = await productRepo.findOne({ where: { name: sp.name } });
      if (!product) {
        product = productRepo.create({
          name: sp.name,
          description: sp.description ?? null,
          active: sp.active,
        });
      } else {
        product.description = sp.description ?? null;
        product.active = sp.active;
      }
      await productRepo.save(product);

      const prices = await this.stripeGateway.listPrices({
        product: sp.id,
        active: true,
        limit: 100,
      });

      for (const pr of prices.data) {
        let variant = await variantRepo.findOne({
          where: { productId: product.productId, sku: pr.id },
        });
        if (!variant) {
          variant = variantRepo.create({
            productId: product.productId,
            sku: pr.id,
            priceCents: pr.unit_amount ?? 0,
            currency: pr.currency.toUpperCase(),
            inventorySource: 'stripe',
          });
        } else {
          variant.priceCents = pr.unit_amount ?? 0;
          variant.currency = pr.currency.toUpperCase();
        }
        await variantRepo.save(variant);
      }

      const images = sp.images ?? [];
      for (const [idx, url] of images.entries()) {
        let image = await imageRepo.findOne({
          where: { productId: product.productId, url },
        });
        if (!image) {
          image = imageRepo.create({
            productId: product.productId,
            url,
            sortOrder: idx,
          });
        } else {
          image.sortOrder = idx;
        }
        await imageRepo.save(image);
      }
    }

    this.logger.log('Seeding complete');
  }
}
