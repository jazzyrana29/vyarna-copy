import { wsService } from "./websocketService"
import { WS_MESSAGES } from "../constants/websocket-messages"
import type {
  GetProductsPayload,
  ProductsResponsePayload,
  CheckCouponEligibilityPayload,
  CouponEligibilityResponsePayload,
  CreatePaymentIntentPayload,
  PaymentIntentCreatedPayload,
  ConfirmPaymentPayload,
  PaymentConfirmedPayload,
  CreateContactPayload,
  ContactCreatedPayload,
} from "../constants/websocket-messages"
import type { UserDetails } from "../store/userStore"
import type { CartItem } from "../store/cartStore"

class WebSocketApiService {
  // Products
  async getProducts(forceRefresh = false): Promise<ProductsResponsePayload> {
    const payload: GetProductsPayload = { forceRefresh }
    return wsService.request<GetProductsPayload, ProductsResponsePayload>(WS_MESSAGES.GET_PRODUCTS, payload)
  }

  // Coupon Eligibility
  async checkCouponEligibility(email: string, productIds: string[]): Promise<CouponEligibilityResponsePayload> {
    const payload: CheckCouponEligibilityPayload = { email, productIds }
    return wsService.request<CheckCouponEligibilityPayload, CouponEligibilityResponsePayload>(
      WS_MESSAGES.CHECK_COUPON_ELIGIBILITY,
      payload,
    )
  }

  // Payment Processing
  async createPaymentIntent(items: CartItem[], customerDetails: UserDetails): Promise<PaymentIntentCreatedPayload> {
    const payload: CreatePaymentIntentPayload = {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        stripePriceId: item.stripePriceId,
      })),
      customerDetails,
    }

    return wsService.request<CreatePaymentIntentPayload, PaymentIntentCreatedPayload>(
      WS_MESSAGES.CREATE_PAYMENT_INTENT,
      payload,
    )
  }

  async confirmPayment(paymentIntentId: string, customerEmail: string): Promise<PaymentConfirmedPayload> {
    const payload: ConfirmPaymentPayload = { paymentIntentId, customerEmail }
    return wsService.request<ConfirmPaymentPayload, PaymentConfirmedPayload>(WS_MESSAGES.CONFIRM_PAYMENT, payload)
  }

  // Contact Creation
  async createContact(contactData: {
    firstName: string
    lastName: string
    email: string
    formId: string
  }): Promise<ContactCreatedPayload> {
    const payload: CreateContactPayload = contactData
    return wsService.request<CreateContactPayload, ContactCreatedPayload>(WS_MESSAGES.CREATE_CONTACT, payload)
  }

  // Real-time subscriptions
  onCouponUsed(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.COUPON_USED, handler)
  }

  onCouponLimitReached(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.COUPON_LIMIT_REACHED, handler)
  }

  onPaymentStatusUpdate(handler: (data: any) => void): () => void {
    return wsService.on(WS_MESSAGES.PAYMENT_STATUS_UPDATE, handler)
  }

  // Join customer-specific room for targeted updates
  joinCustomerRoom(email: string): void {
    wsService.joinRoom(`customer-${email}`)
  }

  leaveCustomerRoom(email: string): void {
    wsService.leaveRoom(`customer-${email}`)
  }
}

export const wsApiService = new WebSocketApiService()
