import { ProductService } from '../product.service';
import { GetProductsDto } from 'ez-utils';
import { StripeGatewayService } from '../../../../services/stripe-gateway.service';

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
    const price = { unit_amount: 500, currency: 'usd' };
    const stripeGateway = {
      listProducts: jest.fn().mockResolvedValue({ data: [product] }),
      searchProducts: jest.fn(),
      retrieveProduct: jest.fn(),
      listPrices: jest.fn().mockResolvedValue({ data: [price] }),
    } as unknown as StripeGatewayService;

    const service = new ProductService(stripeGateway);

    const result = await service.getProducts({} as GetProductsDto, 'trace');

    expect(stripeGateway.listProducts).toHaveBeenCalled();
    expect(result).toEqual([
      {
        productId: 'prod_1',
        name: 'Prod 1',
        description: 'desc',
        active: true,
        url: undefined,
        images: [],
        priceCents: 500,
        currency: 'usd',
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
    const price = { unit_amount: 700, currency: 'usd' };
    const stripeGateway = {
      searchProducts: jest.fn().mockResolvedValue({ data: [product] }),
      listProducts: jest.fn(),
      retrieveProduct: jest.fn(),
      listPrices: jest.fn().mockResolvedValue({ data: [price] }),
    } as unknown as StripeGatewayService;

    const service = new ProductService(stripeGateway);

    const dto: GetProductsDto = {
      active: true,
      name: 'test',
    } as any;

    const result = await service.getProducts(dto, 'trace');

    expect(stripeGateway.searchProducts).toHaveBeenCalled();
    expect(result).toEqual([
      {
        productId: 'prod_1',
        name: 'Test 1',
        description: undefined,
        active: true,
        url: undefined,
        images: [],
        priceCents: 700,
        currency: 'usd',
        createdAt: new Date(1000),
        updatedAt: new Date(2000),
      },
    ]);
  });

});
