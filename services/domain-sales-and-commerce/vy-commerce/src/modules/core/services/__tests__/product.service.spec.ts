import { ProductService } from '../product.service';
import { GetProductsDto } from 'ez-utils';

describe('ProductService', () => {
  it('maps stripe products to DTOs', async () => {
    const product = {
      id: 'prod_1',
      name: 'Prod 1',
      description: 'desc',
      active: true,
      created: 1,
      updated: 2,
    };
    const stripeMock = {
      products: {
        list: jest.fn().mockReturnValue({
          autoPagingIterable: () =>
            (async function* () {
              yield product;
            })(),
        }),
        search: jest.fn(),
      },
    } as any;

    const service = new ProductService();
    // @ts-ignore accessing private field for test
    service['stripe'] = stripeMock as any;

    const result = await service.getProducts({} as GetProductsDto, 'trace');

    expect(stripeMock.products.list).toHaveBeenCalled();
    expect(result).toEqual([
      {
        productId: 'prod_1',
        name: 'Prod 1',
        description: 'desc',
        active: true,
        createdAt: new Date(1000),
        updatedAt: new Date(2000),
      },
    ]);
  });

  it('applies filters and name search', async () => {
    const product = {
      id: 'prod_1',
      name: 'Test 1',
      active: true,
      created: 1,
      updated: 2,
    };
    const stripeMock = {
      products: {
        search: jest.fn().mockReturnValue({
          autoPagingIterable: () =>
            (async function* () {
              yield product;
            })(),
        }),
        list: jest.fn(),
      },
    } as any;

    const service = new ProductService();
    // @ts-ignore accessing private field for test
    service['stripe'] = stripeMock as any;

    const dto: GetProductsDto = {
      active: true,
      productId: 'prod_1',
      name: 'test',
    } as any;

    const result = await service.getProducts(dto, 'trace');

    expect(stripeMock.products.search).toHaveBeenCalled();
    expect(result).toEqual([
      {
        productId: 'prod_1',
        name: 'Test 1',
        description: undefined,
        active: true,
        createdAt: new Date(1000),
        updatedAt: new Date(2000),
      },
    ]);
  });
});
