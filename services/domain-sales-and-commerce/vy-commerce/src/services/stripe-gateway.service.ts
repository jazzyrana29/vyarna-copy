import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getLoggerConfig } from '../utils/common';
import { LogStreamLevel } from 'ez-logger';

@Injectable()
export class StripeGatewayService {
  private logger = getLoggerConfig(StripeGatewayService.name);
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor() {
    this.logger.debug(
      `${StripeGatewayService.name} initialized`,
      '',
      'constructor',
      LogStreamLevel.DebugLight,
    );
  }

  async retrieveProduct(id: string): Promise<Stripe.Product> {
    this.logger.debug(
      `Retrieving product ${id}`,
      '',
      'retrieveProduct',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.products.retrieve(id);
  }

  async searchProducts(params: Stripe.ProductSearchParams) {
    this.logger.debug(
      'Searching products',
      '',
      'searchProducts',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.products.search(params);
  }

  async listProducts(params: Stripe.ProductListParams) {
    this.logger.debug(
      'Listing products',
      '',
      'listProducts',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.products.list(params);
  }

  async listPrices(params: Stripe.PriceListParams) {
    this.logger.debug(
      'Listing prices',
      '',
      'listPrices',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.prices.list(params);
  }

  async listPromotionCodes(params: Stripe.PromotionCodeListParams) {
    this.logger.debug(
      'Listing promotion codes',
      '',
      'listPromotionCodes',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.promotionCodes.list(params);
  }

  async retrieveCoupon(id: string) {
    this.logger.debug(
      `Retrieving coupon ${id}`,
      '',
      'retrieveCoupon',
      LogStreamLevel.DebugLight,
    );
    return this.stripe.coupons.retrieve(id);
  }

<<<<<<< HEAD
  async retrieveExchangeRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    this.logger.debug(
      `Retrieving FX quote from ${fromCurrency} to ${toCurrency} via generic request`,
=======
  async retrieveExchangeRate(currency: string) {
    this.logger.debug(
      `Retrieving exchange rate for ${currency}`,
>>>>>>> c1a999bea929ee113052430aa965485b648b145a
      '',
      'retrieveExchangeRate',
      LogStreamLevel.DebugLight,
    );
<<<<<<< HEAD

    const fxQuote: any = await this.stripe.rawRequest('POST', '/v1/fx_quotes', {
      from_currencies: [fromCurrency.toLowerCase()],
      to_currency: toCurrency.toLowerCase(),
      lock_duration: 'none',
    });

    const quote = fxQuote.rates?.[fromCurrency.toLowerCase()];
    if (!quote || typeof quote.exchange_rate !== 'number') {
      throw new Error(
        `No exchange rate found for ${fromCurrency} → ${toCurrency}`,
      );
    }

    return quote.exchange_rate;
=======
    return this.stripe.exchangeRates.retrieve(currency.toLowerCase());
>>>>>>> c1a999bea929ee113052430aa965485b648b145a
  }
}
