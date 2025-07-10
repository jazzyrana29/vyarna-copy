import { ProductService } from '../product.service';
import { GetProductsDto } from 'ez-utils';

describe('ProductService', () => {
  it('maps stripe products to DTOs', async () => {
    const stripeMock = {
      products: {
        list: jest.fn().mockResolvedValue({
          data: [
            {
              id: 'prod_1',
              name: 'Prod 1',
              description: 'desc',
              active: true,
              created: 1,
              updated: 2,
            },
          ],
        }),
      },
    };

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
    const stripeMock = {
      products: {
        list: jest.fn().mockResolvedValue({
          data: [
            {
              id: 'prod_1',
              name: 'Test 1',
              active: true,
              created: 1,
              updated: 2,
            },
            {
              id: 'prod_2',
              name: 'Other',
              active: false,
              created: 3,
              updated: 4,
            },
          ],
        }),
      },
    };

    const service = new ProductService();
    // @ts-ignore accessing private field for test
    service['stripe'] = stripeMock as any;

    const dto: GetProductsDto = {
      active: true,
      productId: 'prod_1',
      name: 'test',
    } as any;

    const result = await service.getProducts(dto, 'trace');

    expect(stripeMock.products.list).toHaveBeenCalledWith({
      active: true,
      ids: ['prod_1'],
    });
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
