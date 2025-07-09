// Real Stripe service that will replace mock service
import type { ProductWithPricing } from '../types/stripe';
import type { UserDetails } from '../store/userStore';
import type { CartItem } from '../store/cartStore';
import { EXPO_PUBLIC_API_URL } from '@env';

interface CouponEligibilityResponse {
  success: boolean;
  eligibility: {
    [productId: string]: {
      eligible: boolean;
      currentPrice: number;
      originalPrice: number;
      couponApplied: boolean;
      couponId?: string;
      savings?: number;
      reason?: string;
    };
  };
}

interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
  appliedCoupons: Array<{
    id: string;
    productId: string;
    discountAmount: number;
  }>;
  totalAmount: number;
  originalAmount: number;
}

class StripeService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = EXPO_PUBLIC_API_URL || 'http://localhost:3001';
  }

  // GET /api/products
  async getProducts(): Promise<{
    success: boolean;
    products: ProductWithPricing[];
  }> {
    return this.makeRequest<{
      success: boolean;
      products: ProductWithPricing[];
    }>('/api/products');
  }

  // POST /api/check-coupon-eligibility
  async checkCouponEligibility(
    email: string,
    productIds: string[],
  ): Promise<CouponEligibilityResponse> {
    return this.makeRequest<CouponEligibilityResponse>(
      '/api/check-coupon-eligibility',
      {
        method: 'POST',
        body: JSON.stringify({ email, productIds }),
      },
    );
  }

  // POST /api/create-payment-intent
  async createPaymentIntent(
    items: CartItem[],
    customerDetails: UserDetails,
  ): Promise<PaymentIntentResponse> {
    return this.makeRequest<PaymentIntentResponse>(
      '/api/create-payment-intent',
      {
        method: 'POST',
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            stripePriceId: item.stripePriceId,
          })),
          customerDetails,
        }),
      },
    );
  }

  // POST /api/confirm-payment
  async confirmPayment(
    paymentIntentId: string,
    customerEmail: string,
  ): Promise<{ success: boolean; status: string }> {
    return this.makeRequest<{ success: boolean; status: string }>(
      '/api/confirm-payment',
      {
        method: 'POST',
        body: JSON.stringify({ paymentIntentId, customerEmail }),
      },
    );
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }
}

export const stripeService = new StripeService();
