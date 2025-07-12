import { wsService } from './websocketService';
import { mockStripeService } from './mockStripeService';
import type {
  CheckCouponEligibilityPayload,
  ConfirmPaymentPayload,
  ContactCreatedPayload,
  CouponEligibilityResponsePayload,
  CreateContactPayload,
  CreatePaymentIntentPayload,
  GetProductsPayload,
  PaymentConfirmedPayload,
  PaymentIntentCreatedPayload,
  ProductsResponsePayload,
} from '../constants/websocket-messages';
import { WS_MESSAGES } from '../constants/websocket-messages';
import type { UserDetails } from '../store/userStore';
import type { CartItem } from '../store/cartStore';

class WebSocketApiService {
  private readonly REQUEST_TIMEOUT = 10000; // 10 seconds

  // Products
  async getProducts(forceRefresh = false): Promise<ProductsResponsePayload> {
    try {
      const payload: GetProductsPayload = { forceRefresh };
      return await wsService.request<
        GetProductsPayload,
        ProductsResponsePayload
      >(WS_MESSAGES.GET_PRODUCTS, payload, this.REQUEST_TIMEOUT);
    } catch (error) {
      console.warn(
        'WebSocket getProducts failed, using mock Stripe service:',
        error,
      );

      // Fallback to mock Stripe service
      const mockResponse = await mockStripeService.getProducts();
      return {
        success: mockResponse.success,
        products: mockResponse.products,
      };
    }
  }

  // Coupon Eligibility
  async checkCouponEligibility(
    email: string,
    productIds: string[],
  ): Promise<CouponEligibilityResponsePayload> {
    try {
      const payload: CheckCouponEligibilityPayload = { email, productIds };
      return await wsService.request<
        CheckCouponEligibilityPayload,
        CouponEligibilityResponsePayload
      >(WS_MESSAGES.CHECK_COUPON_ELIGIBILITY, payload, this.REQUEST_TIMEOUT);
    } catch (error) {
      console.warn(
        'WebSocket checkCouponEligibility failed, using mock Stripe service:',
        error,
      );

      // Fallback to mock Stripe service
      const mockResponse = await mockStripeService.checkCouponEligibility(
        email,
        productIds,
      );
      return {
        success: mockResponse.success,
        eligibility: mockResponse.eligibility,
      };
    }
  }

  // Payment Processing
  async createPaymentIntent(
    items: CartItem[],
    customerDetails: UserDetails,
  ): Promise<PaymentIntentCreatedPayload> {
    try {
      const payload: CreatePaymentIntentPayload = {
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          stripePriceId: item.stripePriceId,
        })),
        customerDetails,
      };

      return await wsService.request<
        CreatePaymentIntentPayload,
        PaymentIntentCreatedPayload
      >(WS_MESSAGES.CREATE_PAYMENT_INTENT, payload, this.REQUEST_TIMEOUT);
    } catch (error) {
      console.warn(
        'WebSocket createPaymentIntent failed, using mock Stripe service:',
        error,
      );

      // Fallback to mock Stripe service
      const mockResponse = await mockStripeService.createPaymentIntent(
        items,
        customerDetails,
      );
      return {
        success: mockResponse.success,
        clientSecret: mockResponse.clientSecret,
        paymentIntentId: mockResponse.paymentIntentId,
        appliedCoupons: mockResponse.appliedCoupons,
        totalAmount: mockResponse.totalAmount,
        originalAmount: mockResponse.originalAmount,
      };
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    customerEmail: string,
  ): Promise<PaymentConfirmedPayload> {
    try {
      const payload: ConfirmPaymentPayload = { paymentIntentId, customerEmail };
      return await wsService.request<
        ConfirmPaymentPayload,
        PaymentConfirmedPayload
      >(WS_MESSAGES.CONFIRM_PAYMENT, payload, this.REQUEST_TIMEOUT);
    } catch (error) {
      console.warn(
        'WebSocket confirmPayment failed, using mock Stripe service:',
        error,
      );

      // Fallback to mock Stripe service
      const mockResponse = await mockStripeService.confirmPayment(
        paymentIntentId,
        customerEmail,
      );
      return {
        success: mockResponse.success,
        status: mockResponse.status,
        orderId: mockResponse.orderId,
        message: mockResponse.message,
      };
    }
  }

  // Contact Creation
  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    formId: string;
  }): Promise<ContactCreatedPayload> {
    try {
      const payload: CreateContactPayload = contactData;
      return await wsService.request<
        CreateContactPayload,
        ContactCreatedPayload
      >(WS_MESSAGES.CREATE_CONTACT, payload, this.REQUEST_TIMEOUT);
    } catch (error) {
      console.warn(
        'WebSocket createContact failed, using mock Stripe service:',
        error,
      );

      // Fallback to mock Stripe service
      const mockResponse = await mockStripeService.createContact(contactData);
      return {
        success: mockResponse.success,
        contactId: mockResponse.contactId,
        message: mockResponse.message,
      };
    }
  }

  // Stripe-specific methods for embedded payment
  async createEmbeddedPaymentForm(clientSecret: string): Promise<any> {
    return await mockStripeService.createEmbeddedPaymentForm(clientSecret);
  }

  async confirmEmbeddedPayment(
    stripe: any,
    elements: any,
    returnUrl: string,
  ): Promise<any> {
    return await mockStripeService.confirmEmbeddedPayment(
      stripe,
      elements,
      returnUrl,
    );
  }

  // Real-time subscriptions (these still use WebSocket only)
  onCouponUsed(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.COUPON_USED, handler);
  }

  onCouponLimitReached(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.COUPON_LIMIT_REACHED, handler);
  }

  onPaymentStatusUpdate(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.PAYMENT_STATUS_UPDATE, handler);
  }

  // Join customer-specific room for targeted updates
  joinCustomerRoom(email: string): void {
    wsService.joinRoom(`customer-${email}`);
  }

  leaveCustomerRoom(email: string): void {
    wsService.leaveRoom(`customer-${email}`);
  }
}

export const wsApiService = new WebSocketApiService();
