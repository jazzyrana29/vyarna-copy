// WebSocket message types and constants
export const WS_MESSAGES = {
  // Connection
  CONNECTION_ESTABLISHED: 'connection-established',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',

  // Products
  GET_PRODUCTS: 'get-products',

  // Coupon Eligibility
  CHECK_COUPON_ELIGIBILITY: 'check-coupon-eligibility',

  // Payment Processing
  CREATE_PAYMENT_INTENT: 'create-payment-intent',

  CONFIRM_PAYMENT: 'confirm-payment',

  // Real-time Updates
  COUPON_USED: 'coupon-used',
  COUPON_LIMIT_REACHED: 'coupon-limit-reached',
  PAYMENT_STATUS_UPDATE: 'payment-status-update',

  // Contact/Email
  CREATE_CONTACT: 'create-contact',
} as const;

export type WSMessageType = (typeof WS_MESSAGES)[keyof typeof WS_MESSAGES];

// Message payload interfaces
export interface WSMessage<T = any> {
  type: WSMessageType;
  payload: T;
  requestId?: string;
  timestamp?: string;
}

// Product Messages
export interface GetProductsPayload {
  forceRefresh?: boolean;
}

export interface ProductsResponsePayload {
  success: boolean;
  products: Array<{
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
  }>;
}

// Coupon Messages
export interface CheckCouponEligibilityPayload {
  email: string;
  productIds: string[];
}

export interface CouponEligibilityResponsePayload {
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

// Payment Messages
export interface CreatePaymentIntentPayload {
  items: Array<{
    id: string;
    quantity: number;
    stripePriceId?: string;
  }>;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
}

export interface PaymentIntentCreatedPayload {
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

export interface ConfirmPaymentPayload {
  paymentIntentId: string;
  customerEmail: string;
}

export interface PaymentConfirmedPayload {
  success: boolean;
  status: string;
  orderId?: string;
  message?: string;
}

// Contact Messages
export interface CreateContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  formId: string;
}

export interface ContactCreatedPayload {
  success: boolean;
  contactId?: string;
  message?: string;
}

// Real-time Update Messages
export interface CouponUsedPayload {
  email: string;
  couponId: string;
  productId: string;
  discountAmount: number;
}

export interface CouponLimitReachedPayload {
  couponId: string;
  productId: string;
}

export interface PaymentStatusUpdatePayload {
  sessionId?: string;
  paymentIntentId?: string;
  customerEmail: string;
  status: 'processing' | 'succeeded' | 'failed';
  error?: string;
}

// Error Messages
export interface ErrorPayload {
  message: string;
  code?: string;
  details?: any;
}
