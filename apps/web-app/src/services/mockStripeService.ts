import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { EXPO_STRIPE_PUBLISH_KEY } from '@env';
import type { UserDetails } from '../store/userStore';
import type { CartItem } from '../store/cartStore';

// Types and Interfaces
export interface MockProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  originalPrice: number;
  discountedPrice?: number;
  stripePriceId: string;
  couponId?: string;
  couponActive: boolean;
  savings?: number;
  metadata: Record<string, string>;
}

export interface MockCouponEligibility {
  eligible: boolean;
  currentPrice: number;
  originalPrice: number;
  couponApplied: boolean;
  couponId?: string;
  savings?: number;
  reason?: string;
}

export interface MockPaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
  metadata: Record<string, any>;
}

export interface MockPaymentSession {
  id: string;
  url: string;
  payment_intent: string;
  customer: string;
  amount_total: number;
  metadata: Record<string, any>;
}

// Mock Database
const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'single-booster',
    name: 'Vyarna Booster',
    description:
      'Single 1g booster - Real breast milk, freeze-dried and lab-tested',
    images: ['/placeholder.svg?height=200&width=200'],
    originalPrice: 2.0,
    discountedPrice: 1.4,
    stripePriceId: 'price_mock_single_booster',
    couponId: 'PRESALE_SINGLE_BOOSTER_30',
    couponActive: true,
    savings: 0.6,
    metadata: {
      category: 'single',
      weight: '1g',
    },
  },
  {
    id: 'booster-box',
    name: 'Vyarna Booster Box',
    description: '150 x 1g boosters - One month supply with usage guide',
    images: ['/placeholder.svg?height=200&width=200'],
    originalPrice: 300.0,
    discountedPrice: 200.0,
    stripePriceId: 'price_mock_booster_box',
    couponId: 'PRESALE_BOOSTER_BOX_33',
    couponActive: true,
    savings: 100.0,
    metadata: {
      category: 'bulk',
      quantity: '150',
    },
  },
];

const MOCK_COUPON_USAGE: Record<string, string[]> = {
  'test@example.com': ['PRESALE_SINGLE_BOOSTER_30'],
  'used@example.com': ['PRESALE_SINGLE_BOOSTER_30', 'PRESALE_BOOSTER_BOX_33'],
};

const MOCK_CUSTOMERS: Record<string, any> = {};
const MOCK_PAYMENT_INTENTS: Record<string, MockPaymentIntent> = {};
const MOCK_CHECKOUT_SESSIONS: Record<string, MockPaymentSession> = {};

class MockStripeService {
  private stripe: Stripe | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.initializeStripe();
  }

  // Products API
  async getProducts(): Promise<{ success: boolean; products: MockProduct[] }> {
    await this.delay(800); // Simulate network delay

    // Simulate occasional API errors
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch products from Stripe API');
    }

    return {
      success: true,
      products: MOCK_PRODUCTS,
    };
  }

  // Coupon Eligibility API
  async checkCouponEligibility(
    email: string,
    productIds: string[],
  ): Promise<{
    success: boolean;
    eligibility: Record<string, MockCouponEligibility>;
  }> {
    await this.delay(600);

    const eligibility: Record<string, MockCouponEligibility> = {};
    const usedCoupons = MOCK_COUPON_USAGE[email] || [];

    productIds.forEach((productId) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === productId);
      if (!product) {
        eligibility[productId] = {
          eligible: false,
          currentPrice: 0,
          originalPrice: 0,
          couponApplied: false,
          reason: 'Product not found',
        };
        return;
      }

      const couponAlreadyUsed =
        product.couponId && usedCoupons.includes(product.couponId);

      if (couponAlreadyUsed) {
        eligibility[productId] = {
          eligible: false,
          currentPrice: product.originalPrice,
          originalPrice: product.originalPrice,
          couponApplied: false,
          reason: 'Coupon already used',
        };
      } else if (product.couponActive && product.discountedPrice) {
        eligibility[productId] = {
          eligible: true,
          currentPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          couponApplied: true,
          couponId: product.couponId,
          savings: product.savings,
        };
      } else {
        eligibility[productId] = {
          eligible: false,
          currentPrice: product.originalPrice,
          originalPrice: product.originalPrice,
          couponApplied: false,
          reason: 'No active discount available',
        };
      }
    });

    return {
      success: true,
      eligibility,
    };
  }

  // Payment Intent Creation
  async createPaymentIntent(
    items: CartItem[],
    customerDetails: UserDetails,
  ): Promise<{
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
  }> {
    await this.delay(1000);

    // Create customer
    const customer = await this.createOrRetrieveCustomer(customerDetails);

    // Calculate amounts
    const originalAmount = items.reduce(
      (sum, item) => sum + item.originalPrice * item.quantity,
      0,
    );
    const totalAmount = items.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0,
    );

    // Collect applied coupons
    const appliedCoupons = items
      .filter((item) => item.couponApplied && item.couponId)
      .map((item) => ({
        id: item.couponId!,
        productId: item.id,
        discountAmount:
          (item.originalPrice - item.currentPrice) * item.quantity,
      }));

    // Create payment intent with proper ID format
    const paymentIntentId = this.generateId('pi');
    const clientSecret = this.generateClientSecret(paymentIntentId);

    const paymentIntent: MockPaymentIntent = {
      id: paymentIntentId,
      client_secret: clientSecret,
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      status: 'requires_payment_method',
      metadata: {
        customerEmail: customerDetails.email,
        appliedCoupons: JSON.stringify(appliedCoupons),
        originalItems: JSON.stringify(items),
        customerId: customer.id,
      },
    };

    MOCK_PAYMENT_INTENTS[paymentIntentId] = paymentIntent;

    // Record coupon usage
    appliedCoupons.forEach((coupon) => {
      if (!MOCK_COUPON_USAGE[customerDetails.email]) {
        MOCK_COUPON_USAGE[customerDetails.email] = [];
      }
      if (!MOCK_COUPON_USAGE[customerDetails.email].includes(coupon.id)) {
        MOCK_COUPON_USAGE[customerDetails.email].push(coupon.id);
      }
    });

    console.log('Mock Payment Intent Created:', {
      paymentIntentId,
      clientSecret: clientSecret.substring(0, 30) + '...',
      customerEmail: customerDetails.email,
      totalAmount,
      appliedCoupons,
    });

    return {
      success: true,
      clientSecret,
      paymentIntentId,
      appliedCoupons,
      totalAmount,
      originalAmount,
    };
  }

  // Payment Confirmation
  async confirmPayment(
    paymentIntentId: string,
    customerEmail: string,
  ): Promise<{
    success: boolean;
    status: string;
    orderId?: string;
    message?: string;
  }> {
    await this.delay(1500); // Simulate processing time

    const paymentIntent = MOCK_PAYMENT_INTENTS[paymentIntentId];
    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      paymentIntent.status = 'succeeded';
      const orderId = this.generateId('order');

      console.log('Mock Payment Confirmed:', {
        paymentIntentId,
        customerEmail,
        orderId,
        amount: paymentIntent.amount / 100,
      });

      return {
        success: true,
        status: 'succeeded',
        orderId,
        message: 'Payment confirmed successfully',
      };
    } else {
      paymentIntent.status = 'failed';
      throw new Error('Payment failed - card declined');
    }
  }

  // Contact Creation
  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    formId: string;
  }): Promise<{ success: boolean; contactId?: string; message?: string }> {
    await this.delay(500);

    const contactId = this.generateId('contact');

    console.log('Mock Contact Created:', {
      contactId,
      ...contactData,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      contactId,
      message: 'Contact created successfully',
    };
  }

  // Stripe Elements Integration
  async createEmbeddedPaymentForm(clientSecret: string): Promise<any> {
    try {
      const stripe = await this.ensureStripeLoaded();

      console.log(
        'Creating Stripe Elements with client secret:',
        clientSecret.substring(0, 30) + '...',
      );

      // Validate client secret format
      if (!clientSecret.includes('_secret_')) {
        throw new Error('Invalid client secret format');
      }

      // Create embedded payment form
      const elements = stripe.elements({
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#5AC8FA',
            colorBackground: '#ffffff',
            colorText: '#272c31',
            colorDanger: '#FF6B6B',
            fontFamily: 'system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
          },
        },
      });

      const paymentElement = elements.create('payment', {
        layout: 'tabs',
      });

      console.log('Stripe Elements created successfully');

      return {
        elements,
        paymentElement,
        stripe,
      };
    } catch (error: any) {
      console.error('Failed to create Stripe Elements:', error);
      throw new Error(`Failed to initialize payment form: ${error?.message}`);
    }
  }

  async confirmEmbeddedPayment(
    stripe: Stripe,
    elements: any,
    returnUrl: string,
  ): Promise<{ error?: any; paymentIntent?: any }> {
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        return { error };
      }

      console.log('Payment confirmed via Stripe Elements:', paymentIntent);
      return { paymentIntent };
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      return { error: { message: 'Payment confirmation failed' } };
    }
  }

  // Utility Methods
  getPaymentIntent(paymentIntentId: string): MockPaymentIntent | null {
    return MOCK_PAYMENT_INTENTS[paymentIntentId] || null;
  }

  // Reset mock data (for testing)
  resetMockData(): void {
    Object.keys(MOCK_CUSTOMERS).forEach((key) => delete MOCK_CUSTOMERS[key]);
    Object.keys(MOCK_PAYMENT_INTENTS).forEach(
      (key) => delete MOCK_PAYMENT_INTENTS[key],
    );
    Object.keys(MOCK_CHECKOUT_SESSIONS).forEach(
      (key) => delete MOCK_CHECKOUT_SESSIONS[key],
    );

    // Reset coupon usage to initial state
    Object.keys(MOCK_COUPON_USAGE).forEach((key) => {
      if (key !== 'test@example.com' && key !== 'used@example.com') {
        delete MOCK_COUPON_USAGE[key];
      }
    });
  }

  // Get mock statistics (for debugging)
  getMockStats(): any {
    return {
      customers: Object.keys(MOCK_CUSTOMERS).length,
      paymentIntents: Object.keys(MOCK_PAYMENT_INTENTS).length,
      checkoutSessions: Object.keys(MOCK_CHECKOUT_SESSIONS).length,
      couponUsage: Object.keys(MOCK_COUPON_USAGE).reduce(
        (acc, email) => {
          acc[email] = MOCK_COUPON_USAGE[email].length;
          return acc;
        },
        {} as Record<string, number>,
      ),
      stripeInitialized: this.isInitialized,
    };
  }

  private async initializeStripe() {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.doInitializeStripe();
    return this.initializationPromise;
  }

  private async doInitializeStripe() {
    try {
      // Use a test publishable key if EXPO_STRIPE_PUBLISH_KEY is not available
      const publishableKey =
        EXPO_STRIPE_PUBLISH_KEY || 'pk_test_51234567890abcdef';

      if (!publishableKey) {
        throw new Error('Stripe publishable key is not defined');
      }

      console.log(
        'Initializing Stripe with key:',
        publishableKey.substring(0, 20) + '...',
      );

      this.stripe = await loadStripe(publishableKey);
      this.isInitialized = true;

      console.log('Mock Stripe initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      this.isInitialized = false;
      // Don't throw here, allow fallback to simulation mode
    }
  }

  private async ensureStripeLoaded(): Promise<Stripe> {
    await this.initializeStripe();

    if (!this.stripe) {
      throw new Error('Stripe failed to initialize - using simulation mode');
    }

    return this.stripe;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateClientSecret(paymentIntentId: string): string {
    // Generate a proper Stripe client secret format: pi_xxx_secret_xxx
    const secretPart = Math.random().toString(36).substr(2, 24);
    return `${paymentIntentId}_secret_${secretPart}`;
  }

  // Customer Management
  private async createOrRetrieveCustomer(
    customerDetails: UserDetails,
  ): Promise<any> {
    const { firstName, lastName, email, address } = customerDetails;

    // Check if customer exists
    if (MOCK_CUSTOMERS[email]) {
      return MOCK_CUSTOMERS[email];
    }

    // Create new customer
    const customer = {
      id: this.generateId('cus'),
      name: `${firstName} ${lastName}`,
      email: email,
      address: {
        line1: address.street,
        city: address.city,
        state: address.state,
        postal_code: address.zip,
        country: address.country,
      },
      metadata: {
        source: 'vyarna-preorder-mock',
        signupDate: new Date().toISOString(),
      },
    };

    MOCK_CUSTOMERS[email] = customer;
    return customer;
  }
}

// Singleton instance
export const mockStripeService = new MockStripeService();

// Export types for use in other files
export type {
  MockProduct as Product,
  MockCouponEligibility as CouponEligibility,
  MockPaymentIntent as PaymentIntent,
  MockPaymentSession as PaymentSession,
};
