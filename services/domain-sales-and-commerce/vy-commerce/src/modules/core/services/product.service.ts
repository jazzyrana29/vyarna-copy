import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { GetProductsDto, ProductDto } from 'ez-utils';
import { getLoggerConfig } from '../../../utils/common';
import { LogStreamLevel } from 'ez-logger';
import { Product } from '../../../entities/product.entity';
import { ProductVariant } from '../../../entities/product_variant.entity';
import { ProductImage } from '../../../entities/product_image.entity';

@Injectable()
export class ProductService {
  private logger = getLoggerConfig(ProductService.name);
  private readonly defaultLimit = 100;

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,
    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,
  ) {
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
    const {
      productId,
      name,
      active,
      limit: dtoLimit,
    } = getProductsDto;


    const requestedLimit = dtoLimit ?? this.defaultLimit;

    const where: any = {};
    if (productId) where.productId = productId;
    if (typeof active === 'boolean') where.active = active;
    if (name) where.name = Like(`%${name}%`);

    const products = await this.productRepo.find({ where, take: requestedLimit });

    this.logger.info(
      `Retrieved ${products.length} products`,
      traceId,
      'getProducts',
      LogStreamLevel.DebugLight,
    );

    const withVariants = await Promise.all(
      products.map(async (p) => {
        const variant = await this.variantRepo.findOne({
          where: { productId: p.productId },
          order: { createdAt: 'ASC' },
        });
        const images = await this.imageRepo.find({
          where: { productId: p.productId },
          order: { sortOrder: 'ASC' },
        });

        return {
          productId: p.productId,
          name: p.name,
          description: p.description ?? undefined,
          url: undefined,
          images: images.map((img) => img.url),
          active: p.active,
          priceCents: variant?.priceCents ?? 0,
          currency: (variant?.currency || 'USD').toLowerCase(),
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        } as ProductDto;
      }),
    );
    return withVariants;
  }
}
