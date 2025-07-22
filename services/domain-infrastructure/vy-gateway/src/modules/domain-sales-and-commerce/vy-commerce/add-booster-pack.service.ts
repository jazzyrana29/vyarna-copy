import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesCommerceKafkaService } from './microservices/vy-commerce-kafka.service';
import { PersonSessionKafkaService } from '../../domain-person-and-identity/vy-session/microservices/vy-session-kafka.service';
import {
  AddBoosterPackInCartDto,
  CreateCartDto,
  CreateCartItemDto,
  CreateSessionDto,
  GetProductsDto,
  GetCartDto,
  CartDto,
} from 'ez-utils';

@Injectable()
export class AddBoosterPackService {
  constructor(
    private readonly commerceKafka: SalesCommerceKafkaService,
    private readonly sessionKafka: PersonSessionKafkaService,
  ) {}

  async addBoosterPackInCart(
    dto: AddBoosterPackInCartDto,
    traceId: string,
  ): Promise<any> {
    let sessionId = dto.sessionId;
    if (!sessionId) {
      const sess = await this.sessionKafka.createSession(
        { personId: dto.personId ?? null } as CreateSessionDto,
        traceId,
      );
      sessionId = sess.sessionId;
    }

    const products = await this.commerceKafka.getProducts(
      { name: 'Booster', active: true } as GetProductsDto,
      traceId,
    );
    const booster = products.find((p) =>
      p.name.toLowerCase().includes('booster'),
    );
    if (!booster) throw new NotFoundException('Booster product not found');

    let cart: CartDto;
    if (dto.cartId) {
      cart = await this.commerceKafka.getCart(
        { cartId: dto.cartId } as GetCartDto,
        traceId,
      );
    } else {
      cart = await this.commerceKafka.createCart(
        { sessionId } as CreateCartDto,
        traceId,
      );
    }

    await this.commerceKafka.addCartItem(
      { cartId: cart.cartId, productId: booster.productId, quantity: 1 } as CreateCartItemDto,
      traceId,
    );

    return { sessionId, cart, product: booster };
  }
}
