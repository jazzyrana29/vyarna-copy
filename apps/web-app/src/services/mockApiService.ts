// Mock API service to simulate backend responses
import type { UserDetails } from "../store/userStore"
import type { CartItem } from "../store/cartStore"

interface ProductPricing {
  eligible: boolean
  currentPrice: number
  originalPrice: number
  couponApplied: boolean
  couponId?: string
  savings?: number
  reason?: string
}

interface CouponEligibilityResponse {
  [productId: string]: ProductPricing
}

interface PaymentSessionResponse {
  sessionId: string
  redirectUrl: string
  appliedCoupons: Array<{
    id: string
    productId: string
    discountAmount: number
  }>
}

// Mock data for testing
const MOCK_COUPON_USAGE: Record<string, string[]> = {
  // email -> array of used coupon IDs
  "test@example.com": ["PRESALE_SINGLE_BOOSTER_30"],
  "used@example.com": ["PRESALE_SINGLE_BOOSTER_30", "PRESALE_BOOSTER_BOX_33"],
}

const PRODUCT_CONFIGS = {
  "single-booster": {
    originalPrice: 2.0,
    discountedPrice: 1.4,
    couponId: "PRESALE_SINGLE_BOOSTER_30",
    stripePriceId: "price_single_booster_123",
  },
  "booster-box": {
    originalPrice: 300.0,
    discountedPrice: 200.0,
    couponId: "PRESALE_BOOSTER_BOX_33",
    stripePriceId: "price_booster_box_456",
  },
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApiService = {
  async checkCouponEligibility(email: string, productIds: string[]): Promise<CouponEligibilityResponse> {
    await delay(800) // Simulate network delay

    const response: CouponEligibilityResponse = {}

    productIds.forEach((productId) => {
      const config = PRODUCT_CONFIGS[productId as keyof typeof PRODUCT_CONFIGS]
      if (!config) {
        response[productId] = {
          eligible: false,
          currentPrice: 0,
          originalPrice: 0,
          couponApplied: false,
          reason: "Product not found",
        }
        return
      }

      const usedCoupons = MOCK_COUPON_USAGE[email] || []
      const couponAlreadyUsed = usedCoupons.includes(config.couponId)

      if (couponAlreadyUsed) {
        response[productId] = {
          eligible: false,
          currentPrice: config.originalPrice,
          originalPrice: config.originalPrice,
          couponApplied: false,
          reason: "Coupon already used",
        }
      } else {
        response[productId] = {
          eligible: true,
          currentPrice: config.discountedPrice,
          originalPrice: config.originalPrice,
          couponApplied: true,
          couponId: config.couponId,
          savings: config.originalPrice - config.discountedPrice,
        }
      }
    })

    return response
  },

  async createPaymentSession(items: CartItem[], customerDetails: UserDetails): Promise<PaymentSessionResponse> {
    await delay(1000) // Simulate network delay

    // Mock session creation
    const sessionId = `cs_mock_${Date.now()}`
    const redirectUrl = `https://checkout.stripe.com/pay/${sessionId}`

    const appliedCoupons = items
      .filter((item) => item.couponApplied)
      .map((item) => ({
        id: item.couponId!,
        productId: item.id,
        discountAmount: (item.originalPrice - item.currentPrice) * item.quantity,
      }))

    // Simulate WebSocket notification after delay
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mock-payment-session-created", {
          detail: { sessionId, customerEmail: customerDetails.email, appliedCoupons },
        }),
      )
    }, 500)

    return {
      sessionId,
      redirectUrl,
      appliedCoupons,
    }
  },

  async verifyPayment(sessionId: string): Promise<{ status: string; error?: string }> {
    await delay(500)

    // Mock payment verification - randomly succeed or fail for testing
    const success = Math.random() > 0.2 // 80% success rate

    if (success) {
      return { status: "succeeded" }
    } else {
      return {
        status: "failed",
        error: "Your card was declined. Please try a different payment method.",
      }
    }
  },
}

// Mock WebSocket events for testing
export const mockWebSocketEvents = {
  simulatePaymentSuccess: (sessionId: string, customerEmail: string) => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mock-payment-completed", {
          detail: { sessionId, customerEmail, status: "succeeded" },
        }),
      )
    }, 2000)
  },

  simulatePaymentFailure: (sessionId: string, customerEmail: string, error: string) => {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mock-payment-failed", {
          detail: { sessionId, customerEmail, status: "failed", error },
        }),
      )
    }, 2000)
  },

  simulateCouponLimitReached: (couponId: string, productId: string) => {
    window.dispatchEvent(
      new CustomEvent("mock-coupon-limit-reached", {
        detail: { couponId, productId },
      }),
    )
  },
}
