import { ProductService } from '../product.service';
import { GetProductsDto } from 'ez-utils';
import { Repository, Like } from 'typeorm';
import { Product } from '../../../../entities/product.entity';
import { ProductVariant } from '../../../../entities/product_variant.entity';
import { ProductImage } from '../../../../entities/product_image.entity';

describe('ProductService', () => {
  it('maps repo products to DTOs', async () => {
    const product = {
      productId: 'p1',
      name: 'Prod 1',
      description: 'desc',
      active: true,
      createdAt: new Date(1000),
      updatedAt: new Date(2000),
    } as Product;
    const variant = {
      variantId: 'v1',
      productId: 'p1',
      priceCents: 500,
      currency: 'USD',
      createdAt: new Date(1000),
      updatedAt: new Date(1000),
    } as ProductVariant;
    const image = {
      imageId: 'img1',
      productId: 'p1',
      url: 'img.jpg',
      sortOrder: 0,
      createdAt: new Date(1000),
    } as ProductImage;

    const prodRepo = {
      find: jest.fn().mockResolvedValue([product]),
    } as unknown as Repository<Product>;
    const varRepo = {
      findOne: jest.fn().mockResolvedValue(variant),
    } as unknown as Repository<ProductVariant>;
    const imgRepo = {
      find: jest.fn().mockResolvedValue([image]),
    } as unknown as Repository<ProductImage>;

    const service = new ProductService(prodRepo, varRepo, imgRepo);

    const result = await service.getProducts({} as GetProductsDto, 'trace');

    expect(prodRepo.find).toHaveBeenCalled();
    expect(result).toEqual([
      {
        productId: 'p1',
        name: 'Prod 1',
        description: 'desc',
        active: true,
        url: undefined,
        images: ['img.jpg'],
        priceCents: 500,
        currency: 'usd',
        createdAt: new Date(1000),
        updatedAt: new Date(2000),
      },
    ]);
  });

  it('applies filters in repository query', async () => {
    const prodRepo = { find: jest.fn().mockResolvedValue([]) } as unknown as Repository<Product>;
    const service = new ProductService(prodRepo, {} as any, {} as any);

    const dto: GetProductsDto = { active: true, name: 'test', productId: 'p2', limit: 5 } as any;

    await service.getProducts(dto, 'trace');

    expect(prodRepo.find).toHaveBeenCalledWith({
      where: {
        productId: 'p2',
        active: true,
        name: Like('%test%'),
      },
      take: 5,
    });
  });
});
